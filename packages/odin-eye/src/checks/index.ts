import type { Issue } from "../types";
import * as accessibility from "./accessibility";
import * as seo from "./seo";

export function runAllChecks(): Issue[] {
  const checks = [...Object.values(accessibility), ...Object.values(seo)];
  return checks.flatMap((check) => check());
}