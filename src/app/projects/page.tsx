"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { projects, regions, type Project } from "@/data/records";

export default function ProjectsPage() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState<string>("All");
  const [yMin, setYMin] = useState<number>(2015);
  const [yMax, setYMax] = useState<number>(2025);

  const list = useMemo(() => {
    const matchQ = (s: string) => s.toLowerCase().includes(q.toLowerCase().trim());
    return projects.filter((p: Project) =>
      (region === "All" || p.region === region) &&
      (p.year ? (p.year >= yMin && p.year <= yMax) : true) &&
      (q ? (matchQ(p.title) || matchQ(p.summary ?? "")) : true)
    );
  }, [q, region, yMin, yMax]);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">Projects</h1>
      <div className="toolbar">
        <input className="input" placeholder="Search projects…" value={q} onChange={e=>setQ(e.target.value)} />
        <select className="select" value={region} onChange={e=>setRegion(e.target.value)}>
          <option>All</option>{regions.map(r => <option key={r}>{r}</option>)}
        </select>
        <div className="range-wrap">
          <span className="muted text-xs">{yMin}</span>
          <input type="range" min={2015} max={2025} value={yMin} onChange={e=>setYMin(Number(e.target.value))} className="range" />
          <input type="range" min={2015} max={2025} value={yMax} onChange={e=>setYMax(Number(e.target.value))} className="range" />
          <span className="muted text-xs">{yMax}</span>
        </div>
        <span className="muted text-xs">{list.length} result(s)</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {list.map(p=>(
          <article key={p.slug} className="kcard">
            <div style={{fontSize:12,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".04em"}}>project · {p.region} · {p.year ?? "—"}</div>
            <h3 style={{marginTop:4,fontWeight:600}}><Link href={`/projects/${p.slug}`}>{p.title}</Link></h3>
            <p className="muted" style={{marginTop:6,fontSize:14}}>{p.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}