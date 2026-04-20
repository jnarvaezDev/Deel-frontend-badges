import type { Question, PathKey } from "./types";

export const ENTRY_QUESTION = {
  id: "entry",
  prompt: "Have you ever worked for a company that operates in more than one country?",
  options: [
    { label: "No, not yet", path: "A" as PathKey },
    { label: "Yes, as part of a team", path: "B" as PathKey },
    { label: "Yes, and I manage people across countries", path: "C" as PathKey },
  ],
};

export const PATH_A: Question[] = [
  {
    id: "A1",
    prompt: "Do you work professionally in English or another internationally-used language?",
    options: [
      { label: "No", points: 0 },
      { label: "Yes, occasionally", points: 1 },
      { label: "Yes, regularly", points: 2 },
      { label: "Yes, it's my primary language", points: 3 },
    ],
  },
  {
    id: "A2",
    prompt: "Have you had meaningful international exposure in your personal or professional life?",
    options: [
      { label: "No, not yet", points: 0 },
      { label: "Travel or living abroad", points: 2 },
      { label: "Study or exchange programs", points: 2 },
      { label: "Direct professional contact", points: 3 },
    ],
  },
  {
    id: "A3",
    prompt: "A contact sends you a voice note instead of a written brief. What do you do?",
    options: [
      { label: "Ask them to resend it in writing", points: 1 },
      { label: "Listen, take notes, say nothing", points: 2 },
      { label: "Reply with a voice note as well", points: 3 },
      { label: "Transcribe it and confirm in writing", points: 3 },
    ],
  },
  {
    id: "A4",
    prompt: "You're collaborating with someone whose feedback feels indirect. After a call, you're unsure if they agreed. What do you do?",
    options: [
      { label: "Send a direct email asking for confirmation", points: 1 },
      { label: "Share a written summary asking for corrections", points: 3 },
      { label: "Ask a mutual contact for help", points: 2 },
      { label: "Accept the ambiguity and course-correct later", points: 1 },
    ],
  },
  {
    id: "A5",
    prompt: "You're working across time zones and decisions get delayed because you're rarely online together. What do you do?",
    options: [
      { label: "Establish fixed overlap hours", points: 2 },
      { label: "Send detailed written updates", points: 3 },
      { label: "Document reasoning and grant offline authority", points: 3 },
      { label: "Escalate to a manager", points: 0 },
    ],
  },
  {
    id: "A6",
    prompt: "Are you actively pursuing international work opportunities?",
    options: [
      { label: "Not currently", points: 0 },
      { label: "Open to it", points: 1 },
      { label: "Actively applying", points: 2 },
      { label: "Already in conversations", points: 3 },
    ],
  },
];

export const PATH_B: Question[] = [
  {
    id: "B1",
    prompt: "How long have you worked at an international company?",
    options: [
      { label: "Less than 6 months", points: 0, flag: "reroute_talent" },
      { label: "6–12 months", points: 1 },
      { label: "1–3 years", points: 2 },
      { label: "3+ years", points: 3 },
    ],
  },
  {
    id: "B2",
    prompt: "How would you describe your English proficiency in a work context?",
    options: [
      { label: "Basic", points: 0, flag: "fail" },
      { label: "Intermediate", points: 1 },
      { label: "Advanced", points: 2 },
      { label: "Fluent or native", points: 3 },
    ],
  },
  {
    id: "B3",
    prompt: "How many countries does your company operate in?",
    options: [
      { label: "2–3", points: 1 },
      { label: "4–6", points: 2 },
      { label: "7–15", points: 2 },
      { label: "16+", points: 3 },
    ],
  },
  {
    id: "B4",
    prompt: "Have you worked directly with colleagues from other world regions?",
    options: [
      { label: "No, same region only", points: 0, flag: "fail" },
      { label: "1 other region", points: 1 },
      { label: "2 other regions", points: 2 },
      { label: "3+ regions", points: 3 },
    ],
  },
  {
    id: "B5",
    prompt: "How familiar are you with async communication in distributed teams?",
    options: [
      { label: "Not familiar", points: 0 },
      { label: "Somewhat familiar", points: 1 },
      { label: "Familiar", points: 2 },
      { label: "Very familiar", points: 2 },
    ],
  },
];

export const PATH_C: Question[] = [
  {
    id: "C1",
    prompt: "How many direct reports do you manage in countries other than your own?",
    options: [
      { label: "None", points: 0, flag: "reroute_champion" },
      { label: "1 person", points: 0, flag: "reroute_champion" },
      { label: "2–4 people", points: 2 },
      { label: "5+ people", points: 3 },
    ],
  },
  {
    id: "C2",
    prompt: "How would you describe your team's cultural composition?",
    options: [
      { label: "Mostly one culture", points: 0 },
      { label: "2–3 nationalities", points: 1 },
      { label: "4+ nationalities", points: 2 },
      { label: "Highly diverse", points: 3 },
    ],
  },
  {
    id: "C3",
    prompt: "What's your decision-making role in global projects?",
    options: [
      { label: "I contribute only", points: 0, flag: "reroute_champion" },
      { label: "I own my area only", points: 1, flag: "reroute_champion" },
      { label: "I coordinate across countries", points: 2 },
      { label: "I lead strategy globally", points: 3 },
    ],
  },
  {
    id: "C4",
    prompt: "How many world regions have you led work in?",
    options: [
      { label: "1 region", points: 0 },
      { label: "2 regions", points: 1 },
      { label: "3 regions", points: 2 },
      { label: "4+ regions", points: 3 },
    ],
  },
];

export function getQuestionsForPath(path: PathKey): Question[] {
  if (path === "A") return PATH_A;
  if (path === "B") return PATH_B;
  return PATH_C;
}
