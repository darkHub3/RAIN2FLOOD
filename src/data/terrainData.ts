export interface TerrainHill {
  id: string;
  name: string;
  center: [number, number];
  elevationM: number;
  ridgeDescription: string;
  runoffVector: string;
}

export interface TerrainContour {
  elevationM: number;
  color: string;
  label: string;
  path: [number, number][];
}

export interface FlowVector {
  from: [number, number];
  to: [number, number];
  flowRateDescription: string;
}

export const TERRAIN_DISCLAIMER =
  "SIMULATED TERRAIN LAYER: Demonstrates how topographic elevation guides overland runoff accumulation into valley depressions. This is a representative visualization for prototype demonstration, not an authoritative high-resolution DEM.";

export const TERRAIN_HILLS: TerrainHill[] = [
  {
    id: "H-01",
    name: "Kamakhya / Nilachal Ridge",
    center: [26.1660, 91.7050],
    elevationM: 185,
    ridgeDescription: "Western granite massif deflecting surface runoff east toward Bharalu and west toward Jalukbari.",
    runoffVector: "Steep runoff eastward into Santipur / Maligaon lowlands"
  },
  {
    id: "H-02",
    name: "Nabagraha / Chunsali Ridge",
    center: [26.1880, 91.7650],
    elevationM: 145,
    ridgeDescription: "Northern hill ridge directing rapid storm flows south toward Silpukhuri and Chandmari.",
    runoffVector: "Direct southward slope into Anil Nagar basin"
  },
  {
    id: "H-03",
    name: "Narakasur / GMCH Ridge",
    center: [26.1480, 91.7680],
    elevationM: 135,
    ridgeDescription: "Central rocky ridge causing sharp surface drainage convergence onto GS Road / Bhangagarh.",
    runoffVector: "High-velocity runoff towards GS Road commercial corridor"
  },
  {
    id: "H-04",
    name: "Kharguli / Noonmati Hills",
    center: [26.1950, 91.7950],
    elevationM: 160,
    ridgeDescription: "Eastern elevated ridge generating runoff towards Zoo Road and Geetanagar catchments.",
    runoffVector: "Southwestward drainage towards RG Baruah Road"
  },
  {
    id: "H-05",
    name: "Meghalaya Foothills / Khanapara Ridge",
    center: [26.1050, 91.8250],
    elevationM: 210,
    ridgeDescription: "Southern high-elevation boundary with high catchment runoff funneling into Basistha stream.",
    runoffVector: "Northward overland flow into Beltola and Rukminigaon"
  }
];

export const FLOW_ACCUMULATION_VECTORS: FlowVector[] = [
  { from: [26.1660, 91.7080], to: [26.1680, 91.7220], flowRateDescription: "Kamakhya ridge runoff -> Bharalumukh basin" },
  { from: [26.1860, 91.7650], to: [26.1770, 91.7710], flowRateDescription: "Nabagraha slope -> Anil Nagar depression bowl" },
  { from: [26.1510, 91.7700], to: [26.1585, 91.7685], flowRateDescription: "GMCH ridge -> Bhangagarh GS Road junction" },
  { from: [26.1750, 91.7920], to: [26.1645, 91.7820], flowRateDescription: "Zoo hills -> Zoo Road Tiniali bottleneck" },
  { from: [26.1150, 91.8150], to: [26.1390, 91.7990], flowRateDescription: "Southern hills -> Rukminigaon depression" },
  { from: [26.1180, 91.7750], to: [26.1360, 91.7820], flowRateDescription: "Basistha ridge -> Hatigaon / Bhetapara corridor" }
];
