import { RoadSegment } from '../types';

export const ROADS_DISCLAIMER =
  "Representative road flood risk based on simulated overland inundation and drainage surcharge states.";

export const ROAD_SEGMENTS: RoadSegment[] = [
  {
    id: "RD-01",
    name: "GS Road — Bhangagarh to Christian Basti",
    path: [
      [26.1685, 91.7580],
      [26.1585, 91.7685],
      [26.1540, 91.7790],
      [26.1480, 91.7875]
    ],
    timesteps: {
      NOW: { status: "caution", waterDepthM: 0.12, risk: "moderate" },
      "+1HR": { status: "caution", waterDepthM: 0.28, risk: "high" },
      "+2HR": { status: "impassable", waterDepthM: 0.54, risk: "critical" },
      "+3HR": { status: "impassable", waterDepthM: 0.82, risk: "critical" }
    }
  },
  {
    id: "RD-02",
    name: "GS Road — Ganeshguri to Six Mile",
    path: [
      [26.1480, 91.7875],
      [26.1445, 91.8010],
      [26.1390, 91.7990],
      [26.1320, 91.8110]
    ],
    timesteps: {
      NOW: { status: "caution", waterDepthM: 0.15, risk: "moderate" },
      "+1HR": { status: "caution", waterDepthM: 0.31, risk: "high" },
      "+2HR": { status: "impassable", waterDepthM: 0.58, risk: "critical" },
      "+3HR": { status: "impassable", waterDepthM: 0.88, risk: "critical" }
    }
  },
  {
    id: "RD-03",
    name: "RG Baruah Road (Zoo Road Corridor)",
    path: [
      [26.1880, 91.7745],
      [26.1770, 91.7710],
      [26.1645, 91.7820],
      [26.1480, 91.7875]
    ],
    timesteps: {
      NOW: { status: "caution", waterDepthM: 0.14, risk: "moderate" },
      "+1HR": { status: "caution", waterDepthM: 0.30, risk: "high" },
      "+2HR": { status: "impassable", waterDepthM: 0.56, risk: "critical" },
      "+3HR": { status: "impassable", waterDepthM: 0.85, risk: "critical" }
    }
  },
  {
    id: "RD-04",
    name: "MG Road (Brahmaputra Riverfront Corridor)",
    path: [
      [26.1758, 91.7285],
      [26.1835, 91.7410],
      [26.1850, 91.7495],
      [26.1915, 91.7585]
    ],
    timesteps: {
      NOW: { status: "clear", waterDepthM: 0.04, risk: "low" },
      "+1HR": { status: "clear", waterDepthM: 0.08, risk: "low" },
      "+2HR": { status: "caution", waterDepthM: 0.18, risk: "moderate" },
      "+3HR": { status: "caution", waterDepthM: 0.28, risk: "high" }
    }
  },
  {
    id: "RD-05",
    name: "VIP Road Six Mile Bypass (Elevated Ridge Route)",
    path: [
      [26.1880, 91.7745],
      [26.1750, 91.8020],
      [26.1550, 91.8150],
      [26.1410, 91.8190],
      [26.1320, 91.8110],
      [26.1280, 91.7980]
    ],
    timesteps: {
      NOW: { status: "clear", waterDepthM: 0.02, risk: "low" },
      "+1HR": { status: "clear", waterDepthM: 0.05, risk: "low" },
      "+2HR": { status: "clear", waterDepthM: 0.10, risk: "low" },
      "+3HR": { status: "caution", waterDepthM: 0.16, risk: "moderate" }
    }
  },
  {
    id: "RD-06",
    name: "NH 27 Southern Bypass (Jalukbari - ISBT - Beltola)",
    path: [
      [26.1510, 91.6885],
      [26.1365, 91.7050],
      [26.1210, 91.7390],
      [26.1260, 91.7650],
      [26.1280, 91.7980],
      [26.1180, 91.8220]
    ],
    timesteps: {
      NOW: { status: "clear", waterDepthM: 0.03, risk: "low" },
      "+1HR": { status: "clear", waterDepthM: 0.08, risk: "low" },
      "+2HR": { status: "caution", waterDepthM: 0.15, risk: "moderate" },
      "+3HR": { status: "caution", waterDepthM: 0.24, risk: "moderate" }
    }
  },
  {
    id: "RD-07",
    name: "Hatigaon - Bhetapara Arterial Road",
    path: [
      [26.1480, 91.7875],
      [26.1360, 91.7820],
      [26.1310, 91.7710],
      [26.1260, 91.7650]
    ],
    timesteps: {
      NOW: { status: "caution", waterDepthM: 0.09, risk: "low" },
      "+1HR": { status: "caution", waterDepthM: 0.22, risk: "moderate" },
      "+2HR": { status: "impassable", waterDepthM: 0.48, risk: "high" },
      "+3HR": { status: "impassable", waterDepthM: 0.72, risk: "critical" }
    }
  }
];
