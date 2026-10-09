"use client";

import { Button } from "@/components/ui/Button";
import { MoonIcon, SunIcon } from "@/components/ui/icons";
import styles from "./ThemeToggle.module.css";

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
