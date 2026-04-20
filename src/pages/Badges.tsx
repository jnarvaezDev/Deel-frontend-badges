import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import deelLogo from "@/assets/deel-logo.svg";
import { BadgeMedal } from "../components/badges/BadgeMedal";
import badgeTalent from "@/assets/badge-talent.png";
import badgeChampion from "@/assets/badge-champion.png";
import badgeLeader from "@/assets/badge-leader.png";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { BADGE_META } from "@/lib/badges/results";
import { ExternalLink } from "lucide-react";

const tierDisplayMap: Record<string, string> = {
  "Global Talent": badgeTalent,
  "Global Champion": badgeChampion,
  "Global Leader": badgeLeader,
};

const tierDisplayMapMeta = {
  "Global Talent": "talent",
  "Global Champion": "champion",
  "Global Leader": "leader",
} as const;

const Badges = () => {

  const [user, setUser] = useState<{
    email: string | null;
  } | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const email = params.get("email");

    setUser({
      email: email ? decodeURIComponent(email) : null,
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    if (!user.email) {
      toast.error("Please reconnect with LinkedIn to continue");
    }
  }, [user]);


  const [badges, setBadges] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchBadges = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/results/badges?email=${user.email}`
        );

        const data = await res.json();
        setBadges(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBadges();
  }, [user]);


  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Top dark section */}
      <div style={{ backgroundColor: "#1a1145", height: 220 }} />

      <div className="flex justify-center">
        <div
          className="grid gap-6"
          style={{
            justifyContent: "center", marginTop: -140
          }}
        >
          {badges.map((badge: any) => {
            const meta = BADGE_META[tierDisplayMapMeta[badge.tier]];

            return (
              <div
                key={badge.id}
                className="bg-background rounded-xl mb-10 p-6 shadow flex flex-col items-center text-center w-[450px]"
              >

                {/* Hero */}
                <div className="flex flex-col items-center text-center gap-6 pt-4">
                  <BadgeMedal level={tierDisplayMapMeta[badge.tier]} size="lg" />
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

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full">
                  <Button
                    asChild
                    size="lg"
                    className={cn("flex-2 gap-2 h-12", meta.gradientClass, "text-white border-0 hover:opacity-90 w-full")}
                  >
                    <a href={badge.vb_validation_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      View Badge
                    </a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div >
      <div style={{ height: 260 }} />
      <Footer />
    </div >
  );
};

export default Badges;
