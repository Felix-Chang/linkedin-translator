"use client";

import { useEffect, useState } from "react";
import { TranslationMode, IntensityLevel, EXAMPLE_PROMPTS, LOADING_MESSAGES, INTENSITY_LABELS } from "@/lib/types";

interface TranslatorCardProps {
  inputText: string;
  outputText: string;
  mode: TranslationMode;
  intensity: IntensityLevel;
  loading: boolean;
  error: string | null;
  onInputChange: (text: string) => void;
  onModeChange: (mode: TranslationMode) => void;
  onIntensityChange: (intensity: IntensityLevel) => void;
  onExampleClick: (text: string) => void;
  onTranslate: () => void;
  onRegenerate: () => void;
  onSwap: () => void;
}

export function TranslatorCard({
  inputText,
  outputText,
  mode,
  intensity,
  loading,
  error,
  onInputChange,
  onModeChange,
  onIntensityChange,
  onExampleClick,
  onTranslate,
  onRegenerate,
  onSwap,
}: TranslatorCardProps) {
  const [copied, setCopied] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);

  useEffect(() => {
    if (!loading) return;
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % LOADING_MESSAGES.length;
      setLoadingMsg(LOADING_MESSAGES[index]);
    }, 1500);
    return () => clearInterval(interval);
  }, [loading]);

  const charCount = inputText.length;
  const isOverLimit = charCount > 3000;
  const isInputValid = inputText.trim().length > 0 && !isOverLimit;

  const leftLabel = mode === "plain_to_linkedin" ? "Plain English" : "LinkedIn Lingo";
  const rightLabel = mode === "plain_to_linkedin" ? "LinkedIn Lingo" : "Plain English";

  const handleSwap = () => {
    onSwap();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl bg-white rounded-lg shadow-sm">
      {/* Language/Mode Headers */}
      <div className="flex items-center border-b border-[#e0e0e0] bg-white rounded-t-lg">
        <div className="flex-1 px-6 py-4">
          <button
            onClick={() => onModeChange("plain_to_linkedin")}
            className="text-sm font-medium pb-2 border-b-2 border-[#0077b5] text-[#0077b5] cursor-pointer"
          >
            {leftLabel}
          </button>
        </div>

        <div className="px-2">
          <button
            onClick={handleSwap}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#e0e0e0] transition-all duration-200 cursor-pointer text-[#6b6b6b] hover:text-[#0077b5] hover:bg-[#f5f5f5] hover:border-[#0077b5]"
            title="Swap languages"
          >
            <span className="text-xl leading-none">⇄</span>
          </button>
        </div>

        <div className="flex-1 px-6 py-4">
          <div className="text-sm font-medium text-[#1b1b1b]">{rightLabel}</div>
        </div>
      </div>

      {/* Main Panels */}
      <div className="flex">
        {/* Left Panel: Input */}
        <div className="flex-1 flex flex-col">
          <textarea
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Enter text to translate…"
            className="flex-1 p-6 text-[#1b1b1b] placeholder-[#6b6b6b] resize-none focus:outline-none text-base leading-relaxed"
            style={{ minHeight: "300px" }}
          />

          {/* Input Footer - No Border */}
          <div className="flex items-center justify-between px-6 py-3 bg-white">
            <span className={`text-xs font-medium ${isOverLimit ? "text-red-600" : "text-[#6b6b6b]"}`}>
              {charCount}/3000
            </span>
            <button
              onClick={onTranslate}
              disabled={!isInputValid || loading}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                isInputValid && !loading
                  ? "bg-[#0077b5] text-white hover:bg-[#006097] cursor-pointer"
                  : "bg-[#e0e0e0] text-[#6b6b6b] cursor-not-allowed"
              }`}
            >
              {loading ? "Translating…" : "Translate"}
            </button>
          </div>
        </div>

        {/* Right Panel: Output */}
        <div className="flex-1 flex flex-col bg-[#eef3fa]">
          <div className="flex-1 p-6 text-[#1b1b1b] text-base leading-relaxed overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full text-[#6b6b6b]">
                <p className="animate-pulse">{loadingMsg}</p>
              </div>
            ) : error ? (
              <div className="text-red-600 text-sm">Error: {error}</div>
            ) : outputText ? (
              <p>{outputText}</p>
            ) : (
              <div className="flex items-center justify-center h-full text-[#6b6b6b] text-sm">
                Translation will appear here
              </div>
            )}
          </div>

          {/* Output Footer */}
          {outputText && !loading && !error && (
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-[#d0d7e0]">
              <button
                onClick={onRegenerate}
                className="px-4 py-2 text-sm font-medium text-[#1b1b1b] border border-[#d0d7e0] rounded hover:bg-white transition-colors cursor-pointer"
                title="Generate different translation"
              >
                ↻ Regenerate
              </button>
              <button
                onClick={handleCopy}
                className="p-2 text-[#6b6b6b] hover:text-[#1b1b1b] hover:bg-[#f0f4f8] rounded-lg transition-colors cursor-pointer"
                title="Copy translation"
              >
                {copied ? (
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                )}
              </button>
              <button
                disabled
                className="px-4 py-2 text-sm font-medium text-[#6b6b6b] border border-[#d0d7e0] rounded bg-[#f5f5f5] cursor-not-allowed opacity-60"
              >
                LinkedIn 🔒
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Examples & Intensity */}
      <div className="bg-white p-6 border-t border-[#e0e0e0] rounded-b-lg">
        <div className="flex flex-col gap-6">
          {/* Intensity Selector - only show in plain→linkedin mode */}
          {mode === "plain_to_linkedin" && (
            <div>
              <label className="text-xs font-semibold text-[#6b6b6b] uppercase tracking-wide mb-3 block">
                Intensity Level
              </label>
              <select
                value={intensity}
                onChange={(e) => onIntensityChange(e.target.value as IntensityLevel)}
                className="px-4 py-2 text-sm border border-[#e0e0e0] bg-white text-[#1b1b1b] rounded hover:border-[#0077b5] focus:outline-none focus:ring-1 focus:ring-[#0077b5]"
              >
                {(Object.entries(INTENSITY_LABELS) as [IntensityLevel, string][]).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Example Chips */}
          <div>
            <p className="text-xs font-semibold text-[#6b6b6b] uppercase tracking-wide mb-3">Try an example</p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PROMPTS[mode].map((example) => (
                <button
                  key={example}
                  onClick={() => onExampleClick(example)}
                  className="px-3 py-2 text-xs border border-[#e0e0e0] text-[#1b1b1b] rounded-full hover:bg-[#f5f5f5] transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
