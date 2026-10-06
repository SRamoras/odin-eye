import styles from "./Heading.module.css";

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span";
type Size = "display" | "cta" | "section" | "card";
type Tone = "default" | "muted";

interface HeadingProps {
  /** o elemento HTML; por defeito h2 */
  as?: Tag;
  /** o tamanho visual, independente do nível do título */
  size?: Size;
  tone?: Tone;
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function Heading({ as: Tag = "h2", size = "section", tone = "default", id, className, children }: HeadingProps) {
  const classes = [styles.heading, styles[size], tone === "muted" && styles.muted, className].filter(Boolean).join(" ");

  return (
    <Tag id={id} className={classes}>
      {children}
    </Tag>
  );
}
