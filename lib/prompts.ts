import { TranslationMode, IntensityLevel } from "./types";

const INTENSITY_INSTRUCTIONS: Record<IntensityLevel, string> = {
  subtle:
    "Make minimal changes. Keep it professional and authentic. Just add a touch of corporate polish.",
  cringe:
    "Overdo it. Add corporate buzzwords, emojis, and enthusiasm. Make it slightly awkward and forced.",
  thought_leader:
    "Make it sound like inspirational garbage. Use abstract concepts, mention 'journey', 'growth mindset', and paradigm shifts.",
  series_a_founder:
    "Make it sound like a startup pitch. Use words like 'disrupt', 'pivot', 'traction', 'product-market fit', 'hockey stick growth'.",
  fortune_500_keynote:
    "Make it sound like a corporate keynote speech. Use abstract jargon, synergy, leverage, paradigm, ecosystem, seamless integration.",
};

export function buildTranslationPrompt(
  text: string,
  mode: TranslationMode,
  intensity: IntensityLevel,
): string {
  const modeInstruction =
    mode === "plain_to_linkedin"
      ? "Translate the following plain English text into exaggerated LinkedIn corporate jargon."
      : "Translate the following LinkedIn corporate jargon text back into plain, normal English.";

  const intensityInstruction = INTENSITY_INSTRUCTIONS[intensity];

  return `You are an expert at translating between plain English and LinkedIn corporate jargon.

${modeInstruction}

Intensity level: ${intensity}. ${intensityInstruction}

Text to translate:
"${text}"

Provide only the translated text, nothing else. No explanations, no quotes, just the translation.`;
}
