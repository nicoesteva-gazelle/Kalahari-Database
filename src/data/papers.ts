export type Paper = {
  slug: string;
  title: string;
  topic: string;
  author: string;
  region: string;
  focus: string;
  organization: string;
  year: number;
  type: "paper" | "doc" | "project";
  abstract: string;
  externalUrl?: string;
};

export const PAPERS: Paper[] = [
  { slug:"elephant-movement-northern-kalahari", title:"Elephant movement in northern Kalahari (dummy)", topic:"Wildlife", author:"N. Author", region:"Okavango", focus:"Movement", organization:"Uni A", year:2019, type:"paper", abstract:"Dummy abstract about elephant telemetry and corridors." },
  { slug:"land-board-minutes-grazing-ghanzi-2016", title:"Land Board Minutes on Grazing Allotments (dummy)", topic:"Governance", author:"Land Board", region:"Ghanzi", focus:"Grazing", organization:"Gov", year:2016, type:"doc", abstract:"Dummy minutes summarizing grazing decisions." },
  { slug:"vegetation-dynamics-kalahari-south", title:"Vegetation dynamics in Kalahari South (dummy)", topic:"Ecology", author:"T. Mubyana", region:"Kalahari South", focus:"Vegetation", organization:"Uni B", year:2022, type:"paper", abstract:"Dummy study on vegetation transitions under variable rainfall." },
  { slug:"okavango-wetland-services", title:"Okavango wetland ecosystem services (dummy)", topic:"Hydrology", author:"R. Selelo", region:"Okavango", focus:"Ecosystem Services", organization:"Uni C", year:2020, type:"paper", abstract:"Dummy paper on services valuation." },
  { slug:"predator-conflict-ghanzi", title:"Predator-livestock conflict in Ghanzi (dummy)", topic:"Human-Wildlife", author:"K. Tau", region:"Ghanzi", focus:"Coexistence", organization:"NGO X", year:2018, type:"paper", abstract:"Dummy conflict mitigation techniques." },
  { slug:"groundwater-kgalagadi", title:"Groundwater sources in Kgalagadi (dummy)", topic:"Hydrology", author:"L. Dintwe", region:"Kgalagadi", focus:"Water", organization:"Dept Water", year:2017, type:"doc", abstract:"Dummy aquifer mapping." },
  { slug:"restoration-water-points-2024", title:"Water points rehabilitation (pilot) (dummy)", topic:"Restoration", author:"Kalahari Team", region:"Kgalagadi", focus:"Water", organization:"NGO X", year:2024, type:"project", abstract:"Dummy pilot milestones and results." },
  { slug:"okavango-bird-migration", title:"Okavango bird migration corridors (dummy)", topic:"Wildlife", author:"M. Kelebogile", region:"Okavango", focus:"Migration", organization:"Uni A", year:2021, type:"paper", abstract:"Dummy migration route mapping." },
  { slug:"fire-regimes-kalahari", title:"Fire regimes across the Kalahari (dummy)", topic:"Ecology", author:"S. Masisi", region:"Kalahari North", focus:"Fire", organization:"Uni D", year:2015, type:"paper", abstract:"Dummy fire frequency analysis." },
  { slug:"community-conservancies-kgalagadi", title:"Community conservancies in Kgalagadi (dummy)", topic:"Governance", author:"T. Moagi", region:"Kgalagadi", focus:"Institutions", organization:"NGO Y", year:2023, type:"project", abstract:"Dummy governance outcomes." },
  { slug:"tourism-impacts-okavango", title:"Tourism impacts in the Okavango (dummy)", topic:"Socioeconomics", author:"J. Rasekgala", region:"Okavango", focus:"Tourism", organization:"Uni E", year:2014, type:"paper", abstract:"Dummy socio-economic assessment." },
  { slug:"rangeland-health-ghanzi", title:"Rangeland health indicators, Ghanzi (dummy)", topic:"Ecology", author:"B. Phiri", region:"Ghanzi", focus:"Rangeland", organization:"Dept Wildlife", year:2013, type:"doc", abstract:"Dummy indicators and monitoring." },
  { slug:"wild-dogs-kalahari-north", title:"African wild dogs in Kalahari North (dummy)", topic:"Wildlife", author:"C. Nare", region:"Kalahari North", focus:"Predators", organization:"Uni F", year:2018, type:"paper", abstract:"Dummy pack home ranges." },
  { slug:"pastoral-livelihoods-kalahari-south", title:"Pastoral livelihoods in Kalahari South (dummy)", topic:"Socioeconomics", author:"D. Kgosi", region:"Kalahari South", focus:"Livelihoods", organization:"Gov", year:2011, type:"doc", abstract:"Dummy livelihoods assessment." },
  { slug:"satellite-ndvi-trends", title:"Satellite NDVI trends (dummy)", topic:"Remote Sensing", author:"H. Chen", region:"Kalahari North", focus:"Vegetation", organization:"Uni G", year:2022, type:"paper", abstract:"Dummy NDVI time-series." },
  { slug:"climate-variability-kalahari", title:"Climate variability across Kalahari (dummy)", topic:"Climate", author:"P. Letsoalo", region:"Kalahari North", focus:"Climate", organization:"Uni H", year:2020, type:"paper", abstract:"Dummy rainfall variability." }
];

export const PAPER_BY_SLUG = Object.fromEntries(PAPERS.map(p => [p.slug, p]));
