import { Brand } from "@/components/ui/Brand";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GitHubIcon } from "@/components/ui/icons";
import { ThemeToggle } from "../ThemeToggle";
import styles from "./Header.module.css";

const SECTIONS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#setup", label: "Setup" },
  { href: "/#checks", label: "Checks" },
];

export function Header() {
  return (
    <>
      <a href="#main" className={styles.skip}>Skip to content</a>

      <header className={styles.header}>
        <Container className={styles.inner}>
          <Brand />

          <nav aria-label="Sections" className={styles.nav}>
            {SECTIONS.map((section) => (
              <Button key={section.href} href={section.href}>
                {section.label}
              </Button>
            ))}
          </nav>

          <div className={styles.actions}>
            <Button href="/playground">Playground</Button>
            <Button href="https://github.com/SRamoras/odin-eye" iconOnly aria-label="OdinEye on GitHub">
              <GitHubIcon />
            </Button>
            <ThemeToggle />
          </div>
        </Container>
      </header>
    </>
  );
}
