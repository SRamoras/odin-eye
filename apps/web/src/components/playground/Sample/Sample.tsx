import { Tag } from "../Tag";
import styles from "./Sample.module.css";

interface SampleProps {
  ok?: boolean;
  note: string;
  children: React.ReactNode;
}

export function Sample({ ok = false, note, children }: SampleProps) {
  return (
    <div className={styles.sample}>
      <div className={styles.body}>{children}</div>
      <Tag ok={ok}>{note}</Tag>
    </div>
  );
}
