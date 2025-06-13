import React from "react";

export function SectionSeparator({ text, className = "" }: { text?: string, className?: string }) {
  return (
    <div className={`flex items-center mt-12 mb-6 ${className}`}>
      <hr className="flex-grow border-neutral-200" />
      {text && (
        <span className="mx-4 text-4xl font-semibold text-gray-900 whitespace-nowrap">
          {text}
        </span>
      )}
      <hr className="flex-grow border-neutral-200" />
    </div>
  );
}
