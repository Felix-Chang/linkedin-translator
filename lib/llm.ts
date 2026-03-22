import Anthropic from "@anthropic-ai/sdk";
import { buildTranslationPrompt } from "./prompts";
import { TranslationMode, IntensityLevel } from "./types";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function translateText(
  text: string,
  mode: TranslationMode,
  intensity: IntensityLevel
): Promise<string> {
  const prompt = buildTranslationPrompt(text, mode, intensity);

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1500,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const response = message.content[0];
  if (response.type !== "text") {
    throw new Error("Unexpected response type from Anthropic API");
  }

  return response.text.trim();
}
