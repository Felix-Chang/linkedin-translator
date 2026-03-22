"use client";

import { IntensityLevel, INTENSITY_LABELS } from "@/lib/types";

interface IntensitySelectorProps {
  intensity: IntensityLevel;
  onIntensityChange: (intensity: IntensityLevel) => void;
}

const INTENSITIES: IntensityLevel[] = [
  "subtle",
  "cringe",
  "thought_leader",
  "series_a_founder",
  "fortune_500_keynote",
];

export function IntensitySelector({
  intensity,
  onIntensityChange,
}: IntensitySelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Jargon Intensity
      </label>
      <select
        value={intensity}
        onChange={(e) => onIntensityChange(e.target.value as IntensityLevel)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
      >
        {INTENSITIES.map((level) => (
          <option key={level} value={level}>
            {INTENSITY_LABELS[level]}
          </option>
        ))}
      </select>
    </div>
  );
}
