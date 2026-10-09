import type { Issue } from "../types";
import { Tooltip } from "./Tooltip";

interface HighlightProps {
  issue: Issue;
  element: Element;
  hovered: boolean;
}

export function Highlight({ issue, element, hovered }: HighlightProps) {
  const rect = element.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return null;

  if (rect.top > window.innerHeight || rect.left > window.innerWidth) return null;

  return (
    <>
      <div
        className="oe-box"
        data-severity={issue.severity}
        data-hovered={hovered ? "" : undefined}
        style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
      />

      <div
        className="oe-badge"
        data-severity={issue.severity}
        style={{ top: Math.max(rect.top - 8, 4), left: Math.max(rect.left - 8, 4) }}
      >
        !
      </div>

      {hovered && <Tooltip issue={issue} rect={rect} />}
    </>
  );
}
