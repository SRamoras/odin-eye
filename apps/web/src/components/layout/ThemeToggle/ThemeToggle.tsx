"use client";

import { Button } from "@/components/ui/Button";
import { MoonIcon, SunIcon } from "@/components/ui/icons";
import styles from "./ThemeToggle.module.css";

// O script no layout já pôs a classe certa no <html>. Os dois ícones estão sempre
// na página e o CSS mostra o certo, para não haver diferença entre servidor e cliente.

export function ThemeToggle() {
  function toggle() {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("odin-eye-theme", dark ? "dark" : "light");
    } catch {}
  }

  return (
    <Button iconOnly onClick={toggle} aria-label="Switch between light and dark theme">
      <SunIcon className={styles.sun} />
      <MoonIcon className={styles.moon} />
    </Button>
  );
}
