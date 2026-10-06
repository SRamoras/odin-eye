"use client";

import { useEffect } from "react";

// O OdinEye só volta a medir os elementos marcados em "scroll" e "resize".
// Com animações e fontes a carregar, a página muda de altura sem nenhum desses
// eventos, e os marcadores ficavam desalinhados. Isto avisa-o quando o corpo muda.
export function MarkerSync() {
  useEffect(() => {
    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
    });

    observer.observe(document.body);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
