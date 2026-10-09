import type { Issue } from "../../types";

const GENERIC_TEXTS = [
  "click here",
  "here",
  "read more",
  "more",
  "learn more",
  "link",
  "this",
  "clica aqui",
  "clique aqui",
  "aqui",
  "ler mais",
  "saber mais",
  "ver mais",
];

export function checkGenericLinkText(): Issue[] {
  const links = Array.from(document.querySelectorAll("a"));

  const genericLinks = links.filter((link) => {
    const text = link.textContent?.trim().toLowerCase() ?? "";
    return GENERIC_TEXTS.includes(text);
  });

  return genericLinks.map((link, index): Issue => ({
    id: `seo-generic-link-${index}`,
    category: "seo",
    severity: "warning",
    title: "Generic link text",
    description: `"${link.textContent?.trim()}" doesn't tell search engines or users where the link goes. Use text that describes the destination.`,
    element: link,
  }));
}
