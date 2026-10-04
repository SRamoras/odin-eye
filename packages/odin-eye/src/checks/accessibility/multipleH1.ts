import type { Issue } from "../../types";

export function checkMultipleH1(): Issue[] {
    const headings = Array.from(document.querySelectorAll("h1"));

    if (headings.length <= 1) return [];

    return headings.map((heading, index): Issue => ({
        id: `multiple-h1-${index}`,
        category: "accessibility",
        severity: "warning",
        title: "Multiple <h1> headings",
        description: `This page has ${headings.length} <h1> headings. Use a single <h1> for the main title and <h2>–<h6> for the sections below it.`,
        element: heading,
    }));
}