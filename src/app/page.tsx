import Link from "next/link";
import Hero from "@/components/Hero";
import { papers, projects, people } from "@/data/records";
import { FileText, Compass, UserCircle, MapPin } from "lucide-react";

const BELT = ["🐘","🦁","🐄","🦁","🐘","🐄","🦁","🐘","🐄"];

export default function HomePage() {
  const stats = {
    papers: papers.length,
    projects: projects.length,
    people: people.length,
    regions: 4,
  };

  return (
    <>
      <section className="relative container max-w-6xl px-6 pt-12 pb-8">
        <Hero
          title="Kalahari Database"
          highlight="— Explore, discover, protect"
          subtitle="Research, projects, people, and places — all in one place — Kalahari."
          image="/hero.svg"
          ctas={[
            { href: "/browse", label: "Browse Everything", primary: true },
            { href: "/map", label: "Open the Map" },
          ]}
        />

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          <Link href="/papers" className="kcard text-center hover:scale-[1.01] transition-transform">
            <FileText className="mx-auto mb-2 h-6 w-6 text-[var(--accent)]" />
            <h3 className="muted mb-1">Papers</h3>
            <p className="text-3xl font-bold">{stats.papers}</p>
          </Link>
          <Link href="/projects" className="kcard text-center hover:scale-[1.01] transition-transform">
            <Compass className="mx-auto mb-2 h-6 w-6 text-[var(--accent)]" />
            <h3 className="muted mb-1">Projects</h3>
            <p className="text-3xl font-bold">{stats.projects}</p>
          </Link>
          <Link href="/people" className="kcard text-center hover:scale-[1.01] transition-transform">
            <UserCircle className="mx-auto mb-2 h-6 w-6 text-[var(--accent)]" />
            <h3 className="muted mb-1">People</h3>
            <p className="text-3xl font-bold">{stats.people}</p>
          </Link>
          <Link href="/regions" className="kcard text-center hover:scale-[1.01] transition-transform">
            <MapPin className="mx-auto mb-2 h-6 w-6 text-[var(--accent)]" />
            <h3 className="muted mb-1">Regions</h3>
            <p className="text-3xl font-bold">{stats.regions}</p>
          </Link>
        </div>

        {/* Rotating animal belt */}
        <div className="mt-5 border rounded-2xl bg-[var(--card)] overflow-hidden">
          <div className="belt">
            {[...BELT, ...BELT].map((e, i) => (
              <span key={i} className="belt-item">{e}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature callouts */}
      <section className="container max-w-6xl px-6 pb-12">
        <div className="grid gap-6 md:grid-cols-3">
          <Link href="/papers" className="kcard hover:scale-[1.01] transition-transform">
            <h3 className="text-lg font-semibold mb-1">Curated Library</h3>
            <p className="muted">Browse peer-reviewed and grey literature by region and year.</p>
          </Link>
          <Link href="/projects" className="kcard hover:scale-[1.01] transition-transform">
            <h3 className="text-lg font-semibold mb-1">Field Projects</h3>
            <p className="muted">Active and past initiatives across the Kalahari.</p>
          </Link>
          <Link href="/people" className="kcard hover:scale-[1.01] transition-transform">
            <h3 className="text-lg font-semibold mb-1">Research Network</h3>
            <p className="muted">Researchers, NGOs, and practitioners.</p>
          </Link>
        </div>
      </section>

      <div className="container max-w-6xl px-6 my-6">
        <hr className="divider" />
      </div>

      <style>{`
        .belt { display:flex; gap:18px; padding:12px 18px; animation: belt-scroll 16s linear infinite; will-change: transform; }
        .belt-item { font-size: 1.6rem; display:inline-block; animation: belt-bob 2.6s ease-in-out infinite; }
        .belt-item:nth-child(3n) { animation-delay:.3s }
        .belt-item:nth-child(4n) { animation-delay:.6s }
        @keyframes belt-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes belt-bob { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-4px) } }
      `}</style>
    </>
  );
}