import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/noop.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  splitting: false,
  loader: { ".otf": "dataurl" },
  banner: { js: '"use client";' },
});
