const text = (value: string | null | undefined) => value?.trim() ?? "";

export function labelledByText(element: Element): string {
  const ids = text(element.getAttribute("aria-labelledby")).split(/\s+/).filter(Boolean);
  return ids
    .map((id) => text(document.getElementById(id)?.textContent))
    .join(" ")
    .trim();
}

export function hasAccessibleName(element: Element): boolean {
  if (text(element.getAttribute("aria-label"))) return true;
  if (labelledByText(element)) return true;
  if (text(element.textContent)) return true;

  const named = Array.from(element.querySelectorAll("img[alt], svg, [aria-label]")).some(
    (child) =>
      text(child.getAttribute("alt")) ||
      text(child.getAttribute("aria-label")) ||
      text(child.querySelector("title")?.textContent),
  );
  if (named) return true;

  return Boolean(text(element.getAttribute("title")));
}
