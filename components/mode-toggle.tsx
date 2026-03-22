"use client";

import { TranslationMode } from "@/lib/types";
import { Button } from "./ui/button";

interface ModeToggleProps {
  mode: TranslationMode;
  onModeChange: (mode: TranslationMode) => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
      <Button
        variant={mode === "plain_to_linkedin" ? "default" : "ghost"}
        size="sm"
        onClick={() => onModeChange("plain_to_linkedin")}
        className={mode === "plain_to_linkedin" ? "bg-black text-white" : ""}
      >
        Plain → LinkedIn
      </Button>
      <Button
        variant={mode === "linkedin_to_plain" ? "default" : "ghost"}
        size="sm"
        onClick={() => onModeChange("linkedin_to_plain")}
        className={mode === "linkedin_to_plain" ? "bg-black text-white" : ""}
      >
        LinkedIn → Plain
      </Button>
    </div>
  );
}
