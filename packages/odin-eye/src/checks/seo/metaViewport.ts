import type { Issue } from "../../types";
import { getMetaContent } from "./utils";

export function checkMetaViewport(): Issue[] {
  if (getMetaContent('meta[name="viewport"]')) return [];

  return [
    {
      id: "seo-meta-viewport",
      category: "seo",
      severity: "error",
      title: "Missing viewport meta tag",
      description:
        'Without it the page doesn\'t adapt to mobile screens, which hurts mobile rankings. Add <meta name="viewport" content="width=device-width, initial-scale=1">.',
      element: null,
    },
  ];
}
