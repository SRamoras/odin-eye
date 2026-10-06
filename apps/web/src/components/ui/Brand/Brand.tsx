import Link from "next/link";
import { Logo } from "../Logo";
import styles from "./Brand.module.css";

/** Logótipo e nome, com link para a página principal. */
export function Brand({ logoSize = 20 }: { logoSize?: number }) {
  return (
    <Link href="/" className={styles.brand}>
      <Logo size={logoSize} />
      OdinEye
    </Link>
  );
}
