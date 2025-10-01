export function Card({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <article className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 shadow-sm p-4 sm:p-5">
      <h3 className="text-base font-semibold mb-2">{title}</h3>
      <div className="text-sm text-neutral-600 dark:text-neutral-300">{children}</div>
    </article>
  );
}
