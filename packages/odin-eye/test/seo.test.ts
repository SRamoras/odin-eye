import { beforeEach, describe, expect, it } from "vitest";
import {
  checkCanonical,
  checkEmptyLinks,
  checkGenericLinkText,
  checkMetaDescription,
  checkMetaViewport,
  checkMissingH1,
  checkNoindex,
  checkOpenGraph,
  checkTitleLength,
} from "../src/checks/seo";
import { render } from "./render";

beforeEach(() => {
  render("");
  document.title = "A page title of good length";
});

const ids = (issues: { id: string }[]) => issues.map((issue) => issue.id);

describe("checkMetaDescription", () => {
  it("flags a missing description as an error", () => {
    const issues = checkMetaDescription();
    expect(ids(issues)).toEqual(["seo-meta-description"]);
    expect(issues[0].severity).toBe("error");
  });

  it("warns when the description is too short or too long", () => {
    render("", `<meta name="description" content="Too short">`);
    expect(ids(checkMetaDescription())).toEqual(["seo-meta-description-length"]);

    render("", `<meta name="description" content="${"a".repeat(161)}">`);
    expect(ids(checkMetaDescription())).toEqual(["seo-meta-description-length"]);
  });

  it("passes a description between 50 and 160 characters", () => {
    render("", `<meta name="description" content="${"a".repeat(80)}">`);
    expect(checkMetaDescription()).toEqual([]);
  });
});

describe("checkTitleLength", () => {
  it("warns when the title is shorter than 10 or longer than 60 characters", () => {
    document.title = "Short";
    expect(checkTitleLength()).toHaveLength(1);

    document.title = "a".repeat(61);
    expect(checkTitleLength()).toHaveLength(1);
  });

  it("leaves a missing title to the accessibility check", () => {
    document.title = "";
    expect(checkTitleLength()).toEqual([]);
  });
});

describe("checkMissingH1", () => {
  it("flags a page without <h1>", () => {
    expect(checkMissingH1()).toHaveLength(1);
  });

  it("passes a page with <h1>", () => {
    render(`<h1>Title</h1>`);
    expect(checkMissingH1()).toEqual([]);
  });
});

describe("checkMetaViewport", () => {
  it("flags a missing viewport tag", () => {
    expect(checkMetaViewport()).toHaveLength(1);
  });

  it("passes a viewport tag with content", () => {
    render("", `<meta name="viewport" content="width=device-width, initial-scale=1">`);
    expect(checkMetaViewport()).toEqual([]);
  });
});

describe("checkNoindex", () => {
  it("warns when robots contains noindex, ignoring case", () => {
    render("", `<meta name="robots" content="NoIndex, follow">`);
    expect(checkNoindex()).toHaveLength(1);
  });

  it("passes without a robots tag or with indexable robots", () => {
    expect(checkNoindex()).toEqual([]);
    render("", `<meta name="robots" content="index, follow">`);
    expect(checkNoindex()).toEqual([]);
  });
});

describe("checkOpenGraph", () => {
  it("warns once when any required tag is missing", () => {
    render("", `<meta property="og:title" content="Title">`);
    expect(checkOpenGraph()).toHaveLength(1);
  });

  it("passes when title, description and image are set", () => {
    render(
      "",
      `<meta property="og:title" content="Title">
       <meta property="og:description" content="Description">
       <meta property="og:image" content="/og.png">`,
    );
    expect(checkOpenGraph()).toEqual([]);
  });
});

describe("checkCanonical", () => {
  it("warns without a canonical link", () => {
    expect(checkCanonical()).toHaveLength(1);
  });

  it("passes with a canonical href", () => {
    render("", `<link rel="canonical" href="https://example.com/">`);
    expect(checkCanonical()).toEqual([]);
  });
});

describe("checkEmptyLinks", () => {
  it("flags links whose href is empty or just #", () => {
    render(`<a href="">One</a><a href="#">Two</a><a href="#section">Three</a><a>No href</a>`);
    expect(checkEmptyLinks()).toHaveLength(2);
  });
});

describe("checkGenericLinkText", () => {
  it("flags generic link text in English and Portuguese, ignoring case and spacing", () => {
    render(`<a href="/a">Click here</a><a href="/b"> read more </a><a href="/c">Saber mais</a>`);
    expect(checkGenericLinkText()).toHaveLength(3);
  });

  it("passes descriptive link text", () => {
    render(`<a href="/pricing">See our pricing plans</a>`);
    expect(checkGenericLinkText()).toEqual([]);
  });
});
