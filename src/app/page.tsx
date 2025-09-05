import Hero from "@/components/Hero";

export default function Page() {
  return (
    <div className="space-y-10">
      <Hero
        title="Kalahari research, projects, people, and places — all in one place"
        highlight="Kalahari"
        subtitle="A hub to discover Botswana–Kalahari knowledge — past to present. Browse records or explore the map."
        image="/hero.svg"
        ctas={[
          { href: "/browse", label: "Browse records", primary: true },
          { href: "/map", label: "Open map →" },
        ]}
      />
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="kcard">
          <h3>✔ Papers, projects, researchers</h3>
          <p className="mt-2 text-sm opacity-80">Curated entries with clean, consistent metadata.</p>
        </div>
        <div className="kcard">
          <h3>✔ Region-aware filtering</h3>
          <p className="mt-2 text-sm opacity-80">Filter by Okavango, Kalahari North/South, Ghanzi, and more.</p>
        </div>
        <div className="kcard">
          <h3>✔ Open access ethos</h3>
          <p className="mt-2 text-sm opacity-80">Built to share knowledge and reduce duplicated effort.</p>
        </div>
      </section>
    </div>
  );
}
