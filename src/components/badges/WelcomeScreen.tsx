import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Sparkles, Globe2, Crown } from "lucide-react";
import badgeTalent from "@/assets/badge-talent.png";
import badgeChampion from "@/assets/badge-champion.png";
import badgeLeader from "@/assets/badge-leader.png";
interface WelcomeScreenProps {
  onStart: () => void;
  isBrazilBranding?: boolean;
}

const getTierDisplayName = (tier: string, isBrazilBranding: boolean) =>
  `${tier} Certified by Deel${isBrazilBranding ? " & Nomad" : ""}`;

export function WelcomeScreen({ onStart, isBrazilBranding = false }: WelcomeScreenProps) {
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
      <div className="sm:hidden space-y-2">
        <MobileBadgeRow
          tier={getTierDisplayName("Global Talent", isBrazilBranding)}
        />
        <MobileBadgeRow
          tier={getTierDisplayName("Global Champion", isBrazilBranding)}
        />
        <MobileBadgeRow
          tier={getTierDisplayName("Global Leader", isBrazilBranding)}
        />
      </div>

      <div className="hidden sm:grid grid-cols-3 gap-4 items-start">
        <BadgePreview
          tier={getTierDisplayName("Global Talent", isBrazilBranding)}
        />
        <BadgePreview
          tier={getTierDisplayName("Global Champion", isBrazilBranding)}
        />
        <BadgePreview
          tier={getTierDisplayName("Global Leader", isBrazilBranding)}
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
  tier,
}: {
  tier: string;
}) {

  const tierImgDisplayMap: Record<string, string> = {
    "Global Talent Certified by Deel": badgeTalent,
    "Global Talent Certified by Deel & Nomad": badgeTalent,
    "Global Champion Certified by Deel": badgeChampion,
    "Global Champion Certified by Deel & Nomad": badgeChampion,
    "Global Leader Certified by Deel": badgeLeader,
    "Global Leader Certified by Deel & Nomad": badgeLeader,
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-2.5 sm:p-4 text-center space-y-2 hover:shadow-card transition-shadow min-w-0 overflow-hidden">
      <div className="mx-auto h-16 w-16 sm:h-28 sm:w-28 flex items-center justify-center overflow-hidden">
        <img
          src={tierImgDisplayMap[tier]}
          className="h-full w-full object-contain"
          alt={`${tier} badge`}
        />
      </div>
      <p className="text-[10px] sm:text-xs font-semibold text-foreground leading-tight break-words text-center">{tier}</p>
    </div>
  );
}

function MobileBadgeRow({
  tier,
}: {
  tier: string;
}) {
  const tierImgDisplayMap: Record<string, string> = {
    "Global Talent Certified by Deel": badgeTalent,
    "Global Talent Certified by Deel & Nomad": badgeTalent,
    "Global Champion Certified by Deel": badgeChampion,
    "Global Champion Certified by Deel & Nomad": badgeChampion,
    "Global Leader Certified by Deel": badgeLeader,
    "Global Leader Certified by Deel & Nomad": badgeLeader,
  };

  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2 flex items-center gap-3">
      <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center overflow-hidden">
        <img src={tierImgDisplayMap[tier]} className="h-full w-full object-contain" alt={`${tier} badge`} />
      </div>
      <p className="text-sm font-semibold text-foreground">{tier}</p>
    </div>
  );
}
