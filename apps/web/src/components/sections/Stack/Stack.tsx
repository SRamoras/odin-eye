/* eslint-disable @next/next/no-img-element */
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { STACK } from "@/data/stack";
import styles from "./Stack.module.css";

export function Stack() {
  return (
    <Section
      id="stack"
      eyebrow="Works with"
      title="Fits the React stack you already use."
      lead="OdinEye reads the page the browser renders, so it doesn't care how you built it."
    >
      <ul className={styles.stack}>
        {STACK.map((item) => (
          <li key={item.name} className={styles.item}>
            {/* o nome está logo ao lado, por isso o logótipo é decorativo */}
            <img
              src={item.logo}
              alt=""
              width={32}
              height={32}
              className={styles.logo}
              data-mono={"mono" in item ? "true" : undefined}
            />
            <Text as="span" tone="foreground" className={styles.name}>{item.name}</Text>
            <Text as="span" size="sm" tone="muted">{item.note}</Text>
          </li>
        ))}
      </ul>
    </Section>
  );
}
