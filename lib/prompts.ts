import { TranslationMode, IntensityLevel } from "./types";

const INTENSITY_INSTRUCTIONS: Record<IntensityLevel, string> = {
  subtle:
    "Add subtle corporate polish. Keep it brief and authentic. 2 short paragraphs, 2-3 sentences each.",
  cringe:
    "Overdo it with buzzwords and emojis 😊. Make it awkward and try-hard. 2 paragraphs, punchy.",
  thought_leader:
    "Inspirational garbage. Mention 'journey', 'growth mindset', 'unlock potential'. 2-3 short paragraphs.",
  series_a_founder:
    "Startup pitch vibes. Use 'disrupt', 'pivot', 'traction', 'scale'. Keep it concise. 2-3 paragraphs.",
  fortune_500_keynote:
    "Corporate keynote tone. Use 'synergy', 'paradigm shift', 'ecosystem'. Grandiose but brief. 2-3 paragraphs.",
};

export function buildTranslationPrompt(
  text: string,
  mode: TranslationMode,
  intensity: IntensityLevel,
): string {
  let prompt = "";

  if (mode === "plain_to_linkedin") {
    const intensityInstruction = INTENSITY_INSTRUCTIONS[intensity];
    prompt = `Translate the following text into a satirical LinkedIn post that mocks corporate jargon culture.

Situation: "${text}"

Intensity: ${intensity}. ${intensityInstruction}

Rules:
- Output ONLY the LinkedIn post text itself. No headers, no titles, no explanations, no commentary.
- 2-3 short paragraphs separated by blank lines
- End with 5-7 hashtags on their own line
- Nothing before or after the post`;
  } else {
    prompt = `Strip this LinkedIn post down to exactly what it means in plain English. Be blunt and literal.

Text: "${text}"

Rules:
- Output ONLY the plain English. No headers, no commentary, nothing extra.
- 2-4 short punchy sentences. No filler.
- Each real claim gets one honest sentence. Cut everything else.
- No hashtags, no paragraphs, no softening`;
  }

  return prompt;
}
