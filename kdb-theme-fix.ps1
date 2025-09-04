$ErrorActionPreference = "Stop"
Write-Host "=== KDB Theme + Dark Mode Fix ===`n"

# 0) Detect app dir (prefer src/app)
$appDir = if (Test-Path "src/app") { "src/app" } elseif (Test-Path "app") { "app" } else { "src/app" }
if (-not (Test-Path $appDir)) { New-Item -ItemType Directory -Path $appDir -Force | Out-Null }

# 1) Ensure PostCSS plugin (Tailwind v4) + autoprefixer
npm i -D @tailwindcss/postcss autoprefixer | Out-Null

# 2) Write postcss.config.js
@"
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
"@ | Set-Content -Encoding UTF8 -Path ".\postcss.config.js"
Write-Host "✔ postcss.config.js updated for Tailwind v4"

# 3) Tailwind config with colors + safelist
$twPath = ".\tailwind.config.js"
if (Test-Path $twPath) { Copy-Item $twPath "$twPath.bak" -Force; Write-Host "• Backed up tailwind.config.js -> tailwind.config.js.bak" }
@"
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./$appDir/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50:"#faf7f2",100:"#f4efe5",200:"#e8decc",300:"#dccdb3",400:"#cdb48d",
          500:"#b7996a",600:"#9b7f58",700:"#7c6646",800:"#5e4d35",900:"#423726"
        },
        acacia: {
          50:"#eef7f1",100:"#d9efdf",200:"#b3dfbf",300:"#8dd09f",400:"#67c07f",
          500:"#41b05f",600:"#2e8d4b",700:"#216a39",800:"#154726",900:"#0a2615"
        },
        dusk: { 900:"#0f1a14" }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
        softLg: "0 20px 45px rgba(0,0,0,0.12)"
      },
      borderRadius: { "2xl":"1.25rem","3xl":"1.75rem" }
    }
  },
  safelist: [
    { pattern: /(bg|text|border)-(sand|acacia|dusk)-(50|100|200|300|400|500|600|700|800|900)/ },
    { pattern: /(bg|text|border)-(sand|acacia|dusk)/ }
  ],
  plugins: [],
};
"@ | Set-Content -Encoding UTF8 -Path $twPath
Write-Host "✔ tailwind.config.js written (with colors + safelist)"

# 4) globals.css (beside layout)
$globalsPath = Join-Path $appDir "globals.css"
@"
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Make fonts look crisp */
html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

/* Subtle “sand” texture using layered gradients */
.kalahari-sand {
  background-image:
    radial-gradient(1200px 600px at 80% -10%, rgba(255,255,255,0.45), transparent 60%),
    radial-gradient(900px 500px at -10% 10%, rgba(255,255,255,0.35), transparent 65%),
    radial-gradient(600px 300px at 110% 80%, rgba(255,255,255,0.25), transparent 70%),
    linear-gradient(180deg, #f4efe5 0%, #e8decc 40%, #dccdb3 100%);
}

.dark .kalahari-dusk {
  background-image:
    radial-gradient(900px 500px at 100% -10%, rgba(255,255,255,0.06), transparent 60%),
    radial-gradient(800px 500px at 0% 0%, rgba(255,255,255,0.04), transparent 65%),
    linear-gradient(180deg, #0f1a14 0%, #10301f 60%, #0f1a14 100%);
}

.glass {
  background-color: rgb(255 255 255 / 0.70);
  border: 1px solid rgb(231 223 204);   /* sand-200 */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.dark .glass {
  background-color: rgb(255 255 255 / 0.05);
  border: 1px solid rgb(21 71 38);      /* acacia-800 */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

:root {
  --font-inter: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  --font-fraunces: Fraunces, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
}
.font-sans { font-family: var(--font-inter); }
.font-display { font-family: var(--font-fraunces); }
"@ | Set-Content -Encoding UTF8 -Path $globalsPath
Write-Host "✔ $globalsPath written"

# 5) layout.tsx (backup then write hydration-safe dark mode + fonts)
$layoutPath = Join-Path $appDir "layout.tsx"
if (Test-Path $layoutPath) { Copy-Item $layoutPath "$layoutPath.bak" -Force; Write-Host "• Backed up layout.tsx -> layout.tsx.bak" }
@"
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata: Metadata = {
  title: "Kalahari Database",
  description: "Botswana Kalahari: papers, projects, people, places",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var ls=localStorage.getItem('theme');var systemDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var shouldDark=ls?ls==='dark':systemDark;document.documentElement.classList.toggle('dark',shouldDark);}catch(e){}})();`
          }}
        />
      </head>
      <body className="min-h-screen bg-sand-50 text-slate-900 dark:bg-dusk-900 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
"@ | Set-Content -Encoding UTF8 -Path $layoutPath
Write-Host "✔ $layoutPath written"

# 6) Theme toggle component (src/components/ThemeToggle.tsx)
$compDir = "src/components"
New-Item -ItemType Directory -Force -Path $compDir | Out-Null
@"
"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ls = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(ls ? ls === "dark" : systemDark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center rounded-xl border border-sand-300 dark:border-acacia-800 px-3 py-1 text-sm bg-white/70 dark:bg-white/5 backdrop-blur hover:opacity-90 transition"
      aria-pressed={isDark}
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
"@ | Set-Content -Encoding UTF8 -Path (Join-Path $compDir "ThemeToggle.tsx")
Write-Host "✔ src/components/ThemeToggle.tsx written"

# 7) Debug page at /debug to visually verify colors + glass + toggle
$debugDir = Join-Path $appDir "debug"
New-Item -ItemType Directory -Force -Path $debugDir | Out-Null
@"
import ThemeToggle from "@/components/ThemeToggle";

export default function DebugThemePage() {
  return (
    <main className="container mx-auto max-w-5xl px-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display">Theme/Color Debug</h1>
        <ThemeToggle />
      </div>

      <p className="mt-2 text-sm opacity-80">If you see colored blocks and a frosty card, Tailwind + globals + dark mode are all wired.</p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="h-12 rounded-lg bg-sand-400" />
        <div className="h-12 rounded-lg bg-acacia-500" />
        <div className="h-12 rounded-lg bg-dusk-900" />
      </div>

      <div className="glass mt-8 rounded-2xl p-6">
        Frosty glass card — should reflect light/dark backgrounds.
      </div>
    </main>
  );
}
"@ | Set-Content -Encoding UTF8 -Path (Join-Path $debugDir "page.tsx")
Write-Host "✔ $debugDir/page.tsx written"

# 8) VS Code settings to quiet unknown at-rules
New-Item -ItemType Directory -Force -Path ".vscode" | Out-Null
@"
{
  "css.lint.unknownAtRules": "ignore",
  "scss.lint.unknownAtRules": "ignore",
  "less.lint.unknownAtRules": "ignore",
  "tailwindCSS.experimental.configFile": "./tailwind.config.js"
}
"@ | Set-Content -Encoding UTF8 -Path ".\.vscode\settings.json"
Write-Host "✔ .vscode/settings.json written"

# 9) Clean cache, start dev
if (Test-Path ".next") { Remove-Item ".next" -Recurse -Force; Write-Host "• Cleared .next cache" }
Write-Host "`n✅ Done. Starting dev server on http://localhost:3000 ..."
npm run dev
