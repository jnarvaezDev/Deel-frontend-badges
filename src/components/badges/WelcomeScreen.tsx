import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Sparkles, Globe2, Crown } from "lucide-react";
import badgeTalent from "@/assets/badge-talent.png";
import badgeChampion from "@/assets/badge-champion.png";
import badgeLeader from "@/assets/badge-leader.png";
interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="bdg-theme space-y-10 animate-fade-in py-4">
      {/* Hero */}
      <div className="text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bdg-primary-soft border border-primary/20">
          <span className="h-1.5 w-1.5 rounded-full bg-bdg-primary" />
          <span className="text-xs font-semibold text-bdg-primary uppercase tracking-wider">
            Verified credential
          </span>
        </div>
        <h1 className="text-[25px] sm:text-4xl font-bold tracking-tight text-navy leading-[1.05]">
          Get certified for your
          <br />
          <span className="text-bdg-primary">global work experience</span>
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
          Take a short assessment. Receive a verified Deel Global Badge you can share on LinkedIn and use to unlock international opportunities.
        </p>
      </div>

      {/* Badges preview */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <BadgePreview
          name="Talent"
          gradientClass="bg-gradient-talent"
          tier="Global Talent"
        />
        <BadgePreview
          name="Champion"
          gradientClass="bg-gradient-champion"
          tier="Global Champion"
        />
        <BadgePreview
          name="Leader"
          gradientClass="bg-gradient-leader"
          tier="Global Leader"
        />
      </div>

      {/* Trust */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 flex gap-3 items-start">
        <ShieldCheck className="h-5 w-5 text-talent flex-shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground leading-relaxed">
          Your responses are validated for consistency and stored securely. Takes about <strong className="text-foreground">3 minutes</strong>.
        </div>
      </div>

      {/* CTA */}
      <Button
        size="lg"
        onClick={onStart}
        className="bg-bdg-primary hover:bg-bdg-primary/90 w-full h-14 text-base font-semibold gap-2 rounded-xl shadow-elevated"
      >
        Start the assessment
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

function BadgePreview({
  name,
  gradientClass,
  tier,
}: {
  name: string;
  gradientClass: string;
  tier: string;
}) {

  const tierImgDisplayMap: Record<string, string> = {
    "Global Talent": badgeTalent,
    "Global Champion": badgeChampion,
    "Global Leader": badgeLeader,
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-3 sm:p-4 text-center space-y-2 hover:shadow-card transition-shadow">
      <div className={`mx-auto h-24 w-24 sm:h-28 sm:w-28 rounded-full ${gradientClass} p-1`}>
        <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
          <img src={tierImgDisplayMap[tier]} className="w-[100px]" />
        </div>
      </div>
      <p className="text-xs font-semibold text-foreground">Global {name}</p>
    </div>
  );
}
