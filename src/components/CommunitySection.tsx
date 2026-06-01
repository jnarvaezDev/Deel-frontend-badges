import { useEffect, useRef, useState } from "react";
import badgeTalent from "@/assets/badge-talent.png";
import badgeChampion from "@/assets/badge-champion.png";
import badgeLeader from "@/assets/badge-leader.png";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type CommunityStatsResponse = {
  byTier?: {
    globalTalent?: number;
    globalChampion?: number;
    globalLeader?: number;
  };
};

type BadgeStat = {
  tier: string;
  count: number;
  label: string;
  image: string;
  glow: string;
};

const baseBadgeStats: BadgeStat[] = [
  {
    tier: "Global Talent",
    count: 1200,
    label: "certified professionals",
    image: badgeTalent,
    glow: "rgba(89, 56, 183, 0.35)",
  },
  {
    tier: "Global Champion",
    count: 860,
    label: "certified professionals",
    image: badgeChampion,
    glow: "rgba(237, 94, 42, 0.35)",
  },
  {
    tier: "Global Leader",
    count: 340,
    label: "certified professionals",
    image: badgeLeader,
    glow: "rgba(168, 142, 232, 0.4)",
  },
];

function useAnimatedCounter(target: number, isActive: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isActive || startedRef.current) return;
    startedRef.current = true;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isActive, target, duration]);

  return value;
}

const BadgeCard = ({
  stat,
  index,
  isActive,
}: {
  stat: BadgeStat;
  index: number;
  isActive: boolean;
}) => {
  const count = useAnimatedCounter(stat.count, isActive);
  return (
    <div
      className="group relative bg-background rounded-2xl p-8 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] overflow-hidden"
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 20%, ${stat.glow}, transparent 60%)`,
        }}
      />
      <div className="relative z-10 flex flex-col items-center">
        <div
          className="w-40 h-40 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
          style={{ animation: `badge-float 6s ease-in-out ${index * 0.4}s infinite` }}
        >
          <img
            src={stat.image}
            alt={`${stat.tier} badge`}
            className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
          />
        </div>
        <h3 className="text-[22px] leading-7 font-bold text-foreground">{stat.tier}</h3>
        <p className="mt-3 text-[40px] leading-none font-bold tabular-nums" style={{ color: "#1b1b1b" }}>
          {count.toLocaleString("en-US")}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
      </div>
    </div>
  );
};

const CommunitySection = () => {
  const header = useScrollReveal();
  const grid = useScrollReveal();
  const [badgeStats, setBadgeStats] = useState<BadgeStat[]>(baseBadgeStats);

  useEffect(() => {
    const controller = new AbortController();

    const loadStats = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API_URL}/api/results/community-stats`, {
          signal: controller.signal,
        });

        if (!res.ok) return;

        const data: CommunityStatsResponse = await res.json();
        const byTier = data.byTier;

        if (!byTier) return;

        setBadgeStats((prev) =>
          prev.map((stat) => {
            if (stat.tier === "Global Talent") {
              return { ...stat, count: byTier.globalTalent ?? stat.count };
            }
            if (stat.tier === "Global Champion") {
              return { ...stat, count: byTier.globalChampion ?? stat.count };
            }
            if (stat.tier === "Global Leader") {
              return { ...stat, count: byTier.globalLeader ?? stat.count };
            }
            return stat;
          })
        );
      } catch {
        // keep fallback local counters if API fails
      }
    };

    void loadStats();

    return () => controller.abort();
  }, []);

  return (
    <section className="section-spacing">
      <style>{`
        @keyframes badge-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
      <div className="deel-container">
        <div
          ref={header.ref}
          className={`text-center max-w-[680px] mx-auto scroll-hidden ${header.isVisible ? "scroll-visible" : ""}`}
        >
          <h2 className="text-[28px] leading-[36px] lg:text-[40px] lg:leading-[48px] font-bold text-foreground">
            Join a growing global community
          </h2>
          <p className="mt-4 text-base leading-6 text-muted-foreground">
            Professionals around the world are earning Deel Global Badges to showcase their cross-border experience.
          </p>
        </div>

        <div
          ref={grid.ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 scroll-hidden-child ${grid.isVisible ? "scroll-visible-child" : ""}`}
        >
          {badgeStats.map((stat, i) => (
            <BadgeCard key={stat.tier} stat={stat} index={i} isActive={grid.isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
