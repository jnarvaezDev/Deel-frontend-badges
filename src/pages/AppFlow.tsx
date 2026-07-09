import { useEffect, useMemo, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WelcomeScreen } from "@/components/badges/WelcomeScreen";
import { RegistrationScreen, type RegistrationData } from "@/components/badges/RegistrationScreen";
import { QuestionScreen } from "@/components/badges/QuestionScreen";
import { ClosingScreen } from "@/components/badges/ClosingScreen";
import { ProcessingScreen } from "@/components/badges/ProcessingScreen";
import { ResultsScreen } from "@/components/badges/ResultsScreen";
import { ProgressBar } from "@/components/badges/ProgressBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ENTRY_QUESTION, getQuestionsForPath } from "@/lib/badges/questions";
import { scoreForPath, scoreForPathWithAdjustedScore } from "@/lib/badges/scoring";
import { submitToWebhook, validateOpenText } from "@/lib/badges/webhook";
import { captureLead } from "@/lib/badges/leads";
import type { BadgeLevel, Intent, PathKey, ScoringResult, backendResponse } from "@/lib/badges/types";
import { toast } from "sonner";
import {
  getBrazilBrandingOverride,
  getStoredBrazilBranding,
  isBrazilCountry,
  USER_COUNTRY_STORAGE_KEY,
} from "@/lib/branding";
import "./../badge-theme.css";

type Stage =
  | "welcome"
  | "registration"
  | "entry"
  | "questions"
  | "open_text"
  | "honesty"
  | "intent"
  | "processing"
  | "results"
  | "locked";

type LockedInfo = {
  message: string;
  nextAvailableDate: string;
};

type AnswerRecord = { label: string; points: number; flag?: string };

const PATH_ACCENT: Record<PathKey, Exclude<BadgeLevel, "none">> = {
  A: "talent",
  B: "champion",
  C: "leader",
};

const ACCENT_BG = {
  talent: "bg-talent",
  champion: "bg-champion",
  leader: "bg-leader",
};

const NOMAD_BRANDING_BG = "bg-black";
const GEO_BRANDING_TIMEOUT_MS = 3000;

const AppFlow = () => {
  const isMobile = useIsMobile();

  const [stage, setStage] = useState<Stage>("welcome");
  const [registration, setRegistration] = useState<RegistrationData | null>(null);
  const [path, setPath] = useState<PathKey | null>(null);
  const [entryAnswer, setEntryAnswer] = useState<string>("");
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerRecord>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerRecord | null>(null);
  const [openText, setOpenText] = useState("");
  const [honesty, setHonesty] = useState(false);
  const [intent, setIntent] = useState<Intent>({
    seekingOpportunities: false,
    hiringGlobalRoles: false,
    exploring: false,
  });

  const [result, setResult] = useState<ScoringResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reroutedFrom, setReroutedFrom] = useState<PathKey | null>(null);
  const [processingFinished, setProcessingFinished] = useState(false);
  const [lockedInfo, setLockedInfo] = useState<LockedInfo | null>(null);
  const [isBrazilBranding, setIsBrazilBranding] = useState(() => getStoredBrazilBranding());
  const [brandingReady, setBrandingReady] = useState(() => getStoredBrazilBranding());

  const API_URL = import.meta.env.VITE_API_URL;

  const questions = useMemo(() => (path ? getQuestionsForPath(path) : []), [path]);

  const totalSteps = path ? 1 + questions.length + 3 : 1;

  useEffect(() => {
    let isMounted = true;

    const applyBrazilBranding = (country: string) => {
      localStorage.setItem(USER_COUNTRY_STORAGE_KEY, country);
      setIsBrazilBranding(true);
    };

    const overrideCountry = getBrazilBrandingOverride(window.location.search);

    if (overrideCountry) {
      applyBrazilBranding(overrideCountry);
      setBrandingReady(true);
      return;
    }

    if (getStoredBrazilBranding()) {
      setBrandingReady(true);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), GEO_BRANDING_TIMEOUT_MS);
    const geoApiUrl = `${API_URL.replace(/\/$/, "")}/api/geo`;

    fetch(geoApiUrl, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { country?: string | null; isBrazil?: boolean } | null) => {
        if (!isMounted) return;

        if (data?.isBrazil) {
          applyBrazilBranding(data.country ?? "BR");
        }
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.warn("[geo] Failed to detect visitor country", error);
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
        if (isMounted) setBrandingReady(true);
      });

    return () => {
      isMounted = false;
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [API_URL]);

  const currentStep = (() => {
    if (stage === "entry") return 1;
    if (stage === "questions") return 1 + questionIdx + 1;
    if (stage === "open_text") return 1 + questions.length + 1;
    if (stage === "honesty") return 1 + questions.length + 2;
    if (stage === "intent") return 1 + questions.length + 3;
    return 1;
  })();

  const accent = path ? PATH_ACCENT[path] : "champion";

  useEffect(() => {
    if (stage === "processing" && result && processingFinished) {
      setStage("results");
    }
  }, [stage, result, processingFinished]);

  if (!brandingReady) {
    return <div className="bdg-theme min-h-screen bg-bdg-background" />;
  }

  const reset = () => {
    setStage("welcome");
    setRegistration(null);
    setPath(null);
    setEntryAnswer("");
    setQuestionIdx(0);
    setAnswers({});
    setSelectedAnswer(null);
    setOpenText("");
    setHonesty(false);
    setIntent({
      seekingOpportunities: false,
      hiringGlobalRoles: false,
      exploring: false,
    });
    setResult(null);
    setIsSubmitting(false);
    setReroutedFrom(null);
    setProcessingFinished(false);
    setLockedInfo(null);
  };

  const handleRegistration = (data: RegistrationData) => {
    const fullName = `${data.firstName} ${data.lastName}`.trim();

    if (data?.email) {
      localStorage.setItem("user_email", decodeURIComponent(data.email));
    }

    if (fullName) {
      localStorage.setItem("user_name", decodeURIComponent(fullName));
    }

    if (data?.currentCountry) {
      localStorage.setItem(USER_COUNTRY_STORAGE_KEY, data.currentCountry);
    }

    setIsBrazilBranding(isBrazilCountry(data.currentCountry));

    setRegistration(data);
  };

  const handleEntrySelect = (idx: number) => {
    const opt = ENTRY_QUESTION.options[idx];

    setEntryAnswer(opt.label);
    setPath(opt.path);
    setAnswers({});
    setSelectedAnswer(null);
    setQuestionIdx(0);
    setReroutedFrom(null);
  };

  const handleEntryContinue = () => {
    if (!path) return;

    setStage("questions");
    setQuestionIdx(0);
    setSelectedAnswer(null);
  };

  const currentQuestion = questions[questionIdx];

  const handleQuestionSelect = (optIdx: number) => {
    if (!currentQuestion) return;

    const opt = currentQuestion.options[optIdx];

    const answer: AnswerRecord = {
      label: opt.label,
      points: opt.points,
      flag: opt.flag,
    };

    setSelectedAnswer(answer);

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleQuestionContinue = () => {
    if (!currentQuestion || !path) return;

    const currentAnswer = selectedAnswer ?? answers[currentQuestion.id];

    if (!currentAnswer) return;

    if (currentAnswer.flag === "fail") {
      setSelectedAnswer(null);
      setStage("open_text");
      return;
    }

    if (currentAnswer.flag === "reroute_talent") {
      setReroutedFrom(path);
      setPath("A");
      setQuestionIdx(0);
      setAnswers({});
      setSelectedAnswer(null);
      toast.info("Redirecting you to the Global Talent track.");
      return;
    }

    if (currentAnswer.flag === "reroute_champion") {
      setReroutedFrom(path);
      setPath("B");
      setQuestionIdx(0);
      setAnswers({});
      setSelectedAnswer(null);
      toast.info("Redirecting you to the Global Champion track.");
      return;
    }

    setSelectedAnswer(null);

    if (questionIdx < questions.length - 1) {
      setQuestionIdx((i) => i + 1);
    } else {
      setStage("open_text");
    }
  };

  const handleQuestionBack = () => {
    setSelectedAnswer(null);

    if (questionIdx === 0) {
      setStage("entry");
    } else {
      setQuestionIdx((i) => i - 1);
    }
  };

  const handleClosingContinue = async () => {
    if (stage === "open_text") {
      setStage("honesty");
      return;
    }

    if (stage === "honesty") {
      setStage("intent");
      return;
    }

    if (stage !== "intent") return;
    if (!path || isSubmitting) return;

    setIsSubmitting(true);
    setProcessingFinished(false);
    setStage("processing");

    const rawResult = scoreForPath(path, answers);

    const validation = await validateOpenText({
      path,
      entryAnswer,
      answers,
      openText,
    });

    const adjustedScore = Math.round(
      rawResult.score * validation.scoreModifier
    );

    const adjustedResult = scoreForPathWithAdjustedScore(
      path,
      answers,
      adjustedScore
    );

    const finalScoring: ScoringResult = {
      ...adjustedResult,

      rawScore: rawResult.score,
      adjustedScore,

      aiValidation: validation,

      reroutedFrom:
        reroutedFrom ??
        adjustedResult.reroutedFrom ??
        rawResult.reroutedFrom,
    };

    const payload = {
      firstName: registration?.firstName ?? "",
      lastName: registration?.lastName ?? "",
      email: registration?.email ?? "",
      currentJobTitle: registration?.jobTitle ?? "",
      currentCountry: registration?.currentCountry ?? "",
      jobTitle: registration?.jobTitle ?? "",
      badge: finalScoring.badge,
      maxScore: finalScoring.maxScore,
      reason: finalScoring.reason,
      score: finalScoring.score,
      reroutedFrom: finalScoring.reroutedFrom,
      answers,
      openText,
      honestyConfirmed: honesty,
      intent,
      rawScore: finalScoring.rawScore,
      adjustedScore: finalScoring.adjustedScore,
      aiValidation: finalScoring.aiValidation,
    };

    try {
      const res = await fetch(`${API_URL}/api/results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed creating badge");
      }

      const data: backendResponse = await res.json();

      if (data.status === "locked") {
        setLockedInfo({
          message:
            data.message ??
            "You can only take the assessment once every 6 months.",
          nextAvailableDate: data.nextAvailableDate ?? "",
        });
        setStage("locked");
        setIsSubmitting(false);
        setProcessingFinished(false);
        return;
      }

      const finalResult: ScoringResult = {
        ...finalScoring,
        credentialUrl: data.credentialUrl,
        validation_page_url: data.validation_page_url,
        identification_number: data.identification_number,
        tier: data.tier,
      };

      setResult(finalResult);
    } catch (error) {
      console.error("Error creating badge:", error);
      setResult(finalScoring);
    }

    void submitToWebhook({
      path,
      entryAnswer,
      answers,
      openText,
      honestyConfirmed: honesty,
      intent,
      result: finalScoring,
      aiValidation: validation,
      timestamp: new Date().toISOString(),
    });

    setIsSubmitting(false);
  };

  return (
    <div className="bdg-theme min-h-screen bg-bdg-background flex flex-col">
      <Header isBrazilBranding={isBrazilBranding} />

      <div className={isBrazilBranding ? NOMAD_BRANDING_BG : ACCENT_BG[accent]} style={{ height: 220 }} />

      <main className="flex-1 container max-w-2xl py-6 sm:py-10 px-4 sm:px-6">
        <div className="deel-container flex justify-center" style={{ marginTop: -224 }}>
          <div
            className="bg-background rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.10)] w-full flex flex-col items-center"
            style={{ padding: "48px 40px 56px" }}
          >
            {stage === "welcome" && (
              <WelcomeScreen
                onStart={() => setStage("registration")}
                isBrazilBranding={isBrazilBranding}
              />
            )}

            {stage === "registration" && (
              <RegistrationScreen
                onContinue={(data) => {
                  handleRegistration(data);

                  void captureLead({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    currentJobTitle: data.jobTitle,
                    currentCountry: data.currentCountry,
                  });

                  setStage("entry");
                }}
              />
            )}

            {stage === "entry" && (
              <EntryScreen
                selectedLabel={entryAnswer}
                onSelect={handleEntrySelect}
                onContinue={handleEntryContinue}
                onBack={() => setStage("welcome")}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            )}

            {stage === "questions" && currentQuestion && (
              <QuestionScreen
                question={currentQuestion}
                step={currentStep}
                total={totalSteps}
                selectedLabel={answers[currentQuestion.id]?.label}
                onSelect={handleQuestionSelect}
                onContinue={handleQuestionContinue}
                onBack={handleQuestionBack}
                accentLevel={accent}
                autoAdvance={isMobile}
              />
            )}

            {(stage === "open_text" || stage === "honesty" || stage === "intent") && (
              <div className="space-y-8">
                <ProgressBar
                  current={currentStep}
                  total={totalSteps}
                  accentClass={
                    accent === "talent"
                      ? "bg-bdg-talent"
                      : accent === "leader"
                        ? "bg-bdg-leader"
                        : "bg-bdg-champion"
                  }
                />

                <ClosingScreen
                  step={stage}
                  openText={openText}
                  setOpenText={setOpenText}
                  honesty={honesty}
                  setHonesty={setHonesty}
                  intent={intent}
                  setIntent={setIntent}
                  onContinue={handleClosingContinue}
                />
              </div>
            )}

            {stage === "processing" && (
              <ProcessingScreen onDone={() => setProcessingFinished(true)} />
            )}

            {stage === "results" && result && (
              <ResultsScreen result={result} isBrazilBranding={isBrazilBranding} />
            )}

            {stage === "locked" && lockedInfo && (
              <LockedScreen lockedInfo={lockedInfo} />
            )}
          </div>
        </div>
      </main>

      <Footer isBrazilBranding={isBrazilBranding} />
    </div>
  );
};

function EntryScreen({
  selectedLabel,
  onSelect,
  onContinue,
  onBack,
  currentStep,
  totalSteps,
}: {
  selectedLabel: string;
  onSelect: (i: number) => void;
  onContinue: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="bdg-theme space-y-8">
      <ProgressBar current={currentStep} total={totalSteps} />

      <div className="space-y-6 animate-slide-in-right">
        <div className="space-y-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-bdg-primary">
            Let's get started
          </p>

          <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-navy leading-tight">
            {ENTRY_QUESTION.prompt}
          </h2>
        </div>

        <div className="space-y-3" role="radiogroup">
          {ENTRY_QUESTION.options.map((opt, i) => {
            const selected = opt.label === selectedLabel;

            return (
              <button
                key={opt.label}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onSelect(i)}
                className={cn(
                  "group w-full text-left rounded-2xl border-2 p-4 sm:p-5 transition-all duration-200 ease-smooth",
                  "min-h-[64px] flex items-center gap-4 hover:border-foreground/20 hover:shadow-card active:scale-[0.99]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-fade-in",
                  selected
                    ? "border-bdg-primary bg-bdg-primary-soft text-bdg-primary shadow-card"
                    : "border-border bg-card"
                )}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div
                  className={cn(
                    "flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors",
                    selected
                      ? "border-bdg-primary bg-bdg-primary text-white"
                      : "border-border"
                  )}
                >
                  {selected && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>

                <span className="text-base sm:text-[17px] font-medium text-foreground/90">
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button
          variant="ghost"
          size="lg"
          onClick={onBack}
          className="hover:bg-bdg-minprimary/90 gap-1 h-12 px-3 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </Button>

        <Button
          size="lg"
          onClick={onContinue}
          disabled={!selectedLabel}
          className="bg-bdg-primary hover:bg-bdg-minprimary/90 flex-1 h-13 min-h-[52px] gap-2 text-base font-semibold rounded-xl shadow-card text-white disabled:opacity-40"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function LockedScreen({ lockedInfo }: { lockedInfo: LockedInfo }) {
  return (
    <div className="max-w-xl mx-auto text-center space-y-5 animate-fade-in py-8">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-navy">
        Assessment temporarily locked
      </h1>
      <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto">
        {lockedInfo.message}
      </p>
      {lockedInfo.nextAvailableDate && (
        <p className="text-sm font-medium text-navy">
          Next available date: {lockedInfo.nextAvailableDate}
        </p>
      )}
    </div>
  );
}

export default AppFlow;
