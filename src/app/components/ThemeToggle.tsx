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
      className="rounded-full border px-3 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/10"
      aria-label="Toggle theme"
      type="button"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
