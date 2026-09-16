import { TimeStep } from '../types';

export interface ChartDataPoint {
  timeStep: TimeStep;
  label: string;
  rainfallMmHr: number;
  runoffM3s: number;
  drainageStressPct: number;
  maxFloodDepthM: number;
  inundatedAreaHa: number;
  surchargedNodes: number;
  overloadedEdges: number;
}

export const FORECAST_CHART_SERIES: ChartDataPoint[] = [
  {
    timeStep: "NOW",
    label: "NOW (T+0)",
    rainfallMmHr: 14.5,
    runoffM3s: 58.5,
    drainageStressPct: 68,
    maxFloodDepthM: 0.18,
    inundatedAreaHa: 45.4,
    surchargedNodes: 1,
    overloadedEdges: 1
  },
  {
    timeStep: "+1HR",
    label: "+1 HR",
    rainfallMmHr: 42.0,
    runoffM3s: 146.2,
    drainageStressPct: 88,
    maxFloodDepthM: 0.32,
    inundatedAreaHa: 104.8,
    surchargedNodes: 5,
    overloadedEdges: 8
  },
  {
    timeStep: "+2HR",
    label: "+2 HR",
    rainfallMmHr: 58.0,
    runoffM3s: 218.0,
    drainageStressPct: 114,
    maxFloodDepthM: 0.61,
    inundatedAreaHa: 186.5,
    surchargedNodes: 14,
    overloadedEdges: 18
  },
  {
    timeStep: "+3HR",
    label: "+3 HR",
    rainfallMmHr: 22.0,
    runoffM3s: 180.4,
    drainageStressPct: 138,
    maxFloodDepthM: 0.94,
    inundatedAreaHa: 265.0,
    surchargedNodes: 21,
    overloadedEdges: 26
  }
];

export interface ScenarioImpactRow {
  zoneId: string;
  zoneName: string;
  subCatchment: string;
  elevM: number;
  simulatedDepthNow: number;
  simulatedDepthPlus1: number;
  simulatedDepthPlus2: number;
  simulatedDepthPlus3: number;
  peakRisk: string;
  keyBottleneck: string;
  transitImpact: string;
}

export const SCENARIO_IMPACT_DATA: ScenarioImpactRow[] = [
  {
    zoneId: "FZ-01",
    zoneName: "Anil Nagar Basin",
    subCatchment: "Central Bharalu Bowl",
    elevM: 48.4,
    simulatedDepthNow: 0.18,
    simulatedDepthPlus1: 0.32,
    simulatedDepthPlus2: 0.61,
    simulatedDepthPlus3: 0.94,
    peakRisk: "Critical",
    keyBottleneck: "Bharalu backwater + Sump N-012 surcharge",
    transitImpact: "Impassable for light vehicles from +1 HR; complete closure at +2 HR"
  },
  {
    zoneId: "FZ-02",
    zoneName: "GS Road (Bhangagarh)",
    subCatchment: "Medical Corridor / Narakasur Slope",
    elevM: 49.5,
    simulatedDepthNow: 0.12,
    simulatedDepthPlus1: 0.28,
    simulatedDepthPlus2: 0.54,
    simulatedDepthPlus3: 0.82,
    peakRisk: "Critical",
    keyBottleneck: "Trunk Conduit D-027 flow > 138% capacity",
    transitImpact: "Severe traffic disruption; hospital access diversion required at +2 HR"
  },
  {
    zoneId: "FZ-03",
    zoneName: "Zoo Road Tiniali",
    subCatchment: "RG Baruah / Geetanagar Merge",
    elevM: 50.8,
    simulatedDepthNow: 0.10,
    simulatedDepthPlus1: 0.25,
    simulatedDepthPlus2: 0.49,
    simulatedDepthPlus3: 0.74,
    peakRisk: "Critical",
    keyBottleneck: "Tri-junction confluence N-016 capacity exceeded",
    transitImpact: "Lane reduction from +1 HR; impassable for low-clearance vehicles at +2 HR"
  },
  {
    zoneId: "FZ-04",
    zoneName: "Rukminigaon Lowlands",
    subCatchment: "Down Town Depression",
    elevM: 48.9,
    simulatedDepthNow: 0.15,
    simulatedDepthPlus1: 0.31,
    simulatedDepthPlus2: 0.58,
    simulatedDepthPlus3: 0.88,
    peakRisk: "Critical",
    keyBottleneck: "Culvert D-033 structural bottleneck",
    transitImpact: "GS Road southern artery blocked; diversion through VIP Road advised"
  },
  {
    zoneId: "FZ-05",
    zoneName: "Hatigaon - Bhetapara Link",
    subCatchment: "Mora Bharalu Tributary",
    elevM: 50.1,
    simulatedDepthNow: 0.08,
    simulatedDepthPlus1: 0.22,
    simulatedDepthPlus2: 0.44,
    simulatedDepthPlus3: 0.69,
    peakRisk: "Critical",
    keyBottleneck: "Open earthen drain overflow into residential street",
    transitImpact: "Slow residential transit; local bus routes suspended at +2 HR"
  },
  {
    zoneId: "FZ-06",
    zoneName: "Bharalumukh Confluence",
    subCatchment: "Lower River Outfall Sluice",
    elevM: 49.1,
    simulatedDepthNow: 0.11,
    simulatedDepthPlus1: 0.24,
    simulatedDepthPlus2: 0.46,
    simulatedDepthPlus3: 0.72,
    peakRisk: "Critical",
    keyBottleneck: "Brahmaputra high river stage gate throttling",
    transitImpact: "Riverfront peripheral road slowed; local diversions in effect"
  },
  {
    zoneId: "FZ-07",
    zoneName: "Ulubari - Lachit Nagar Pocket",
    subCatchment: "Central Residential Corridor",
    elevM: 49.8,
    simulatedDepthNow: 0.09,
    simulatedDepthPlus1: 0.20,
    simulatedDepthPlus2: 0.41,
    simulatedDepthPlus3: 0.65,
    peakRisk: "Critical",
    keyBottleneck: "Tertiary feeder D-013 backflow",
    transitImpact: "Internal roads waterlogged; arterial GS Road border caution"
  },
  {
    zoneId: "FZ-08",
    zoneName: "Boragaon Wetland Fringe",
    subCatchment: "Western Deepor Buffer",
    elevM: 49.5,
    simulatedDepthNow: 0.06,
    simulatedDepthPlus1: 0.16,
    simulatedDepthPlus2: 0.35,
    simulatedDepthPlus3: 0.58,
    peakRisk: "High",
    keyBottleneck: "Highway culvert D-048 constriction",
    transitImpact: "Passable with caution; peripheral highway lanes clear"
  },
  {
    zoneId: "FZ-09",
    zoneName: "Khanapara Basin Representative Lowland",
    subCatchment: "Southern Foothills Catchment",
    elevM: 52.3,
    simulatedDepthNow: 0.14,
    simulatedDepthPlus1: 0.30,
    simulatedDepthPlus2: 0.58,
    simulatedDepthPlus3: 0.86,
    peakRisk: "Critical",
    keyBottleneck: "Southern foothill overland runoff funnel",
    transitImpact: "Rotary junction surcharge; light vehicles diverted from +1 HR"
  }
];
