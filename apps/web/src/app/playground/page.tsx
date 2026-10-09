import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Example } from "@/components/playground/Example";
import { Sample } from "@/components/playground/Sample";
import { Tag } from "@/components/playground/Tag";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import styles from "./playground.module.css";

// This page has mistakes ON PURPOSE, to show every check firing.
// Each wrong example sits next to the right version. Do not fix them.

export const metadata: Metadata = {
  title: "Playground: OdinEye with mistakes on purpose",
  description:
    "A page full of accessibility, SEO and layout mistakes, each next to its fixed version, so you can see every OdinEye check fire.",
  alternates: { canonical: "/playground" },
};

const icon = (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="8" cy="8" r="6" fill="currentColor" />
  </svg>
);

export default function Playground() {
  return (
    <>
      <Header />

      <main id="main">
        <Container>
          <div className={styles.intro}>
            <Text size="xs" tone="muted" mono className={styles.eyebrow}>
              playground · mistakes on purpose
            </Text>
            <Heading as="h1" size="display">
              Playground
            </Heading>
            <Text size="2xl" tone="muted" className={styles.lede}>
              Every block on this page has mistakes on purpose, next to a version that passes.
              OdinEye is running: hover a marker to read the problem, or open the panel in the
              bottom right corner to see the full list.
            </Text>

            <ul className={styles.legend} aria-label="Legend">
              <li>
                <span className={styles.swatch} data-kind="error" /> Error
              </li>
              <li>
                <span className={styles.swatch} data-kind="warning" /> Warning
              </li>
              <li>
                <Tag>should be flagged</Tag>
              </li>
              <li>
                <Tag ok>should pass</Tag>
              </li>
            </ul>

            <nav aria-label="Playground sections">
              <ul className={styles.jump}>
                <li>
                  <a href="#accessibility">Accessibility</a>
                </li>
                <li>
                  <a href="#seo">SEO</a>
                </li>
                <li>
                  <a href="#layout">Layout</a>
                </li>
              </ul>
            </nav>
          </div>

          <section id="accessibility" className={styles.group}>
            <Heading>Accessibility</Heading>

            <div className={styles.grid}>
              <Example
                title="Images"
                text="Every image needs alt text. Decorative ones can use an empty alt."
              >
                <Sample note="no alt">
                  <img src="/next.svg" width={120} />
                </Sample>
                <Sample note="no alt">
                  <img src="/window.svg" width={32} />
                </Sample>
                <Sample ok note="has alt">
                  <img src="/vercel.svg" width={40} alt="Vercel logo" />
                </Sample>
                <Sample ok note="decorative">
                  <img src="/file.svg" width={32} alt="" />
                </Sample>
              </Example>

              <Example title="Buttons" text="A button needs a name: visible text or an aria-label.">
                <Sample note="icon only">
                  <button className={styles.button}>{icon}</button>
                </Sample>
                <Sample note="only spaces">
                  <button className={styles.button}>{"   "}</button>
                </Sample>
                <Sample ok note="has text">
                  <button className={styles.button}>Send</button>
                </Sample>
                <Sample ok note="aria-label">
                  <button aria-label="Close" className={styles.button}>
                    {icon}
                  </button>
                </Sample>
              </Example>

              <Example
                title="Links"
                text="Same rule as buttons. An image inside a link counts if it has alt text."
              >
                <Sample note="image, no alt">
                  <a href="/profile">
                    <img src="/globe.svg" width={24} />
                  </a>
                </Sample>
                <Sample note="icon only">
                  <a href="/github" className={styles.iconLink}>
                    {icon}
                  </a>
                </Sample>
                <Sample ok note="has text">
                  <a href="/about">About us</a>
                </Sample>
                <Sample ok note="aria-label">
                  <a href="/github" aria-label="GitHub" className={styles.iconLink}>
                    {icon}
                  </a>
                </Sample>
                <Sample ok note="image with alt">
                  <a href="/files">
                    <img src="/file.svg" width={24} alt="My files" />
                  </a>
                </Sample>
              </Example>

              <Example
                title="Form fields"
                text="A placeholder is not a label. Use a label element or an aria-label."
              >
                <Sample note="placeholder only">
                  <input placeholder="Email" className={styles.field} />
                </Sample>
                <Sample note="no label">
                  <select className={styles.field}>
                    <option>Portugal</option>
                  </select>
                </Sample>
                <Sample note="no label">
                  <textarea placeholder="Message" rows={1} className={styles.field} />
                </Sample>
                <Sample ok note="aria-label">
                  <input aria-label="Name" className={styles.field} />
                </Sample>
                <Sample ok note="label with htmlFor">
                  <label htmlFor="phone">Phone</label> <input id="phone" className={styles.field} />
                </Sample>
                <Sample ok note="inside a label">
                  <label>
                    Address <input className={styles.field} />
                  </label>
                </Sample>
                <Sample ok note="buttons are ignored">
                  <input type="submit" value="Send" className={styles.button} />
                </Sample>
              </Example>

              <Example
                title="Headings"
                text="One h1 per page, and no skipped levels on the way down."
              >
                <h1 className={styles.demoHeading}>Second main title</h1>
                <h2 className={styles.demoHeading}>Section</h2>
                <h4 className={styles.demoHeading}>Subsection, skips h3</h4>
                <h6 className={styles.demoHeading}>Deep subsection, skips h5</h6>
              </Example>

              <Example
                title="Duplicate ids"
                text="An id must be unique. Labels and anchors break when it is not."
              >
                <Sample note="id used twice">
                  <div id="box" className={styles.chip}>
                    A
                  </div>
                  <div id="box" className={styles.chip}>
                    B
                  </div>
                </Sample>
                <Sample note="id used three times">
                  <span id="item" className={styles.chip}>
                    1
                  </span>
                  <span id="item" className={styles.chip}>
                    2
                  </span>
                  <span id="item" className={styles.chip}>
                    3
                  </span>
                </Sample>
                <Sample ok note="unique id">
                  <div id="unique" className={styles.chip}>
                    C
                  </div>
                </Sample>
              </Example>
            </div>
          </section>

          <section id="seo" className={styles.group}>
            <Heading>SEO</Heading>
            <Text tone="muted" className={styles.groupText}>
              Most SEO checks look at the whole page (title, description, Open Graph, canonical).
              This page gets those right, so they only show up in the panel when something is
              missing. The link checks are below.
            </Text>

            <div className={styles.grid}>
              <Example title="Link text" text="Link text should say where the link goes.">
                <Sample note="generic">
                  <a href="/pricing">click here</a>
                </Sample>
                <Sample note="generic">
                  <a href="/blog">Read more</a>
                </Sample>
                <Sample note="generic, in Portuguese">
                  <a href="/sobre">saber mais</a>
                </Sample>
                <Sample ok note="descriptive">
                  <a href="/pricing">See our pricing plans</a>
                </Sample>
              </Example>

              <Example title="Link destination" text="A link that goes nowhere should be a button.">
                <Sample note='href="#"'>
                  <a href="#">Empty link</a>
                </Sample>
                <Sample note="empty href">
                  <a href="">Another empty link</a>
                </Sample>
                <Sample ok note="real destination">
                  <Link href="/">Back to the home page</Link>
                </Sample>
              </Example>
            </div>
          </section>

          <section id="layout" className={styles.group}>
            <Heading>Layout</Heading>

            <div className={styles.grid}>
              <Example
                title="Images"
                text="Broken, stretched, or much bigger than the space they fill."
              >
                <Sample note="broken">
                  <img src="/does-not-exist.png" alt="Broken" width={80} height={40} />
                </Sample>
                <Sample note="distorted">
                  <img src="/next.svg" alt="Distorted" style={{ width: 120, height: 120 }} />
                </Sample>
                <Sample note="2000px shown at 150px">
                  <img
                    src="https://picsum.photos/2000/1200"
                    alt="Oversized"
                    style={{ width: 150 }}
                  />
                </Sample>
                <Sample ok note="right size">
                  <img src="https://picsum.photos/300/200" alt="Correct" style={{ width: 150 }} />
                </Sample>
              </Example>

              <Example title="Touch targets" text="Anything clickable should be at least 24×24px.">
                <Sample note="16×16px">
                  <button aria-label="Tiny" style={{ width: 16, height: 16, padding: 0 }}>
                    ×
                  </button>
                </Sample>
                <Sample note="12×12px">
                  <a
                    href="/x"
                    aria-label="Small link"
                    style={{ display: "block", width: 12, height: 12, background: "#555" }}
                  />
                </Sample>
                <Sample ok note="big enough">
                  <button className={styles.button}>Comfortable button</button>
                </Sample>
              </Example>

              <Example
                title="Text size"
                text="Text under 12px is hard to read, especially on a phone."
              >
                <Sample note="10px">
                  <p style={{ fontSize: 10 }}>This text is too small</p>
                </Sample>
                <Sample note="8px">
                  <span style={{ fontSize: 8 }}>Even smaller</span>
                </Sample>
                <Sample ok note="16px">
                  <p style={{ fontSize: 16 }}>This text is fine</p>
                </Sample>
              </Example>
            </div>

            <Example
              title="Overflow"
              text="This box is wider than the window, so the whole page scrolls sideways. That is the bug."
            >
              <div className={styles.overflow}>This box is wider than the page</div>
            </Example>
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
}
