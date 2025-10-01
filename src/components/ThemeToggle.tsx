"use client";

import { useEffect, useState, KeyboardEvent } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : undefined;

  function toggle() {
    if (!mounted) return;
    setTheme(isDark ? "light" : "dark");
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={mounted ? !!isDark : undefined}
      aria-label="Toggle color theme"
      onClick={toggle}
      onKeyDown={onKeyDown}
      title="Toggle theme"
      suppressHydrationWarning
      className={[
        "group inline-flex items-center rounded-full border",
        "px-2 py-1 transition-colors",
        "hover:bg-neutral-100 dark:hover:bg-neutral-800",
        "border-neutral-200 dark:border-neutral-700",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600",
        "focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900"
      ].join(" ")}
    >
      <Sun
        aria-hidden="true"
        className={[
          "h-4 w-4 transition-opacity",
          mounted ? (isDark ? "opacity-40" : "opacity-100") : "opacity-0"
        ].join(" ")}
      />
      <Moon
        aria-hidden="true"
        className={[
          "ml-2 h-4 w-4 transition-opacity",
          mounted ? (isDark ? "opacity-100" : "opacity-40") : "opacity-0"
        ].join(" ")}
      />
      <span
        aria-hidden="true"
        className={[
          "ml-3 relative inline-flex h-6 w-11 items-center rounded-full",
          "bg-neutral-200 dark:bg-neutral-700",
          "transition-colors"
        ].join(" ")}
      >
        <span
          className={[
            "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white",
            "shadow-sm transition-transform",
            mounted && isDark ? "translate-x-5" : "translate-x-0"
          ].join(" ")}
        />
      </span>
    </button>
  );
}

export default ThemeToggle;
