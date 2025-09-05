import Link from "next/link";

export default function Page() {
  return (
    <article className="prose max-w-none">
      <p className="mb-2"><Link href="/people" className="underline">← Back to people</Link></p>
      <h1>Dr. Mubyana — Vegetation Dynamics</h1>
      <p>Page content…</p>
    </article>
  );
}