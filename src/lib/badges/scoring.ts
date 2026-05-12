import type { PathKey, ScoringResult } from "./types";

type Answers = Record<string, { label: string; points: number; flag?: string }>;

function applyScoreModifier(
  score: number,
  modifier: number
) {
  return Math.round(score * modifier);
}

export function scorePathA(answers: Answers): ScoringResult {
  const total = Object.values(answers).reduce((s, a) => s + a.points, 0);

  if (total >= 10) {
    return {
      badge: "talent",
      score: total,
      maxScore: 15,
      reason: "qualified",
    };
  }

  if (total >= 6) {
    return {
      badge: "none",
      score: total,
      maxScore: 15,
      reason: "upgrade_path",
    };
  }

  return {
    badge: "none",
    score: total,
    maxScore: 15,
    reason: "below_threshold",
  };
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
      maxScore: 15,
      reason: "rerouted",
      reroutedFrom: "B",
    };
  }

  if (q2?.flag === "fail" || q4?.flag === "fail") {
    return { badge: "none", score: total, maxScore: 15, reason: "hard_gate" };
  }

  if (total >= 10) {
    return { badge: "champion", score: total, maxScore: 15, reason: "qualified" };
  }

  if (total >= 6) {
    return { badge: "talent", score: total, maxScore: 15, reason: "qualified_lower" };
  }

  return { badge: "none", score: total, maxScore: 15, reason: "below_threshold" };
}

export function scorePathC(answers: Answers): ScoringResult {
  const total = Object.values(answers).reduce((s, a) => s + a.points, 0);
  const q1pts = answers["C1"]?.points ?? 0;
  const q3pts = answers["C3"]?.points ?? 0;

  if (q1pts < 2 || q3pts < 2) {
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

import type { AiValidationLevel } from "./types";

export function applyAiPenalty(score: number, level: AiValidationLevel): number {
  if (level === "high") return score;
  if (level === "medium") return Math.round(score * 0.9);
  return Math.round(score * 0.8);
}

export function scoreForPathWithAdjustedScore(
  path: PathKey,
  answers: Answers,
  adjustedScore: number
): ScoringResult {

  if (path === "A") {
    if (adjustedScore >= 10) {
      return {
        badge: "talent",
        score: adjustedScore,
        maxScore: 15,
        reason: "qualified",
      };
    }

    if (adjustedScore >= 6) {
      return {
        badge: "none",
        score: adjustedScore,
        maxScore: 15,
        reason: "upgrade_path",
      };
    }

    return {
      badge: "none",
      score: adjustedScore,
      maxScore: 15,
      reason: "below_threshold",
    };
  }

  if (path === "B") {
    const q1 = answers["B1"];
    const q2 = answers["B2"];
    const q4 = answers["B4"];

    if (q1?.flag === "reroute_talent") {
      return {
        badge: "talent",
        score: adjustedScore,
        maxScore: 15,
        reason: "rerouted",
      };
    }

    if (q2?.flag === "fail" || q4?.flag === "fail") {
      return {
        badge: "none",
        score: adjustedScore,
        maxScore: 15,
        reason: "hard_gate",
      };
    }

    if (adjustedScore >= 10) {
      return {
        badge: "champion",
        score: adjustedScore,
        maxScore: 15,
        reason: "qualified",
      };
    }

    if (adjustedScore >= 6) {
      return {
        badge: "talent",
        score: adjustedScore,
        maxScore: 15,
        reason: "qualified_lower",
      };
    }

    return {
      badge: "none",
      score: adjustedScore,
      maxScore: 15,
      reason: "below_threshold",
    };
  }

  // PATH C

  const q1pts = answers["C1"]?.points ?? 0;
  const q3pts = answers["C3"]?.points ?? 0;

  if (q1pts < 2 || q3pts < 2) {
    return {
      badge: "champion",
      score: adjustedScore,
      maxScore: 12,
      reason: "rerouted",
    };
  }

  if (adjustedScore >= 8) {
    return {
      badge: "leader",
      score: adjustedScore,
      maxScore: 12,
      reason: "qualified",
    };
  }

  if (adjustedScore >= 4) {
    return {
      badge: "champion",
      score: adjustedScore,
      maxScore: 12,
      reason: "qualified_lower",
    };
  }

  return {
    badge: "none",
    score: adjustedScore,
    maxScore: 12,
    reason: "below_threshold",
  };
}
