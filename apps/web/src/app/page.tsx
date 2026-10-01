export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <h1>OdinEye Playground</h1>

      <img src="/next.svg" width={150} />

      <img src="/vercel.svg" width={150} alt="Vercel logo" />

      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <button>
          <svg width="16" height="16"><circle cx="8" cy="8" r="6" /></svg>
        </button>

        <button>   </button>

        <button>Enviar</button>

        <button aria-label="Fechar">
          <svg width="16" height="16"><circle cx="8" cy="8" r="6" /></svg>
        </button>
      </div>
    </main>
  );
}