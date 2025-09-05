import Link from "next/link";
import { regions } from "@/data/records";

export default function RegionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">Regions</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {regions.map(r => (
          <article key={r} className="kcard">
            <h3 style={{marginTop:4,fontWeight:600}}>{r}</h3>
            <p className="muted" style={{marginTop:6,fontSize:14}}>Explore records, projects, and people for this region.</p>
            <div style={{marginTop:10, display:"flex", gap:8}}>
              <Link className="chip" href={`/browse?region=${encodeURIComponent(r)}`}>Browse</Link>
              <Link className="chip" href={`/papers?region=${encodeURIComponent(r)}`}>Papers</Link>
              <Link className="chip" href={`/projects?region=${encodeURIComponent(r)}`}>Projects</Link>
              <Link className="chip" href={`/people?region=${encodeURIComponent(r)}`}>People</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}