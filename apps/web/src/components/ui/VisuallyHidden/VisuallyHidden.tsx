import styles from "./VisuallyHidden.module.css";

/** Texto só para leitores de ecrã. */
export function VisuallyHidden({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={styles.hidden} {...props}>
      {children}
    </span>
  );
}
