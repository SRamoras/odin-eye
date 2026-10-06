import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  /** botão quadrado só com ícone; precisa de aria-label */
  iconOnly?: boolean;
  className?: string;
  children: ReactNode;
}

type LinkButtonProps = BaseProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | "href">;
type NativeButtonProps = BaseProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

/**
 * Botão em pílula. Com `href` é um link (interno com o Link do Next, externo com <a>);
 * sem `href` é um <button>.
 */
export function Button(props: ButtonProps) {
  const { variant = "ghost", size = "md", iconOnly = false, className, children, ...rest } = props;

  const classes = [
    styles.button,
    styles[variant],
    size === "lg" && styles.lg,
    iconOnly && styles.iconOnly,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (rest.href !== undefined) {
    const { href, ...anchor } = rest as Omit<LinkButtonProps, keyof BaseProps>;
    return href.startsWith("/") ? (
      <Link href={href} className={classes} {...anchor}>
        {children}
      </Link>
    ) : (
      <a href={href} className={classes} {...anchor}>
        {children}
      </a>
    );
  }

  const { type = "button", ...button } = rest as Omit<NativeButtonProps, keyof BaseProps>;
  return (
    <button type={type} className={classes} {...button}>
      {children}
    </button>
  );
}
