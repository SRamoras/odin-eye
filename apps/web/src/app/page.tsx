/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */

const icon = (
  <svg width="16" height="16">
    <circle cx="8" cy="8" r="6" />
  </svg>
);

const row = { display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" } as const;

export default function Home() {
  return (
    <main style={{ padding: 40, display: "grid", gap: 16 }}>
      <h1>OdinEye Playground</h1>

      {/* ───────────── ACCESSIBILITY ───────────── */}

      <h2>Images</h2>
      <div style={row}>
        {/* ❌ no alt */}
        <img src="/next.svg" width={120} />
        {/* ❌ no alt */}
        <img src="/window.svg" width={32} />
        {/* ✅ has alt */}
        <img src="/vercel.svg" width={40} alt="Vercel logo" />
        {/* ✅ decorative: empty alt is valid */}
        <img src="/file.svg" width={32} alt="" />
      </div>

      <h2>Buttons</h2>
      <div style={row}>
        {/* ❌ icon only */}
        <button>{icon}</button>
        {/* ❌ only spaces */}
        <button>{"   "}</button>
        {/* ❌ empty aria-label doesn't count... but this check only looks for the attribute */}
        <button style={{ padding: "8px 16px" }}>{icon}</button>
        {/* ✅ has text */}
        <button style={{ padding: "8px 16px" }}>Send</button>
        {/* ✅ has aria-label */}
        <button aria-label="Close" style={{ padding: 8 }}>{icon}</button>
      </div>

      <h2>Links</h2>
      <div style={row}>
        {/* ❌ image without alt (also triggers the image check) */}
        <a href="/profile"><img src="/globe.svg" width={24} /></a>
        {/* ❌ icon only */}
        <a href="/github">{icon}</a>
        {/* ✅ has text */}
        <a href="/about">About us</a>
        {/* ✅ has aria-label */}
        <a href="/github" aria-label="GitHub">{icon}</a>
        {/* ✅ image with alt */}
        <a href="/files"><img src="/file.svg" width={24} alt="My files" /></a>
      </div>

      <h2>Form fields</h2>
      <div style={row}>
        {/* ❌ placeholder only */}
        <input placeholder="Email" />
        {/* ❌ select without label */}
        <select><option>Portugal</option></select>
        {/* ❌ textarea without label */}
        <textarea placeholder="Message" rows={1} />
        {/* ✅ aria-label */}
        <input aria-label="Name" />
        {/* ✅ label with htmlFor */}
        <label htmlFor="phone">Phone</label>
        <input id="phone" />
        {/* ✅ inside a label */}
        <label>Address <input /></label>
        {/* ✅ ignored: it's a button */}
        <input type="submit" value="Send" />
      </div>

      <h2>Headings</h2>
      {/* ⚠️ second h1 on the page (both h1s get a yellow box) */}
      <h1>Second main title</h1>
      {/* ⚠️ jumps from h2 to h4 */}
      <h2>Section</h2>
      <h4>Subsection</h4>
      {/* ⚠️ jumps from h4 to h6 */}
      <h6>Deep subsection</h6>

      <h2>Duplicate ids</h2>
      <div style={row}>
        {/* ❌ same id twice */}
        <div id="box">A</div>
        <div id="box">B</div>
        {/* ❌ same id three times */}
        <span id="item">1</span>
        <span id="item">2</span>
        <span id="item">3</span>
        {/* ✅ unique id */}
        <div id="unique">C</div>
      </div>

      {/* ───────────── SEO ───────────── */}

      <h2>SEO links</h2>
      <div style={row}>
        {/* ⚠️ generic text */}
        <a href="/pricing">click here</a>
        {/* ⚠️ generic text */}
        <a href="/blog">Read more</a>
        {/* ⚠️ generic text (Portuguese) */}
        <a href="/sobre">saber mais</a>
        {/* ⚠️ no destination */}
        <a href="#">Empty link</a>
        {/* ⚠️ no destination */}
        <a href="">Another empty link</a>
        {/* ✅ descriptive text and real destination */}
        <a href="/pricing">See our pricing plans</a>
      </div>

      {/* ───────────── UI ───────────── */}

      <h2>UI images</h2>
      <div style={row}>
        {/* ❌ broken image */}
        <img src="/does-not-exist.png" alt="Broken" width={80} height={40} />
        {/* ⚠️ distorted: stretched into a square */}
        <img src="/next.svg" alt="Distorted" style={{ width: 120, height: 120 }} />
        {/* ⚠️ oversized: 2000px image shown at 150px */}
        <img src="https://picsum.photos/2000/1200" alt="Oversized" style={{ width: 150 }} />
        {/* ✅ right size and proportions */}
        <img src="https://picsum.photos/300/200" alt="Correct" style={{ width: 150 }} />
      </div>

      <h2>UI targets and text</h2>
      <div style={row}>
        {/* ⚠️ tiny touch target */}
        <button aria-label="Tiny" style={{ width: 16, height: 16, padding: 0 }}>×</button>
        {/* ⚠️ tiny touch target */}
        <a href="/x" aria-label="Small link" style={{ display: "block", width: 12, height: 12, background: "#555" }} />
        {/* ✅ big enough */}
        <button style={{ padding: "10px 20px" }}>Comfortable button</button>
        {/* ⚠️ tiny text */}
        <p style={{ fontSize: 10 }}>This text is too small</p>
        {/* ⚠️ tiny text */}
        <span style={{ fontSize: 8 }}>Even smaller</span>
        {/* ✅ readable text */}
        <p style={{ fontSize: 16 }}>This text is fine</p>
      </div>

      <h2>UI overflow</h2>
      {/* ❌ wider than the page */}
      <div style={{ width: "120vw", background: "#222", padding: 8 }}>
        This box is wider than the page
      </div>

      {/* space to test scrolling */}
      <div style={{ height: 800 }} />
    </main>
  );
}