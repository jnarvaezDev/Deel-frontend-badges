import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Award, Loader2, AlertCircle, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { BadgeMedal } from "../components/badges/BadgeMedal";
import { isBrazilCountry, USER_COUNTRY_STORAGE_KEY } from "@/lib/branding";

interface BadgeRecord {
  id: number;
  name: string;
  email: string;
  current_country?: string | null;
  score: number;
  tier: string;
  vb_validation_url: string;
  created_at: string;
}

interface BadgesResponse {
  count: number;
  data: BadgeRecord[];
}

const TIER_STYLES: Record<string, { bg: string; text: string; gradient: string }> = {
  "Global Talent": { bg: "bg-talent/10", text: "text-talent", gradient: "bg-gradient-talent" },
  "Global Champion": { bg: "bg-champion/10", text: "text-champion", gradient: "bg-gradient-champion" },
  "Global Leader": { bg: "bg-leader/10", text: "text-leader", gradient: "bg-gradient-leader" },
};

const tierDisplayMapMeta = {
  "Global Talent": "talent",
  "Global Champion": "champion",
  "Global Leader": "leader",
} as const;

const TIER_DESCRIPTIONS: Record<string, string> = {
  "Global Leader":
    "Construyendo las bases del trabajo internacional. Reconocido por experiencia global en etapa inicial, trabajando entre fronteras y culturas.",
  "Global Talent":
    "Experiencia verificada trabajando y operando en múltiples países. Un profesional con capacidades comprobadas para desenvolverse en entornos internacionales.",
  "Global Champion":
    "Reconocido por liderar equipos e impulsar operaciones a través de diferentes países y zonas horarias. Un líder global certificado sin fronteras.",
};

function getTierStyle(tier: string) {
  return TIER_STYLES[tier] ?? { bg: "bg-primary/10", text: "text-primary", gradient: "bg-primary" };
}

function getTierDisplayName(tier: string, isBrazilBranding: boolean) {
  return `${tier} | Certified by Deel${isBrazilBranding ? " & Nomad" : ""}`;
}

export default function Badges() {
  const [email, setEmail] = useState(() => localStorage.getItem("user_email") ?? "");
  const [emailInput, setEmailInput] = useState("");
  const [badges, setBadges] = useState<BadgeRecord[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isBrazilBranding, setIsBrazilBranding] = useState(false);

  const fetchBadges = useCallback(async (userEmail: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/results/badges?email=${encodeURIComponent(userEmail)}`
      );
      if (!res.ok) throw new Error("Failed to fetch badges");
      const json: BadgesResponse = await res.json();
      setBadges(json.data);

      const latestCountry = json.data?.[0]?.current_country ?? "";
      setIsBrazilBranding(isBrazilCountry(latestCountry));

      if (latestCountry) {
        localStorage.setItem(USER_COUNTRY_STORAGE_KEY, latestCountry);
      } else {
        localStorage.removeItem(USER_COUNTRY_STORAGE_KEY);
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Something went wrong";
      setError(message);
      setIsBrazilBranding(false);
      localStorage.removeItem(USER_COUNTRY_STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (email) fetchBadges(email);
  }, [email, fetchBadges]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = emailInput.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return;

    localStorage.setItem("user_email", trimmed);
    setIsBrazilBranding(false);
    localStorage.removeItem(USER_COUNTRY_STORAGE_KEY);
    setEmail(trimmed);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isBrazilBranding={isBrazilBranding} />
      <div style={{ backgroundColor: "#1a1145", height: 220 }} />

      <main className="container max-w-3xl py-8 px-4 space-y-6 min-h-screen" style={{
            marginTop: -140
          }}>
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">My Badges</h1>
          <p className="text-white text-sm">View your earned Deel Global Badges.</p>
        </div>

        {!email ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Enter your email to view badges</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit">View Badges</Button>
              </form>
            </CardContent>
          </Card>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-sm">Loading your badges…</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-destructive">
            <AlertCircle className="h-8 w-8" />
            <p className="text-sm">{error}</p>
            <Button variant="outline" size="sm" onClick={() => fetchBadges(email)}>
              Retry
            </Button>
          </div>
        ) : badges && badges.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
            <Inbox className="h-8 w-8" />
            <p className="text-sm text-center">No badges found for <strong>{email}</strong>.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                localStorage.removeItem("user_email");
                setIsBrazilBranding(false);
                setEmail("");
                setBadges(null);
              }}
            >
              Try another email
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {badges?.map((b) => {
              const style = getTierStyle(b.tier);
              return (
                <Card key={b.id} className="overflow-hidden">
                  <CardContent className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className={cn("w-[150px] h-[150px] rounded-xl flex items-center justify-center flex-shrink-0", style.gradient)}>
                      <BadgeMedal level={tierDisplayMapMeta[b.tier]} size="md"  />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-navy">{b.name}</h3>
                        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold", style.bg, style.text)}>
                          {getTierDisplayName(b.tier, isBrazilBranding)}
                        </span>
                      </div>
                      {TIER_DESCRIPTIONS[b.tier] && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {TIER_DESCRIPTIONS[b.tier]}
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>Score: {b.score}</span>
                        <span>·</span>
                        <span>{new Date(b.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                      </div>
                    </div>
                    <Button asChild size="sm" className={cn("gap-1.5", style.gradient, "text-white border-0 hover:opacity-90")}>
                      <a href={b.vb_validation_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5" />
                        View Badge
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
            <div className="text-center pt-2">
              <button
                onClick={() => {
                  localStorage.removeItem("user_email");
                  setIsBrazilBranding(false);
                  setEmail("");
                  setBadges(null);
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Switch email
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer isBrazilBranding={isBrazilBranding} />
    </div>
  );
}
