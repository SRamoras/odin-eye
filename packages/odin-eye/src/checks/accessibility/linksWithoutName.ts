import type { Issue } from "../../types";
import { hasAccessibleName } from "./accessibleName";

export function checkLinksWithoutName(): Issue[] {
  const links = Array.from(document.querySelectorAll("a"));

  const linksWithoutName = links.filter((link) => !hasAccessibleName(link));

  return linksWithoutName.map((link, index): Issue => ({
    id: `link-${index}`,
    category: "accessibility",
    severity: "error",
    title: "Link without accessible name",
    description:
      "Screen readers can't tell where this link goes. Add visible text, an aria-label, or an image with alt text inside it.",
    element: link,
  }));
}
