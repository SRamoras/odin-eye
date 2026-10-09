import { expect, it } from "vitest";
import { runAllChecks } from "../src/checks";
import { render } from "./render";

it("ignores elements inside the OdinEye overlay", () => {
  render(`<div data-odin-eye><button></button><img src="a.png"></div>`);
  const own = runAllChecks().filter((issue) => issue.element?.closest("[data-odin-eye]"));
  expect(own).toEqual([]);
});

it("reports issues from the page itself", () => {
  render(`<button></button><img src="a.png">`);
  const titles = runAllChecks().map((issue) => issue.title);
  expect(titles).toContain("Button without accessible name");
  expect(titles).toContain("Image without alt text");
});
