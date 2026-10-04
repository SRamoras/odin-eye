import type { Issue } from "../types";
import * as accessibility from "./accessibility";
import * as seo from "./seo";
import * as ui from "./ui";

export function runAllChecks(): Issue[] {
  const checks = [
    ...Object.values(accessibility),
    ...Object.values(seo),
    ...Object.values(ui),
  ];

  return checks
    .flatMap((check) => check())
    .filter((issue) => !issue.element?.closest("[data-odin-eye]"));
}