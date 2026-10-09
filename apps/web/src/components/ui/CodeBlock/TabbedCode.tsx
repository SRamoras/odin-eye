"use client";

import { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import styles from "./CodeBlock.module.css";

export interface Snippet {
  name: string;
  title: string;
  icon?: string;
  code: string;
  html: string;
}

interface TabbedCodeProps {
  label: string;
  snippets: Snippet[];
  prompt?: boolean;
}

export function TabbedCode({ label, snippets, prompt = false }: TabbedCodeProps) {
  const [active, setActive] = useState(0);
  const snippet = snippets[active];

  return (
    <CodeBlock
      title={snippet.title}
      code={snippet.code}
      html={snippet.html}
      prompt={prompt}
      tabs={
        <div role="group" aria-label={label} className={styles.tabs}>
          {snippets.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-pressed={active === index}
              onClick={() => setActive(index)}
              className={styles.tab}
            >
              {item.icon && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={item.icon} />
                </svg>
              )}
              {item.name}
            </button>
          ))}
        </div>
      }
    />
  );
}
