export type Category = "accessibility" | "ui" | "seo";
export type Severity = "error" | "warning";

export interface Issue {
  id: string;
  category: Category;
  severity: Severity;
  title: string;
  description: string;
  element: Element | null;
}