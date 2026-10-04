import type { Issue } from "../../types";
import { getMetaContent } from "./utils";

const REQUIRED = ["og:title", "og:description", "og:image"];

export function checkOpenGraph(): Issue[] {
    const missing = REQUIRED.filter((property) => !getMetaContent(`meta[property="${property}"]`));

    if (missing.length === 0) return [];

    return [
        {
        id: "seo-open-graph",
        category: "seo",
        severity: "warning",
        title: "Missing Open Graph tags",
        description: `Missing: ${missing.join(", ")}. Without these, links to this page have no proper preview on LinkedIn, WhatsApp and other social apps.`,
        element: null,
        },
    ];
}