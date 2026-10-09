import type { Issue } from "../../types";

export function checkHeadingOrder(): Issue[] {
  const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
  const issues: Issue[] = [];

  let previousLevel: number | null = null;

  headings.forEach((heading, index) => {
    const level = Number(heading.tagName[1]);

    if (previousLevel !== null && level > previousLevel + 1) {
      issues.push({
        id: `heading-order-${index}`,
        category: "accessibility",
        severity: "warning",
        title: "Skipped heading level",
        description: `This <h${level}> comes after an <h${previousLevel}>, skipping a level. Headings should go down one level at a time so the page structure makes sense to screen reader users.`,
        element: heading,
      });
    }

    previousLevel = level;
  });

  return issues;
}
