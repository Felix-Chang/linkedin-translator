export type TranslationMode = "plain_to_linkedin" | "linkedin_to_plain";

export type IntensityLevel =
  | "subtle"
  | "cringe"
  | "thought_leader"
  | "series_a_founder"
  | "fortune_500_keynote";

export interface TranslateRequest {
  inputText: string;
  mode: TranslationMode;
  intensity: IntensityLevel;
}

export interface TranslateResponse {
  outputText: string;
}

export const INTENSITY_LABELS: Record<IntensityLevel, string> = {
  subtle: "Subtle",
  cringe: "Cringe",
  thought_leader: "Thought Leader",
  series_a_founder: "Series A Founder",
  fortune_500_keynote: "Fortune 500 Keynote",
};

export const LOADING_MESSAGES = [
  "Leveraging synergies…",
  "Aligning stakeholders…",
  "Driving impact…",
  "Unlocking value…",
  "Syncing circles…",
  "Pivoting strategically…",
  "Scaling solutions…",
];

export const EXAMPLE_PROMPTS: Record<TranslationMode, string[]> = {
  plain_to_linkedin: [
    "I got a promotion",
    "We had a meeting about the project",
    "I learned something new today",
    "Our team finished the feature",
    "I'm looking for a new job",
  ],
  linkedin_to_plain: [
    "Excited to announce I'm joining a rocketship",
    "Humbled and grateful for this recognition",
    "Thrilled to share my thought leadership journey",
    "We're disrupting the paradigm at scale",
    "Passionate about moving the needle holistically",
  ],
};
