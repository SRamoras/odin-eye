import { useEffect, useState } from "react";
import type { Issue } from "./types";
import { Highlight } from "./overlay/Highlight";
import { runAllChecks } from "./checks";

export function OdinEye() {
  const [mounted, setMounted] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    setMounted(true);
    setIssues(runAllChecks());
  }, []);

  if (!mounted) return null;

  return (
    <>
      {issues.map(
        (issue) =>
          issue.element && (
            <Highlight key={issue.id} issue={issue} element={issue.element} />
          )
      )}

      <div
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          padding: "8px 12px",
          background: "#111",
          color: "#fff",
          borderRadius: 8,
          fontSize: 13,
          zIndex: 2147483647,
        }}
      >
        👁️ {issues.length} {issues.length === 1 ? "issue" : "issues"}
      </div>
    </>
  );
}