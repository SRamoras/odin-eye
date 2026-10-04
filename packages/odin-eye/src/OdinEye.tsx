import { useEffect, useState } from "react";
import type { Issue } from "./types";
import { Highlight } from "./overlay/Highlight";
import { Panel } from "./panel/Panel";
import { runAllChecks } from "./checks";

export function OdinEye() {
  const [mounted, setMounted] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    const run = () => setIssues(runAllChecks());

    run();
    // volta a analisar quando as imagens acabarem de carregar
    window.addEventListener("load", run);
    return () => window.removeEventListener("load", run);
  }, []);

  if (!mounted) return null;

  const errors = issues.filter((issue) => issue.severity === "error").length;
  const warnings = issues.length - errors;

  return (
    <div data-odin-eye>
      {issues.map(
        (issue) =>
          issue.element && (
            <Highlight key={issue.id} issue={issue} element={issue.element} />
          )
      )}

      {open && <Panel issues={issues} />}

      <button
        onClick={() => setOpen((value) => !value)}
        aria-label={`OdinEye: ${errors} errors, ${warnings} warnings`}
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          border: "1px solid #333",
          borderRadius: 8,
          background: "#111",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
          fontSize: 13,
          cursor: "pointer",
          zIndex: 2147483647,
        }}
      >
        <span>👁️</span>
        <span style={{ color: "#ef4444" }}>● {errors}</span>
        <span style={{ color: "#f59e0b" }}>● {warnings}</span>
      </button>
    </div>
  );
}