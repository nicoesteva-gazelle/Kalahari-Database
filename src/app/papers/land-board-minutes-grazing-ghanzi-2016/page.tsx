import Link from "next/link";

export default function Page() {
  return (
    <article className="prose max-w-none">
      <p className="mb-2"><Link href="/papers" className="underline">← Back to papers</Link></p>
      <h1>Land Board Minutes — Grazing in Ghanzi (2016)</h1>
      <p>Page content…</p>
    </article>
  );
}