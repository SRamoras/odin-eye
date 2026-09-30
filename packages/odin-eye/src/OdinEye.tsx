import { useEffect, useState } from "react";

export function OdinEye() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        padding: "8px 12px",
        background: "#111",
        color: "#fff",
        borderRadius: 8,
        fontSize: 13,
        zIndex: 2147483647,
      }}
    >
      👁️ OdinEye ativo
    </div>
  );
}