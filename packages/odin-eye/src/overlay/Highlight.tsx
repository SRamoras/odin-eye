import type { Issue } from "../types";

export function Highlight({ issue }: { issue: Issue }) {
  const rect = issue.element.getBoundingClientRect();
  const color = issue.severity === "error" ? "#ef4444" : "#f59e0b";

  return (
    <div
      style={{
        position: "fixed",
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        border: `2px solid ${color}`,
        borderRadius: 4,
        pointerEvents: "none",
        zIndex: 2147483646,
      }}
    />
  );
}