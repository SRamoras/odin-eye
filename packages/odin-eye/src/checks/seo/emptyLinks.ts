import type { Issue } from "../../types";

export function checkEmptyLinks(): Issue[] {
  const links = Array.from(document.querySelectorAll("a[href]"));

  const emptyLinks = links.filter((link) => {
    const href = link.getAttribute("href")?.trim();
    return href === "" || href === "#";
  });

  return emptyLinks.map((link, index): Issue => ({
    id: `seo-empty-link-${index}`,
    category: "seo",
    severity: "warning",
    title: "Link without destination",
    description:
      'This link points to "#" or nowhere. Search engines can\'t follow it. Add a real URL, or use a <button> if it triggers an action.',
    element: link,
  }));
}
