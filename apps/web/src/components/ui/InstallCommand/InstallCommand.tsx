import { CopyButton } from "../CopyButton";
import styles from "./InstallCommand.module.css";

export function InstallCommand({ command = "npm install -D odin-eye" }: { command?: string }) {
  return (
    <div role="group" aria-label="Install command" className={styles.install}>
      <code className={styles.code}>
        <span aria-hidden="true" className={styles.prompt}>
          $
        </span>
        {command}
      </code>
      <CopyButton text={command} label="Copy the install command" className={styles.copy} />
    </div>
  );
}
