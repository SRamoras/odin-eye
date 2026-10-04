import { useEffect, useState } from "react";
import type { Issue } from "../types";
import { Tooltip } from "./Tooltip";

const COLORS = { error: "#ef4444", warning: "#f59e0b" };

export function Highlight({ issue }: { issue: Issue }) {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const update = () => setRect(issue.element.getBoundingClientRect());

    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [issue.element]);

  // ainda não mediu, ou o elemento está escondido
  if (!rect || (rect.width === 0 && rect.height === 0)) return null;

  const color = COLORS[issue.severity];

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          border: `2px solid ${color}`,
          background: hovered ? `${color}22` : "transparent",
          borderRadius: 4,
          pointerEvents: "none",
          zIndex: 2147483645,
        }}
      />

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "fixed",
          top: Math.max(rect.top - 8, 4),
          left: Math.max(rect.left - 8, 4),
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: color,
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
          fontSize: 11,
          fontWeight: 700,
          lineHeight: "16px",
          textAlign: "center",
          cursor: "help",
          zIndex: 2147483646,
        }}
      >
        !
      </div>

      {hovered && <Tooltip issue={issue} rect={rect} color={color} />}
    </>
  );
}