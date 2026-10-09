import type { Issue } from "../../types";

export function checkOversizedImages(): Issue[] {
  const images = Array.from(document.querySelectorAll("img"));
  const issues: Issue[] = [];

  images.forEach((img, index) => {
    const src = img.currentSrc || img.src;
    if (!img.naturalWidth || src.includes(".svg")) return;

    const rect = img.getBoundingClientRect();
    if (!rect.width) return;

    const neededWidth = Math.round(rect.width * window.devicePixelRatio);

    if (img.naturalWidth > neededWidth * 2 && img.naturalWidth - neededWidth > 400) {
      issues.push({
        id: `ui-oversized-image-${index}`,
        category: "ui",
        severity: "warning",
        title: "Image larger than needed",
        description: `This image is ${img.naturalWidth}px wide but only needs about ${neededWidth}px here. Resize it or serve a smaller version to load faster.`,
        element: img,
      });
    }
  });

  return issues;
}
