import styles from "./Container.module.css";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={className ? `${styles.container} ${className}` : styles.container}>{children}</div>;
}
