import Link from "next/link";
import MapExplorer from "@/components/MapExplorer"; // swap to your real map component

export default function Page(){
  return (
    <main>
      {/* Hero */}
      <section id="home" className="section">
        <div className="container grid grid-2 items-center">
          <div>
            <h1 className="h1">Kalahari research, projects, people, and places €” all in one place</h1>
            <p className="muted mt-3">A hub to discover Botswana€“Kalahari knowledge €” past to present. Browse categories or explore the map.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/browse" className="btn">Browse records</Link>
              <Link href="/map" className="btn ghost">Open map †’</Link>
            </div>
            <ul className="muted mt-4 space-y-1 text-sm">
  <li>œ“ Papers, projects, researchers</li>
  <li>œ“ Region-aware filtering</li>
  <li>œ“ Open access ethos</li>
</ul>
          </div>
          <div>
            <div className="card p-6">
              <div className="hero-img">Hero image of the Kalahari</div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse */}
      <section id="browse" className="section">
        <div className="container">
          <h2 className="text-2xl mb-4">Browse records</h2>
          <div className="grid grid-4">
            <Link href="/browse" className="btn">Browse records</Link>
            <Link href="/browse" className="btn">Browse records</Link>
            <Link href="/projects" className="card p-4"><h3>Active Projects</h3><p className="muted">Fieldwork and community initiatives across the Kalahari.</p></Link>
            <Link href="/people" className="card p-4"><h3>Researchers</h3><p className="muted">Directory of experts and collaborators.</p></Link>
          </div>
        </div>
      </section>

      {/* Map */}
      <section id="map" className="section">
        <div className="container">
          <h2 className="text-2xl mb-2">Interactive map</h2>
          <p className="muted text-sm mb-4">Explore the live map and filter results by region and type.</p>
          <div className="card map overflow-hidden">
            <div className="map-frame"><MapExplorer /></div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <div className="container grid grid-2">
          <div>
            <h2 className="text-2xl mb-2">About</h2>
            <p className="muted">This community project catalogs research and practice across BotswanaÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã¢‚¬ Ã¢€š¬Ã¢€ž¢ÃƒÆ’Ã†€™Ã¢€š¬Ã‚ ÃƒÆ’Ã‚¢Ã¢‚¬Å¡Ã‚¬Ã¢‚¬Å¾Ã‚¢ÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã‚¢Ã¢‚¬Å¡Ã‚¬ ÃƒÆ’Ã†€™Ã‚¢ÃƒÆ’Ã‚¢Ã¢€š¬Ã…¡Ã‚¬ÃƒÆ’Ã‚¢Ã¢€š¬Ã…¾Ã‚¢ÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã¢‚¬ Ã¢€š¬Ã¢€ž¢ÃƒÆ’Ã†€™Ã‚¢ÃƒÆ’Ã‚¢Ã¢€š¬Ã…¡Ã‚¬ÃƒÆ’Ã¢‚¬Å¡ ÃƒÆ’Ã†€™Ã‚¢ÃƒÆ’Ã‚¢Ã¢‚¬Å¡Ã‚¬Ãƒ€¦Ã‚¡ÃƒÆ’Ã¢‚¬Å¡Ã‚¬ÃƒÆ’Ã†€™Ã‚¢ÃƒÆ’Ã‚¢Ã¢‚¬Å¡Ã‚¬Ãƒ€¦Ã‚¾ÃƒÆ’Ã¢‚¬Å¡Ã‚¢ÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã¢‚¬ Ã¢€š¬Ã¢€ž¢ÃƒÆ’Ã†€™Ã¢€š¬Ã‚ ÃƒÆ’Ã‚¢Ã¢‚¬Å¡Ã‚¬Ã¢‚¬Å¾Ã‚¢ÃƒÆ’Ã†€™Ã‚¢ÃƒÆ’Ã‚¢Ã¢‚¬Å¡Ã‚¬Ãƒ€¦Ã‚¡ÃƒÆ’Ã¢‚¬Å¡Ã‚¬ÃƒÆ’Ã†€™Ã¢€š¬Ã‚¦ÃƒÆ’Ã¢‚¬Å¡Ã‚¡ÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã¢‚¬ Ã¢€š¬Ã¢€ž¢ÃƒÆ’Ã†€™Ã‚¢ÃƒÆ’Ã‚¢Ã¢€š¬Ã…¡Ã‚¬ÃƒÆ’Ã¢‚¬¦Ã‚¡ÃƒÆ’Ã¢‚¬Å¡Ã‚¢ÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã¢‚¬ Ã¢€š¬Ã¢€ž¢ÃƒÆ’Ã†€™Ã¢€š¬Ã‚ ÃƒÆ’Ã‚¢Ã¢‚¬Å¡Ã‚¬Ã¢‚¬Å¾Ã‚¢ÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã‚¢Ã¢‚¬Å¡Ã‚¬ ÃƒÆ’Ã†€™Ã‚¢ÃƒÆ’Ã‚¢Ã¢€š¬Ã…¡Ã‚¬ÃƒÆ’Ã‚¢Ã¢€š¬Ã…¾Ã‚¢ÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã¢‚¬ Ã¢€š¬Ã¢€ž¢ÃƒÆ’Ã†€™Ã‚¢ÃƒÆ’Ã‚¢Ã¢€š¬Ã…¡Ã‚¬ÃƒÆ’Ã¢‚¬¦Ã‚¡ÃƒÆ’Ã¢‚¬Å¡Ã‚¢ÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã¢‚¬ Ã¢€š¬Ã¢€ž¢ÃƒÆ’Ã†€™Ã¢€š¬Ã‚ ÃƒÆ’Ã‚¢Ã¢‚¬Å¡Ã‚¬Ã¢‚¬Å¾Ã‚¢ÃƒÆ’Ã¢‚¬Å¡Ã‚¢ÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã¢‚¬ Ã¢€š¬Ã¢€ž¢ÃƒÆ’Ã¢‚¬Å¡Ã‚¢ÃƒÆ’Ã†€™Ã‚¢ÃƒÆ’Ã‚¢Ã¢‚¬Å¡Ã‚¬Ãƒ€¦Ã‚¡ÃƒÆ’Ã¢‚¬Å¡Ã‚¬ÃƒÆ’Ã†€™Ã¢€š¬Ã‚¦ÃƒÆ’Ã¢‚¬Å¡Ã‚¡ÃƒÆ’Ã¢‚¬Å¡Ã‚¬ÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã¢‚¬ Ã¢€š¬Ã¢€ž¢ÃƒÆ’Ã†€™Ã‚¢ÃƒÆ’Ã‚¢Ã¢€š¬Ã…¡Ã‚¬ÃƒÆ’Ã¢‚¬Å¡Ã‚¦ÃƒÆ’Ã¢‚¬Å¡Ã‚¡ÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã¢‚¬ Ã¢€š¬Ã¢€ž¢ÃƒÆ’Ã†€™Ã¢€š¬Ã‚ ÃƒÆ’Ã‚¢Ã¢‚¬Å¡Ã‚¬Ã¢‚¬Å¾Ã‚¢ÃƒÆ’Ã†€™Ã‚¢ÃƒÆ’Ã‚¢Ã¢‚¬Å¡Ã‚¬Ãƒ€¦Ã‚¡ÃƒÆ’Ã¢‚¬Å¡Ã‚¬ÃƒÆ’Ã†€™Ã¢€š¬Ã‚¦ÃƒÆ’Ã¢‚¬Å¡Ã‚¡ÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã¢‚¬ Ã¢€š¬Ã¢€ž¢ÃƒÆ’Ã†€™Ã‚¢ÃƒÆ’Ã‚¢Ã¢€š¬Ã…¡Ã‚¬ÃƒÆ’Ã¢‚¬¦Ã‚¡ÃƒÆ’Ã¢‚¬Å¡Ã‚¬ÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã¢‚¬ Ã¢€š¬Ã¢€ž¢ÃƒÆ’Ã†€™Ã¢€š¬Ã‚ ÃƒÆ’Ã‚¢Ã¢‚¬Å¡Ã‚¬Ã¢‚¬Å¾Ã‚¢ÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã‚¢Ã¢‚¬Å¡Ã‚¬ ÃƒÆ’Ã†€™Ã‚¢ÃƒÆ’Ã‚¢Ã¢€š¬Ã…¡Ã‚¬ÃƒÆ’Ã‚¢Ã¢€š¬Ã…¾Ã‚¢ÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã¢‚¬ Ã¢€š¬Ã¢€ž¢ÃƒÆ’Ã†€™Ã‚¢ÃƒÆ’Ã‚¢Ã¢€š¬Ã…¡Ã‚¬ÃƒÆ’Ã¢‚¬¦Ã‚¡ÃƒÆ’Ã¢‚¬Å¡Ã‚¢ÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã¢‚¬ Ã¢€š¬Ã¢€ž¢ÃƒÆ’Ã†€™Ã¢€š¬Ã‚ ÃƒÆ’Ã‚¢Ã¢‚¬Å¡Ã‚¬Ã¢‚¬Å¾Ã‚¢ÃƒÆ’Ã¢‚¬Å¡Ã‚¢ÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã¢‚¬ Ã¢€š¬Ã¢€ž¢ÃƒÆ’Ã¢‚¬Å¡Ã‚¢ÃƒÆ’Ã†€™Ã‚¢ÃƒÆ’Ã‚¢Ã¢‚¬Å¡Ã‚¬Ãƒ€¦Ã‚¡ÃƒÆ’Ã¢‚¬Å¡Ã‚¬ÃƒÆ’Ã†€™Ã¢€š¬Ã‚¦ÃƒÆ’Ã¢‚¬Å¡Ã‚¡ÃƒÆ’Ã¢‚¬Å¡Ã‚¬ÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã¢‚¬ Ã¢€š¬Ã¢€ž¢ÃƒÆ’Ã†€™Ã‚¢ÃƒÆ’Ã‚¢Ã¢€š¬Ã…¡Ã‚¬ÃƒÆ’Ã¢‚¬Å¡Ã‚¦ÃƒÆ’Ã¢‚¬Å¡Ã‚¾ÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã¢‚¬ Ã¢€š¬Ã¢€ž¢ÃƒÆ’Ã†€™Ã¢€š¬Ã‚ ÃƒÆ’Ã‚¢Ã¢‚¬Å¡Ã‚¬Ã¢‚¬Å¾Ã‚¢ÃƒÆ’Ã†€™Ã‚¢ÃƒÆ’Ã‚¢Ã¢‚¬Å¡Ã‚¬Ãƒ€¦Ã‚¡ÃƒÆ’Ã¢‚¬Å¡Ã‚¬ÃƒÆ’Ã†€™Ã¢€š¬Ã‚¦ÃƒÆ’Ã¢‚¬Å¡Ã‚¡ÃƒÆ’Ã†€™Ãƒ€ Ã¢‚¬„¢ÃƒÆ’Ã¢‚¬ Ã¢€š¬Ã¢€ž¢ÃƒÆ’Ã†€™Ã‚¢ÃƒÆ’Ã‚¢Ã¢€š¬Ã…¡Ã‚¬ÃƒÆ’Ã¢‚¬¦Ã‚¡ÃƒÆ’Ã¢‚¬Å¡Ã‚¢s Kalahari to reduce duplication, surface local expertise, and accelerate learning.</p>
            <ul className="mt-3 space-y-1 text-sm">
              <li className="chip">Government & grey literature</li>
              <li className="chip">Peer-reviewed papers</li>
              <li className="chip">Active projects</li>
              <li className="chip">Researcher directory</li>
            </ul>
          </div>
          <div className="card p-4">
            <h3 className="mb-2">Road map</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Import region polygons & gazetteer.</li>
              <li>Upload initial document set.</li>
              <li>Search & filters by type, year, region, keywords.</li>
              <li>Contributor flow & moderation.</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  )
}