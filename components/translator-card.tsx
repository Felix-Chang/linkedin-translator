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

  const leftLabel = mode === "plain_to_linkedin" ? "Plain English" : "Corporate Speak";
  const rightLabel = mode === "plain_to_linkedin" ? "LinkedIn Speak" : "Plain English";

  const handleSwap = () => {
    onModeChange(mode === "plain_to_linkedin" ? "linkedin_to_plain" : "plain_to_linkedin");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl border border-[#e0e0e0] bg-white">
      {/* Language/Mode Headers */}
      <div className="flex items-center border-b border-[#e0e0e0] bg-white">
        <div className="flex-1 px-6 py-4">
          <button
            onClick={() => onModeChange("plain_to_linkedin")}
            className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
              mode === "plain_to_linkedin"
                ? "text-[#0077b5] border-[#0077b5]"
                : "text-[#6b6b6b] border-transparent hover:text-[#1b1b1b]"
            }`}
          >
            {leftLabel}
          </button>
        </div>

        <div className="px-2">
          <button
            onClick={handleSwap}
            className="p-2 hover:bg-[#f5f5f5] rounded transition-colors text-[#6b6b6b] hover:text-[#1b1b1b]"
            title="Swap languages"
          >
            ⇄
          </button>
        </div>

        <div className="flex-1 px-6 py-4">
          <div className="text-sm font-medium text-[#1b1b1b]">{rightLabel}</div>
        </div>
      </div>

      {/* Main Panels */}
      <div className="flex">
        {/* Left Panel: Input */}
        <div className="flex-1 flex flex-col border-r border-[#e0e0e0]">
          <textarea
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Enter text to translate…"
            className="flex-1 p-6 text-[#1b1b1b] placeholder-[#6b6b6b] resize-none focus:outline-none text-base leading-relaxed"
            style={{ minHeight: "300px" }}
          />

          {/* Input Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#e0e0e0] bg-white">
            <span className={`text-xs font-medium ${isOverLimit ? "text-red-600" : "text-[#6b6b6b]"}`}>
              {charCount}/3000
            </span>
            <button
              onClick={onTranslate}
              disabled={!isInputValid || loading}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                isInputValid && !loading
                  ? "bg-[#0077b5] text-white hover:bg-[#006097]"
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
                className="px-4 py-2 text-sm font-medium text-[#1b1b1b] border border-[#d0d7e0] rounded hover:bg-white transition-colors"
                title="Generate different translation"
              >
                ↻ Regenerate
              </button>
              <button
                onClick={handleCopy}
                className="px-4 py-2 text-sm font-medium text-[#1b1b1b] border border-[#d0d7e0] rounded hover:bg-white transition-colors"
              >
                {copied ? "✓ Copied" : "Copy"}
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
      <div className="border-t border-[#e0e0e0] bg-white p-6">
        <div className="flex flex-col gap-6">
          {/* Intensity Selector */}
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
