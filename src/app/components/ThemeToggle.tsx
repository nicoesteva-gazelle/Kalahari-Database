"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = (mounted ? resolvedTheme : theme) === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="toggle"
      style={{
        display:"inline-flex",alignItems:"center",gap:8,
        padding:".6rem 1rem",borderRadius:999,
        border:"1px solid var(--accent)",background:"var(--accent)",color:"#fff",
        fontWeight:700,boxShadow:"0 2px 0 rgba(0,0,0,.05)",
        transition:"transform .04s ease, box-shadow .2s ease, background .2s ease"
      }}
      title="Toggle theme"
      onMouseDown={(e)=>{(e.currentTarget as HTMLButtonElement).style.transform="translateY(1px)"}}
      onMouseUp={(e)=>{(e.currentTarget as HTMLButtonElement).style.transform=""}}
    >
      {isDark ? "Light mode" : "Dark mode"}
    </button>
  );
}