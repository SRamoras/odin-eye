import { useEffect, useState } from "react";
import type { Issue } from "./types";
import { Highlight } from "./overlay/Highlight";
import { Panel } from "./panel/Panel";
import { runAllChecks } from "./checks";

const WATCHED_ATTRIBUTES = [
  "alt", "aria-label", "aria-labelledby", "content", "href", "id",
  "lang", "name", "rel", "src", "title", "for",
];

const isOwnNode = (node: Node) =>
  (node instanceof Element ? node : node.parentElement)?.closest("[data-odin-eye]") != null;

export function OdinEye() {
  const [mounted, setMounted] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [open, setOpen] = useState(false);
  const [, setFrame] = useState(0);

  useEffect(() => {
    setMounted(true);

    const run = () => setIssues(runAllChecks());

    let timer = 0;
    let firstChange = 0;
    const schedule = () => {
      const now = performance.now();
      if (!timer) firstChange = now;
      clearTimeout(timer);
      const wait = Math.max(0, Math.min(300, firstChange + 1000 - now));
      timer = window.setTimeout(() => {
        timer = 0;
        run();
      }, wait);
    };

    const observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => !isOwnNode(mutation.target))) schedule();
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: WATCHED_ATTRIBUTES,
    });

    run();
    window.addEventListener("load", run);
    window.addEventListener("popstate", schedule);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      window.removeEventListener("load", run);
      window.removeEventListener("popstate", schedule);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setFrame((value) => value + 1);
      });
    };

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(document.body);
    window.addEventListener("scroll", update, { capture: true, passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", update, { capture: true });
      window.removeEventListener("resize", update);
    };
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