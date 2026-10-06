import { codeToHtml } from "shiki";
import { TabbedCode, type Snippet } from "@/components/ui/CodeBlock";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { PACKAGE_MANAGERS } from "@/data/packageManagers";
import { STACK } from "@/data/stack";
import styles from "./Setup.module.css";

const FRAMEWORKS = [
  {
    name: "Next.js",
    file: "app/layout.tsx",
    code: `import { OdinEye } from "odin-eye";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <OdinEye />}
      </body>
    </html>
  );
}`,
  },
  {
    name: "Vite",
    file: "src/App.tsx",
    code: `import { OdinEye } from "odin-eye";

export default function App() {
  return (
    <>
      {/* your app */}
      {import.meta.env.DEV && <OdinEye />}
    </>
  );
}`,
  },
];

// o código é colorido no servidor; os dois temas seguem o claro/escuro do site
function highlight(code: string, lang: "bash" | "tsx") {
  return codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark-default" },
    defaultColor: false,
  });
}

const iconFor = (name: string) => STACK.find((item) => item.name === name)?.path;

function Step({ number, title, text, children }: { number: number; title: string; text: string; children: React.ReactNode }) {
  return (
    <li className={styles.step}>
      <span className={styles.number} aria-hidden="true">{number}</span>
      <div className={styles.body}>
        <div className={styles.text}>
          <Heading as="h3" size="card">{title}</Heading>
          <Text>{text}</Text>
        </div>
        {children}
      </div>
    </li>
  );
}

export async function Setup() {
  const installs: Snippet[] = await Promise.all(
    PACKAGE_MANAGERS.map(async (pm) => ({
      name: pm.name,
      title: "Terminal",
      icon: pm.path,
      code: pm.command,
      html: await highlight(pm.command, "bash"),
    }))
  );

  const frameworks: Snippet[] = await Promise.all(
    FRAMEWORKS.map(async (fw) => ({
      name: fw.name,
      title: fw.file,
      icon: iconFor(fw.name),
      code: fw.code,
      html: await highlight(fw.code, "tsx"),
    }))
  );

  return (
    <Section
      id="setup"
      eyebrow="Setup"
      title="Two steps, then it watches every page you open."
      lead="It only renders in development, so nothing ships to your users."
    >
      <ol className={styles.steps}>
        <Step
          number={1}
          title="Install it as a dev dependency"
          text="Pick your package manager. It only needs to be in development."
        >
          <TabbedCode label="Package manager" snippets={installs} prompt />
        </Step>

        <Step
          number={2}
          title="Add the component once, at the root"
          text="Next to the rest of your app, behind a development check."
        >
          <TabbedCode label="Framework" snippets={frameworks} />
        </Step>
      </ol>
    </Section>
  );
}
