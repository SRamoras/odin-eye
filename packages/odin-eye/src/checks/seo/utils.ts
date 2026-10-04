export function getMetaContent(selector: string): string {
  return document.querySelector(selector)?.getAttribute("content")?.trim() ?? "";
}