"use client";
import { useEffect, useState } from "react";
import { getInitialTheme, setTheme } from "@/lib/theme";

export default function ThemeToggle() {
  const [theme, setState] = useState<"light"|"dark">("light");

  useEffect(() => {
    const initial = getInitialTheme();
    setState(initial);
    // ensure DOM matches state on mount
    setTheme(initial);
    // sync across tabs/windows (and hard navigations)
    const onStorage = (e: StorageEvent) => {
      if (e.key === "theme" && (e.newValue === "light" || e.newValue === "dark")) {
        setState(e.newValue);
        setTheme(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setState(next);
    setTheme(next);
  };

  return (
    <button onClick={toggle} className="k-toggle" aria-pressed={theme === 'dark'}>
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}
