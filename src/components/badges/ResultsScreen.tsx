import { Button } from "@/components/ui/button";
import { BadgeMedal } from "./BadgeMedal";
import { BADGE_META } from "@/lib/badges/results";
import type { ScoringResult, backendResponse } from "@/lib/badges/types";
import { ExternalLink, Download, ArrowRight, RotateCcw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultsScreenProps {
  result: ScoringResult;
  onRestart: () => void;
}

export function ResultsScreen({ result, onRestart }: ResultsScreenProps) {

  if (result.badge === "none") {
    return (
      <div className="max-w-xl mx-auto text-center space-y-6 animate-fade-in py-8">
        <div className="inline-flex h-16 w-16 rounded-full bg-muted items-center justify-center">
          <AlertCircle className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-navy">
            Not eligible — yet
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto">
            {result.reason === "upgrade_path"
              ? "You're close. Build a bit more international exposure and come back — you'll likely qualify for a Global Talent badge."
              : "Based on your responses, you don't currently meet the minimum criteria for a Deel Global Badge. International work experience opens this up."}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 text-left space-y-3">
          <h3 className="font-semibold text-navy">How to qualify next time</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><ArrowRight className="h-4 w-4 mt-0.5 text-bdg-primary flex-shrink-0" />Develop working proficiency in an internationally-used language</li>
            <li className="flex gap-2"><ArrowRight className="h-4 w-4 mt-0.5 text-bdg-primary flex-shrink-0" />Pursue international roles, exchange programs or remote-global teams</li>
            <li className="flex gap-2"><ArrowRight className="h-4 w-4 mt-0.5 text-bdg-primary flex-shrink-0" />Build experience collaborating async across regions</li>
          </ul>
        </div>
        <Button variant="outline" onClick={onRestart} className="gap-2">
          <RotateCcw className="h-4 w-4" /> Start over
        </Button>
      </div>
    );
  }

  const meta = BADGE_META[result.badge];

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in py-4">
      {/* Reroute notice */}
      {result.reroutedFrom && (
        <div className="rounded-xl bg-accent border border-accent/50 px-4 py-3 text-sm text-accent-foreground text-center">
          Based on your responses, the <strong>{meta.name}</strong> badge is the best fit for your profile right now.
        </div>
      )}

      {/* Hero */}
      <div className="flex flex-col items-center text-center gap-6 pt-4">
        <BadgeMedal level={result.badge} size="lg" />
        <div className="space-y-3 pt-4">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Deel Global Badge</p>
          <h1 className={cn("text-3xl sm:text-4xl font-bold tracking-tight text-navy")}>
            {meta.tagline}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl">
            {meta.description}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap justify-center gap-2">
        {meta.skills.map((s) => (
          <span
            key={s}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium border",
              {
                "bg-talent/10 text-talent border-talent/20": result.badge === "talent",
                "bg-champion/10 text-champion border-champion/20": result.badge === "champion",
                "bg-leader/10 text-leader border-leader/20": result.badge === "leader",
              }
            )}
          >
            {s}
          </span>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          asChild
          size="lg"
          className={cn("flex-1 gap-2 h-12", meta.gradientClass, "text-white border-0 hover:opacity-90")}
        >
          <a href={result.credentialUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            View Badge
          </a>
        </Button>
      </div>
      

      {/* Upgrade path */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", meta.gradientClass)}>
            <ArrowRight className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-semibold text-navy">{meta.upgradeTitle}</h3>
        </div>
        <ul className="space-y-2.5">
          {meta.upgradeSteps.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm">
              <span className={cn(
                "flex-shrink-0 h-5 w-5 rounded-full text-[11px] font-bold flex items-center justify-center text-white",
                meta.gradientClass
              )}>
                {i + 1}
              </span>
              <span className="text-foreground/80 leading-relaxed pt-0.5">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <button onClick={onRestart} className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors">
          <RotateCcw className="h-3.5 w-3.5" /> Take the assessment again
        </button>
      </div>
    </div>
  );
}
