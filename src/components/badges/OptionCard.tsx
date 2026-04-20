import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface OptionCardProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  accentClass?: string;
  index: number;
}

export function OptionCard({ label, selected, onSelect, accentClass = "border-bdg-primary bg-bdg-primary-soft", index }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group w-full text-left rounded-2xl border-2 p-4 sm:p-5 transition-all duration-200 ease-smooth",
        "min-h-[64px] flex items-center gap-4",
        "hover:border-foreground/20 hover:shadow-card active:scale-[0.99]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        selected
          ? cn("shadow-card", accentClass)
          : "border-border bg-card",
        "animate-fade-in"
      )}
      style={{ animationDelay: `${index * 40}ms` }}
      aria-pressed={selected}
    >
      <div
        className={cn(
          "flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors",
          selected ? "border-current bg-current text-white" : "border-border"
        )}
      >
        {selected && <Check className="h-4 w-4" strokeWidth={3} />}
      </div>
      <span className={cn("text-base sm:text-[17px] font-medium leading-snug", selected ? "text-foreground" : "text-foreground/85")}>
        {label}
      </span>
    </button>
  );
}
