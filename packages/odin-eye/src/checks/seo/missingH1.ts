import type { Issue } from "../../types";

export function checkMissingH1(): Issue[] {
  if (document.querySelector("h1")) return [];

  return [
    {
      id: "seo-missing-h1",
      category: "seo",
      severity: "error",
      title: "Page without <h1>",
      description:
        "Search engines use the <h1> to understand what the page is about. Add one <h1> with the main topic of the page.",
      element: null,
    },
  ];
}
