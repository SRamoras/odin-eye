import type { Issue } from "../../types";

export function checkTitleLength(): Issue[] {
    const title = document.title.trim();

    if (!title) return [];
    if (title.length >= 10 && title.length <= 60) return [];

    return [
        {
        id: "seo-title-length",
        category: "seo",
        severity: "warning",
        title: "Page title length",
        description: `The page title has ${title.length} characters. Aim for 10 to 60 so it's descriptive and isn't cut off in search results.`,
        element: null,
        },
    ];
}