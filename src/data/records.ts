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

// Seed papers
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

// --- Realistic projects (Botswana-themed) ---
const realProjects: Project[] = [
  {
    title: "Okavango Delta Elephant Monitoring",
    slug: "okavango-elephant-monitoring",
    summary: "GPS collaring and aerial surveys to track elephants and reduce conflict.",
    region: "Okavango Delta",
    tags: ["elephants","monitoring"],
    year: 2021,
  },
  {
    title: "Kalahari Predator Coexistence Initiative",
    slug: "kalahari-predator-coexistence",
    summary: "Field research with lions and hyenas to improve coexistence with pastoralists.",
    region: "Kalahari South",
    tags: ["lions","human-wildlife"],
    year: 2020,
  },
  {
    title: "Ghanzi Rangeland Rehabilitation Pilot",
    slug: "ghanzi-rangeland-rehabilitation",
    summary: "Community-based grazing committees restoring degraded pastures.",
    region: "Ghanzi",
    tags: ["rangeland","community"],
    year: 2019,
  },
];

export const projects: Project[] = [
  ...realProjects,
  ...Array.from({length: 24}).map((_, i) => {
    const region = pool[i % pool.length];
    const idx = i + 1;
    const year = years[(i+3) % years.length];
    return {
      title: `Community Water Access ${year} — ${region}`,
      slug: `project-water-access-${idx}-${region.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`,
      summary: "Community-led water point maintenance and wildlife coexistence pilot.",
      region, tags: ["water","community"], year,
    } as Project;
  })
];

// --- Realistic people & organizations (Botswana) ---
const realPeople: Person[] = [
  {
    name: "Dr. Kathleen Alexander",
    slug: "kathleen-alexander",
    bio: "Wildlife veterinarian and researcher focusing on human–wildlife conflict in the Okavango Delta.",
    region: "Okavango Delta",
    tags: ["wildlife","conservation"],
    year: 2024,
  },
  {
    name: "Kalahari Conservation Society",
    slug: "kalahari-conservation-society",
    bio: "One of Botswana’s oldest environmental NGOs, working on wildlife corridors and community partnerships.",
    region: "Kalahari North",
    tags: ["ngo","policy"],
    year: 2023,
  },
  {
    name: "Dr. Goitseone Mogomotsi",
    slug: "goitseone-mogomotsi",
    bio: "Environmental law and governance scholar, University of Botswana.",
    region: "Ghanzi",
    tags: ["law","policy","community"],
    year: 2022,
  },
];

export const people: Person[] = [
  ...realPeople,
  ...Array.from({length: 24}).map((_, i) => {
    const region = pool[i % pool.length];
    const idx = i + 1;
    return {
      name: `Researcher ${idx} — ${region}`,
      slug: `researcher-${idx}-${region.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`,
      bio: "Ecology / land-use researcher focusing on region-specific dynamics.",
      region, tags: ["researcher","directory"], year: 2022 - (i % 5),
    } as Person;
  })
];