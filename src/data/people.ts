export type Person = { slug:string; name:string; org:string; role:string; region:string; };
export const PEOPLE: Person[] = [
  { slug:"n-author", name:"Nico Author", org:"Uni A", role:"Ecologist", region:"Okavango" },
  { slug:"t-mubyana", name:"T. Mubyana", org:"Uni B", role:"Botanist", region:"Kalahari South" },
  { slug:"k-tau", name:"K. Tau", org:"NGO X", role:"Field Lead", region:"Ghanzi" }
];
export const PERSON_BY_SLUG = Object.fromEntries(PEOPLE.map(p => [p.slug, p]));
