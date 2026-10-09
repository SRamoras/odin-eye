import styles from "./Tag.module.css";

export function Tag({ ok = false, children }: { ok?: boolean; children: React.ReactNode }) {
  return (
    <span className={styles.tag} data-ok={ok ? "true" : "false"}>
      {ok ? "✓" : "✕"} {children}
    </span>
  );
}
