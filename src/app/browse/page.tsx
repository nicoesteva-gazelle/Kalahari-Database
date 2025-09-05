"use client";
import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { papers, projects, people, regions } from "@/data/records";

type TypeFilter = "All" | "Papers" | "Projects" | "People";
type ViewMode = "grid" | "list";

const YEARS: [number, number] = (() => {
  const vals: number[] = [];
  for (const r of papers)   { if (typeof r.year === "number") vals.push(r.year); }
  for (const r of projects) { if (typeof r.year === "number") vals.push(r.year); }
  return vals.length ? [Math.min(...vals), Math.max(...vals)] : [2015, 2025];
})();

function BrowseInner() {
  const sp = useSearchParams();
  const region = sp.get("region");

  const [q, setQ] = useState("");
  const [type, setType] = useState<TypeFilter>("All");
  const [view, setView] = useState<ViewMode>("grid");
  const [minYDefault, maxYDefault] = YEARS;
  const [yMin, setYMin] = useState(minYDefault);
  const [yMax, setYMax] = useState(maxYDefault);

  useEffect(() => { if (yMin > yMax) setYMin(yMax); }, [yMin, yMax]);

  const filtered = useMemo(() => {
    const inYear = (x: { year?: number }) => (typeof x.year === "number" ? (x.year >= yMin && x.year <= yMax) : true);
    const matchRegion = (x: { region: string }) => (!region ? true : x.region === region);
    const matchQ = (s: string) => s.toLowerCase().includes(q.toLowerCase().trim());
    const pprs = papers.filter(p => matchRegion(p) && inYear(p) && (q ? (matchQ(p.title) || matchQ(p.summary ?? "")) : true));
    const prjs = projects.filter(p => matchRegion(p) && inYear(p) && (q ? (matchQ(p.title) || matchQ(p.summary ?? "")) : true));
    const ppl  = people.filter(p => matchRegion(p) && inYear(p) && (q ? (matchQ(p.name)  || matchQ(p.bio ?? "")) : true));
    return { pprs, prjs, ppl };
  }, [region, q, yMin, yMax]);

  const count = ((): number => {
    if (type === "Papers") return filtered.pprs.length;
    if (type === "Projects") return filtered.prjs.length;
    if (type === "People") return filtered.ppl.length;
    return filtered.pprs.length + filtered.prjs.length + filtered.ppl.length;
  })();

  return (
    <div className="space-y-8">
      {/* Region pills */}
      <div className="pillbar">
        <Link href="/browse" className="chip" style={{background:!region?"var(--accent)":"transparent",color:!region?"#fff":"inherit",borderColor:!region?"var(--accent)":"var(--border)"}}>All</Link>
        {regions.map((r) => (
          <Link key={r} href={`/browse?region=${encodeURIComponent(r)}`} className="chip" style={{background:region===r?"var(--accent)":"transparent",color:region===r?"#fff":"inherit",borderColor:region===r?"var(--accent)":"var(--border)"}}>{r}</Link>
        ))}
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search title…" className="input" />
        <select value={type} onChange={e=>setType(e.target.value as TypeFilter)} className="select">
          <option>All</option><option>Papers</option><option>Projects</option><option>People</option>
        </select>
        <div className="range-wrap">
          <span className="muted text-xs">{yMin}</span>
          <input type="range" min={minYDefault} max={maxYDefault} value={yMin} onChange={e=>setYMin(Number(e.target.value))} className="range" />
          <input type="range" min={minYDefault} max={maxYDefault} value={yMax} onChange={e=>setYMax(Number(e.target.value))} className="range" />
          <span className="muted text-xs">{yMax}</span>
        </div>
        <div className="view-toggle">
          <button onClick={()=>setView("grid")} className={view==="grid"?"active":""}>▦</button>
          <button onClick={()=>setView("list")} className={view==="list"?"active":""}>≡</button>
        </div>
        <span className="muted" style={{fontSize:12}}>{count} result(s)</span>
      </div>

      {/* Pinned filters */}
      <div className="pillbar">
        {region && <span className="chip">Region: {region}</span>}
        {(yMin!==minYDefault || yMax!==maxYDefault) && <span className="chip">Years: {yMin}–{yMax}</span>}
        {q && <span className="chip">Search: {q}</span>}
      </div>

      {/* Results */}
      <div className={view==="grid" ? "grid gap-4 sm:grid-cols-2" : "space-y-4"}>
        {(type==="All" || type==="Papers") && filtered.pprs.map((p)=>(
          <article key={p.slug} className="kcard">
            <div style={{fontSize:12,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".04em"}}>paper · {p.region} · {p.year ?? "—"}</div>
            <h3 style={{marginTop:4,fontWeight:600}}><Link href={`/papers/${p.slug}`}>{p.title}</Link></h3>
            <p className="muted" style={{marginTop:6,fontSize:14}}>{p.summary}</p>
          </article>
        ))}
        {(type==="All" || type==="Projects") && filtered.prjs.map((p)=>(
          <article key={p.slug} className="kcard">
            <div style={{fontSize:12,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".04em"}}>project · {p.region} · {p.year ?? "—"}</div>
            <h3 style={{marginTop:4,fontWeight:600}}><Link href={`/projects/${p.slug}`}>{p.title}</Link></h3>
            <p className="muted" style={{marginTop:6,fontSize:14}}>{p.summary}</p>
          </article>
        ))}
        {(type==="All" || type==="People") && filtered.ppl.map((p)=>(
          <article key={p.slug} className="kcard">
            <div style={{fontSize:12,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".04em"}}>researcher · {p.region} · {p.year ?? "—"}</div>
            <h3 style={{marginTop:4,fontWeight:600}}><Link href={`/people/${p.slug}`}>{p.name}</Link></h3>
            <p className="muted" style={{marginTop:6,fontSize:14}}>{p.bio}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="muted">Loading…</div>}>
      <BrowseInner />
    </Suspense>
  );
}