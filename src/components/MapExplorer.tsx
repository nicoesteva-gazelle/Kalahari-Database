"use client";
import { REGIONS, Region } from "@/data/records";

export default function MapExplorer() {
  const select = (r: Region) => {
    // Update URL query for deep-linking
    const url = new URL(window.location.href);
    url.searchParams.set("region", r);
    window.history.replaceState({}, "", url.toString());
    // Fire a global event any page can listen to
    window.dispatchEvent(new CustomEvent("kd:region-select", { detail: r }));
  };

  return (
    <div className="k-map-grid">
      {REGIONS.map((r) => (
        <button key={r} className="k-map-cell" onClick={() => select(r)}>
          <span>{r === "North" ? "Kalahari North" : r}</span>
        </button>
      ))}
    </div>
  );
}