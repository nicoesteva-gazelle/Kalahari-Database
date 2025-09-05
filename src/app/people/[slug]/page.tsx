import { notFound } from "next/navigation";
import Link from "next/link";
import { people } from "@/data/records";

export default async function PersonDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = people.find((p) => p.slug === slug);
  if (!person) return notFound();
  return (
    <article className="prose max-w-none">
      <p className="mb-2"><Link href="/people" className="underline">← Back to people</Link></p>
      <h1>{person.name}</h1>
      <p className="opacity-80"><strong>Region:</strong> {person.region}</p>
      <p>{person.bio}</p>
    </article>
  );
}