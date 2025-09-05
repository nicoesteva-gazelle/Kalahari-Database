"use client";
import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  papers as paperData,
  projects as projectData,
  people as peopleData,
  type Paper,
  type Project,
  type Person,
  regions as regionList,
} from "@/data/records";

type TypeFilter = "All" | "Papers" | "Projects" | "People";
type ViewMode = "grid" | "list";

type PaperItem = { type: "paper" } & Paper;
type ProjectItem = { type: "project" } & Project;
type PersonItem = { type: "person" } & Person;
type Item = PaperItem | ProjectItem | PersonItem;

const typeMap: Record<Exclude<TypeFilter,"All">, Item["type"]> = {
  Papers: "paper",
  Projects: "project",
  People: "person",
};

const toTypeLabel = (t: Item["type"]): Exclude<TypeFilter,"All"> =>
  t === "paper" ? "Papers" : t === "project" ? "Projects" : "People";

function idOf(item: Item) { return item.slug; }
function titleOf(item: Item) { return item.type === "person" ? item.name : item.title; }
function summaryOf(item: Item) { return item.type === "person" ? (item.bio ?? "") : (item.summary ?? ""); }
function linkOf(item: Item) {
  if (item.type === "person") return `/people/${item.slug}`;
  if (item.type === "paper") return `/papers/${item.slug}`;
  return `/projects/${item.slug}`;
}

function BrowseInner() {
  const params = useSearchParams();
  const regionParam = params.get("region") ?? "All";
  const typeParam = params.get("type") as TypeFilter | null;

  const [q, setQ] = useState<string>("");
  const [type, setType] = useState<TypeFilter>(typeParam ?? "All");
  const [region, setRegion] = useState<string>(regionParam);
  const [view, setView] = useState<ViewMode>("grid");

  const items: Item[] = useMemo(() => {
    const P: PaperItem[] = paperData.map((p) => ({ type: "paper", ...p }));
    const R: ProjectItem[] = projectData.map((p) => ({ type: "project", ...p }));
    const H: PersonItem[] = peopleData.map((p) => ({ type: "person", ...p }));
    return [...P, ...R, ...H];
  }, []);

  const filtered = useMemo(() => {
    const qn = q.trim().toLowerCase();
    const typ = (type !== "All") ? typeMap[type] : null;
    return items.filter((it) => {
      if (typ && it.type !== typ) return false;
      if (region !== "All" && it.region !== region) return false;
      if (!qn) return true;
      return (`${titleOf(it)} ${summaryOf(it)}`.toLowerCase()).includes(qn);
    });
  }, [items, q, type, region]);

  const counts = useMemo(() => {
    const base = { All: items.length, Papers: 0, Projects: 0, People: 0 };
    for (const it of items) base[toTypeLabel(it.type)]++;
    return base;
  }, [items]);

  return (
    <div className="space-y-5">
      <h1 className="font-display text-3xl">Browse</h1>

      {/* Toolbar */}
      <div className="toolbar" style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: "10px", alignItems: "center" }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search…"
          style={{ padding: ".55rem .8rem", borderRadius: "12px", border: "1px solid var(--border)", background: "transparent", color: "var(--text)" }}
        />

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          style={{ padding: ".55rem .8rem", borderRadius: "12px", border: "1px solid var(--border)", background: "transparent", color: "var(--text)" }}
        >
          <option>All</option>
          {regionList.map((r) => <option key={r}>{r}</option>)}
        </select>

        {/* View toggle */}
        <div className="view-toggle" style={{ display: "inline-flex", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden" }}>
          <button onClick={() => setView("grid")} style={{ padding: ".5rem .75rem", background: view === "grid" ? "var(--card)" : "transparent" }}>Grid</button>
          <button onClick={() => setView("list")} style={{ padding: ".5rem .75rem", background: view === "list" ? "var(--card)" : "transparent" }}>List</button>
        </div>

        <span className="muted text-xs" style={{ textAlign: "right" }}>{filtered.length} result(s)</span>

        {/* Type segmented control full-width row below on small screens */}
        <div style={{ gridColumn: "1 / -1" }}>
          <div style={{ display: "inline-flex", gap: "6px", border: "1px solid var(--border)", borderRadius: "12px", padding: "4px" }}>
            {(["All","Papers","Projects","People"] as TypeFilter[]).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className="chip"
                style={{
                  border: "1px solid var(--border)",
                  background: type === t ? "var(--card)" : "transparent",
                  fontWeight: 700
                }}
              >
                {t} {t !== "All" ? `(${counts[t as Exclude<TypeFilter,"All">]})` : `(${counts.All})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((it) => (
            <article key={idOf(it)} className="kcard">
              <div style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".04em" }}>
                {toTypeLabel(it.type)} · {it.region} {"year" in it && it.year ? `· ${it.year as number}` : ""}
              </div>
              <h3 style={{ marginTop: 4, fontWeight: 600 }}>
                <Link href={linkOf(it)}>{titleOf(it)}</Link>
              </h3>
              <p className="muted" style={{ marginTop: 6, fontSize: 14 }}>{summaryOf(it)}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((it) => (
            <article key={idOf(it)} className="kcard" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "8px", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".04em" }}>
                  {toTypeLabel(it.type)} · {it.region} {"year" in it && it.year ? `· ${it.year as number}` : ""}
                </div>
                <h3 style={{ marginTop: 4, fontWeight: 600 }}>
                  <Link href={linkOf(it)}>{titleOf(it)}</Link>
                </h3>
              </div>
              <div className="muted" style={{ fontSize: 14, textAlign: "right" }}>
                {"tags" in it && it.tags?.length ? it.tags.join(", ") : ""}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense>
      <BrowseInner />
    </Suspense>
  );
}