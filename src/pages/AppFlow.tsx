import { useEffect, useMemo, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WelcomeScreen } from "@/components/badges/WelcomeScreen";
import { QuestionScreen } from "@/components/badges/QuestionScreen";
import { ClosingScreen } from "@/components/badges/ClosingScreen";
import { ProcessingScreen } from "@/components/badges/ProcessingScreen";
import { ResultsScreen } from "@/components/badges/ResultsScreen";
import { ProgressBar } from "@/components/badges/ProgressBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ENTRY_QUESTION, getQuestionsForPath } from "@/lib/badges/questions";
import { scoreForPath } from "@/lib/badges/scoring";
import { submitToWebhook } from "@/lib/badges/webhook";
import type { BadgeLevel, Intent, PathKey, ScoringResult, backendResponse } from "@/lib/badges/types";
import { toast } from "sonner";
import "./../badge-theme.css";

type Stage =
  | "welcome"
  | "entry"
  | "questions"
  | "open_text"
  | "honesty"
  | "intent"
  | "processing"
  | "results";

type AnswerRecord = { label: string; points: number; flag?: string };

const PATH_ACCENT: Record<PathKey, Exclude<BadgeLevel, "none">> = {
  A: "talent",
  B: "champion",
  C: "leader",
};

const AppFlow = () => {
  const isMobile = useIsMobile();
  const [stage, setStage] = useState<Stage>("welcome");
  const [path, setPath] = useState<PathKey | null>(null);
  const [entryAnswer, setEntryAnswer] = useState<string>("");
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerRecord>>({});
  const [openText, setOpenText] = useState("");
  const [honesty, setHonesty] = useState(false);
  const [intent, setIntent] = useState<Intent>({
    seekingOpportunities: false,
    hiringGlobalRoles: false,
    exploring: false,
  });
  const [result, setResult] = useState<ScoringResult | null>(null);

  const [user, setUser] = useState<{
    name: string | null;
    email: string | null;
  } | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const nameParam = params.get("name");
    const emailParam = params.get("email");

    const name =
      nameParam ? decodeURIComponent(nameParam) : localStorage.getItem("user_name");

    const email =
      emailParam ? decodeURIComponent(emailParam) : localStorage.getItem("user_email");

    if (emailParam) {
      localStorage.setItem("user_email", decodeURIComponent(emailParam));
    }

    if (nameParam) {
      localStorage.setItem("user_name", decodeURIComponent(nameParam));
    }

    setUser({
      name,
      email,
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    if (!user.email) {
      toast.error("Please reconnect with LinkedIn to continue");
    }
  }, [user]);

  const questions = useMemo(() => (path ? getQuestionsForPath(path) : []), [path]);

  // Total dynamic steps for progress: entry + path questions + 3 closing
  const totalSteps = path ? 1 + questions.length + 3 : 1;
  const currentStep = (() => {
    if (stage === "entry") return 1;
    if (stage === "questions") return 1 + questionIdx + 1;
    if (stage === "open_text") return 1 + questions.length + 1;
    if (stage === "honesty") return 1 + questions.length + 2;
    if (stage === "intent") return 1 + questions.length + 3;
    return 1;
  })();

  const accent = path ? PATH_ACCENT[path] : "champion";

  const reset = () => {
    setStage("welcome");
    setPath(null);
    setEntryAnswer("");
    setQuestionIdx(0);
    setAnswers({});
    setOpenText("");
    setHonesty(false);
    setIntent({ seekingOpportunities: false, hiringGlobalRoles: false, exploring: false });
    setResult(null);
  };

  // ---------- Entry handling ----------
  const handleEntrySelect = (idx: number) => {
    const opt = ENTRY_QUESTION.options[idx];
    setEntryAnswer(opt.label);
    setPath(opt.path);
  };
  const handleEntryContinue = () => {
    if (!path) return;
    setStage("questions");
    setQuestionIdx(0);
  };

  // ---------- Questions handling ----------
  const currentQuestion = questions[questionIdx];
  const handleQuestionSelect = (optIdx: number) => {
    if (!currentQuestion) return;
    const opt = currentQuestion.options[optIdx];
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: { label: opt.label, points: opt.points, flag: opt.flag },
    }));
  };
  const handleQuestionContinue = () => {
    if (questionIdx < questions.length - 1) {
      setQuestionIdx((i) => i + 1);
    } else {
      setStage("open_text");
    }
  };
  const handleQuestionBack = () => {
    if (questionIdx === 0) {
      setStage("entry");
    } else {
      setQuestionIdx((i) => i - 1);
    }
  };

  // ---------- Closing flow ----------
  const handleClosingContinue = async () => {
    if (stage === "open_text") return setStage("honesty");
    if (stage === "honesty") return setStage("intent");

    if (stage === "intent") {
      if (!path) return;

      const r = scoreForPath(path, answers);

      const payload = {
        name: user.name,
        email: user.email,
        badge: r.badge,
        maxScore: r.maxScore,
        reason: r.reason,
        score: r.score,
      };

      try {
        const res = await fetch(`${API_URL}/api/results`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data: backendResponse = await res.json();

        const finalResult: ScoringResult = {
          ...r,
          credentialUrl: data.credentialUrl,
        };

        setResult(finalResult);

      } catch (error) {
        console.error("Error creating badge:", error);
        setResult(r); // fallback sin URL
      }

      void submitToWebhook({
        path,
        entryAnswer,
        answers,
        openText,
        honestyConfirmed: honesty,
        intent,
        result: r,
        timestamp: new Date().toISOString(),
      });

      setStage("processing");
    }
  };

  // ---------- Render ----------
  return (
    <div className="bdg-theme min-h-screen bg-bdg-background flex flex-col">
      <Header />
      <div style={{ backgroundColor: "#1a1145", height: 220 }} />
      <main className="flex-1 container max-w-2xl py-6 sm:py-10 px-4 sm:px-6">
        <div
          className="deel-container flex justify-center"
          style={{ marginTop: -224 }}
        >
          {user?.email && (
            <div
              className="bg-background rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.10)] w-full flex flex-col items-center"
              style={{ padding: "48px 40px 56px" }}
            >

              {stage === "welcome" && <WelcomeScreen onStart={() => setStage("entry")} />}

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
                      accent === "talent" ? "bg-bdg-talent" :
                        accent === "leader" ? "bg-bdg-leader" : "bg-bdg-champion"
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

              {stage === "processing" && <ProcessingScreen onDone={() => setStage("results")} />}

              {stage === "results" && result && <ResultsScreen result={result} onRestart={reset} />}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Entry uses a slightly different rendering than QuestionScreen (no points, routes path)
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
        <div className="space-y-3">
          {ENTRY_QUESTION.options.map((opt, i) => {
            const selected = opt.label === selectedLabel;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => onSelect(i)}
                className={cn(
                  "group w-full text-left rounded-2xl border-2 p-4 sm:p-5 transition-all duration-200 ease-smooth",
                  "min-h-[64px] flex items-center gap-4 hover:border-foreground/20 hover:shadow-card active:scale-[0.99]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-fade-in",
                  selected ? "border-bdg-primary bg-bdg-primary-soft text-bdg-primary shadow-card" : "border-border bg-card"
                )}
                style={{ animationDelay: `${i * 50}ms` }}
                aria-pressed={selected}
              >
                <div className={cn(
                  "flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors",
                  selected ? "border-bdg-primary bg-bdg-primary text-white" : "border-border"
                )}>
                  {selected && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>
                <span className="text-base sm:text-[17px] font-medium text-foreground/90">{opt.label}</span>
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
          className="hover:bg-bdg-minprimary/90 gap-1 h-12 px-3 text-muted-foreground "
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </Button>
        <Button
          size="lg"
          onClick={onContinue}
          disabled={!selectedLabel}
          className="bg-bdg-primary hover:bg-bdg-minprimary/90 flex-1 h-13 min-h-[52px] gap-2 text-base font-semibold rounded-xl shadow-card disabled:opacity-40"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default AppFlow;