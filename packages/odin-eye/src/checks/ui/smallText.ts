import type { Issue } from "../../types";

const MIN_FONT_SIZE = 12;
const IGNORED_TAGS = ["SCRIPT", "STYLE", "NOSCRIPT", "SUP", "SUB"];

export function checkSmallText(): Issue[] {
    const elements = Array.from(document.querySelectorAll("body *"));
    const issues: Issue[] = [];

    elements.forEach((element, index) => {
        if (IGNORED_TAGS.includes(element.tagName)) return;

        const hasOwnText = Array.from(element.childNodes).some(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
        );
        if (!hasOwnText) return;

        const rect = element.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const fontSize = parseFloat(getComputedStyle(element).fontSize);

        if (fontSize < MIN_FONT_SIZE) {
        issues.push({
            id: `ui-small-text-${index}`,
            category: "ui",
            severity: "warning",
            title: "Text too small",
            description: `This text is ${fontSize}px. Text below ${MIN_FONT_SIZE}px is hard to read, especially on mobile.`,
            element,
        });
        }
    });

    return issues;
}