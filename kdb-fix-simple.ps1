$ErrorActionPreference = "Stop"
Write-Host "=== KDB Fix (simple) ===`n"

# 0) Sanity check
if (-not (Test-Path "package.json")) { throw "Run this from your project root (package.json not found)." }

# 1) Ensure postcss.config.js
if (-not (Test-Path "postcss.config.js")) {
  @"
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
"@ | Set-Content -Encoding UTF8 -Path "postcss.config.js"
  Write-Host "✔ Created postcss.config.js"
} else {
  Write-Host "• postcss.config.js already exists"
}

# 2) Ensure tailwind dev deps (best-effort; harmless if already present)
try {
  npm i -D tailwindcss postcss autoprefixer | Out-Null
  Write-Host "✔ Tailwind/PostCSS dev deps ensured"
} catch {
  Write-Host "• Skipped installing dev deps (npm issue), continuing..."
}

# 3) Find layout.tsx (prefer src/app if both exist)
$layout = $null
if (Test-Path "src/app/layout.tsx") { $layout = "src/app/layout.tsx" }
elseif (Test-Path "app/layout.tsx") { $layout = "app/layout.tsx" }
if (-not $layout) { throw "No layout.tsx found in app/ or src/app/." }
Write-Host "• Using layout: $layout"

# 4) Write globals.css NEXT TO layout.tsx
$appDir = Split-Path $layout
$globals = Join-Path $appDir "globals.css"

$globalsCss = @"
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
"@

$writeGlobals = $true
if (Test-Path $globals) {
  if ((Get-Content $globals -Raw) -eq $globalsCss) { $writeGlobals = $false }
}
if ($writeGlobals) {
  $globalsCss | Set-Content -Encoding UTF8 -Path $globals
  Write-Host "✔ Wrote $globals"
} else {
  Write-Host "• $globals already up-to-date"
}

# 5) Ensure layout imports ./globals.css  (no regex; simple contains check)
$layoutSrc = Get-Content $layout -Raw
if ($layoutSrc -notlike "*./globals.css*") {
  ("import `"./globals.css`";`r`n" + $layoutSrc) | Set-Content -Encoding UTF8 -Path $layout
  Write-Host "✔ Added import to $layout"
} else {
  Write-Host "• $layout already imports ./globals.css"
}

# 6) VS Code settings (silence unknownAtRules, point to tailwind config)
New-Item -ItemType Directory -Force -Path ".vscode" | Out-Null
@"
{
  "css.lint.unknownAtRules": "ignore",
  "scss.lint.unknownAtRules": "ignore",
  "less.lint.unknownAtRules": "ignore",
  "tailwindCSS.experimental.configFile": "./tailwind.config.js"
}
"@ | Set-Content -Encoding UTF8 -Path ".vscode/settings.json"
Write-Host "✔ Wrote .vscode/settings.json"

# 7) Remove stray index.html (prevents Next.js routing)
if (Test-Path "index.html") {
  Remove-Item "index.html" -Force
  Write-Host "✔ Removed stray index.html"
} else {
  Write-Host "• No stray index.html (good)"
}

# 8) Clean .next and free port 3000
if (Test-Path ".next") { Remove-Item ".next" -Recurse -Force; Write-Host "✔ Removed .next cache" }
try { npx kill-port 3000 2>$null | Out-Null; Write-Host "✔ Freed port 3000" } catch { Write-Host "• Skipped kill-port" }

Write-Host "`n✅ Done. Now run: npm run dev  (open http://localhost:3000)"
