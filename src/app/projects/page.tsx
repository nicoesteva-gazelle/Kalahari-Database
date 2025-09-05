import Link from "next/link";
import { PROJECTS } from "@/data/projects";

export default function ProjectsPage(){
  return (
    <main className="k-container" style={{padding:"48px 0"}}>
      <h1 className="k-h1 font-display k-pop">Projects</h1>
      <div className="k-grid k-grid-2 mt-4">
        {PROJECTS.map(p => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="k-card k-tile" style={{padding:"14px"}}>
            <div className="uppercase tracking-[.04em] text-[12px]" style={{ color:"var(--muted)" }}>{p.org} · {p.region} · {p.year}</div>
            <div className="mt-1 font-semibold">{p.title}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
