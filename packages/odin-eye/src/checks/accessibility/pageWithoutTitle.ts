import type { Issue } from "../../types";

export function checkPageWithoutTitle(): Issue[] {
    if (document.title.trim()) return [];

    return [
        {
        id: "page-title",
        category: "accessibility",
        severity: "error",
        title: "Page without title",
        description:
            "The page has no <title>, so screen reader users and browser tabs can't identify it. Add a short, descriptive title.",
        element: document.documentElement,
        },
    ];
}