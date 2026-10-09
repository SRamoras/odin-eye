import type { Issue } from "../../types";

export function checkBrokenImages(): Issue[] {
  const images = Array.from(document.querySelectorAll("img"));

  const broken = images.filter((img) => {
    const src = img.currentSrc || img.src;
    if (!src || src.includes(".svg")) return false;
    return img.complete && img.naturalWidth === 0;
  });

  return broken.map((img, index): Issue => ({
    id: `ui-broken-image-${index}`,
    category: "ui",
    severity: "error",
    title: "Broken image",
    description: `This image failed to load. Check that the path is correct: ${img.getAttribute("src")}`,
    element: img,
  }));
}
