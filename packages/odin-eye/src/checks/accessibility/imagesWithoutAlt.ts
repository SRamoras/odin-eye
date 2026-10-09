import type { Issue } from "../../types";

export function checkImagesWithoutAlt(): Issue[] {
  const images = Array.from(document.querySelectorAll("img"));
  const withoutAlt = images.filter((img) => !img.hasAttribute("alt"));

  return withoutAlt.map((img, i): Issue => ({
    id: `img-alt-${i}`,
    category: "accessibility",
    severity: "error",
    title: "Image without alt text",
    description:
      "Screen readers can't describe this image. Add an alt attribute describing it, or alt=\"\" if it's purely decorative.",
    element: img,
  }));
}
