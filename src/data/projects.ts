export type Project = { slug:string; title:string; org:string; region:string; year:number; summary:string; };
export const PROJECTS: Project[] = [
  { slug:"water-points-rehab", title:"Water points rehabilitation (pilot) (dummy)", org:"NGO X", region:"Kgalagadi", year:2024, summary:"Pilot milestones and early outcomes." },
  { slug:"bird-corridors", title:"Okavango bird migration corridors (dummy)", org:"Uni A", region:"Okavango", year:2021, summary:"Telemetry and route mapping." }
];
export const PROJECT_BY_SLUG = Object.fromEntries(PROJECTS.map(p => [p.slug, p]));
