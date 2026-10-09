"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PageBreaker.module.css";

type BreakId =
  | "lang"
  | "title"
  | "titleLength"
  | "description"
  | "descriptionLength"
  | "viewport"
  | "h1"
  | "noindex"
  | "openGraph"
  | "canonical";

const BREAKS: { id: BreakId; check: string; how: string }[] = [
  { id: "lang", check: "Page without language", how: "removes lang from <html>" },
  { id: "title", check: "Page without title", how: "empties <title>" },
  { id: "titleLength", check: "Page title length", how: 'sets the title to "Hi"' },
  { id: "description", check: "Missing meta description", how: "empties the description" },
  { id: "descriptionLength", check: "Meta description length", how: "shortens the description" },
  { id: "viewport", check: "Missing viewport meta tag", how: "empties the viewport tag" },
  { id: "h1", check: "Page without <h1>", how: "turns every <h1> into a <div>" },
  { id: "noindex", check: "Page is set to noindex", how: "adds a robots noindex tag" },
  { id: "openGraph", check: "Missing Open Graph tags", how: "empties og:title" },
  { id: "canonical", check: "Missing canonical link", how: "empties the canonical href" },
];

interface Original {
  lang: string | null;
  title: string;
  description: string | null;
  viewport: string | null;
  ogTitle: string | null;
  canonical: string | null;
}

const meta = (selector: string) => document.head.querySelector(selector);

function setAttribute(element: Element | null, name: string, value: string | null) {
  if (!element) return;
  if (value === null) element.removeAttribute(name);
  else element.setAttribute(name, value);
}

export function PageBreaker() {
  const [active, setActive] = useState<Set<BreakId>>(new Set());
  const original = useRef<Original | null>(null);
  const swappedHeadings = useRef<[HTMLElement, HTMLElement][]>([]);
  const robots = useRef<HTMLMetaElement | null>(null);

  useEffect(() => {
    original.current ??= {
      lang: document.documentElement.getAttribute("lang"),
      title: document.title,
      description: meta('meta[name="description"]')?.getAttribute("content") ?? null,
      viewport: meta('meta[name="viewport"]')?.getAttribute("content") ?? null,
      ogTitle: meta('meta[property="og:title"]')?.getAttribute("content") ?? null,
      canonical: meta('link[rel="canonical"]')?.getAttribute("href") ?? null,
    };
    const o = original.current;
    const on = (id: BreakId) => active.has(id);

    setAttribute(document.documentElement, "lang", on("lang") ? null : o.lang);
    document.title = on("title") ? "" : on("titleLength") ? "Hi" : o.title;
    setAttribute(
      meta('meta[name="description"]'),
      "content",
      on("description") ? "" : on("descriptionLength") ? "Too short." : o.description,
    );
    setAttribute(meta('meta[name="viewport"]'), "content", on("viewport") ? "" : o.viewport);
    setAttribute(meta('meta[property="og:title"]'), "content", on("openGraph") ? "" : o.ogTitle);
    setAttribute(meta('link[rel="canonical"]'), "href", on("canonical") ? "" : o.canonical);

    if (on("noindex") && !robots.current) {
      robots.current = document.createElement("meta");
      robots.current.name = "robots";
      robots.current.content = "noindex";
      document.head.appendChild(robots.current);
    } else if (!on("noindex") && robots.current) {
      robots.current.remove();
      robots.current = null;
    }

    if (on("h1") && swappedHeadings.current.length === 0) {
      swappedHeadings.current = Array.from(document.querySelectorAll<HTMLElement>("main h1")).map(
        (heading) => {
          const standIn = document.createElement("div");
          standIn.className = heading.className;
          standIn.innerHTML = heading.innerHTML;
          heading.replaceWith(standIn);
          return [heading, standIn];
        },
      );
    } else if (!on("h1")) {
      swappedHeadings.current.forEach(([heading, standIn]) => standIn.replaceWith(heading));
      swappedHeadings.current = [];
    }
  }, [active]);

  useEffect(
    () => () => {
      const o = original.current;
      if (!o) return;
      setAttribute(document.documentElement, "lang", o.lang);
      document.title = o.title;
      setAttribute(meta('meta[name="description"]'), "content", o.description);
      setAttribute(meta('meta[name="viewport"]'), "content", o.viewport);
      setAttribute(meta('meta[property="og:title"]'), "content", o.ogTitle);
      setAttribute(meta('link[rel="canonical"]'), "href", o.canonical);
      robots.current?.remove();
      swappedHeadings.current.forEach(([heading, standIn]) => standIn.replaceWith(heading));
    },
    [],
  );

  const toggle = (id: BreakId) =>
    setActive((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className={styles.breaker}>
      <ul className={styles.list}>
        {BREAKS.map(({ id, check, how }) => (
          <li key={id}>
            <label className={styles.row}>
              <input type="checkbox" checked={active.has(id)} onChange={() => toggle(id)} />
              <span className={styles.check}>{check}</span>
              <span className={styles.how}>{how}</span>
            </label>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={styles.reset}
        onClick={() => setActive(new Set())}
        disabled={active.size === 0}
      >
        Restore the page
      </button>
    </div>
  );
}
