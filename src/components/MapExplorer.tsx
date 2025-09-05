"use client";
import { regions, Region } from "@/data/records";

export default function MapExplorer() {
  const select = (r: Region) => {
    // Navigate to the Browse page filtered by region
    window.location.href = `/browse?region=${encodeURIComponent(r)}`;
  };

  return (
    <div className="space-y-3">
      <p className="opacity-80">Quick filter by region:</p>
      <div className="flex flex-wrap gap-2">
        {regions.map((r) => (
          <button
            key={r}
            onClick={() => select(r)}
            className="btn-ghost"
            type="button"
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}