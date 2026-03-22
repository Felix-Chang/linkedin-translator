"use client";

interface LinkedInPlaceholderProps {
  visible: boolean;
}

export function LinkedInPlaceholder({ visible }: LinkedInPlaceholderProps) {
  if (!visible) return null;

  return (
    <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
      <button
        disabled
        className="w-full px-4 py-2 bg-gray-300 text-gray-600 rounded-md font-medium cursor-not-allowed opacity-50"
      >
        📱 Post to LinkedIn — Coming Soon
      </button>
    </div>
  );
}
