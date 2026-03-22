import { NextRequest, NextResponse } from "next/server";
import { translateText } from "@/lib/llm";
import {
  TranslateRequest,
  TranslateResponse,
  TranslationMode,
  IntensityLevel,
} from "@/lib/types";

const VALID_MODES: TranslationMode[] = ["plain_to_linkedin", "linkedin_to_plain"];
const VALID_INTENSITIES: IntensityLevel[] = [
  "subtle",
  "cringe",
  "thought_leader",
  "series_a_founder",
  "fortune_500_keynote",
];

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("inputText" in body) ||
      !("mode" in body) ||
      !("intensity" in body)
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { inputText, mode, intensity } = body as Record<string, unknown>;

    // Validate inputText
    if (typeof inputText !== "string" || inputText.trim().length === 0) {
      return NextResponse.json(
        { error: "Input text is required and cannot be empty" },
        { status: 400 }
      );
    }

    if (inputText.length > 3000) {
      return NextResponse.json(
        { error: "Input text must be 3000 characters or less" },
        { status: 400 }
      );
    }

    // Validate mode
    if (typeof mode !== "string" || !VALID_MODES.includes(mode as TranslationMode)) {
      return NextResponse.json(
        { error: `Invalid mode. Must be one of: ${VALID_MODES.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate intensity
    if (typeof intensity !== "string" || !VALID_INTENSITIES.includes(intensity as IntensityLevel)) {
      return NextResponse.json(
        { error: `Invalid intensity. Must be one of: ${VALID_INTENSITIES.join(", ")}` },
        { status: 400 }
      );
    }

    const outputText = await translateText(
      inputText,
      mode as TranslationMode,
      intensity as IntensityLevel
    );

    const response: TranslateResponse = { outputText };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Failed to translate text" },
      { status: 500 }
    );
  }
}
