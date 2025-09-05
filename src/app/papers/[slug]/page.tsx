import { notFound } from "next/navigation";
import Link from "next/link";
import { papers } from "@/data/records";

export default async function PaperDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const paper = papers.find((p) => p.slug === slug);
  if (!paper) return notFound();
  return (
    <article className="prose max-w-none">
      <p className="mb-2"><Link href="/papers" className="underline">← Back to papers</Link></p>
      <h1>{paper.title}</h1>
      <p className="opacity-80"><strong>Region:</strong> {paper.region}</p>
      <p>{paper.summary}</p>
      {paper.tags?.length ? <p className="text-sm opacity-70">Tags: {paper.tags.join(", ")}</p> : null}
    </article>
  );
}