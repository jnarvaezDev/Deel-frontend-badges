import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  "Validating responses",
  "Checking consistency",
  "Assigning level",
];

interface ProcessingScreenProps {
  onDone: () => void;
}

export function ProcessingScreen({ onDone }: ProcessingScreenProps) {
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStepIdx(1), 700);
    const t2 = setTimeout(() => setStepIdx(2), 1400);
    const t3 = setTimeout(() => setStepIdx(3), 2000);
    const t4 = setTimeout(() => onDone(), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onDone]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-bdg-primary/20 animate-pulse-soft blur-2xl" />
        <div className="relative h-20 w-20 rounded-full bg-gradient-champion flex items-center justify-center shadow-badge">
          <Loader2 className="h-9 w-9 text-white animate-spin" strokeWidth={2.5} />
        </div>
      </div>
      <div className="space-y-3 w-full max-w-sm">
        {STEPS.map((label, i) => {
          const done = i < stepIdx;
          const active = i === stepIdx;
          return (
            <div
              key={label}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300",
                done && "border-talent/30 bg-talent/5",
                active && "border-bdg-primary/40 bg-bdg-primary-soft",
                !done && !active && "border-border bg-card opacity-50"
              )}
            >
              {done ? (
                <CheckCircle2 className="h-5 w-5 text-talent flex-shrink-0" />
              ) : active ? (
                <Loader2 className="h-5 w-5 text-bdg-primary animate-spin flex-shrink-0" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-border flex-shrink-0" />
              )}
              <span className={cn(
                "text-sm font-medium",
                done && "text-foreground",
                active && "text-foreground",
                !done && !active && "text-muted-foreground"
              )}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
