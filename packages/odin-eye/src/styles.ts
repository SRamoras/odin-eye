import geist from "./assets/Geist-Regular.otf";

const CSS = `
@font-face {
  font-family: "OdinEye Geist";
  src: url(${geist}) format("opentype");
  font-weight: 400;
  font-display: swap;
}

[data-odin-eye] {
  --oe-card: #111111;
  --oe-muted: #171717;
  --oe-border: #262626;
  --oe-border-strong: #333333;
  --oe-fg: #fafafa;
  --oe-muted-fg: #a1a1a1;
  --oe-faint: #737373;
  --oe-error: #ef8a74;
  --oe-error-soft: #3a2622;
  --oe-warning: #d9a441;
  --oe-warning-soft: #3a2f1b;
  --oe-font: "OdinEye Geist", ui-sans-serif, system-ui, -apple-system, sans-serif;
}

[data-odin-eye] *,
[data-odin-eye] *::before,
[data-odin-eye] *::after {
  box-sizing: border-box;
}

[data-odin-eye] [data-severity="error"] {
  --oe-c: var(--oe-error);
  --oe-c-soft: var(--oe-error-soft);
}

[data-odin-eye] [data-severity="warning"] {
  --oe-c: var(--oe-warning);
  --oe-c-soft: var(--oe-warning-soft);
}

[data-odin-eye] button {
  margin: 0;
  appearance: none;
  font: inherit;
  letter-spacing: inherit;
  text-transform: none;
}

[data-odin-eye] button:focus-visible {
  outline: 2px solid var(--oe-fg);
  outline-offset: 2px;
}

[data-odin-eye] .oe-launcher {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 2147483647;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid var(--oe-border);
  border-radius: 10px;
  background: var(--oe-card);
  color: var(--oe-fg);
  font-family: var(--oe-font);
  font-size: 13px;
  line-height: 1;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  cursor: pointer;
  transition: border-color 120ms, background-color 120ms;
}

[data-odin-eye] .oe-launcher:hover,
[data-odin-eye] .oe-launcher[aria-expanded="true"] {
  border-color: var(--oe-border-strong);
  background: var(--oe-muted);
}

[data-odin-eye] .oe-launcher svg {
  flex-shrink: 0;
}

[data-odin-eye] .oe-count {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-variant-numeric: tabular-nums;
}

[data-odin-eye] .oe-dot {
  flex-shrink: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--oe-c);
  box-shadow: 0 0 0 3px var(--oe-c-soft);
}

[data-odin-eye] .oe-panel {
  position: fixed;
  bottom: 62px;
  right: 16px;
  z-index: 2147483647;
  display: flex;
  flex-direction: column;
  width: min(380px, calc(100vw - 32px));
  max-height: min(70vh, 560px);
  overflow: hidden;
  border: 1px solid var(--oe-border);
  border-radius: 12px;
  background: var(--oe-card);
  color: var(--oe-fg);
  font-family: var(--oe-font);
  font-size: 13px;
  line-height: 1.45;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45);
  animation: oe-in 140ms ease-out;
}

@keyframes oe-in {
  from { opacity: 0; transform: translateY(6px); }
}

@media (prefers-reduced-motion: reduce) {
  [data-odin-eye] .oe-panel { animation: none; }
}

[data-odin-eye] .oe-header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 10px 12px 14px;
  border-bottom: 1px solid var(--oe-border);
}

[data-odin-eye] .oe-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  letter-spacing: -0.02em;
}

[data-odin-eye] .oe-brand span {
  margin-left: 2px;
  letter-spacing: normal;
}

[data-odin-eye] .oe-brand span {
  color: var(--oe-faint);
  font-size: 12px;
}

[data-odin-eye] .oe-close {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--oe-muted-fg);
  cursor: pointer;
}

[data-odin-eye] .oe-close:hover {
  background: var(--oe-muted);
  color: var(--oe-fg);
}

[data-odin-eye] .oe-tabs {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 4px;
  padding: 8px 10px;
  border-bottom: 1px solid var(--oe-border);
}

[data-odin-eye] .oe-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 10px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: var(--oe-muted-fg);
  font-size: 12px;
  cursor: pointer;
}

[data-odin-eye] .oe-tab:hover {
  background: var(--oe-muted);
  color: var(--oe-fg);
}

[data-odin-eye] .oe-tab[aria-pressed="true"] {
  background: var(--oe-fg);
  color: var(--oe-card);
}

[data-odin-eye] .oe-tab span {
  opacity: 0.6;
  font-variant-numeric: tabular-nums;
}

[data-odin-eye] .oe-list {
  flex: 1;
  min-height: 0;
  padding: 4px;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--oe-border-strong) transparent;
}

[data-odin-eye] .oe-item {
  display: grid;
  grid-template-columns: 7px 1fr;
  gap: 12px;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

[data-odin-eye] .oe-item:hover {
  background: var(--oe-muted);
}

[data-odin-eye] .oe-item[data-page] {
  cursor: default;
}

[data-odin-eye] .oe-item .oe-dot {
  margin-top: 6px;
}

[data-odin-eye] .oe-item-description {
  display: block;
  margin-top: 2px;
  color: var(--oe-muted-fg);
}

[data-odin-eye] .oe-meta {
  display: block;
  margin-top: 6px;
  color: var(--oe-faint);
  font-size: 11px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

[data-odin-eye] .oe-empty {
  padding: 32px 16px;
  color: var(--oe-muted-fg);
  text-align: center;
}

[data-odin-eye] .oe-box {
  position: fixed;
  z-index: 2147483645;
  border: 1.5px solid var(--oe-c);
  border-radius: 4px;
  pointer-events: none;
}

[data-odin-eye] .oe-box[data-hovered] {
  background: color-mix(in srgb, var(--oe-c) 14%, transparent);
}

[data-odin-eye] .oe-badge {
  position: fixed;
  z-index: 2147483646;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--oe-c);
  box-shadow: 0 0 0 2px rgba(10, 10, 10, 0.85);
  color: #0a0a0a;
  font-family: var(--oe-font);
  font-size: 11px;
  line-height: 16px;
  text-align: center;
  cursor: help;
}

[data-odin-eye] .oe-tooltip {
  position: fixed;
  z-index: 2147483647;
  width: 280px;
  padding: 12px 14px;
  border: 1px solid var(--oe-border);
  border-radius: 10px;
  background: var(--oe-card);
  color: var(--oe-fg);
  font-family: var(--oe-font);
  font-size: 13px;
  line-height: 1.45;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
  pointer-events: none;
}

[data-odin-eye] .oe-tooltip-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
`;

export function ensureStyles() {
  if (document.getElementById("odin-eye-styles")) return;

  const style = document.createElement("style");
  style.id = "odin-eye-styles";
  style.setAttribute("data-odin-eye", "");
  style.textContent = CSS;
  document.head.appendChild(style);
}
