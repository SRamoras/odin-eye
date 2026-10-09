import { CopyButton } from "../CopyButton";
import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  title: string;
  code: string;
  html?: string;
  tabs?: React.ReactNode;
  prompt?: boolean;
  className?: string;
}

export function CodeBlock({ title, code, html, tabs, prompt = false, className }: CodeBlockProps) {
  return (
    <figure className={className ? `${styles.block} ${className}` : styles.block}>
      <figcaption className={styles.bar}>
        {tabs}
        <span className={styles.title}>{title}</span>
        <CopyButton text={code} label={`Copy ${title}`} className={styles.copy} />
      </figcaption>
      {html ? (
        <div
          className={`${styles.code} ${prompt ? styles.prompt : styles.numbered}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className={styles.code} tabIndex={0}>
          <code>{code}</code>
        </pre>
      )}
    </figure>
  );
}
