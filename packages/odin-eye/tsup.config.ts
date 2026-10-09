import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  // a fonte vai dentro do bundle, para funcionar em qualquer site sem configuração
  loader: { ".otf": "dataurl" },
  banner: { js: '"use client";' },
});
