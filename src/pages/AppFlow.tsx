import { useMemo, useState } from "react";
import { questions } from "../data/questions";

type AnswersMap = {
  [questionId: number]: string;
};

type ResultData = {
  id: number;
  score: number;
  tier: string;
  credentialUrl?: string | null;
  issuedBy?: string;
};


const AppFlow = () => {

  const [answers, setAnswers] = useState<AnswersMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<ResultData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const params = new URLSearchParams(window.location.search);

  const APP_URL = import.meta.env.VITE_APP_URL;

  const tierDisplayMap: Record<string, string> = {
    "Global Potential": "Global Potential 🌱",
    "Global Talent": "Global Talent ⭐",
    "Global Leader": "Global Leader 🚀",
    "Global Champion": "Global Champion 🏆",
  };

  const user = {
    name: params.get("name"),
    email: params.get("email"),
  };

  const answeredCount = useMemo(
    () => Object.keys(answers).length,
    [answers]
  );

  const handleSelect = (questionId: number, optionLabel: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionLabel,
    }));
  };

  const handleSubmit = async () => {
    if (answeredCount < questions.length) {
      alert("Please answer all questions");
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        answers: questions.map((question) => ({
          questionId: question.id,
          optionLabel: answers[question.id],
        })),
        name: user.name,
        email: user.email,
      };

      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/api/results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to calculate result");
      }

      const data: ResultData = await response.json();
      setResult(data);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("There was an error calculating your result");
    } finally {
      setIsLoading(false);
    }
  };


  if (submitted && result) {
    console.log(result);
    return (
      <div className="section-spacing bg-deel-gray-bg min-h-screen flex items-center">
        <div className="deel-container max-w-xl mx-auto text-center">
          <div className="bg-background rounded-2xl p-10 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h1 className="text-3xl font-bold mb-4">Your Result</h1>
            <p className="text-muted-foreground mb-6">
              Based on your answers, your global experience level is:
            </p>

            <h2 className="text-2xl font-bold mb-2">{tierDisplayMap[result.tier]}</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Score: {result.score}
            </p>

            <p className="text-muted-foreground mb-6">
              Add your certification to LinkedIn to showcase your global experience.
            </p>
            
            {result?.credentialUrl ? (
              <a
                href={result.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full h-[48px] rounded-full bg-primary text-primary-foreground font-semibold"
              >
                Access your badge
              </a>
            ) : (
              <button
                disabled
                className="w-full h-[48px] rounded-full bg-muted text-muted-foreground font-semibold"
              >
                Credential pending
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-spacing bg-deel-gray-bg min-h-screen">
      <div className="deel-container max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">Global Experience Assessment</h1>
          <p className="text-muted-foreground mt-2">
            Answer a few questions to get your certification
          </p>
          <p className="text-sm text-muted-foreground mt-3">
            {answeredCount} / {questions.length} answered
          </p>
        </div>

        <div className="bg-background rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] space-y-8">
          {questions.map((q) => (
            <div key={q.id}>
              <h3 className="text-lg  mb-4">{q.text}</h3>

              <div className="grid gap-3">
                {q.options.map((opt) => {
                  const isSelected = answers[q.id] === opt.label;

                  return (
                    <button
                      key={opt.label}
                      onClick={() => handleSelect(q.id, opt.label)}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${isSelected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:bg-muted"
                        }`}
                    >
                      <span className="font-semibold mr-2">{opt.label}.</span>
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full h-[48px] rounded-full bg-primary text-primary-foreground font-semibold mt-4 disabled:opacity-60"
          >
            {isLoading ? "Calculating..." : "Get my result"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppFlow;