import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SeverityDot } from "@/components/ui/SeverityDot";
import { Text } from "@/components/ui/Text";
import styles from "./Checks.module.css";

type Severity = "error" | "warning";

const GROUPS: { name: string; checks: [string, Severity][] }[] = [
  {
    name: "Accessibility",
    checks: [
      ["Images without alt text", "error"],
      ["Buttons without an accessible name", "error"],
      ["Links without an accessible name", "error"],
      ["Form fields without a label", "error"],
      ["Duplicate ids", "error"],
      ["Page without a language", "error"],
      ["Page without a title", "error"],
      ["More than one h1", "warning"],
      ["Skipped heading levels", "warning"],
    ],
  },
  {
    name: "SEO",
    checks: [
      ["Missing meta description", "error"],
      ["Meta description too short or too long", "warning"],
      ["Page without an h1", "error"],
      ["Missing viewport meta tag", "error"],
      ["Page title too short or too long", "warning"],
      ["Page set to noindex", "warning"],
      ["Missing Open Graph tags", "warning"],
      ["Missing canonical link", "warning"],
      ["Generic link text", "warning"],
      ["Links without a destination", "warning"],
    ],
  },
  {
    name: "Layout",
    checks: [
      ["Broken images", "error"],
      ["Elements wider than the page", "error"],
      ["Distorted images", "warning"],
      ["Images larger than needed", "warning"],
      ["Touch targets that are too small", "warning"],
      ["Text that is too small", "warning"],
    ],
  },
];

const TOTAL = GROUPS.reduce((sum, group) => sum + group.checks.length, 0);

export function Checks() {
  return (
    <Section
      id="checks"
      eyebrow="Checks"
      title={`${TOTAL} problems that are easy to miss by eye.`}
      lead="A first pass while you write the code, not a full audit. Errors will break the page for some people; warnings are worth a second look."
    >
      <ul className={styles.legend} aria-label="Severity">
        <li>
          <SeverityDot severity="error" /> Error
        </li>
        <li>
          <SeverityDot severity="warning" /> Warning
        </li>
      </ul>

      <div className={styles.grid}>
        {GROUPS.map((group) => (
          <Card key={group.name} spotlight>
            <header className={styles.header}>
              <Heading as="h3" size="card">
                {group.name}
              </Heading>
              <Text as="span" size="xs" tone="muted" mono uppercase>
                {group.checks.length} checks
              </Text>
            </header>
            <ul className={styles.list}>
              {group.checks.map(([check, severity]) => (
                <li key={check}>
                  <SeverityDot severity={severity} />
                  {check}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}
