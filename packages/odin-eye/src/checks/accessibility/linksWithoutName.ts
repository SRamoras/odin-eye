import type { Issue } from "../../types";

export function checkLinksWithoutName(): Issue[] {
    const links = Array.from(document.querySelectorAll("a"));

    const linksWithoutName = links.filter((link) => {
        const hasText = link.textContent?.trim();
        const hasAriaLabel = link.getAttribute("aria-label")?.trim();
        const hasImageWithAlt = link.querySelector("img[alt]")?.getAttribute("alt")?.trim();

        return !hasText && !hasAriaLabel && !hasImageWithAlt;
    });

    return linksWithoutName.map((link, index): Issue => ({
        id: `link-${index}`,
        category: "accessibility",
        severity: "error",
        title: "Link without accessible name",
        description: "Screen readers can't tell where this link goes. Add visible text, an aria-label, or an image with alt text inside it.",
        element: link,
    }));
}