import type { Issue } from "../../types";

export function checkHorizontalOverflow(): Issue[] {
    const root = document.documentElement;
    const pageWidth = root.clientWidth;

    if (root.scrollWidth <= pageWidth) return [];

    const elements = Array.from(document.querySelectorAll("body *"));

    const overflowing = new Set(
        elements.filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.right + window.scrollX > pageWidth + 1;
        })
    );

    const culprits = Array.from(overflowing).filter(
        (element) => !element.parentElement || !overflowing.has(element.parentElement)
    );

    return culprits.map((element, index): Issue => ({
        id: `ui-horizontal-overflow-${index}`,
        category: "ui",
        severity: "error",
        title: "Element wider than the page",
        description:
        "This element extends past the right edge and makes the page scroll sideways. Check for fixed widths, long unbroken text or negative margins.",
        element,
    }));
}