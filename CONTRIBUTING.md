# Contributing to OdinEye

Thanks for helping out. Bug reports, false positives, new checks and fixes are all welcome.

## Reporting

Open an [issue](https://github.com/SRamoras/odin-eye/issues/new/choose) and pick the template that fits:

- **Bug report**: something is broken.
- **False positive**: OdinEye flagged something that is fine.
- **Missed issue**: OdinEye did not flag a real problem.
- **Feature request**: a new check or an improvement.

Including the HTML of the element and your framework saves a lot of back and forth.

## Project layout

This is an npm workspaces monorepo:

```
packages/odin-eye   the library published to npm
apps/web            the website and playground (Next.js)
```

## Running it locally

```bash
git clone https://github.com/SRamoras/odin-eye.git
cd odin-eye
npm install
```

In one terminal, rebuild the library on every change:

```bash
cd packages/odin-eye
npm run dev
```

In another, run the website:

```bash
cd apps/web
npm run dev
```

Open [localhost:3000/playground](http://localhost:3000/playground). Every check has a wrong example next to a right one, so it is the quickest way to see your change.

### Testing in another project

```bash
cd packages/odin-eye
npm link

cd path/to/your-app
npm link odin-eye
```

Restart that app's dev server after linking. In Next.js, delete `.next` if it still shows the old version.

## Adding a check

Checks live in `packages/odin-eye/src/checks/<category>/`, one file per check, where the category is `accessibility`, `seo` or `ui`.

1. Create a file that exports a function returning `Issue[]`:

   ```ts
   import type { Issue } from "../../types";

   export function checkSomething(): Issue[] {
     const elements = Array.from(document.querySelectorAll("..."));

     return elements
       .filter((element) => /* has the problem */ true)
       .map((element, index): Issue => ({
         id: `ui-something-${index}`,
         category: "ui",
         severity: "warning",
         title: "Short title",
         description: "What is wrong and how to fix it, in one or two sentences.",
         element,
       }));
   }
   ```

2. Export it from the category's `index.ts`. It runs automatically from there.
3. Add a wrong and a right example to `apps/web/src/app/playground/page.tsx`.
4. Add it to the list of checks in `packages/odin-eye/README.md`.

Use `error` for things that break the page for some users, and `warning` for things worth fixing that still work. Use `element: null` for page-level issues, such as a missing meta tag.

## Pull requests

For bigger changes, like a new option, a refactor or a different way of writing checks, open an issue first so we can agree on the approach.

- Branch from `dev` and open the PR against `dev`.
- Use [Conventional Commits](https://www.conventionalcommits.org): `feat(odin-eye): ...`, `fix(web): ...`, `docs: ...`.
- Make sure `npm run build` passes in `packages/odin-eye` and `apps/web`.
- Keep comments to a minimum and write them in English.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
