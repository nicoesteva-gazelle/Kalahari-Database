import Link from "next/link";

export default function Page() {
  return (
    <article className="prose max-w-none">
      <p className="mb-2"><Link href="/papers" className="underline">← Back to papers</Link></p>
      <h1>Elephant movement in the northern Kalahari</h1>
      <p>Page content…</p>
    </article>
  );
}