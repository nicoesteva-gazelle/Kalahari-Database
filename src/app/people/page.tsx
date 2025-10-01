"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { people, regions, type Person } from "@/data/records";

export default function PeoplePage() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState<string>("All");

  const list = useMemo(() => {
    const matchQ = (s: string) => s.toLowerCase().includes(q.toLowerCase().trim());
    return people.filter((p: Person) =>
      (region === "All" || p.region === region) &&
      (q ? (matchQ(p.name) || matchQ(p.bio ?? "")) : true)
    );
  }, [q, region]);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">People & Organizations</h1>
      <div className="toolbar">
        <input className="input" placeholder="Search people & orgs…" value={q} onChange={e=>setQ(e.target.value)} />
        <select className="select" value={region} onChange={e=>setRegion(e.target.value)}>
          <option>All</option>{regions.map(r => <option key={r}>{r}</option>)}
        </select>
        <span className="muted text-xs">{list.length} result(s)</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {list.map(p=>(
          <article key={p.slug} className="kcard">
            <div style={{fontSize:12,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".04em"}}>region · {p.region}</div>
            <h3 style={{marginTop:4,fontWeight:600}}><Link href={`/people/${p.slug}`}>{p.name}</Link></h3>
            <p className="muted" style={{marginTop:6,fontSize:14}}>{p.bio}</p>
          </article>
        ))}
      </div>
    </div>
  );
}