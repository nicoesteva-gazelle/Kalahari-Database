import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/records";

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();
  return (
    <article className="prose max-w-none">
      <p className="mb-2"><Link href="/projects" className="underline">← Back to projects</Link></p>
      <h1>{project.title}</h1>
      <p className="opacity-80"><strong>Region:</strong> {project.region}</p>
      <p>{project.summary}</p>
    </article>
  );
}