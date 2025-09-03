"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  if (!mounted) return null;

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    // Optional: persist choice
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  };

  return (
    <button
    onClick={toggle}
    type="button"
    aria-label="Toggle theme"
    className="
        rounded-full px-4 py-2 font-semibold transition-colors
        bg-khaki text-forest
        dark:bg-forest dark:text-khaki
        hover:opacity-90
    "
    >
    {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
