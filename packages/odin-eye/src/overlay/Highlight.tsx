import { useState } from "react";
import type { Issue } from "../types";
import { Tooltip } from "./Tooltip";

export function Highlight({ issue, element }: { issue: Issue; element: Element }) {
  const [hovered, setHovered] = useState(false);

  const rect = element.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return null;
  if (rect.bottom < 0 || rect.top > window.innerHeight) return null;
  if (rect.right < 0 || rect.left > window.innerWidth) return null;

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
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ top: Math.max(rect.top - 8, 4), left: Math.max(rect.left - 8, 4) }}
      >
        !
      </div>

      {hovered && <Tooltip issue={issue} rect={rect} />}
    </>
  );
}
