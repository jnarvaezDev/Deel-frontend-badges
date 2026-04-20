import { cn } from "@/lib/utils";
import { Award, Sparkles, Globe2, Crown } from "lucide-react";
import badgeTalent from "@/assets/badge-talent.png";
import badgeChampion from "@/assets/badge-champion.png";
import badgeLeader from "@/assets/badge-leader.png";
import type { BadgeLevel } from "@/lib/badges/types";

interface BadgeMedalProps {
  level: Exclude<BadgeLevel, "none">;
  size?: "md" | "lg";
}

const ICONS = {
  talent: Sparkles,
  champion: Globe2,
  leader: Crown,
};

const RING = {
  talent: "bg-gradient-talent shadow-badge-talent",
  champion: "bg-gradient-champion shadow-badge",
  leader: "bg-gradient-leader shadow-badge-leader",
};

const tierImgDisplayMap: Record<string, string> = {
    "talent": badgeTalent,
    "champion": badgeChampion,
    "leader": badgeLeader,
};

export function BadgeMedal({ level, size = "lg" }: BadgeMedalProps) {
  const dim = size === "lg" ? "h-40 w-40 sm:h-48 sm:w-48" : "h-24 w-24";
  const iconSize = size === "lg" ? "h-16 w-16" : "h-10 w-10";

  return (
    <div className="relative inline-flex items-center justify-center animate-badge-in">
      {/* Glow */}
      <div className={cn("absolute inset-0 rounded-full blur-2xl opacity-50", RING[level])} />
      {/* Outer ring */}
      <div className={cn(dim, "relative rounded-full p-1.5", RING[level])}>
        <div className="h-full w-full rounded-full bg-white flex items-center justify-center relative overflow-hidden">
          {/* Inner gradient subtle */}
          <div className={cn("absolute inset-3 rounded-full opacity-10", RING[level])} />
          <img src={tierImgDisplayMap[level]} className="w-[150px]" />
        </div>
      </div>
      {/* Badge label chip */}
      <div className={cn(
        "absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white whitespace-nowrap",
        RING[level]
      )}>
        <Award className="h-3 w-3 inline -mt-0.5 mr-1" />
        Verified
      </div>
    </div>
  );
}
