"use client";

import { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import styles from "./CodeBlock.module.css";

export interface Snippet {
  /** texto do separador */
  name: string;
  /** título na barra (ficheiro ou "Terminal") */
  title: string;
  /** path SVG (viewBox 24) do ícone do separador */
  icon?: string;
  code: string;
  /** o código já colorido pelo Shiki */
  html: string;
}

interface TabbedCodeProps {
  /** nome do grupo de separadores, para leitores de ecrã */
  label: string;
  snippets: Snippet[];
  prompt?: boolean;
}

/** Bloco de código com separadores, por exemplo npm/pnpm/yarn/bun ou Next.js/Vite. */
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
