import type { Issue } from "../../types";

const KEEPS_RATIO = ["cover", "contain", "none", "scale-down"];

export function checkDistortedImages(): Issue[] {
    const images = Array.from(document.querySelectorAll("img"));

    const distorted = images.filter((img) => {
        if (!img.naturalWidth || !img.naturalHeight) return false;

        const rect = img.getBoundingClientRect();
        if (!rect.width || !rect.height) return false;

        if (KEEPS_RATIO.includes(getComputedStyle(img).objectFit)) return false;

        const realRatio = img.naturalWidth / img.naturalHeight;
        const shownRatio = rect.width / rect.height;

        return Math.abs(realRatio - shownRatio) / realRatio > 0.1;
    });

    return distorted.map((img, index): Issue => ({
        id: `ui-distorted-image-${index}`,
        category: "ui",
        severity: "warning",
        title: "Distorted image",
        description:
        "This image is stretched: its size on screen doesn't match its real proportions. Set only the width (or height), or use object-fit: cover.",
        element: img,
    }));
}