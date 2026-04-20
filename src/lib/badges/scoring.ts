import type { PathKey, ScoringResult } from "./types";

type Answers = Record<string, { label: string; points: number; flag?: string }>;

export function scorePathA(answers: Answers): ScoringResult {
  const total = Object.values(answers).reduce((s, a) => s + a.points, 0);
  const q1 = answers["A1"]?.points ?? 0;
  const q6 = answers["A6"]?.points ?? 0;

  if (q1 === 0 && q6 === 0) {
    return { badge: "none", score: total, maxScore: 18, reason: "hard_gate" };
  }
  if (total >= 12 && q1 >= 1 && q6 >= 1) {
    return { badge: "talent", score: total, maxScore: 18, reason: "qualified" };
  }
  if (total >= 6) {
    return { badge: "none", score: total, maxScore: 18, reason: "upgrade_path" };
  }
  return { badge: "none", score: total, maxScore: 18, reason: "below_threshold" };
}

export function scorePathB(answers: Answers): ScoringResult {
  const total = Object.values(answers).reduce((s, a) => s + a.points, 0);
  const q1 = answers["B1"];
  const q2 = answers["B2"];
  const q4 = answers["B4"];

  if (q1?.flag === "reroute_talent") {
    return {
      badge: "talent",
      score: total,
      maxScore: 14,
      reason: "rerouted",
      reroutedFrom: "B",
    };
  }
  if (q2?.flag === "fail" || q4?.flag === "fail") {
    return { badge: "none", score: total, maxScore: 14, reason: "hard_gate" };
  }
  if (total >= 9) {
    return { badge: "champion", score: total, maxScore: 14, reason: "qualified" };
  }
  if (total >= 5) {
    return { badge: "talent", score: total, maxScore: 14, reason: "qualified_lower" };
  }
  return { badge: "none", score: total, maxScore: 14, reason: "below_threshold" };
}

export function scorePathC(answers: Answers): ScoringResult {
  const total = Object.values(answers).reduce((s, a) => s + a.points, 0);
  const q1 = answers["C1"];
  const q3 = answers["C3"];
  const q1pts = q1?.points ?? 0;
  const q3pts = q3?.points ?? 0;

  if (q1pts < 2 || q3pts < 2) {
    // Reroute to Champion if they have at least some footing
    if (total >= 4) {
      return {
        badge: "champion",
        score: total,
        maxScore: 12,
        reason: "rerouted",
        reroutedFrom: "C",
      };
    }
    return {
      badge: "champion",
      score: total,
      maxScore: 12,
      reason: "rerouted",
      reroutedFrom: "C",
    };
  }
  if (total >= 8 && q1pts >= 2 && q3pts >= 2) {
    return { badge: "leader", score: total, maxScore: 12, reason: "qualified" };
  }
  if (total >= 4 && q1pts >= 2) {
    return { badge: "champion", score: total, maxScore: 12, reason: "qualified_lower" };
  }
  return { badge: "none", score: total, maxScore: 12, reason: "below_threshold" };
}

export function scoreForPath(path: PathKey, answers: Answers): ScoringResult {
  if (path === "A") return scorePathA(answers);
  if (path === "B") return scorePathB(answers);
  return scorePathC(answers);
}
