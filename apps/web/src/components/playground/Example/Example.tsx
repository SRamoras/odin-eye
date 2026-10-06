import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import styles from "./Example.module.css";

interface ExampleProps {
  title: string;
  /** a regra em uma frase */
  text: string;
  children: React.ReactNode;
}

/** Cartão do playground: título, regra e os exemplos por baixo. */
export function Example({ title, text, children }: ExampleProps) {
  return (
    <article className={styles.example}>
      <Heading as="h3" size="card">{title}</Heading>
      <Text size="lg" tone="muted" className={styles.text}>{text}</Text>
      <div className={styles.stage}>{children}</div>
    </article>
  );
}
