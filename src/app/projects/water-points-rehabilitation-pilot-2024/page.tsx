import Link from "next/link";

export default function Page() {
  return (
    <article className="prose max-w-none">
      <p className="mb-2"><Link href="/projects" className="underline">← Back to projects</Link></p>
      <h1>Water Points Rehabilitation Pilot (2024)</h1>
      <p>Page content…</p>
    </article>
  );
}