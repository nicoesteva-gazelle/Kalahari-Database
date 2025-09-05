"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { items, REGIONS, type Kind } from "@/data/records";

const TYPES: Kind[] = ["Government","Academic","Project","People"];

export default function BrowsePage(){
  const [q,setQ] = useState("");
  const [types,setTypes] = useState<Kind[]>([]);
  const [region,setRegion] = useState<string>("");
  const [showPapers,setShowPapers] = useState(true);

  const data = useMemo(()=>{
    return items.filter(it=>{
      if(!showPapers && (it.type==="Government"||it.type==="Academic")) return false;
      const t = q.trim().toLowerCase();
      const matchesText = !t || it.title.toLowerCase().includes(t);
      const matchesType = types.length===0 || types.includes(it.type);
      const matchesRegion = !region || it.region===region;
      return matchesText && matchesType && matchesRegion;
    });
  },[q,types,region,showPapers]);

  const toggleType = (t:Kind)=> setTypes(prev=> prev.includes(t)? prev.filter(x=>x!==t) : [...prev,t]);

  return (
    <main className="section">
      <div className="container" style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:"22px"}}>
        <aside className="card" style={{padding:"16px"}}>
          <h1 className="text-lg" style={{fontWeight:700,letterSpacing:".015em"}}>Browse</h1>
          <p className="text-sm" style={{color:"var(--muted)"}}>Search and narrow by type or region.</p>

          <div className="mt-4">
            <label className="text-sm" style={{color:"var(--muted)"}}>Search</label>
            <input className="input mt-1" placeholder="Find by title…" value={q} onChange={e=>setQ(e.target.value)} />
          </div>

          <div className="mt-5">
            <div className="text-sm" style={{color:"var(--muted)"}}>Type</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginTop:"8px"}}>
              {TYPES.map(t=>(
                <button key={t} onClick={()=>toggleType(t)} className="chip" style={{borderColor: types.includes(t) ? "var(--accent)" : "var(--border)", color: types.includes(t) ? "var(--text)" : "var(--muted)"}}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="text-sm" style={{color:"var(--muted)"}}>Region</div>
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
            <div className="text-sm" style={{marginBottom:"6px", color:"var(--muted)"}}>Show papers (gov + academic)</div>
            <button className="toggle" onClick={()=>setShowPapers(v=>!v)} data-on={showPapers} aria-pressed={showPapers} aria-label="Toggle papers visibility">
              <span className="toggle-thumb" />
            </button>
          </div>
        </aside>

        <section>
          <div className="text-sm" style={{marginBottom:"10px", color:"var(--muted)"}}>{data.length} result{data.length===1?"":"s"}</div>
          <div className="list">
            {data.map(it=>(
              <article key={it.id} className="list-item">
                <div>
                  <div style={{fontWeight:600,letterSpacing:".0125em"}}>{it.title}</div>
                  <div className="text-xs" style={{marginTop:"4px", color:"var(--muted)"}}>{it.type} · {it.region} · {it.year}</div>
                </div>
                <div><Link href={it.href} className="btn ghost">Open</Link></div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}