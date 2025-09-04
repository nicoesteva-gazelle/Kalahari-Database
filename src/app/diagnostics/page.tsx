export default function Diagnostics() {
  return (
    <main className="container mx-auto max-w-3xl px-6 py-10 space-y-6">
      <h1 className="text-2xl font-bold">Tailwind Diagnostics</h1>

      <div className="space-y-2">
        <div className="h-10 rounded bg-red-500" />
        <div className="h-10 rounded bg-green-500" />
        <div className="h-10 rounded bg-blue-500" />
        <div className="h-10 rounded bg-acacia-500" />
        <div className="h-10 rounded bg-sand-400" />
        <div className="h-10 rounded bg-dusk-900" />
      </div>

      <p className="mt-4">
        If you can see colored bars above, Tailwind utilities + custom palette are working.
      </p>
    </main>
  );
}
