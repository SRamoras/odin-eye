import styles from "./Text.module.css";

type Tag = "p" | "span" | "div" | "li";
type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type Tone = "inherit" | "foreground" | "muted" | "faint";

interface TextProps {
  as?: Tag;
  size?: Size;
  tone?: Tone;
  weight?: "regular" | "medium";
  mono?: boolean;
  uppercase?: boolean;
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function Text({
  as: Tag = "p",
  size,
  tone = "inherit",
  weight = "regular",
  mono = false,
  uppercase = false,
  id,
  className,
  children,
}: TextProps) {
  const classes = [
    size && styles[`size-${size}`],
    tone !== "inherit" && styles[tone],
    weight === "medium" && styles.medium,
    mono && styles.mono,
    uppercase && styles.uppercase,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag id={id} className={classes || undefined}>
      {children}
    </Tag>
  );
}
