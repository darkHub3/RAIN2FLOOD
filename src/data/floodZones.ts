import { FloodZone } from '../types';

export const FLOOD_ZONE_DISCLAIMER =
  "Representative pilot zones based on a selected Guwahati study area. Values and boundaries are simulated prototype demonstration data, not officially measured or confirmed vulnerable localities.";

export const FLOOD_ZONES: FloodZone[] = [
  {
    id: "FZ-01",
    name: "Anil Nagar - Nabin Nagar Representative Basin",
    description: "Low-elevation bowl prone to backflow accumulation when Bharalu channel capacity is exceeded.",
    center: [26.1755, 91.7725],
    polygon: [
      [26.1795, 91.7680],
      [26.1790, 91.7760],
      [26.1730, 91.7775],
      [26.1715, 91.7700],
      [26.1750, 91.7670]
    ],
    timesteps: {
      NOW: { depthM: 0.18, risk: "moderate", affectedAreaHa: 14.5, primaryBottleneck: "Bharalu backwater + silted collector" },
      "+1HR": { depthM: 0.32, risk: "high", affectedAreaHa: 22.8, primaryBottleneck: "Conduit D-018 capacity exceeded" },
      "+2HR": { depthM: 0.61, risk: "critical", affectedAreaHa: 34.2, primaryBottleneck: "Hydraulic surcharge at pump station N-013" },
      "+3HR": { depthM: 0.94, risk: "critical", affectedAreaHa: 46.0, primaryBottleneck: "Overland basin pooling > 0.9m" }
    }
  },
  {
    id: "FZ-02",
    name: "GS Road (Bhangagarh) Representative Corridor",
    description: "Primary arterial transit zone impacted by runoff funneling from surrounding medical college hills.",
    center: [26.1575, 91.7710],
    polygon: [
      [26.1620, 91.7660],
      [26.1605, 91.7745],
      [26.1540, 91.7735],
      [26.1550, 91.7645]
    ],
    timesteps: {
      NOW: { depthM: 0.12, risk: "low", affectedAreaHa: 8.2, primaryBottleneck: "Local grate inlet restriction" },
      "+1HR": { depthM: 0.28, risk: "moderate", affectedAreaHa: 15.6, primaryBottleneck: "Junction N-014 surcharge onset" },
      "+2HR": { depthM: 0.54, risk: "high", affectedAreaHa: 24.1, primaryBottleneck: "Conduit D-027 flow > 120% capacity" },
      "+3HR": { depthM: 0.82, risk: "critical", affectedAreaHa: 32.5, primaryBottleneck: "Multi-point manhole overflow" }
    }
  },
  {
    id: "FZ-03",
    name: "Zoo Road Tiniali Representative Sector",
    description: "Commercial crossroad bottleneck where RG Baruah Road drainage merges with Geetanagar outflows.",
    center: [26.1650, 91.7830],
    polygon: [
      [26.1685, 91.7790],
      [26.1670, 91.7875],
      [26.1610, 91.7850],
      [26.1625, 91.7770]
    ],
    timesteps: {
      NOW: { depthM: 0.10, risk: "low", affectedAreaHa: 6.8, primaryBottleneck: "Surface gutter clogging" },
      "+1HR": { depthM: 0.25, risk: "moderate", affectedAreaHa: 13.4, primaryBottleneck: "Junction N-016 surcharge" },
      "+2HR": { depthM: 0.49, risk: "high", affectedAreaHa: 21.0, primaryBottleneck: "Conduit D-024 overloaded" },
      "+3HR": { depthM: 0.74, risk: "critical", affectedAreaHa: 28.6, primaryBottleneck: "Intersection submergence" }
    }
  },
  {
    id: "FZ-04",
    name: "Rukminigaon Representative Depression",
    description: "Natural topographic depression between Down Town hospital and Six Mile overpass.",
    center: [26.1395, 91.8000],
    polygon: [
      [26.1435, 91.7960],
      [26.1420, 91.8050],
      [26.1360, 91.8040],
      [26.1370, 91.7940]
    ],
    timesteps: {
      NOW: { depthM: 0.15, risk: "moderate", affectedAreaHa: 9.4, primaryBottleneck: "Culvert D-033 throttled" },
      "+1HR": { depthM: 0.31, risk: "high", affectedAreaHa: 18.2, primaryBottleneck: "Inlet N-022 severe surcharge" },
      "+2HR": { depthM: 0.58, risk: "high", affectedAreaHa: 27.5, primaryBottleneck: "Discharge backflow from Six Mile link" },
      "+3HR": { depthM: 0.88, risk: "critical", affectedAreaHa: 36.8, primaryBottleneck: "Depression waterlogging > 0.8m" }
    }
  },
  {
    id: "FZ-05",
    name: "Hatigaon - Bhetapara Representative Corridor",
    description: "Dense residential zone with limited conveyance towards the southern Mora Bharalu canal.",
    center: [26.1340, 91.7790],
    polygon: [
      [26.1380, 91.7750],
      [26.1375, 91.7860],
      [26.1310, 91.7840],
      [26.1315, 91.7730]
    ],
    timesteps: {
      NOW: { depthM: 0.08, risk: "low", affectedAreaHa: 5.2, primaryBottleneck: "Inadequate drain cross-section" },
      "+1HR": { depthM: 0.22, risk: "moderate", affectedAreaHa: 11.8, primaryBottleneck: "Junction N-027 surcharge" },
      "+2HR": { depthM: 0.44, risk: "high", affectedAreaHa: 19.4, primaryBottleneck: "Conduit D-042 capacity exceeded" },
      "+3HR": { depthM: 0.69, risk: "critical", affectedAreaHa: 27.2, primaryBottleneck: "Street surface channelization" }
    }
  },
  {
    id: "FZ-06",
    name: "Bharalumukh Representative Confluence",
    description: "Lower reach convergence where urban stormwater discharges toward natural river outfall.",
    center: [26.1735, 91.7265],
    polygon: [
      [26.1780, 91.7220],
      [26.1770, 91.7320],
      [26.1700, 91.7300],
      [26.1710, 91.7210]
    ],
    timesteps: {
      NOW: { depthM: 0.11, risk: "low", affectedAreaHa: 7.0, primaryBottleneck: "Sluice gate backflow pressure" },
      "+1HR": { depthM: 0.24, risk: "moderate", affectedAreaHa: 14.2, primaryBottleneck: "Conduit D-004 over capacity" },
      "+2HR": { depthM: 0.46, risk: "high", affectedAreaHa: 22.0, primaryBottleneck: "Outfall N-003 hydraulic head rise" },
      "+3HR": { depthM: 0.72, risk: "critical", affectedAreaHa: 30.5, primaryBottleneck: "Riverfront low-land surcharge" }
    }
  },
  {
    id: "FZ-07",
    name: "Ulubari - Lachit Nagar Representative Pocket",
    description: "Interior residential blocks situated along secondary tributary drains.",
    center: [26.1695, 91.7610],
    polygon: [
      [26.1730, 91.7565],
      [26.1725, 91.7660],
      [26.1665, 91.7645],
      [26.1670, 91.7555]
    ],
    timesteps: {
      NOW: { depthM: 0.09, risk: "low", affectedAreaHa: 4.8, primaryBottleneck: "Tertiary drain siltation" },
      "+1HR": { depthM: 0.20, risk: "moderate", affectedAreaHa: 10.5, primaryBottleneck: "Manhole LN-2 surcharge" },
      "+2HR": { depthM: 0.41, risk: "high", affectedAreaHa: 17.8, primaryBottleneck: "Conduit D-013 overflow" },
      "+3HR": { depthM: 0.65, risk: "critical", affectedAreaHa: 25.1, primaryBottleneck: "Roadway inundation" }
    }
  },
  {
    id: "FZ-08",
    name: "Boragaon Highway Bypass Transition",
    description: "Peripheral wetland fringe area receiving overflow from western urban catchments.",
    center: [26.1350, 91.7080],
    polygon: [
      [26.1390, 91.7020],
      [26.1380, 91.7130],
      [26.1320, 91.7110],
      [26.1330, 91.7010]
    ],
    timesteps: {
      NOW: { depthM: 0.06, risk: "low", affectedAreaHa: 3.5, primaryBottleneck: "Highway culvert throttling" },
      "+1HR": { depthM: 0.16, risk: "moderate", affectedAreaHa: 8.2, primaryBottleneck: "Drain D-048 overload" },
      "+2HR": { depthM: 0.35, risk: "high", affectedAreaHa: 15.0, primaryBottleneck: "Wetland retention buffer saturation" },
      "+3HR": { depthM: 0.58, risk: "high", affectedAreaHa: 22.8, primaryBottleneck: "Marginal waterlogging" }
    }
  },
  {
    id: "FZ-09",
    name: "Khanapara Basin Representative Lowland",
    description: "Southern foothill catchment basin prone to rapid overland accumulation from surrounding Meghalaya hills.",
    center: [26.1260, 91.8150],
    polygon: [
      [26.1310, 91.8080],
      [26.1300, 91.8220],
      [26.1210, 91.8210],
      [26.1220, 91.8090],
      [26.1280, 91.8070]
    ],
    timesteps: {
      NOW: { depthM: 0.14, risk: "moderate", affectedAreaHa: 6.5, primaryBottleneck: "Southern foothill overland runoff funnel" },
      "+1HR": { depthM: 0.30, risk: "high", affectedAreaHa: 14.0, primaryBottleneck: "Culvert intake constriction on arterial link" },
      "+2HR": { depthM: 0.58, risk: "critical", affectedAreaHa: 25.5, primaryBottleneck: "Rotary junction surcharge & backflow" },
      "+3HR": { depthM: 0.86, risk: "critical", affectedAreaHa: 36.0, primaryBottleneck: "Basin inundation exceeding passable threshold" }
    }
  }
];
