"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy, CheckCircle } from "@hugeicons/core-free-icons";

export function CodeBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-3 group rounded-md bg-muted border border-border p-4">
      <pre className="text-sm text-foreground font-mono overflow-x-auto whitespace-pre-wrap pr-10">{text}</pre>
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors bg-background/80 p-1 rounded-md"
        aria-label="Copy to clipboard"
      >
        <HugeiconsIcon icon={copied ? CheckCircle : Copy} size={18} className="text-foreground" />
      </button>
    </div>
  );
}
