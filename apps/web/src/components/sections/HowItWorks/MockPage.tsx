import styles from "./MockPage.module.css";

function Marker({
  severity,
  inline = false,
  children,
}: {
  severity: "error" | "warning";
  inline?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.marked} data-severity={severity} data-inline={inline || undefined}>
      <span className={styles.dot}>!</span>
      {children}
    </div>
  );
}

export function MockPage() {
  return (
    <div className={styles.page}>
      <div className={styles.nav}>
        <span />
        <span />
        <span />
      </div>
      <Marker severity="error">
        <div className={styles.image} />
      </Marker>
      <div className={styles.tooltip}>
        <strong>Image without alt text</strong>
        <span>Add an alt attribute that describes it, or an empty one if it is decorative.</span>
      </div>
      <div className={styles.lines}>
        <span />
        <span />
      </div>
      <Marker severity="warning" inline>
        <div className={styles.button} />
      </Marker>
    </div>
  );
}
