import PapersFilter from "@/components/PapersFilter";

export default function PapersPage(){
  return (
    <main className="k-container k-readable-global k-copy-pop" style={{padding:"48px 0"}}>
      <h1 className="k-h1 k-heading k-pop k-balance k-measure">Browse Papers & Documents</h1>
      <p className="muted k-copy-pop k-measure-sm mt-2">Filter by topic, author, region, focus, organizationÃ¢â‚¬â€or search by title/author. (Dummy dataset; replace anytime.)</p>
      <div className="mt-6">
        <PapersFilter />
      </div>
    </main>
  );
}

