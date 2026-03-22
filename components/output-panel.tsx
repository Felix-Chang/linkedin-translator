"use client";

import { useEffect, useState } from "react";
import { LOADING_MESSAGES } from "@/lib/types";
import { Button } from "./ui/button";

interface OutputPanelProps {
  loading: boolean;
  error: string | null;
  outputText: string;
  onRegenerate: () => void;
}

export function OutputPanel({
  loading,
  error,
  outputText,
  onRegenerate,
}: OutputPanelProps) {
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!loading) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % LOADING_MESSAGES.length;
      setLoadingMessage(LOADING_MESSAGES[currentIndex]);
    }, 1500);

    return () => clearInterval(interval);
  }, [loading]);

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Output</h3>

      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-600 animate-pulse">{loadingMessage}</p>
        </div>
      )}

      {error && !loading && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {outputText && !loading && !error && (
        <>
          <div className="p-4 bg-gray-50 rounded-md border border-gray-200 min-h-24">
            <p className="text-gray-900">{outputText}</p>
          </div>
          <div className="flex gap-2 mt-4">
            <Button size="sm" variant="outline" onClick={handleCopy}>
              {copied ? "Copied ✓" : "Copy"}
            </Button>
            <Button size="sm" variant="outline" onClick={onRegenerate}>
              Regenerate
            </Button>
          </div>
        </>
      )}

      {!outputText && !loading && !error && (
        <div className="p-4 bg-gray-50 rounded-md border border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Enter text and click Translate to see output here
          </p>
        </div>
      )}
    </div>
  );
}
