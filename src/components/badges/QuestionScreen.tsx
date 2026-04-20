import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./ProgressBar";
import { OptionCard } from "./OptionCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Question, BadgeLevel } from "@/lib/badges/types";

interface QuestionScreenProps {
  question: Question;
  step: number;
  total: number;
  selectedLabel?: string;
  onSelect: (optionIndex: number) => void;
  onContinue: () => void;
  onBack?: () => void;
  accentLevel?: Exclude<BadgeLevel, "none">;
  autoAdvance?: boolean;
}

const ACCENT_BG = {
  talent: "bg-talent",
  champion: "bg-champion",
  leader: "bg-leader",
};

const ACCENT_BORDER = {
  talent: "border-talent bg-talent/5 text-talent",
  champion: "border-champion bg-champion/5 text-champion",
  leader: "border-leader bg-leader/5 text-leader",
};

export function QuestionScreen({
  question,
  step,
  total,
  selectedLabel,
  onSelect,
  onContinue,
  onBack,
  accentLevel = "champion",
  autoAdvance = false,
}: QuestionScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animKey, setAnimKey] = useState(question.id);

  useEffect(() => {
    setAnimKey(question.id);
  }, [question.id]);

  const handleSelect = (i: number) => {
    onSelect(i);
    if (autoAdvance) {
      setTimeout(() => onContinue(), 400);
    }
  };

  const selectedIdx = question.options.findIndex((o) => o.label === selectedLabel);

  return (
    <div className="bdg-theme space-y-8" ref={containerRef}>
      <ProgressBar current={step} total={total} accentClass={ACCENT_BG[accentLevel]} />

      <div key={animKey} className="space-y-6 animate-slide-in-right">
        <div className="space-y-2.5">
          <p className={cn(
            "text-xs font-semibold uppercase tracking-wider",
            accentLevel === "talent" && "text-talent",
            accentLevel === "champion" && "text-champion",
            accentLevel === "leader" && "text-leader",
          )}>
            Question {step} of {total}
          </p>
          <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-navy leading-tight">
            {question.prompt}
          </h2>
        </div>

        <div className="space-y-3">
          {question.options.map((opt, i) => (
            <OptionCard
              key={opt.label}
              label={opt.label}
              selected={i === selectedIdx}
              onSelect={() => handleSelect(i)}
              accentClass={ACCENT_BORDER[accentLevel]}
              index={i}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        {onBack && (
          <Button
            variant="ghost"
            size="lg"
            onClick={onBack}
            className="hover:bg-bdg-minprimary/90 gap-1 h-12 px-3 text-muted-foreground "
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        )}
        <Button
          size="lg"
          onClick={onContinue}
          disabled={selectedIdx === -1}
          className={cn(
            "bg-bdg-primary hover:bg-bdg-minprimary/90  flex-1 h-13 min-h-[52px] gap-2 text-base font-semibold rounded-xl shadow-card disabled:opacity-40",
            ACCENT_BG[accentLevel], "text-white border-0 hover:opacity-90"
          )}
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
