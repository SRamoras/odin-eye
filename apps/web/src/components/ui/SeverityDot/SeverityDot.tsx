import styles from "./SeverityDot.module.css";

/** Ponto vermelho (erro) ou âmbar (aviso). Decorativo: o texto ao lado diz o resto. */
export function SeverityDot({ severity }: { severity: "error" | "warning" }) {
  return <span className={styles.dot} data-severity={severity} aria-hidden="true" />;
}
