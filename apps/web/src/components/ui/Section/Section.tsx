import { Container } from "../Container";
import { Heading } from "../Heading";
import { Text } from "../Text";
import styles from "./Section.module.css";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  lead?: React.ReactNode;
  children: React.ReactNode;
}

export function Section({ id, eyebrow, title, lead, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={styles.section}>
      <Container>
        <header className={styles.header}>
          <Text size="md" tone="muted" weight="medium">{eyebrow}</Text>
          <Heading id={`${id}-title`}>{title}</Heading>
          {lead && <Text size="xl" tone="muted">{lead}</Text>}
        </header>
        {children}
      </Container>
    </section>
  );
}
