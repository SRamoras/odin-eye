# OdinEye website

The marketing site and playground for [OdinEye](../../README.md), live at [odin-eye.vercel.app](https://odin-eye.vercel.app). Built with Next.js (App Router).

- `/` explains what OdinEye does and how to set it up.
- `/playground` has a wrong and a right example of every check. The mistakes are on purpose, so don't fix them.

OdinEye runs on this site in production too, so visitors can see it working.

## Running it

From the repository root:

```bash
npm install
npm run dev -w web
```

The site uses the library from `packages/odin-eye` through npm workspaces, so run `npm run dev` there as well to rebuild it on every change. `npm run build` here builds the library first.

## Structure

```
src/
├── app/            routes, layout, global styles and icons
├── components/
│   ├── layout/     header, footer, theme toggle
│   ├── sections/   the sections of the home page
│   ├── playground/ cards and examples used in the playground
│   ├── ui/         shared building blocks
│   └── reactbits/  components adapted from React Bits
└── data/           package managers and supported frameworks
```
