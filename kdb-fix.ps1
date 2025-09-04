Set-Location "C:\Users\Nicolas Esteva\Downloads\kalahari-database"; Set-ExecutionPolicy -Scope Process Bypass -Force; $ErrorActionPreference="Stop"

# Helpers
function Ensure-Dir($p){ if(-not (Test-Path $p)){ New-Item -ItemType Directory -Force -Path $p | Out-Null } }
function Save-File($p,$c){ if((Test-Path $p) -and (-not (Test-Path "$p.bak"))){ Copy-Item $p "$p.bak" -Force }; $u=New-Object System.Text.UTF8Encoding($false); [IO.File]::WriteAllText($p,$c,$u) }
function Upsert-Import([string]$f,[string]$line){ if(-not (Test-Path $f)){return}; $t=Get-Content $f -Raw; if($t -notmatch [Regex]::Escape($line)){ $t=$line+"`r`n"+$t; Save-File $f $t } }

# ---------- 1) CSS: map sizing, toggle switch, spacing & scale ----------
$globals="src\app\globals.css"
if(Test-Path $globals){
  $g = Get-Content $globals -Raw
}else{
  $g = "@tailwind base;`n@tailwind components;`n@tailwind utilities;`n"
}
# Ensure core theme vars remain; then add/patch sizing + toggle styles
$addon = @'
/* === Sizing & Safari-like polish === */
:root{
  --scale: 1;                  /* global UI scale (bump to 1.05 if needed) */
}
.container{max-width:1100px;margin:0 auto;padding:0 20px}
.section{padding:56px 0}
h1,h2,h3{letter-spacing:.0125em}
html,body{letter-spacing:.005em}

/* Map frames – consistent sizes on home & map pages */
.map-frame{height:clamp(360px, 62vh, 720px); border-radius:22px; border:1px solid var(--border); overflow:hidden}
.map-page{min-height:calc(100vh - 64px - 84px); display:flex; align-items:stretch}
.map-page .map-frame{height:clamp(540px, 70vh, 900px); width:100%}

/* Pretty toggle switch */
.toggle{
  --w:52px; --h:30px;
  position:relative; width:var(--w); height:var(--h);
  border:1px solid var(--border); border-radius:999px; background:var(--card);
  display:inline-flex; align-items:center; padding:2px; cursor:pointer;
  transition:background .2s ease, border-color .2s ease;
}
.toggle[data-on="true"]{ background: var(--accent); border-color: var(--accent); }
.toggle-thumb{
  width:26px; height:26px; border-radius:999px; background:#fff; box-shadow:0 1px 0 rgba(0,0,0,.10);
  transform:translateX(0); transition:transform .22s cubic-bezier(.2,.8,.2,1);
}
.toggle[data-on="true"] .toggle-thumb{ transform:translateX(22px) }
.toggle-label{font-size:.85rem; margin-left:.6rem}

/* List & chips refresh */
.chip{display:inline-flex;align-items:center;gap:.35rem;padding:.25rem .6rem;border-radius:999px;border:1px solid var(--border);font-size:.8rem;color:var(--muted)}
.list{display:flex;flex-direction:column;gap:10px}
.list-item{display:flex;align-items:center;justify-content:space-between;padding:12px;border:1px solid var(--border);border-radius:14px;background:var(--card)}
.input{width:100%;border:1px solid var(--border);background:var(--card);border-radius:12px;padding:.6rem .8rem}
'@
if($g -notmatch "Map frames – consistent sizes"){
  Save-File $globals ($g.TrimEnd()+"`n`n"+$addon)
}

# ---------- 2) Header: real toggle switch (persists theme, no extra deps) ----------
Ensure-Dir "src\components"
Save-File "src\components\SiteHeader.tsx" @'
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

function getInitialTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved as any;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function SiteHeader(){
  const [theme,setTheme] = useState<"dark"|"light">("light");
  useEffect(()=>{
    const t = getInitialTheme();
    setTheme(t);
    const root = document.documentElement;
    root.classList.toggle("dark", t === "dark");
  },[]);
  const toggle = ()=>{
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  return (
    <header className="site-header">
      <div className="container">
        <nav className="site-nav">
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <span style={{display:"inline-grid",placeItems:"center",width:"22px",height:"22px",borderRadius:"6px",background:"var(--accent-2)"}}>✦</span>
            <Link href="/" style={{fontWeight:800,letterSpacing:".015em"}}>Kalahari Database : Research Atlas</Link>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"18px"}}>
            <Link href="/browse" className="chip">Browse</Link>
            <Link href="/map" className="chip">Map</Link>
            <Link href="/about" className="chip">About</Link>
            <button onClick={toggle} aria-label="Toggle theme" className="toggle" data-on={theme==="dark"}>
              <span className="toggle-thumb" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
'

# ---------- 3) Home page: ensure MapExplorer sizing wrapper & browse link ----------
$pageHome = "src\app\page.tsx"
if(Test-Path $pageHome){
  $txt = Get-Content $pageHome -Raw
  # fix any accidental stray `">` tokens
  $txt = $txt -replace '>\s*">\s*','>'
  # ensure MapExplorer is wrapped in .map-frame
  if($txt -match '<MapExplorer\s*/?>' -and $txt -notmatch 'className="map-frame"'){
    $txt = $txt -replace '(<MapExplorer\s*/?>)','<div className="map-frame">$1</div>'
  }
  # ensure browse button links to /browse
  $txt = $txt -replace 'href="/papers"','href="/browse"'
  Save-File $pageHome $txt
}

# ---------- 4) Map page: full-height container with .map-page + .map-frame ----------
$mapPage = "src\app\map\page.tsx"
if(Test-Path $mapPage){
  $m = Get-Content $mapPage -Raw
  if($m -notmatch 'MapExplorer'){
    # If this page is static text, create a thin wrapper importing your component
    $m = @'
import MapExplorer from "@/components/MapExplorer";
export default function MapPage(){
  return (
    <section className="section map-page">
      <div className="container" style={{width:"100%"}}>
        <div className="map-frame">
          <MapExplorer />
        </div>
      </div>
    </section>
  );
}
'
  } else {
    # Ensure class wrappers
    if($m -notmatch 'map-page'){ $m = $m -replace '<section([^>]*)className="section"','<section$1 className="section map-page"' }
    if($m -match '<MapExplorer\s*/?>' -and $m -notmatch 'className="map-frame"'){
      $m = $m -replace '(<MapExplorer\s*/?>)','<div className="map-frame">$1</div>'
    }
  }
  Save-File $mapPage $m
}

# ---------- 5) Browse page: re-establish list view + "Hide papers" toggle ----------
Ensure-Dir "src\app\browse"
Save-File "src\app\browse\page.tsx" @'
"use client";
import Link from "next/link";
import { useMemo, useState } from "react";

type Item = { id:string; title:string; type:"Government"|"Academic"|"Project"|"People"; year:number; region:string };

const seed: Item[] = [
  { id:"g-001", title:"Land Board Minutes – Ghanzi (2016)", type:"Government", year:2016, region:"Ghanzi" },
  { id:"a-002", title:"Elephant Movement in Northern Kalahari", type:"Academic", year:2021, region:"North" },
  { id:"p-003", title:"Water Points Rehabilitation Pilot", type:"Project", year:2024, region:"South" },
  { id:"p-004", title:"Okavango Community Mapping", type:"Project", year:2023, region:"Okavango" },
  { id:"a-005", title:"Vegetation Dynamics – Dr Mubyana", type:"Academic", year:2020, region:"North" },
  { id:"r-006", title:"Researcher: Dr Mubyana", type:"People", year:2020, region:"North" },
];

const TYPES = ["Government","Academic","Project","People"] as const;
const REGIONS = ["North","South","Ghanzi","Okavango"] as const;

export default function BrowsePage(){
  const [q,setQ]=useState("");
  const [types,setTypes]=useState<string[]>([]);
  const [region,setRegion]=useState<string>("");
  const [showPapers,setShowPapers]=useState(true);

  const filtered = useMemo(()=>{
    return seed.filter(it=>{
      if(!showPapers && (it.type==="Government" || it.type==="Academic")) return false;
      const matchesText = q.trim().length===0 || it.title.toLowerCase().includes(q.toLowerCase());
      const matchesType = types.length===0 || types.includes(it.type);
      const matchesRegion = !region || it.region===region;
      return matchesText && matchesType && matchesRegion;
    });
  },[q,types,region,showPapers]);

  const toggleType = (t:string)=> setTypes(prev=> prev.includes(t)? prev.filter(x=>x!==t) : [...prev,t]);

  return (
    <section className="section">
      <div className="container" style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:"22px"}}>
        {/* Sidebar filters */}
        <aside className="card" style={{padding:"16px"}}>
          <h2 className="text-lg" style={{fontWeight:700,letterSpacing:".015em"}}>Narrow down</h2>

          <div className="mt-4">
            <label className="text-sm muted">Search</label>
            <input className="input mt-1" placeholder="Find by title…" value={q} onChange={e=>setQ(e.target.value)} />
          </div>

          <div className="mt-5">
            <div className="text-sm muted">Type</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginTop:"8px"}}>
              {TYPES.map(t=>(
                <button key={t} onClick={()=>toggleType(t)} className="chip" style={{borderColor: types.includes(t) ? "var(--accent)" : "var(--border)", color: types.includes(t) ? "var(--text)" : "var(--muted)"}}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="text-sm muted">Region</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginTop:"8px"}}>
              {REGIONS.map(r=>(
                <button key={r} onClick={()=>setRegion(region===r?"":r)} className="chip" style={{borderColor: region===r ? "var(--accent)" : "var(--border)", color: region===r ? "var(--text)" : "var(--muted)"}}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5" style={{display:"flex",gap:"10px",alignItems:"center"}}>
            <button className="btn" onClick={()=>{ setQ(""); setTypes([]); setRegion(""); setShowPapers(true); }}>Reset</button>
            <Link href="/map" className="btn ghost">Use Map →</Link>
          </div>

          <div className="mt-5">
            <div className="text-sm muted" style={{marginBottom:"6px"}}>Show papers (gov + academic)</div>
            <button
              className="toggle"
              onClick={()=>setShowPapers(v=>!v)}
              data-on={showPapers}
              aria-pressed={showPapers}
              aria-label="Toggle papers visibility">
              <span className="toggle-thumb" />
              <span className="toggle-label">{showPapers ? "Visible" : "Hidden"}</span>
            </button>
          </div>
        </aside>

        {/* Results list */}
        <main>
          <div className="text-sm muted" style={{marginBottom:"10px"}}>{filtered.length} result{filtered.length===1?"":"s"}</div>
          <div className="list">
            {filtered.map(it=>(
              <article key={it.id} className="list-item">
                <div>
                  <div style={{fontWeight:600,letterSpacing:".0125em"}}>{it.title}</div>
                  <div className="muted text-xs" style={{marginTop:"4px"}}>{it.type} · {it.region} · {it.year}</div>
                </div>
                <div style={{display:"flex",gap:"10px"}}>
                  {it.type==="Government"||it.type==="Academic" ? (
                    <Link href="/papers" className="btn ghost">Open</Link>
                  ) : it.type==="Project" ? (
                    <Link href="/projects" className="btn ghost">Open</Link>
                  ) : (
                    <Link href="/people" className="btn ghost">Open</Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </section>
  );
}
'

# ---------- 6) Layout: make sure header/footer are wired & globals imported ----------
$layout="src\app\layout.tsx"
if(Test-Path $layout){
  Upsert-Import $layout 'import "./globals.css";'
  Upsert-Import $layout 'import SiteHeader from "@/components/SiteHeader";'
  Upsert-Import $layout 'import SiteFooter from "@/components/SiteFooter";'
  $ltxt=Get-Content $layout -Raw
  if($ltxt -notmatch "<SiteHeader\s*/>"){ $ltxt=[regex]::Replace($ltxt,"(<body[^>]*>)",{param($m)$m.Value+"`r`n      <SiteHeader />"},1) }
  if($ltxt -notmatch "<SiteFooter\s*/>"){ $ltxt=$ltxt -replace "</body>","  <SiteFooter />`r`n</body>" }
  Save-File $layout $ltxt
}

# ---------- 7) Sanity sweep: remove accidental quote sequences from home ----------
if(Test-Path $pageHome){
  $txt = Get-Content $pageHome -Raw
  $txt = $txt -replace '>\s*">\s*','>'
  Save-File $pageHome $txt
}

Write-Host "`n✅ Done: Map sizing fixed, real toggle switch, sizes polished, Browse list re-established with hide-papers toggle, header intact, stray characters cleaned. Backups (.bak) created where modified."
