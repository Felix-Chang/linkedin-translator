"use client";

import { TranslationMode, EXAMPLE_PROMPTS } from "@/lib/types";

interface ExampleChipsProps {
  mode: TranslationMode;
  onExampleClick: (text: string) => void;
}

export function ExampleChips({ mode, onExampleClick }: ExampleChipsProps) {
  const examples = EXAMPLE_PROMPTS[mode];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Try an example:
      </label>
      <div className="flex flex-wrap gap-2">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => onExampleClick(example)}
            className="px-3 py-1 text-sm bg-gray-200 text-gray-900 rounded-full hover:bg-gray-300 transition-colors"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}
