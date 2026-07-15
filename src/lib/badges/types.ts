export type PathKey = "A" | "B" | "C";
export type BadgeLevel = "talent" | "champion" | "leader" | "none";
export type AiValidationLevel = "high" | "medium" | "low";
export type EmploymentStatus = "employed" | "unemployed";

export interface AiValidationResult {
  level: AiValidationLevel;
  scoreModifier: number;
  shouldRetry: boolean;
  notes?: string;
}

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
  validation_page_url?: string;
  identification_number?: string;
  tier?: string;
  id?: number;
  rawScore?: number;
  adjustedScore?: number;
  aiValidation?: AiValidationResult;
}

export interface Intent {
  seekingOpportunities: boolean;
  hiringGlobalRoles: boolean;
  exploring: boolean;
}

export interface backendResponse {
  id?: number;
  tier?: string;
  credentialUrl?: string;
  issuedBy?: string | null;
  validation_page_url?: string;
  identification_number?: string;
  status?: "locked";
  message?: string;
  nextAvailableDate?: string;
}

export interface SubmissionPayload {
  employmentStatus: EmploymentStatus;
  path: PathKey;
  entryAnswer: string;
  answers: Record<string, { label: string; points: number }>;
  openText: string;
  honestyConfirmed: boolean;
  intent: Intent;
  result: ScoringResult;
  timestamp: string;
  aiValidation?: AiValidationResult;
}
