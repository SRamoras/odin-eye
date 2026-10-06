import Link from "next/link";
import { Brand } from "@/components/ui/Brand";
import { Container } from "@/components/ui/Container";
import { Text } from "@/components/ui/Text";
import styles from "./Footer.module.css";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#setup", label: "Setup" },
      { href: "/#checks", label: "Checks" },
      { href: "/playground", label: "Playground" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "https://github.com/SRamoras/odin-eye", label: "GitHub" },
      { href: "https://github.com/SRamoras/odin-eye/issues", label: "Report an issue" },
      { href: "https://www.npmjs.com/package/odin-eye", label: "npm" },
    ],
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.grid}>
        <div className={styles.about}>
          <Brand logoSize={22} />
          <Text tone="muted">
            A React dev tool that marks accessibility, SEO and layout problems on your
            page while you build it.
          </Text>
          <Text size="md" tone="muted">
            MIT licensed. Built by{" "}
            <a href="https://diogo-silva-portfolio.vercel.app" className={styles.author}>Diogo Silva</a>.
          </Text>
        </div>

        <nav aria-label="Footer" className={styles.nav}>
          {COLUMNS.map((column) => (
            <div key={column.title} className={styles.column}>
              <Text size="md" tone="foreground" weight="medium">{column.title}</Text>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("/") ? (
                      <Link href={link.href} className={styles.link}>{link.label}</Link>
                    ) : (
                      <a href={link.href} className={styles.link}>{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
