import type { Issue } from "../../types";

const MIN_SIZE = 24;

export function checkSmallTargets(): Issue[] {
    const targets = Array.from(document.querySelectorAll('a[href], button, [role="button"]'));

    const small = targets.filter((target) => {
        const rect = target.getBoundingClientRect();
        if (!rect.width || !rect.height) return false;

        if (target.tagName === "A" && getComputedStyle(target).display === "inline") return false;

        return rect.width < MIN_SIZE || rect.height < MIN_SIZE;
    });

    return small.map((target, index): Issue => {
        const rect = target.getBoundingClientRect();

        return {
        id: `ui-small-target-${index}`,
        category: "ui",
        severity: "warning",
        title: "Touch target too small",
        description: `This is ${Math.round(rect.width)}×${Math.round(rect.height)}px. Clickable elements should be at least ${MIN_SIZE}×${MIN_SIZE}px so they're easy to tap on mobile.`,
        element: target,
        };
    });
}