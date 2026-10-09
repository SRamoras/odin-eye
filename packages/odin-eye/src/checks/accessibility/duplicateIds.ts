import type { Issue } from "../../types";

export function checkDuplicateIds(): Issue[] {
  const elements = Array.from(document.querySelectorAll("[id]")).filter((element) =>
    element.id.trim(),
  );

  const counts = new Map<string, number>();
  for (const element of elements) {
    counts.set(element.id, (counts.get(element.id) ?? 0) + 1);
  }

  const duplicated = elements.filter((element) => (counts.get(element.id) ?? 0) > 1);

  return duplicated.map((element, index): Issue => ({
    id: `duplicate-id-${index}`,
    category: "accessibility",
    severity: "error",
    title: "Duplicate id",
    description: `The id "${element.id}" is used ${counts.get(element.id)} times on this page. Ids must be unique, otherwise labels and aria references can point to the wrong element.`,
    element,
  }));
}
