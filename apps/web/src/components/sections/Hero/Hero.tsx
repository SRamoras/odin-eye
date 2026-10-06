import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ArrowRightIcon } from "@/components/ui/icons";
import { InstallCommand } from "@/components/ui/InstallCommand";
import { Text } from "@/components/ui/Text";
import styles from "./Hero.module.css";

// Quando o GIF estiver pronto, põe-no em public/ (por exemplo public/hero.gif)
// e escreve aqui o caminho. Enquanto for null, aparece só o espaço reservado.
const HERO_GIF: string | null = null;

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className={styles.hero}>
      <Container className={styles.inner}>
        <Heading as="h1" size="display" id="hero-title" className={styles.title}>
          See what&apos;s wrong with your page
        </Heading>

        <Text size="lg" tone="muted" className={styles.lead}>
          OdinEye marks accessibility, SEO and layout problems right on the page, and
          tells you how to fix them.
        </Text>

        <div className={styles.actions}>
          <Button href="/playground" variant="primary" size="lg">
            Open the playground
            <ArrowRightIcon />
          </Button>
          <InstallCommand />
        </div>

        <div className={styles.media}>
          {HERO_GIF ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={HERO_GIF}
              alt="OdinEye outlining problems on a page and explaining how to fix them"
              className={styles.gif}
            />
          ) : (
            <Text as="span" size="md" tone="faint" mono>GIF</Text>
          )}
        </div>
      </Container>
    </section>
  );
}
