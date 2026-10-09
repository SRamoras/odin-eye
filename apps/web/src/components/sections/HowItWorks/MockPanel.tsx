import { Logo } from "@/components/ui/Logo";
import styles from "./MockPanel.module.css";

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
        <div className={styles.header}>
          <Logo size={16} />
          OdinEye <span>7 issues</span>
        </div>
        <div className={styles.tabs}>
          <span data-active="true">
            All <b>7</b>
          </span>
          <span>
            Accessibility <b>4</b>
          </span>
          <span>
            SEO <b>3</b>
          </span>
        </div>
        <div className={styles.list}>
          {ROWS.map((row) => (
            <div key={row.title} className={styles.row} data-severity={row.severity}>
              <i className={styles.dot} />
              {row.title}
            </div>
          ))}
        </div>
      </div>
      <span className={styles.counter}>
        <Logo size={16} />
        <span data-severity="error">
          <i className={styles.dot} />4
        </span>
        <span data-severity="warning">
          <i className={styles.dot} />3
        </span>
      </span>
    </div>
  );
}
