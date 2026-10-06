import { CopyButton } from "../CopyButton";
import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  /** nome do ficheiro ou "Terminal", na barra de cima */
  title: string;
  /** o código em texto simples, para copiar */
  code: string;
  /** o mesmo código já colorido pelo Shiki; sem ele, mostra o texto simples */
  html?: string;
  /** separadores na barra de cima (ver TabbedCode) */
  tabs?: React.ReactNode;
  /** mostra $ antes de cada linha em vez de números (para comandos) */
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
