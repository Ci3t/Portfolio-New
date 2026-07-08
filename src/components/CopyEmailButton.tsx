"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyEmailButtonProps {
  email: string;
}

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex h-10 w-10 items-center justify-center border border-terminal-dim text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
            aria-label="Copy email address"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            className="border border-terminal-dim bg-surface-container px-2 py-1 font-mono text-label-technical text-primary"
          >
            {copied ? "COPIED" : "COPY EMAIL"}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
