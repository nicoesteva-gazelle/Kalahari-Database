Set-Location "C:\Users\Nicolas Esteva\Downloads\kalahari-database"; Set-ExecutionPolicy -Scope Process Bypass -Force

# --- Ensure folders ---
New-Item -ItemType Directory -Force -Path "src\components" | Out-Null
New-Item -ItemType Directory -Force -Path "src\app\map" | Out-Null
New-Item -ItemType Directory -Force -Path "src\app\about" | Out-Null
New-Item -ItemType Directory -Force -Path "src\data" | Out-Null

# --- 1) GLOBALS: tone/contrast, calmer body, brand style, nav polish ---
$globals = "src\app\globals.css"
if (-not (Test-Path $globals)) {
  "@tailwind base;`n@tailwind components;`n@tailwind utilities;" | Set-Content -Encoding UTF8 -Path $globals
}
$css = @'
/* ==== Tone & contrast (light pops, dark crisp) ==== */
:root{
  --bg:#f4efe5;
  --text:#0f172a;
  --muted:#374151;
  --border:#e5e7eb;
  --accent:#065f46;    /* deep green (light) */
  --accent-2:#86efac;  /* light green (dark) */
  --card:#ffffff;
}
.dark{
  --bg:#052e2b;
  --text:#f8fafc;
  --muted:#d1d5db;
  --border:#11665f;
  --card:#0b4a45;
}

/* Calmer body */
body, main, .k-readable-global{
  font-kerning: normal;
  letter-spacing: .0015em;
  word-spacing: .015em;
  line-height: 1.55;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

/* Brand & headings */
.k-pop { text-shadow: 0 1px 0 rgba(255,255,255,.18), 0 10px 24px rgba(0,0,0,.10); }
.dark .k-pop { text-shadow: 0 1px 0 rgba(0,0,0,.55), 0 10px 32px rgba(0,0,0,.36); }

.k-brand-xxl {
  font-weight: 900;
  font-size: clamp(22px, 2.2vw, 34px);
  text-transform: uppercase;
  color: #fff;
  letter-spacing: .06em;
}
.k-brand-subtle { color: #c7f9e8; font-size: .78rem; letter-spacing: .10em }

/* Header: brand left; links on right */
.k-header { position:sticky; top:0; border-bottom:1px solid var(--border);
  backdrop-filter:saturate(140%) blur(6px);
  background: color-mix(in oklab, var(--bg) 85%, transparent);
  z-index:40;
}
.k-header a { color:#fff !important; text-decoration:none; }
.k-navlinks { display:flex; align-items:center; gap:22px; flex-wrap:nowrap; }

/* Body links */
a:not(.k-btn):not(.k-chip) {
  color: var(--accent);
  text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: .075em;
  transition: color .2s ease, text-shadow .2s ease;
}
a:not(.k-btn):not(.k-chip):visited { color: #0b3b2f; }
.dark a:not(.k-btn):not(.k-chip),
.dark a:not(.k-btn):not(.k-chip):visited { color: var(--accent-2); }

/* Sections, grids, cards */
.k-section { padding: 56px 0; }
.k-grid { gap: 20px; }
.k-card { background: var(--card); border:1px solid var(--border); border-radius:20px; box-shadow:0 1px 0 rgba(0,0,0,.03); }
.k-card.p-lg { padding:20px } .k-card.p-md{ padding:16px } .k-card.p-sm{ padding:12px }

/* Inputs/selects */
.k-input,.k-select{ padding:.56rem .8rem; border-radius:12px; border:1px solid var(--border); background:transparent; color:var(--text); letter-spacing:.0015em; word-spacing:.015em; }

/* Helpers */
.k-balance { text-wrap: balance; }
.k-measure { max-width: 68ch; }
.k-measure-sm { max-width: 58ch; }
'@
if (-not (Select-String -Path $globals -Pattern '\.k-brand-xxl' -Quiet)) { Add-Content -Path $globals -Value "`r`n$css" }

# --- 2) Layout: fonts + theme before paint (keeps contrast) ---
$layoutPath = "src\app\layout.tsx"
if (Test-Path $layoutPath) { Copy-Item $layoutPath "$layoutPath.bak" -Force }
$layout = @'
import "./globals.css";
import { Inter, Fraunces } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;var ls=localStorage.getItem("theme");var sys=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=ls?ls:(sys?"dark":"light");d.classList.toggle("dark",t==="dark");d.setAttribute("data-theme",t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
'@
$layout | Set-Content -Encoding UTF8 -Path $layoutPath

# --- 3) Nav: brand left, links right; bigger brand with pop ---
$navPath = "src\components\Nav.tsx"
@'
"use client";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Nav() {
  return (
    <header className="k-header">
      <div className="k-container">
        <nav className="flex items-center justify-between h-16">
          {/* BRAND (left) */}
          <div className="flex items-center gap-3">
            <span className="grid place-items-center w-[22px] h-[22px] rounded-md" style={{ background: "var(--accent-2)" }}>✦</span>
            <Link href="/" className="k-brand-xxl font-display k-pop">
              Kalahari Database
              <span className="block k-brand-subtle">Research Atlas</span>
            </Link>
          </div>

          {/* NAV LINKS (right) */}
          <div className="k-navlinks">
            <Link href="/" className="muted">Home</Link>
            <Link href="/papers" className="muted">Browse</Link>
            <Link href="/map" className="muted">Map</Link>
            <Link href="/about" className="muted">About</Link>
            <ThemeToggle />
            <a className="k-btn" href="mailto:hello@kalahari-atlas.org">Contribute a record</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
'@ | Set-Content -Encoding UTF8 -Path $navPath

# --- 4) Shared MapExplorer with embed mode (home uses embed; /map filters in place) ---
$dataPath = "src\data\papers.ts"
if (-not (Test-Path $dataPath)) {
@'
export type Paper = {
  slug: string; title: string; topic: string; author: string; region: string; focus: string; organization: string; year: number; type: "paper"|"doc"|"project"; abstract: string; externalUrl?: string;
};
export const PAPERS: Paper[] = [
  { slug:"elephant-movement-northern-kalahari", title:"Elephant movement in northern Kalahari (dummy)", topic:"Wildlife", author:"N. Author", region:"Okavango", focus:"Movement", organization:"Uni A", year:2019, type:"paper", abstract:"Dummy abstract." },
  { slug:"land-board-minutes-grazing-ghanzi-2016", title:"Land Board Minutes on Grazing Allotments (dummy)", topic:"Governance", author:"Land Board", region:"Ghanzi", focus:"Grazing", organization:"Gov", year:2016, type:"doc", abstract:"Dummy minutes." },
  { slug:"vegetation-dynamics-kalahari-south", title:"Vegetation dynamics in Kalahari South (dummy)", topic:"Ecology", author:"T. Mubyana", region:"Kalahari South", focus:"Vegetation", organization:"Uni B", year:2022, type:"paper", abstract:"Dummy study." },
  { slug:"okavango-wetland-services", title:"Okavango wetland ecosystem services (dummy)", topic:"Hydrology", author:"R. Selelo", region:"Okavango", focus:"Ecosystem Services", organization:"Uni C", year:2020, type:"paper", abstract:"Dummy services." },
  { slug:"groundwater-kgalagadi", title:"Groundwater sources in Kgalagadi (dummy)", topic:"Hydrology", author:"L. Dintwe", region:"Kgalagadi", focus:"Water", organization:"Dept Water", year:2017, type:"doc", abstract:"Dummy aquifer mapping." }
];
export const PAPER_BY_SLUG = Object.fromEntries(PAPERS.map(p => [p.slug, p]));
'@ | Set-Content -Encoding UTF8 -Path $dataPath
}

$mapComp = @'
"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PAPERS } from "@/data/papers";

const REGIONS = ["All","Okavango","Kalahari North","Kalahari South","Ghanzi","Kgalagadi"];

export default function MapExplorer({ embed = false }: { embed?: boolean }){
  const [region, setRegion] = useState<string>("All");
  const router = useRouter();
  const filtered = useMemo(()=>PAPERS.filter(p => region==="All" || p.region===region), [region]);

  const choose = (r: string) => {
    if (embed) {
      const q = r==="All" ? "" : `?region=${encodeURIComponent(r)}`;
      router.push(`/papers${q}`);
    } else {
      setRegion(r);
    }
  };

  return (
    <div className="k-grid k-grid-2 items-start">
      {/* Makeshift SVG map (clickable blocks) */}
      <div className="k-card p-md">
        <svg viewBox="0 0 300 200" className="w-full h-auto rounded-[16px]" style={{background:"linear-gradient(180deg,#e8fff3,#f3fff8)", border:"1px solid var(--border)"}}>
          <rect x="10" y="10" width="120" height="80" fill="#c9fdd7" stroke="var(--border)" onClick={()=>choose("Okavango")} style={{cursor:"pointer"}}/>
          <text x="20" y="55" fontSize="12" fill="#065f46">Okavango</text>

          <rect x="160" y="10" width="120" height="80" fill="#d6ffe8" stroke="var(--border)" onClick={()=>choose("Kalahari North")} style={{cursor:"pointer"}}/>
          <text x="170" y="55" fontSize="12" fill="#065f46">Kalahari North</text>

          <rect x="10" y="110" width="120" height="80" fill="#d6ffe8" stroke="var(--border)" onClick={()=>choose("Ghanzi")} style={{cursor:"pointer"}}/>
          <text x="20" y="155" fontSize="12" fill="#065f46">Ghanzi</text>

          <rect x="160" y="110" width="120" height="80" fill="#c9fdd7" stroke="var(--border)" onClick={()=>choose("Kgalagadi")} style={{cursor:"pointer"}}/>
          <text x="170" y="155" fontSize="12" fill="#065f46">Kgalagadi</text>
        </svg>
        <div className="flex flex-wrap gap-2 mt-3">
          {REGIONS.map(r => (
            <button key={r} className="k-chip" style={r===region && !embed ? {background:"var(--accent)",color:"#fff",borderColor:"var(--accent)"} : {}} onClick={()=>choose(r)}>{r}</button>
          ))}
        </div>
      </div>

      {/* Results (only when not embed) */}
      {!embed && (
        <div>
          <div className="muted k-copy-pop text-sm mb-2">{filtered.length} result(s){region!=="All" && <> · region: {region}</>}</div>
          <div className="k-grid" style={{gridTemplateColumns:"repeat(2,minmax(0,1fr))"}}>
            {filtered.map(r => (
              <Link key={r.slug} href={`/papers/${r.slug}`} className="k-card p-sm block rounded-[16px]" style={{ borderColor:"var(--border)" }}>
                <div className="uppercase tracking-[.04em] text-[12px]" style={{ color:"var(--muted)" }}>{r.type} · {r.region} · {r.year}</div>
                <div className="mt-1 font-semibold k-pop">{r.title}</div>
                <div className="muted text-[14px] mt-1">View →</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
'@
$mapComp | Set-Content -Encoding UTF8 -Path .\src\components\MapExplorer.tsx

# --- 5) /map page uses MapExplorer (not embed) ---
$mapPage = @'
import MapExplorer from "@/components/MapExplorer";

export default function MapPage(){
  return (
    <main className="k-container k-readable-global" style={{padding:"48px 0"}}>
      <h1 className="k-h1 k-pop k-balance k-measure font-display">Interactive Map (prototype)</h1>
      <p className="muted k-measure-sm mt-2">Click a region on the map or use the chips; results update live below. (Dummy data.)</p>
      <div className="mt-6">
        <MapExplorer />
      </div>
    </main>
  );
}
'@
$mapPage | Set-Content -Encoding UTF8 -Path .\src\app\map\page.tsx

# --- 6) HOME page: embed MapExplorer in the Interactive Map section ---
$homePath = "src\app\page.tsx"
if (Test-Path $homePath) {
  $home = Get-Content $homePath -Raw
  if ($home -notmatch 'MapExplorer') {
    $home = 'import MapExplorer from "@/components/MapExplorer";' + "`r`n" + $home
  }
  # replace the existing "Interactive map" section if present, else append one
  if ($home -match '<section id="map"[\s\S]*?</section>') {
    $home = [regex]::Replace($home, '<section id="map"[\s\S]*?</section>', @'
<section id="map" className="k-section">
  <div className="k-container">
    <h2 className="text-[28px] mb-2 font-display k-pop">Interactive map</h2>
    <p className="muted text-[14px] mb-4 k-measure-sm">Click a region or use the chips. On the home page this jumps into Browse with that filter on.</p>
    <MapExplorer embed />
  </div>
</section>
'@)
  } else {
    $home += @'

<section id="map" className="k-section">
  <div className="k-container">
    <h2 className="text-[28px] mb-2 font-display k-pop">Interactive map</h2>
    <p className="muted text-[14px] mb-4 k-measure-sm">Click a region or use the chips. On the home page this jumps into Browse with that filter on.</p>
    <MapExplorer embed />
  </div>
</section>
'
  }
  Set-Content -Encoding UTF8 -Path $homePath -Value $home
}

# --- 7) ABOUT: interactive tabs ---
$aboutTabs = @'
"use client";
import { useState } from "react";

const tabs = ["Scope","Roadmap","Team","Contribute"] as const;
type Tab = typeof tabs[number];

export default function AboutTabs(){
  const [t, setT] = useState<Tab>("Scope");
  return (
    <div className="k-card p-lg">
      <div className="flex flex-wrap gap-2">
        {tabs.map(x => (
          <button key={x} onClick={()=>setT(x)} className="k-chip" style={t===x?{background:"var(--accent)",color:"#fff",borderColor:"var(--accent)"}:{}}>{x}</button>
        ))}
      </div>

      {t==="Scope" && (
        <div className="k-prose k-readable mt-3">
          <ul>
            <li>Government & grey literature (EIAs, wildlife counts, land board notices)</li>
            <li>Peer-reviewed papers and theses</li>
            <li>Active projects & partners</li>
            <li>Researchers & institutions</li>
          </ul>
        </div>
      )}

      {t==="Roadmap" && (
        <ol className="k-prose k-readable mt-3">
          <li>Ingest initial records; define minimum metadata (title, type, year, region, org).</li>
          <li>Add polygons & gazetteer; enable map-driven filtering.</li>
          <li>Contributor workflow (submit → review → publish) with provenance.</li>
          <li>CSV/JSON export + lightweight API for reuse.</li>
          <li>Drive/SharePoint integrations for bulk import.</li>
          <li>Quality signals (citations, peer review, last-updated).</li>
        </ol>
      )}

      {t==="Team" && (
        <div className="k-prose k-readable mt-3">
          <p>Looking for collaborators in ecology, hydrology, governance, geospatial, and data stewardship.</p>
        </div>
      )}

      {t==="Contribute" && (
        <div className="k-prose k-readable mt-3">
          <p>Email <a href="mailto:hello@kalahari-atlas.org" className="k-link">hello@kalahari-atlas.org</a> with a title, year, type, region, and a link or file.</p>
        </div>
      )}
    </div>
  );
}
'@
$aboutTabs | Set-Content -Encoding UTF8 -Path .\src\components\AboutTabs.tsx

$aboutPage = @'
import AboutTabs from "@/components/AboutTabs";

export default function AboutPage(){
  return (
    <main className="k-container k-readable-global" style={{padding:"48px 0"}}>
      <h1 className="k-h1 k-pop k-balance k-measure font-display">About the Kalahari Database</h1>
      <p className="muted k-measure-sm mt-2">A community effort to surface Botswana-Kalahari knowledge and make collaboration easier.</p>
      <div className="mt-6"><AboutTabs /></div>
    </main>
  );
}
'@
$aboutPage | Set-Content -Encoding UTF8 -Path .\src\app\about\page.tsx

# --- 8) Rebuild clean ---
taskkill /F /IM node.exe 2>$null | Out-Null
npx rimraf .next
npm run dev
