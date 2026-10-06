import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ArrowRightIcon, GitHubIcon } from "@/components/ui/icons";
import { InstallCommand } from "@/components/ui/InstallCommand";
import { Logo } from "@/components/ui/Logo";
import { Text } from "@/components/ui/Text";
import styles from "./Cta.module.css";

export function Cta() {
  return (
    <section id="start" aria-labelledby="start-title" className={styles.section}>
      <Container>
        <div className={styles.card}>
          <span className={styles.logo} aria-hidden="true">
            <Logo size={26} />
          </span>

          <Heading size="cta" id="start-title">
            Catch it now,
            <span className={styles.muted}>not after your users do.</span>
          </Heading>
          <Text size="lg" className={styles.text}>
            One component, every page checked while you work. Free and open source.
          </Text>

          <div className={styles.actions}>
            <Button href="/playground" variant="primary" size="lg">
              Open the playground
              <ArrowRightIcon />
            </Button>
            <InstallCommand />
          </div>

          <a href="https://github.com/SRamoras/odin-eye" className={styles.github}>
            <GitHubIcon size={15} />
            Star it on GitHub
          </a>
        </div>
      </Container>
    </section>
  );
}
