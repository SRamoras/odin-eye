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

      <h2>Images</h2>
      <div style={row}>
        {/* ❌ no alt */}
        <img src="/next.svg" width={120} />
        {/* ✅ has alt */}
        <img src="/vercel.svg" width={40} alt="Vercel logo" />
      </div>

      <h2>Buttons</h2>
      <div style={row}>
        {/* ❌ icon only */}
        <button>{icon}</button>
        {/* ❌ only spaces */}
        <button>{"   "}</button>
        {/* ✅ has text */}
        <button>Send</button>
        {/* ✅ has aria-label */}
        <button aria-label="Close">{icon}</button>
      </div>

      <h2>Links</h2>
      <div style={row}>
        {/* ❌ image without alt (also triggers the image check) */}
        <a href="#"><img src="/globe.svg" width={24} /></a>
        {/* ❌ icon only */}
        <a href="#">{icon}</a>
        {/* ✅ has text */}
        <a href="#">About us</a>
        {/* ✅ has aria-label */}
        <a href="#" aria-label="GitHub">{icon}</a>
        {/* ✅ image with alt */}
        <a href="#"><img src="/file.svg" width={24} alt="My files" /></a>
      </div>

      <h2>Form fields</h2>
      <div style={row}>
        {/* ❌ placeholder only */}
        <input placeholder="Email" />
        {/* ❌ select without label */}
        <select><option>Portugal</option></select>
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

      <h2>Duplicate ids</h2>
      <div style={row}>
        {/* ❌ same id twice */}
        <div id="box">A</div>
        <div id="box">B</div>
      </div>
    </main>
  );
}