import styles from "./MockPanel.module.css";

// Ilustração estática do painel do OdinEye e do botão do canto que o abre.

const ROWS = [
  { title: "Button without a name", severity: "error" },
  { title: "Field without a label", severity: "error" },
  { title: "Generic link text", severity: "warning" },
  { title: "Missing meta description", severity: "warning" },
];

export function MockPanel() {
  return (
    <div className={styles.stage}>
      <div className={styles.panel}>
        <div className={styles.tabs}>
          <span data-active="true">All 7</span>
          <span>Accessibility 4</span>
          <span>SEO 3</span>
        </div>
        {ROWS.map((row) => (
          <div key={row.title} className={styles.row} data-severity={row.severity}>
            {row.title}
          </div>
        ))}
      </div>
      <span className={styles.counter}>
        <span>👁️</span>
        <span className={styles.errors}>● 4</span>
        <span className={styles.warnings}>● 3</span>
      </span>
    </div>
  );
}
