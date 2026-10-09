import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ArrowRightIcon } from "@/components/ui/icons";
import { InstallCommand } from "@/components/ui/InstallCommand";
import { Text } from "@/components/ui/Text";
import styles from "./Hero.module.css";

const HERO_VIDEO: string | null = "/videos/hero.mp4";

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
          {HERO_VIDEO ? (
            <video
              src={HERO_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              disableRemotePlayback
              tabIndex={-1}
              aria-label="OdinEye outlining problems on a page and explaining how to fix them"
              className={styles.video}
            />
          ) : (
            <Text as="span" size="md" tone="faint" mono>Video</Text>
          )}
        </div>
      </Container>
    </section>
  );
}
