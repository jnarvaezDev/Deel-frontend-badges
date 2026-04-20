import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Briefcase, Compass, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Intent } from "@/lib/badges/types";

interface ClosingScreensProps {
  step: "open_text" | "honesty" | "intent";
  openText: string;
  setOpenText: (v: string) => void;
  honesty: boolean;
  setHonesty: (v: boolean) => void;
  intent: Intent;
  setIntent: (v: Intent) => void;
  onContinue: () => void;
}

export function ClosingScreen(props: ClosingScreensProps) {
  const { step, openText, setOpenText, honesty, setHonesty, intent, setIntent, onContinue } = props;

  const [isClicked, setIsClicked] = useState(false);

  if (step === "open_text") {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-bdg-primary">Almost done</p>
          <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-navy leading-tight">
            Tell us about your international experience
          </h2>
          <p className="text-muted-foreground text-[15px]">
            One or two sentences. We use this to verify consistency with your earlier answers.
          </p>
        </div>
        <Textarea
          value={openText}
          onChange={(e) => setOpenText(e.target.value)}
          placeholder="e.g. I lead a 6-person product team distributed across Brazil, Spain and India, coordinating async with weekly overlap windows."
          rows={5}
          className="resize-none text-base p-4 rounded-2xl border-2 focus-visible:ring-2 focus-visible:ring-bdg-primary/30"
          maxLength={600}
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground tabular-nums">{openText.length}/600</span>
        </div>
        <ContinueButton disabled={openText.trim().length < 20} onClick={onContinue} />
      </div>
    );
  }

  if (step === "honesty") {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-bdg-primary">Honesty check</p>
          <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-navy leading-tight">
            One last thing
          </h2>
          <p className="text-muted-foreground text-[15px]">
            Deel Global Badges represent verified credentials. Please confirm your responses are accurate.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setHonesty(!honesty)}
          className={cn(
            "w-full rounded-2xl border-2 p-5 text-left flex gap-4 items-start transition-all",
            honesty ? "border-bdg-primary bg-bdg-primary-soft" : "border-border bg-card hover:border-foreground/20"
          )}
        >
          <Checkbox checked={honesty} onCheckedChange={(v) => setHonesty(!!v)} className="mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-foreground">I stand by the truth of these answers</p>
            <p className="text-sm text-muted-foreground">
              I understand that misrepresentation may result in revocation of my badge.
            </p>
          </div>
        </button>
        <ContinueButton disabled={!honesty} onClick={onContinue} />
      </div>
    );
  }

  // intent
  const intentOptions = [
    {
      key: "seekingOpportunities" as const,
      icon: Briefcase,
      title: "I'd like international job opportunities matching my profile",
      desc: "Get matched with global roles based on your badge",
    },
    {
      key: "hiringGlobalRoles" as const,
      icon: Users,
      title: "I'm currently hiring for global roles",
      desc: "Connect with Deel to scale your global team",
    },
    {
      key: "exploring" as const,
      icon: Compass,
      title: "Just exploring — no action needed",
      desc: "We'll keep you posted on relevant updates only",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-bdg-primary">Optional</p>
        <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-navy leading-tight">
          What's your intent?
        </h2>
        <p className="text-muted-foreground text-[15px]">
          Select any that apply. Helps us send the right opportunities — never spam.
        </p>
      </div>
      <div className="space-y-3">
        {intentOptions.map((opt) => {
          const checked = intent[opt.key];
          const Icon = opt.icon;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => setIntent({ ...intent, [opt.key]: !checked })}
              className={cn(
                "w-full rounded-2xl border-2 p-4 text-left flex gap-4 items-start transition-all",
                checked ? "border-bdg-primary bg-bdg-primary-soft" : "border-border bg-card hover:border-foreground/20"
              )}
            >
              <div className={cn(
                "flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center",
                checked ? "bg-bdg-primary text-bdg-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="space-y-0.5 flex-1">
                <p className="font-semibold text-foreground text-[15px] leading-snug">{opt.title}</p>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
              </div>
              <Checkbox checked={checked} onCheckedChange={(v) => setIntent({ ...intent, [opt.key]: !!v })} className="mt-1" />
            </button>
          );
        })}
      </div>
      <ContinueButton disabled={isClicked} onClick={() => { onContinue(); setIsClicked(true); }} label={isClicked ? "Loading..." : "See my badge"}  />
    </div>
  );
}

function ContinueButton({ disabled, onClick, label = "Continue" }: { disabled: boolean; onClick: () => void; label?: string }) {
  return (
    <Button
      size="lg"
      onClick={onClick}
      disabled={disabled}
      className="bg-bdg-primary hover:bg-bdg-primary/90 w-full h-13 min-h-[52px] gap-2 text-base font-semibold rounded-xl shadow-card disabled:opacity-40"
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </Button>
  );
}
