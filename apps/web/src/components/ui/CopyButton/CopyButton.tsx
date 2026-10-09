"use client";

import { useState } from "react";
import { Button } from "../Button";
import { CheckIcon, CopyIcon } from "../icons";
import { VisuallyHidden } from "../VisuallyHidden";

interface CopyButtonProps {
  text: string;
  label: string;
  className?: string;
}

export function CopyButton({ text, label, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button iconOnly onClick={copy} aria-label={copied ? "Copied" : label} className={className}>
      {copied ? <CheckIcon /> : <CopyIcon />}
      <VisuallyHidden aria-live="polite">{copied ? "Copied" : ""}</VisuallyHidden>
    </Button>
  );
}
