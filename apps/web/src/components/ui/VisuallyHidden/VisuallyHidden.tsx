import styles from "./VisuallyHidden.module.css";

export function VisuallyHidden({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={styles.hidden} {...props}>
      {children}
    </span>
  );
}
