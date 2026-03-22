"use client";

import { useState } from "react";
import { TranslationMode, IntensityLevel } from "@/lib/types";
import { TranslatorCard } from "@/components/translator-card";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<TranslationMode>("plain_to_linkedin");
  const [intensity, setIntensity] = useState<IntensityLevel>("subtle");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runTranslation = async (text: string) => {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputText: text,
          mode,
          intensity,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Translation failed");
        return;
      }

      const data = await response.json();
      setOutputText(data.outputText);
    } catch (err) {
      setError("Failed to connect to translation service");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTranslate = () => {
    runTranslation(inputText);
  };

  const handleRegenerate = () => {
    runTranslation(inputText);
  };

  const handleModeChange = (newMode: TranslationMode) => {
    setMode(newMode);
    setOutputText("");
    setError(null);
  };

  const handleSwap = () => {
    const newMode = mode === "plain_to_linkedin" ? "linkedin_to_plain" : "plain_to_linkedin";
    if (outputText) {
      setInputText(outputText);
      setOutputText("");
    }
    setError(null);
    setMode(newMode);
  };

  const handleExampleClick = (example: string) => {
    setInputText(example);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#e0e0e0] bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-baseline justify-between">
            <div>
              <h1
                className="text-2xl font-serif font-bold text-[#1b1b1b]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                LinkedIn Translator
              </h1>
              <p className="text-xs text-[#6b6b6b] mt-1">
                Translate English into professional nonsense. Or reverse the
                damage.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-8 px-4">
        <div className="w-full max-w-6xl">
          <TranslatorCard
            inputText={inputText}
            outputText={outputText}
            mode={mode}
            intensity={intensity}
            loading={loading}
            error={error}
            onInputChange={setInputText}
            onModeChange={handleModeChange}
            onIntensityChange={setIntensity}
            onExampleClick={handleExampleClick}
            onTranslate={handleTranslate}
            onRegenerate={handleRegenerate}
            onSwap={handleSwap}
          />
        </div>
      </main>
    </div>
  );
}
