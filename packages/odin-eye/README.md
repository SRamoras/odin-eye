<div align="center">

# OdinEye

**Find accessibility, SEO and layout issues directly on your page while you develop.**

[![npm version](https://img.shields.io/npm/v/odin-eye?color=111&label=npm)](https://www.npmjs.com/package/odin-eye)
[![bundle size](https://img.shields.io/bundlephobia/minzip/odin-eye?color=111&label=size)](https://bundlephobia.com/package/odin-eye)
[![license](https://img.shields.io/npm/l/odin-eye?color=111)](https://github.com/SRamoras/odin-eye/blob/main/LICENSE)

[Website](https://odin-eye.vercel.app) · [Playground](https://odin-eye.vercel.app/playground) · [GitHub](https://github.com/SRamoras/odin-eye)

<br>

<a href="https://odin-eye.vercel.app"><img src="https://raw.githubusercontent.com/SRamoras/odin-eye/main/.github/assets/demo.webp" alt="OdinEye marking issues on a live page" width="100%"></a>

</div>

---

OdinEye is a React component you drop into your app. It scans the page, outlines every element with a problem and explains how to fix it, right where the problem is. No browser extension, no config, no separate report to open.

- **Marks the problem on the page.** Each issue gets an outline and a badge on the element itself.
- **Explains the fix.** Hover the marked area to read what is wrong and what to change.
- **Lists everything in one panel.** Click the button in the bottom right corner to see all issues, filtered by category. Click one to scroll to it.
- **Keeps up with your app.** It checks again when you change route, when content changes and when images finish loading.
- **Stays out of the way.** The page stays clickable, and its styles are scoped so they never touch yours.

## Install

```bash
npm install -D odin-eye
```

```bash
pnpm add -D odin-eye
```

```bash
yarn add -D odin-eye
```

```bash
bun add -d odin-eye
```

Requires React 18 or newer.

## Usage

Render `<OdinEye />` once, next to the rest of your app, behind a development check so it never reaches your users.

### Next.js (App Router)

```tsx
// app/layout.tsx
import { OdinEye } from "odin-eye";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <OdinEye />}
      </body>
    </html>
  );
}
```

The package is already marked with `"use client"`, so you can use it from a Server Component layout.

### Next.js (Pages Router)

```tsx
// pages/_app.tsx
import type { AppProps } from "next/app";
import { OdinEye } from "odin-eye";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      {process.env.NODE_ENV === "development" && <OdinEye />}
    </>
  );
}
```

### Vite

```tsx
// src/App.tsx
import { OdinEye } from "odin-eye";

export default function App() {
  return (
    <>
      {/* your app */}
      {import.meta.env.DEV && <OdinEye />}
    </>
  );
}
```

### Remix / React Router

```tsx
// app/root.tsx
import { Outlet } from "react-router";
import { OdinEye } from "odin-eye";

export default function App() {
  return (
    <>
      <Outlet />
      {import.meta.env.DEV && <OdinEye />}
    </>
  );
}
```

### Gatsby

```tsx
// src/components/layout.tsx
import { OdinEye } from "odin-eye";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {process.env.NODE_ENV === "development" && <OdinEye />}
    </>
  );
}
```

> **Why the development check?** Installing with `-D` only records OdinEye as a dev dependency. If `<OdinEye />` is rendered without a check, it still ends up in your production bundle. The check is what keeps it out.

## What it checks

🔴 error · 🟡 warning

### Accessibility

| Check | Severity |
| --- | --- |
| Button without accessible name | 🔴 |
| Link without accessible name | 🔴 |
| Image without alt text | 🔴 |
| Form field without label | 🔴 |
| Duplicate id | 🔴 |
| Page without language (`<html lang>`) | 🔴 |
| Page without title | 🔴 |
| Skipped heading level | 🟡 |
| Multiple `<h1>` headings | 🟡 |

### SEO

| Check | Severity |
| --- | --- |
| Missing meta description | 🔴 |
| Missing viewport meta tag | 🔴 |
| Page without `<h1>` | 🔴 |
| Meta description length | 🟡 |
| Page title length | 🟡 |
| Missing canonical link | 🟡 |
| Missing Open Graph tags | 🟡 |
| Link without destination | 🟡 |
| Generic link text ("click here", "read more") | 🟡 |

### UI and layout

| Check | Severity |
| --- | --- |
| Element wider than the page (horizontal scroll) | 🔴 |
| Broken image | 🔴 |
| Distorted image | 🟡 |
| Image larger than needed | 🟡 |
| Touch target too small | 🟡 |
| Text too small | 🟡 |

## How it works

OdinEye runs in the browser only. On the server it renders nothing, so it is safe with SSR and static generation. Once mounted it reads the live DOM, runs every check and draws its markers in a fixed layer on top of the page. Its own elements are ignored by the checks.

It watches the page for changes and checks again after things settle, so client-side navigation and content loaded later are picked up without a reload.

OdinEye has no options yet: render it and it works.

## Compatibility

| | |
| --- | --- |
| React | 18 and up |
| Next.js | App Router and Pages Router |
| Vite | React templates |
| Remix / React Router | ✓ |
| Gatsby | ✓ |
| TypeScript | Types included |

## License

[MIT](https://github.com/SRamoras/odin-eye/blob/main/LICENSE)

The interface uses the [Geist](https://vercel.com/font) typeface, licensed under the [SIL Open Font License 1.1](https://github.com/vercel/geist-font/blob/main/OFL.txt).
