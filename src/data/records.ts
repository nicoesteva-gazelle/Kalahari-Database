export type Region =
  | "Okavango Delta"
  | "Kalahari North"
  | "Kalahari South"
  | "Ghanzi"
  | "Kgalagadi";

export type Paper   = { title: string; slug: string; summary: string; region: Region; tags?: string[]; year?: number };
export type Project = { title: string; slug: string; summary: string; region: Region; tags?: string[]; year?: number };
export type Person  = { name: string;  slug: string; bio: string;     region: Region; tags?: string[]; year?: number };

export const regions: Region[] = [
  "Okavango Delta","Kalahari North","Kalahari South","Ghanzi","Kgalagadi"
];

// Base seed (papers)
const seedPapers: Paper[] = [
  { title: "Elephant movement in the northern Kalahari",
    slug: "elephant-movement-northern-kalahari",
    summary: "GPS-collar analysis of seasonal corridors and constraints across pans.",
    region: "Kalahari North", tags: ["elephant","movement","corridors"], year: 2019 },
  { title: "Land Board Minutes — Grazing in Ghanzi (2016)",
    slug: "land-board-minutes-grazing-ghanzi-2016",
    summary: "Public minutes highlighting permit allocations and rangeland use.",
    region: "Ghanzi", tags: ["governance","grazing"], year: 2016 },
];

// Generate more (papers/projects/people)
const pool: Region[] = ["Okavango Delta","Kalahari North","Kalahari South","Ghanzi","Kgalagadi"];
const years = [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024];

export const papers: Paper[] = [
  ...seedPapers,
  ...Array.from({length: 28}).map((_, i) => {
    const region = pool[i % pool.length];
    const idx = i + 1;
    const year = years[i % years.length];
    return {
      title: `Dummy Paper ${idx} — ${region}`,
      slug: `dummy-paper-${idx}-${region.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`,
      summary: "Placeholder abstract highlighting methods and findings relevant to regional management.",
      region, tags: ["dummy","test","filter"], year,
    } as Paper;
  })
];

export const projects: Project[] = Array.from({length: 24}).map((_, i) => {
  const region = pool[i % pool.length];
  const idx = i + 1;
  const year = years[(i+3) % years.length];
  return {
    title: `Community Water Access ${year} — ${region}`,
    slug: `project-water-access-${idx}-${region.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`,
    summary: "Community-led water point maintenance and wildlife coexistence pilot.",
    region, tags: ["water","community"], year,
  } as Project;
});

export const people: Person[] = Array.from({length: 24}).map((_, i) => {
  const region = pool[i % pool.length];
  const idx = i + 1;
  return {
    name: `Researcher ${idx} — ${region}`,
    slug: `researcher-${idx}-${region.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`,
    bio: "Ecology / land-use researcher focusing on region-specific dynamics.",
    region, tags: ["researcher","directory"], year: 2022 - (i % 5),
  } as Person;
});