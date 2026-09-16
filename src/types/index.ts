export type TimeStep = 'NOW' | '+1HR' | '+2HR' | '+3HR';

export type DrainageNodeType = 'inlet' | 'manhole' | 'junction' | 'outfall' | 'pump_station';
export type DrainageNodeStatus = 'normal' | 'warning' | 'surcharged' | 'critical';
export type DrainageEdgeStatus = 'normal' | 'warning' | 'overloaded' | 'critical';
export type FloodRisk = 'low' | 'moderate' | 'high' | 'critical';

export interface NodeTimestepState {
  incomingFlowM3s: number;
  capacityM3s: number;
  utilizationPct: number;
  status: DrainageNodeStatus;
  surchargeDepthM: number;
  nearbyFloodRisk: FloodRisk;
}

export interface DrainageNode {
  id: string;
  name: string;
  type: DrainageNodeType;
  lat: number;
  lng: number;
  elevationM: number;
  connectedEdges: string[];
  description: string;
  timesteps: Record<TimeStep, NodeTimestepState>;
}

export interface EdgeTimestepState {
  flowM3s: number;
  utilizationPct: number;
  status: DrainageEdgeStatus;
}

export interface DrainageEdge {
  id: string;
  name: string;
  fromNode: string;
  toNode: string;
  type: 'pipe' | 'open_channel' | 'box_culvert';
  lengthM: number;
  diameterMm?: number;
  slopePct: number;
  designCapacityM3s: number;
  timesteps: Record<TimeStep, EdgeTimestepState>;
}

export interface FloodZoneTimestepState {
  depthM: number;
  risk: FloodRisk;
  affectedAreaHa: number;
  primaryBottleneck: string;
}

export interface FloodZone {
  id: string;
  name: string;
  description: string;
  center: [number, number];
  polygon: [number, number][];
  timesteps: Record<TimeStep, FloodZoneTimestepState>;
}

export type RoadRiskState = 'NORMAL' | 'MODERATE' | 'HIGH RISK' | 'BLOCKED';

export interface RoadTimestepState {
  riskState: RoadRiskState;
  status: 'clear' | 'caution' | 'impassable';
  waterDepthM: number;
  risk: FloodRisk;
  drainageStressPct?: number;
  timeToCritical?: string;
}

export interface RoadSegment {
  id: string;
  name: string;
  path: [number, number][];
  timesteps: Record<TimeStep, RoadTimestepState>;
  description?: string;
}

export interface NaturalWaterway {
  id: string;
  name: string;
  type: 'river' | 'channel' | 'wetland' | 'lake';
  path?: [number, number][];
  polygon?: [number, number][];
  capacityRole: string;
  notes: string;
}

export interface RouteDetail {
  path: [number, number][];
  distanceKm: number;
  estTimeMin: number;
  floodExposure: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  maxDepthM: number;
  status: string;
  notes: string;
  segmentIds?: string[];
  blockedSegmentsCount?: number;
  floodedSegments?: string[];
  elevationAdvantageM?: number;
}

export interface RouteScenario {
  id: string;
  title: string;
  origin: string;
  destination: string;
  originCoords: [number, number];
  destCoords: [number, number];
  normalRoute: RouteDetail;
  safeRoute: RouteDetail;
}

export interface RainfallTimestepData {
  timeStep: TimeStep;
  label: string;
  hoursAhead: number;
  rainfallIntensityMmHr: number;
  trendPct: number;
  nowcastConfidence: string;
  catchmentRunoffM3s: number;
  maxFloodDepthM: number;
  networkUtilizationPct: number;
  overloadedEdgesCount: number;
  surchargedNodesCount: number;
  highRiskZonesCount: number;
  statusSummary: string;
}
