import Link from "next/link";
import { PEOPLE } from "@/data/people";

export default function PeoplePage(){
  return (
    <main className="k-container" style={{padding:"48px 0"}}>
      <h1 className="k-h1 font-display k-pop">People & Institutions</h1>
      <div className="k-grid k-grid-2 mt-4">
        {PEOPLE.map(p => (
          <Link key={p.slug} href={`/people/${p.slug}`} className="k-card k-tile" style={{padding:"14px"}}>
            <div className="uppercase tracking-[.04em] text-[12px]" style={{ color:"var(--muted)" }}>{p.org} · {p.region}</div>
            <div className="mt-1 font-semibold">{p.name}</div>
            <div style={{color:"var(--muted)"}}>{p.role}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
