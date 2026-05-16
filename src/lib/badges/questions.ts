import type { Question, PathKey } from "./types";

export const ENTRY_QUESTION = {
  id: "entry",
  prompt: "Have you ever worked for a company that operates in more than one country?",
  options: [
    { label: "No, not yet", path: "A" as PathKey },
    { label: "Yes, as part of a team", path: "B" as PathKey },
    { label: "Yes, and I manage(d) people across countries", path: "C" as PathKey }
  ],
};

export const PATH_A: Question[] = [
  {
    id: "A1",
    prompt:
      "When you try something for the first time: a new tool, process, or way of working, what best describes your approach?",
    options: [
      { label: "I dive in, make mistakes, and adjust as I learn", points: 3 },
      { label: "I research it first and then try it step by step", points: 2 },
      { label: "I prefer to wait until someone can show me how before starting", points: 1 },
    ],
  },
  {
    id: "A2",
    prompt:
      "When you need to explain something to someone who has a very different background or level of knowledge than you, what do you usually do?",
    options: [
      {
        label:
          "I adjust how I communicate based on what I notice about how they receive information",
        points: 3,
      },
      { label: "I try to use simple language and check if they understood", points: 2 },
      {
        label:
          "I explain it the way I normally would and assume they will ask if something is unclear",
        points: 1,
      },
    ],
  },
  {
    id: "A3",
    prompt:
      "When you are given a task with no clear instructions or precedent at your company, what do you do?",
    options: [
      {
        label:
          "I define my own approach, share my reasoning with relevant people, and move forward",
        points: 3,
      },
      {
        label: "I look for similar examples elsewhere and adapt them to the situation",
        points: 2,
      },
      {
        label: "I wait for clearer direction before investing significant effort",
        points: 1,
      },
    ],
  },
  {
    id: "A4",
    prompt:
      "When a colleague or collaborator repeatedly does things differently from how you would, how do you typically respond?",
    options: [
      {
        label:
          "I get curious about why they do it that way, it often changes how I see the situation",
        points: 3,
      },
      {
        label: "I focus on the outcome and work around the difference",
        points: 2,
      },
      {
        label:
          "I find it frustrating and prefer to work with people who have a similar style",
        points: 1,
      },
    ],
  },
  {
    id: "A5",
    prompt:
      "When you picture your career in five years, what role does working with people from other countries or cultures play?",
    options: [
      {
        label:
          "It is central, I actively want to build that experience and exposure",
        points: 3,
      },
      {
        label:
          "It appeals to me and I would embrace it if the opportunity came up",
        points: 2,
      },
      {
        label:
          "It is not something I have thought much about or feel strongly drawn to",
        points: 1,
      },
    ],
  },
];

export const PATH_B: Question[] = [
  {
    id: "B1",
    prompt: "How long have you worked (or did you work) at an international company?",
    options: [
      { label: "Less than 6 months", points: 0, flag: "reroute_talent" },
      { label: "6 to 12 months", points: 1 },
      { label: "1 to 2 years", points: 2 },
      { label: "More than 2 years", points: 3 },
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
    prompt: "In your international experience, in how many countries was your company in?",
    options: [
      { label: "2", points: 0 },
      { label: "3 to 5", points: 1 },
      { label: "5 to 15", points: 2 },
      { label: "16 or more", points: 3 },
    ],
  },
  {
    id: "B4",
    prompt: "How many continents have you worked with professionally?",
    options: [
      { label: "1 continent", points: 1 },
      { label: "2 continents", points: 2 },
      { label: "3 continents or more", points: 3 },
    ],
  },
  {
    id: "B5",
    prompt:
      "When you need to deliver work (a report, a campaign, an analysis) that will be used in a market you are not from, how do you approach it?",
    options: [
      {
        label:
          "I actively seek input from someone local before finalizing, even if it means an extra step",
        points: 3,
      },
      {
        label:
          "I research the market context and flag any assumptions I am making that may not apply locally",
        points: 2,
      },
      {
        label:
          "I deliver the work to the best of my ability and wait for local feedback before adjusting",
        points: 1,
      },
    ],
  }
];

export const PATH_C: Question[] = [
  {
    id: "C1",
    prompt: "How many direct reports do(did) you manage in countries other than your own?",
    options: [
      { label: "None", points: 0, flag: "reroute_champion" },
      { label: "1 person", points: 1, flag: "reroute_champion" },
      { label: "2–4 people", points: 2 },
      { label: "5+ people", points: 3 },
    ],
  },
  {
    id: "C2",
    prompt:
      "How would you describe your direct experience managing or working within internationally distributed teams?",
    options: [
      {
        label:
          "My team operated across multiple countries and I actively adapted my leadership or collaboration style to different cultural contexts",
        points: 3,
      },
      {
        label:
          "My team included people from different nationalities and I occasionally adjusted how I communicated or made decisions",
        points: 2,
      },
      {
        label:
          "My team was mostly based in one location or culture, with limited international interaction",
        points: 1,
      },
    ],
  },
  {
    id: "C3",
    prompt: "What best describes your decision-making role in global projects?",
    options: [
      { label: "Contribute only", points: 0, flag: "reroute_champion" },
      { label: "Own decisions for my area only", points: 1, flag: "reroute_champion" },
      { label: "Coordinate across teams", points: 2 },
      { label: "Lead strategy across geographies", points: 3 },
    ],
  },
  {
    id: "C4",
    prompt: "How many continents have you led work in?",
    options: [
      { label: "1 continent", points: 1 },
      { label: "2 continents", points: 2 },
      { label: "3 continents or more", points: 3 },
    ],
  },
];

export function getQuestionsForPath(path: PathKey): Question[] {
  if (path === "A") return PATH_A;
  if (path === "B") return PATH_B;
  return PATH_C;
}
