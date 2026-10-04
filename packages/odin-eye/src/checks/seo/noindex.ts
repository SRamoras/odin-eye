import type { Issue } from "../../types";
import { getMetaContent } from "./utils";

export function checkNoindex(): Issue[] {
    const robots = getMetaContent('meta[name="robots"]').toLowerCase();

    if (!robots.includes("noindex")) return [];

    return [
        {
        id: "seo-noindex",
        category: "seo",
        severity: "warning",
        title: "Page is set to noindex",
        description:
            "A robots meta tag with noindex keeps this page out of search results. Remove it if the page should appear on Google.",
        element: null,
        },
    ];
}