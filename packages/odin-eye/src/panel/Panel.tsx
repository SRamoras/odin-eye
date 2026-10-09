import { useState } from "react";
import type { Category, Issue } from "../types";

const COLORS = { error: "#ef4444", warning: "#f59e0b" };
const LABELS: Record<Category, string> = {
  accessibility: "Accessibility",
  ui: "UI",
  seo: "SEO",
};

type Filter = "all" | Category;

export function Panel({ issues }: { issues: Issue[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  // só mostra separadores para as categorias que têm erros
  const categories = Array.from(new Set(issues.map((issue) => issue.category)));
  const filters: Filter[] = ["all", ...categories];

  const visible = filter === "all" ? issues : issues.filter((issue) => issue.category === filter);
  const count = (f: Filter) =>
    f === "all" ? issues.length : issues.filter((issue) => issue.category === f).length;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 60,
        right: 16,
        width: 360,
        maxHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        background: "#111",
        color: "#fff",
        border: "1px solid #333",
        borderRadius: 12,
        fontFamily: "system-ui, sans-serif",
        fontSize: 13,
        lineHeight: 1.45,
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.5)",
        overflow: "hidden",
        zIndex: 2147483647,
      }}
    >
      {/* separadores */}
      <div style={{ display: "flex", flexWrap: "wrap", flexShrink: 0, gap: 6, padding: 10, borderBottom: "1px solid #333" }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "4px 10px",
              border: "none",
              borderRadius: 999,
              background: filter === f ? "#fff" : "#222",
              color: filter === f ? "#111" : "#ccc",
              font: "inherit",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            {f === "all" ? "All" : LABELS[f]} {count(f)}
          </button>
        ))}
      </div>

      {/* lista */}
      <div
        data-lenis-prevent
        style={{ flex: 1, minHeight: 0, overflowY: "auto", overscrollBehavior: "contain" }}
      >
        {visible.length === 0 && (
          <div style={{ padding: 16, color: "#888" }}>No issues found 🎉</div>
        )}

        {visible.map((issue) => (
          <button
            key={issue.id}
            onClick={() =>
              issue.element?.scrollIntoView({ behavior: "smooth", block: "center" })
            }
            style={{
              display: "flex",
              gap: 10,
              width: "100%",
              padding: "10px 12px",
              border: "none",
              borderBottom: "1px solid #222",
              background: "transparent",
              color: "inherit",
              font: "inherit",
              textAlign: "left",
              cursor: issue.element ? "pointer" : "default",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 8,
                height: 8,
                marginTop: 5,
                borderRadius: "50%",
                background: COLORS[issue.severity],
              }}
            />
            <span>
              <span style={{ display: "block", fontWeight: 600 }}>{issue.title}</span>
              <span style={{ display: "block", color: "#aaa" }}>{issue.description}</span>
              <span
                style={{
                  display: "block",
                  marginTop: 4,
                  fontSize: 11,
                  color: "#777",
                  textTransform: "uppercase",
                }}
              >
                {LABELS[issue.category]} · {issue.element ? "element" : "page"}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}