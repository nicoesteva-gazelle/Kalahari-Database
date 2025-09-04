export type Region = "North" | "South" | "Ghanzi" | "Okavango";
export type Kind = "Government" | "Academic" | "Project" | "People";

export interface Item {
  id: string;
  title: string;
  type: Kind;
  year: number;
  region: Region;
  href: string;
}

export const REGIONS: Region[] = ["North", "South", "Ghanzi", "Okavango"];

export const items: Item[] = [
  { id:"g-001", title:"Land Board Minutes – Ghanzi (2016)", type:"Government", year:2016, region:"Ghanzi", href:"/papers/land-board-minutes-grazing-ghanzi-2016" },
  { id:"a-002", title:"Elephant Movement in Northern Kalahari", type:"Academic", year:2021, region:"North", href:"/papers/elephant-movement-northern-kalahari" },
  { id:"p-003", title:"Water Points Rehabilitation Pilot", type:"Project", year:2024, region:"South", href:"/projects/water-points-rehabilitation-pilot-2024" },
  { id:"r-006", title:"Researcher: Dr Mubyana", type:"People", year:2020, region:"North", href:"/people/dr-mubyana-vegetation-dynamics" },
  // more dummy rows (safe links to list pages)
  { id:"g-007", title:"Okavango EIA Summary (2019)", type:"Government", year:2019, region:"Okavango", href:"/papers" },
  { id:"a-008", title:"Hydrology of the Southern Kalahari", type:"Academic", year:2018, region:"South", href:"/papers" },
  { id:"p-009", title:"Ghanzi Borehole Survey", type:"Project", year:2022, region:"Ghanzi", href:"/projects" },
  { id:"r-010", title:"Researcher: K. Mosarwa", type:"People", year:2022, region:"South", href:"/people" }
];

export function byRegion(region?: Region) {
  if (!region) return items;
  return items.filter(i => i.region === region);
}