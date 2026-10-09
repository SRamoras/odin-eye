<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/assets/logo-dark.svg">
  <img src=".github/assets/logo-light.svg" alt="" width="64" height="64">
</picture>

# OdinEye

**See accessibility, SEO and layout problems on your page while you build it.**

[![CI](https://github.com/SRamoras/odin-eye/actions/workflows/ci.yml/badge.svg)](https://github.com/SRamoras/odin-eye/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/odin-eye?color=111&label=npm)](https://www.npmjs.com/package/odin-eye)
[![bundle size](https://img.shields.io/bundlephobia/minzip/odin-eye?color=111&label=size)](https://bundlephobia.com/package/odin-eye)
[![license](https://img.shields.io/github/license/SRamoras/odin-eye?color=111)](LICENSE)

[Website](https://odin-eye.vercel.app) · [Playground](https://odin-eye.vercel.app/playground) · [npm](https://www.npmjs.com/package/odin-eye) · [Report an issue](https://github.com/SRamoras/odin-eye/issues/new/choose)

<br>

<a href="https://odin-eye.vercel.app"><img src=".github/assets/demo.webp" alt="OdinEye marking issues on a live page" width="100%"></a>

</div>

---

OdinEye is a React component that checks the page you are working on and marks problems on the elements that have them: an image without alt text, a button without a name, an element that makes the page scroll sideways. Hover a marked element to see what is wrong and how to fix it, or open the panel to see everything at once.

It runs in your app during development, so you see issues while you write the code instead of in an audit afterwards.

## Features

- Issues are outlined on the page, with a badge on each element.
- Hovering a marked element explains the problem and the fix.
- A panel lists every issue by category. Clicking one scrolls to it.
- Checks run again after route changes, DOM updates and image loads.
- No configuration and no browser extension.
- Renders nothing on the server, so it works with SSR and static generation.
- The overlay's styles are scoped and the page stays clickable.

## Quick start

```bash
npm install -D odin-eye
```

Then render it once, behind a development check:

```tsx
import { OdinEye } from "odin-eye";

export default function App() {
  return (
    <>
      {/* your app */}
      {process.env.NODE_ENV === "development" && <OdinEye />}
    </>
  );
}
```

That's it. Open your app and look at the bottom right corner.

Setup for Next.js (App and Pages Router), Vite, Remix / React Router and Gatsby is in the [package README](packages/odin-eye/README.md#usage).

## Works with

|   React   |       Next.js        |      Vite       | Remix / React Router | Gatsby |   TypeScript   |
| :-------: | :------------------: | :-------------: | :------------------: | :----: | :------------: |
| 18 and up | App and Pages Router | React templates |          ✓           |   ✓    | Types included |

## What it checks

25 checks across three categories.

<details>
<summary><b>Accessibility</b> (9)</summary>

| Check                          | Severity |
| ------------------------------ | :------: |
| Button without accessible name |  Error   |
| Link without accessible name   |  Error   |
| Image without alt text         |  Error   |
| Form field without label       |  Error   |
| Duplicate id                   |  Error   |
| Page without language          |  Error   |
| Page without title             |  Error   |
| Skipped heading level          | Warning  |
| Multiple `<h1>` headings       | Warning  |

</details>

<details>
<summary><b>SEO</b> (10)</summary>

| Check                     | Severity |
| ------------------------- | :------: |
| Missing meta description  |  Error   |
| Missing viewport meta tag |  Error   |
| Page without `<h1>`       |  Error   |
| Meta description length   | Warning  |
| Page title length         | Warning  |
| Missing canonical link    | Warning  |
| Missing Open Graph tags   | Warning  |
| Link without destination  | Warning  |
| Generic link text         | Warning  |
| Page is set to noindex    | Warning  |

</details>

<details>
<summary><b>UI and layout</b> (6)</summary>

| Check                       | Severity |
| --------------------------- | :------: |
| Element wider than the page |  Error   |
| Broken image                |  Error   |
| Distorted image             | Warning  |
| Image larger than needed    | Warning  |
| Touch target too small      | Warning  |
| Text too small              | Warning  |

</details>

Want to see them fire? The [playground](https://odin-eye.vercel.app/playground) has a wrong and a right example of every check.

## Repository

This is an npm workspaces monorepo.

```
odin-eye/
├── packages/
│   └── odin-eye/     the library published to npm
└── apps/
    └── web/          the website and playground (Next.js)
```

### Development

```bash
git clone https://github.com/SRamoras/odin-eye.git
cd odin-eye
npm install

# rebuild the library on every change
cd packages/odin-eye && npm run dev

# in another terminal, run the website on localhost:3000
cd apps/web && npm run dev
```

## Contributing

Found a false positive, a problem OdinEye missed, or have an idea for a new check? [Open an issue](https://github.com/SRamoras/odin-eye/issues/new/choose); there is a template for each case.

Pull requests are welcome. Read the [contributing guide](CONTRIBUTING.md) first: it covers running the project, testing in your own app and adding a check.

## License

[MIT](LICENSE) © SRamoras
