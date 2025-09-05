import Link from "next/link";
import Hero from "@/components/Hero";
import { papers, projects, people, regions } from "@/data/records";

export default function HomePage() {
  const stats = {
    papers: papers.length,
    projects: projects.length,
    people: people.length,
    regions: regions.length,
  };

  return (
    <>
      <section className="relative container max-w-6xl px-6 pt-16 pb-12">
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

        {/* Live stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          <div className="kcard text-center"><h3 className="muted mb-1">Papers</h3><p className="text-3xl font-bold">{stats.papers}</p></div>
          <div className="kcard text-center"><h3 className="muted mb-1">Projects</h3><p className="text-3xl font-bold">{stats.projects}</p></div>
          <div className="kcard text-center"><h3 className="muted mb-1">People</h3><p className="text-3xl font-bold">{stats.people}</p></div>
          <div className="kcard text-center"><h3 className="muted mb-1">Regions</h3><p className="text-3xl font-bold">{stats.regions}</p></div>
        </div>

        {/* Region marquee */}
        <div className="mt-6 overflow-hidden border rounded-2xl bg-[var(--card)]">
          <div className="marquee flex gap-4 py-3 px-4">
            {[...regions, ...regions, ...regions].map((r, i) => (
              <Link key={i} href={`/browse?region=${encodeURIComponent(r)}`} className="chip hover:opacity-80">
                {r}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Feature callouts */}
      <section className="container max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <Link href="/browse" className="kcard hover:scale-[1.01] transition-transform">
            <h3 className="text-lg font-semibold mb-1">Curated Library</h3>
            <p className="muted">Filter by region, year, and type. Switch grid/list. Live counts keep you oriented.</p>
          </Link>
          <Link href="/map" className="kcard hover:scale-[1.01] transition-transform">
            <h3 className="text-lg font-semibold mb-1">Interactive Map</h3>
            <p className="muted">Hover to learn, click to explore. Every region connected to records.</p>
          </Link>
          <Link href="/people" className="kcard hover:scale-[1.01] transition-transform">
            <h3 className="text-lg font-semibold mb-1">Research Network</h3>
            <p className="muted">Discover people and projects shaping conservation across the Kalahari.</p>
          </Link>
        </div>
      </section>

      <style>{`
        .heading-hero{
          letter-spacing:-.02em;
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          -webkit-background-clip:text; background-clip:text; color:transparent;
          animation: shine 6s ease-in-out infinite alternate;
        }
        @keyframes shine{
          0% { filter: drop-shadow(0 10px 20px rgba(0,0,0,.05)); }
          100%{ filter: drop-shadow(0 12px 30px rgba(0,0,0,.12)); }
        }
        .marquee { animation: scroll 18s linear infinite; white-space: nowrap; }
        @keyframes scroll {
          0%{ transform: translateX(0); }
          100%{ transform: translateX(-33%); }
        }
      `}</style>
    </>
  );
}