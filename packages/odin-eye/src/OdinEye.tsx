import { useEffect, useRef, useState } from "react";
import type { Issue } from "./types";
import { Highlight } from "./overlay/Highlight";
import { Panel } from "./panel/Panel";
import { runAllChecks } from "./checks";
import { ensureStyles } from "./styles";

const WATCHED_ATTRIBUTES = [
  "alt", "aria-label", "aria-labelledby", "content", "href", "id",
  "lang", "name", "rel", "src", "title", "for",
];

const BADGE_OFFSET = 8;
const BADGE_SIZE = 16;

function findHovered(issues: Issue[], x: number, y: number) {
  let found: Issue | null = null;
  let smallest = Infinity;

  for (const issue of issues) {
    const element = issue.element;
    if (!element || element === document.documentElement || element === document.body) continue;

    const rect = element.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;

    const badgeTop = Math.max(rect.top - BADGE_OFFSET, 4);
    const badgeLeft = Math.max(rect.left - BADGE_OFFSET, 4);
    const onBadge =
      x >= badgeLeft && x <= badgeLeft + BADGE_SIZE && y >= badgeTop && y <= badgeTop + BADGE_SIZE;
    const inside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

    const area = onBadge ? 0 : rect.width * rect.height;
    if ((onBadge || inside) && area < smallest) {
      found = issue;
      smallest = area;
    }
  }

  return found;
}

const isOwnNode = (node: Node) =>
  (node instanceof Element ? node : node.parentElement)?.closest("[data-odin-eye]") != null;

export function OdinEye() {
  const [mounted, setMounted] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [open, setOpen] = useState(false);
  const [, setFrame] = useState(0);
  const pointer = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    ensureStyles();
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

    const move = (event: MouseEvent) => {
      const target = event.target as Element | null;
      pointer.current = target?.closest(".oe-panel, .oe-launcher")
        ? null
        : { x: event.clientX, y: event.clientY };
      update();
    };
    const leave = (event: MouseEvent) => {
      if (event.relatedTarget) return;
      pointer.current = null;
      update();
    };
    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseout", leave);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseout", leave);
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", update, { capture: true });
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!mounted) return null;

  const errors = issues.filter((issue) => issue.severity === "error").length;
  const warnings = issues.length - errors;
  const hovered = pointer.current && findHovered(issues, pointer.current.x, pointer.current.y);

  return (
    <div data-odin-eye>
      {issues.map(
        (issue) =>
          issue.element && (
            <Highlight
              key={issue.id}
              issue={issue}
              element={issue.element}
              hovered={issue === hovered}
            />
          )
      )}

      {open && <Panel issues={issues} onClose={() => setOpen(false)} />}

      <button
        className="oe-launcher"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={`OdinEye: ${errors} errors, ${warnings} warnings`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span className="oe-count" data-severity="error">
          <span className="oe-dot" />
          {errors}
        </span>
        <span className="oe-count" data-severity="warning">
          <span className="oe-dot" />
          {warnings}
        </span>
      </button>
    </div>
  );
}
