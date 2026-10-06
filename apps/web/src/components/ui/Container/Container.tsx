import styles from "./Container.module.css";

/** Centra o conteúdo na largura máxima do site, com margem dos lados. */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={className ? `${styles.container} ${className}` : styles.container}>{children}</div>;
}
