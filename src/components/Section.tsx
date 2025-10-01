export function Section({
  title,
  lead,
  children,
}: {
  title?: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {title ? <h1 className="text-3xl font-bold mb-6">{title}</h1> : null}
        {lead ? (
          <p className="mb-6 text-neutral-600 dark:text-neutral-300">{lead}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
