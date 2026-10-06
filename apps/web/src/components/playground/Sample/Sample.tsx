import { Tag } from "../Tag";
import styles from "./Sample.module.css";

interface SampleProps {
  /** true quando o exemplo está certo e o OdinEye não o deve marcar */
  ok?: boolean;
  /** o que torna o exemplo certo ou errado, mostrado na etiqueta */
  note: string;
  children: React.ReactNode;
}

/** Um exemplo com a etiqueta por baixo. */
export function Sample({ ok = false, note, children }: SampleProps) {
  return (
    <div className={styles.sample}>
      <div className={styles.body}>{children}</div>
      <Tag ok={ok}>{note}</Tag>
    </div>
  );
}
