export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

export function getStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {}
  return null;
}

export function getInitialTheme(): Theme {
  // Respect explicit choice; else system preference
  const stored = getStoredTheme();
  if (stored) return stored;
  const system = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return system ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.setAttribute("data-theme", theme);
}

export function setTheme(theme: Theme) {
  try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
  applyTheme(theme);
}
