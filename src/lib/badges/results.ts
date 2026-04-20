import type { BadgeLevel } from "./types";

export interface BadgeMeta {
  name: string;
  tagline: string;
  description: string;
  skills: string[];
  upgradeTitle: string;
  upgradeSteps: string[];
  colorClass: string;
  gradientClass: string;
  shadowClass: string;
  ringClass: string;
}

export const BADGE_META: Record<Exclude<BadgeLevel, "none">, BadgeMeta> = {
  talent: {
    name: "Global Talent",
    tagline: "You are a Global Talent",
    description:
      "You have the language skills, mindset, and curiosity to thrive in international work environments. You're ready to step into your first global role.",
    skills: ["Cross-cultural communication", "International mindset", "Async-ready", "Adaptability"],
    upgradeTitle: "Path to Global Champion",
    upgradeSteps: [
      "Join a company operating in 4+ countries",
      "Collaborate weekly with colleagues across regions",
      "Build fluency in async, written-first communication",
    ],
    colorClass: "text-talent",
    gradientClass: "bg-gradient-talent",
    shadowClass: "shadow-badge-talent",
    ringClass: "ring-talent/30",
  },
  champion: {
    name: "Global Champion",
    tagline: "You are a Global Champion",
    description:
      "You operate effectively across borders, cultures and time zones. You're a trusted contributor inside a distributed organization.",
    skills: ["Distributed collaboration", "Async communication", "Cross-regional execution", "Cultural fluency"],
    upgradeTitle: "Path to Global Leader",
    upgradeSteps: [
      "Take ownership of cross-country initiatives",
      "Build and manage a multi-country team",
      "Lead strategy across 3+ world regions",
    ],
    colorClass: "text-champion",
    gradientClass: "bg-gradient-champion",
    shadowClass: "shadow-badge",
    ringClass: "ring-champion/30",
  },
  leader: {
    name: "Global Leader",
    tagline: "You are a Global Leader",
    description:
      "You design how global teams operate. You make decisions across cultures, regions and time zones — and the bar you set shapes how others work.",
    skills: ["Global team leadership", "Multi-region strategy", "Cross-cultural management", "Distributed operations"],
    upgradeTitle: "Continue your impact",
    upgradeSteps: [
      "Mentor emerging Global Champions in your network",
      "Share your global playbook with the Deel community",
      "Apply for executive global mobility programs",
    ],
    colorClass: "text-leader",
    gradientClass: "bg-gradient-leader",
    shadowClass: "shadow-badge-leader",
    ringClass: "ring-leader/30",
  },
};
