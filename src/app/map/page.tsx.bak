import Link from "next/link";
import MapExplorer from "@/components/MapExplorer";

const REGIONS = ["North","South","Ghanzi","Okavango"] as const;

const PAPERS = [
  { href:"/papers/land-board-minutes-grazing-ghanzi-2016", title:"Land Board Minutes €š¬‚¬Å“ Ghanzi (2016)", meta:"Government · Ghanzi · 2016" },
  { href:"/papers/elephant-movement-northern-kalahari",      title:"Elephant Movement in Northern Kalahari", meta:"Academic · North · 2021" },
];

export default function MapPage(){
  return (
    <main className="section">
      <div className="container">
        {/* Map + Regions side by side */}
        <div className="grid" style={{ gridTemplateColumns: "1fr 280px", gap: "22px" }}>
          <div className="map-frame">
            <MapExplorer />
          </div>
          <aside className="card" style={{ padding: "16px" }}>
            <h2 className="text-lg" style={{ fontWeight: 700, letterSpacing: ".015em" }}>Regions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
              {REGIONS.map(r => (
                <Link key={r} className="chip" href={`/map?region=${encodeURIComponent(r)}`}>{r}</Link>
              ))}
            </div>
            <div className="text-sm" style={{ marginTop: "12px", color: "var(--muted)" }}>
              Tip: choose a region to filter results on the map.
            </div>
          </aside>
        </div>

        {/* Simple papers list under the map */}
        <section style={{ marginTop: "24px" }}>
          <h3 className="text-xl" style={{ fontWeight: 700, letterSpacing: ".0125em", marginBottom: "10px" }}>Papers</h3>
          <div className="list">
            {PAPERS.map(p => (
              <article key={p.href} className="list-item">
                <div>
                  <div style={{ fontWeight: 600, letterSpacing: ".0125em" }}>{p.title}</div>
                  <div className="muted text-xs" style={{ marginTop: "4px" }}>{p.meta}</div>
                </div>
                <div>
                  <Link href={p.href} className="btn ghost">Open</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}