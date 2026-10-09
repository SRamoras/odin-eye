import type { Issue } from "../types";

const WIDTH = 280;
const SPACE_NEEDED = 170;

export function Tooltip({ issue, rect }: { issue: Issue; rect: DOMRect }) {
  const left = Math.min(Math.max(rect.left, 8), window.innerWidth - WIDTH - 8);

  const showAbove = rect.bottom + SPACE_NEEDED > window.innerHeight && rect.top > SPACE_NEEDED;
  const vertical = showAbove
    ? { bottom: window.innerHeight - rect.top + 8 }
    : { top: Math.max(Math.min(rect.bottom + 8, window.innerHeight - SPACE_NEEDED), 8) };

  return (
    <div className="oe-tooltip" data-severity={issue.severity} style={{ left, ...vertical }}>
      <div className="oe-tooltip-title">
        <span className="oe-dot" />
        {issue.title}
      </div>
      <div className="oe-item-description">{issue.description}</div>
      <div className="oe-meta">
        {issue.category} · {issue.severity}
      </div>
    </div>
  );
}
