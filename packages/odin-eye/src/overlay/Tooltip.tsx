import type { Issue } from "../types";

const WIDTH = 280;
const SPACE_NEEDED = 170;

interface TooltipProps {
  issue: Issue;
  rect: DOMRect;
  color: string;
}

export function Tooltip({ issue, rect, color }: TooltipProps) {
  // não deixa o tooltip sair pelos lados do ecrã
  const left = Math.min(Math.max(rect.left, 8), window.innerWidth - WIDTH - 8);

  // se não houver espaço em baixo, aparece por cima do elemento
  const showAbove = rect.bottom + SPACE_NEEDED > window.innerHeight && rect.top > SPACE_NEEDED;
  const vertical = showAbove
    ? { bottom: window.innerHeight - rect.top + 8 }
    : { top: Math.min(rect.bottom + 8, window.innerHeight - SPACE_NEEDED) };

  return (
    <div
      style={{
        position: "fixed",
        left,
        ...vertical,
        width: WIDTH,
        padding: 12,
        background: "#111",
        color: "#fff",
        border: `1px solid ${color}`,
        borderRadius: 8,
        fontFamily: "system-ui, sans-serif",
        fontSize: 13,
        lineHeight: 1.45,
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
        pointerEvents: "none",
        zIndex: 2147483647,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 4, color }}>{issue.title}</div>
      <div style={{ color: "#d4d4d4" }}>{issue.description}</div>
      <div style={{ marginTop: 8, fontSize: 11, color: "#888", textTransform: "uppercase" }}>
        {issue.category} · {issue.severity}
      </div>
    </div>
  );
}