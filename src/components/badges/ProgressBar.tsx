import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  accentClass?: string;
}

export function ProgressBar({ current, total, accentClass = "bg-bdg-primary" }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (current / total) * 100));
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 text-xs font-medium text-muted-foreground">
        <span className="tabular-nums">
          Step {current} of {total}
        </span>
        <span className="tabular-nums">{Math.round(pct)}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-smooth", accentClass)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
