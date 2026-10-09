import type { Issue } from "../../types";

export function checkCanonical(): Issue[] {
  const href = document.querySelector('link[rel="canonical"]')?.getAttribute("href")?.trim();

  if (href) return [];

  return [
    {
      id: "seo-canonical",
      category: "seo",
      severity: "warning",
      title: "Missing canonical link",
      description:
        'Without a canonical URL, search engines may treat variations of this page as duplicate content. Add <link rel="canonical" href="...">.',
      element: null,
    },
  ];
}
