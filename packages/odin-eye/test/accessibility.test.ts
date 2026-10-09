import { beforeEach, describe, expect, it } from "vitest";
import {
  checkButtonsWithoutName,
  checkDuplicateIds,
  checkHeadingOrder,
  checkHtmlWithoutLang,
  checkImagesWithoutAlt,
  checkInputsWithoutLabel,
  checkLinksWithoutName,
  checkMultipleH1,
  checkPageWithoutTitle,
} from "../src/checks/accessibility";
import { render } from "./render";

beforeEach(() => {
  document.documentElement.setAttribute("lang", "en");
  document.title = "Test page";
});

describe("checkButtonsWithoutName", () => {
  it("flags buttons with no text and no aria-label", () => {
    render(`<button></button><button>   </button>`);
    expect(checkButtonsWithoutName()).toHaveLength(2);
  });

  it("passes buttons with text or aria-label", () => {
    render(`<button>Send</button><button aria-label="Close"></button>`);
    expect(checkButtonsWithoutName()).toEqual([]);
  });
});

describe("checkDuplicateIds", () => {
  it("flags every element sharing an id", () => {
    render(`<div id="box"></div><span id="box"></span><p id="unique"></p>`);
    const issues = checkDuplicateIds();
    expect(issues).toHaveLength(2);
    expect(issues.every((issue) => issue.element?.id === "box")).toBe(true);
  });

  it("passes unique ids", () => {
    render(`<div id="a"></div><div id="b"></div>`);
    expect(checkDuplicateIds()).toEqual([]);
  });
});

describe("checkHeadingOrder", () => {
  it("flags a heading that skips a level going down", () => {
    render(`<h1>Title</h1><h2>Section</h2><h4>Skipped</h4>`);
    const issues = checkHeadingOrder();
    expect(issues).toHaveLength(1);
    expect(issues[0].element?.tagName).toBe("H4");
  });

  it("allows going back up any number of levels", () => {
    render(`<h1>Title</h1><h2>Section</h2><h3>Sub</h3><h2>Next section</h2>`);
    expect(checkHeadingOrder()).toEqual([]);
  });
});

describe("checkHtmlWithoutLang", () => {
  it("flags <html> without lang", () => {
    document.documentElement.removeAttribute("lang");
    expect(checkHtmlWithoutLang()).toHaveLength(1);
  });

  it("passes <html lang>", () => {
    expect(checkHtmlWithoutLang()).toEqual([]);
  });
});

describe("checkImagesWithoutAlt", () => {
  it("flags images without an alt attribute", () => {
    render(`<img src="a.png"><img src="b.png" alt="">`);
    const issues = checkImagesWithoutAlt();
    expect(issues).toHaveLength(1);
    expect(issues[0].element?.getAttribute("src")).toBe("a.png");
  });
});

describe("checkInputsWithoutLabel", () => {
  it("flags fields with no label", () => {
    render(`<input type="text"><select></select><textarea></textarea>`);
    expect(checkInputsWithoutLabel()).toHaveLength(3);
  });

  it("passes fields labelled by for, a wrapping label or aria-label", () => {
    render(`
      <label for="email">Email</label><input id="email">
      <label>Name <input></label>
      <input aria-label="Search">
    `);
    expect(checkInputsWithoutLabel()).toEqual([]);
  });

  it("ignores hidden and button-like inputs", () => {
    render(`<input type="hidden"><input type="submit"><input type="button"><input type="reset">`);
    expect(checkInputsWithoutLabel()).toEqual([]);
  });
});

describe("checkLinksWithoutName", () => {
  it("flags links with no text, aria-label or image alt", () => {
    render(`<a href="/"></a><a href="/"><img src="logo.png"></a>`);
    expect(checkLinksWithoutName()).toHaveLength(2);
  });

  it("passes links named by text, aria-label or image alt", () => {
    render(`
      <a href="/">Home</a>
      <a href="/" aria-label="Home"></a>
      <a href="/"><img src="logo.png" alt="Home"></a>
    `);
    expect(checkLinksWithoutName()).toEqual([]);
  });
});

describe("checkMultipleH1", () => {
  it("flags every <h1> when there is more than one", () => {
    render(`<h1>One</h1><h1>Two</h1>`);
    expect(checkMultipleH1()).toHaveLength(2);
  });

  it("passes a single <h1>", () => {
    render(`<h1>One</h1>`);
    expect(checkMultipleH1()).toEqual([]);
  });
});

describe("checkPageWithoutTitle", () => {
  it("flags an empty title", () => {
    document.title = "  ";
    expect(checkPageWithoutTitle()).toHaveLength(1);
  });

  it("passes a page with a title", () => {
    expect(checkPageWithoutTitle()).toEqual([]);
  });
});
