import styles from "./SeverityDot.module.css";

export function SeverityDot({ severity }: { severity: "error" | "warning" }) {
  return <span className={styles.dot} data-severity={severity} aria-hidden="true" />;
}
