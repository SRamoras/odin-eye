import type { Issue } from "../../types";

export function checkHtmlWithoutLang(): Issue[] {
  const html = document.documentElement;
  const lang = html.getAttribute("lang")?.trim();

  if (lang) return [];

  return [
    {
      id: "html-lang",
      category: "accessibility",
      severity: "error",
      title: "Page without language",
      description:
        'The <html> element has no lang attribute, so screen readers may read the page with the wrong pronunciation. Add lang="en" (or your page\'s language).',
      element: html,
    },
  ];
}
