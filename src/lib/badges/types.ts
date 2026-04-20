export type PathKey = "A" | "B" | "C";
export type BadgeLevel = "talent" | "champion" | "leader" | "none";

export interface Option {
  label: string;
  points: number;
  /** Optional flag for special routing/gating */
  flag?: "reroute_talent" | "reroute_champion" | "fail";
}

export interface Question {
  id: string;
  prompt: string;
  options: Option[];
}

export interface ScoringResult {
  badge: BadgeLevel;
  score: number;
  maxScore: number;
  reason: string;
  reroutedFrom?: PathKey;
  credentialUrl?: string;
}

export interface Intent {
  seekingOpportunities: boolean;
  hiringGlobalRoles: boolean;
  exploring: boolean;
}

export interface backendResponse {
  id: number;
  tier: string;
  credentialUrl: string;
  issuedBy: string;
}

export interface SubmissionPayload {
  path: PathKey;
  entryAnswer: string;
  answers: Record<string, { label: string; points: number }>;
  openText: string;
  honestyConfirmed: boolean;
  intent: Intent;
  result: ScoringResult;
  timestamp: string;
}