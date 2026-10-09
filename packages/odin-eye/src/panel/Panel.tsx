import { useState } from "react";
import type { Category, Issue } from "../types";
import { Logo } from "../Logo";

const LABELS: Record<Category, string> = {
  accessibility: "Accessibility",
  ui: "UI",
  seo: "SEO",
};

type Filter = "all" | Category;

export function Panel({ issues, onClose }: { issues: Issue[]; onClose: () => void }) {
  const [filter, setFilter] = useState<Filter>("all");

  const categories = Array.from(new Set(issues.map((issue) => issue.category)));
  const filters: Filter[] = ["all", ...categories];

  const visible = filter === "all" ? issues : issues.filter((issue) => issue.category === filter);
  const count = (f: Filter) =>
    f === "all" ? issues.length : issues.filter((issue) => issue.category === f).length;

  return (
    <div className="oe-panel" role="dialog" aria-label="OdinEye issues">
      <div className="oe-header">
        <div className="oe-brand">
          <Logo size={18} />
          OdinEye
          <span>
            {issues.length} {issues.length === 1 ? "issue" : "issues"}
          </span>
        </div>
        <button className="oe-close" onClick={onClose} aria-label="Close">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {issues.length > 0 && (
        <div className="oe-tabs">
          {filters.map((f) => (
            <button
              key={f}
              className="oe-tab"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : LABELS[f]}
              <span>{count(f)}</span>
            </button>
          ))}
        </div>
      )}

      <div className="oe-list" data-lenis-prevent>
        {visible.length === 0 && <div className="oe-empty">No issues found</div>}

        {visible.map((issue) => (
          <button
            key={issue.id}
            className="oe-item"
            data-severity={issue.severity}
            data-page={issue.element ? undefined : ""}
            onClick={() => issue.element?.scrollIntoView({ behavior: "smooth", block: "center" })}
          >
            <span className="oe-dot" />
            <span>
              <span>{issue.title}</span>
              <span className="oe-item-description">{issue.description}</span>
              <span className="oe-meta">
                {LABELS[issue.category]} · {issue.element ? "element" : "page"}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
