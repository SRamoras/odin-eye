import type { Issue } from "../../types";
import { getMetaContent } from "./utils";

export function checkMetaDescription(): Issue[] {
  const description = getMetaContent('meta[name="description"]');

  if (!description) {
    return [
      {
        id: "seo-meta-description",
        category: "seo",
        severity: "error",
        title: "Missing meta description",
        description:
          'Search engines show this text under your page title. Add <meta name="description" content="..."> with a summary of the page.',
        element: null,
      },
    ];
  }

  if (description.length < 50 || description.length > 160) {
    return [
      {
        id: "seo-meta-description-length",
        category: "seo",
        severity: "warning",
        title: "Meta description length",
        description: `The meta description has ${description.length} characters. Aim for 50 to 160 so it isn't too thin or cut off in search results.`,
        element: null,
      },
    ];
  }

  return [];
}
