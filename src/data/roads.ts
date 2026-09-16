import { RoadSegment } from '../types';

export const ROADS_DISCLAIMER =
  "Representative road flood risk based on simulated overland inundation and drainage surcharge states. SIMULATED PILOT DATA.";

export const ROAD_SEGMENTS: RoadSegment[] = [
  // -------------------------------------------------------------
  // 1. PRIMARY NAMED BOTTLENECK CORRIDORS (RD-01 to RD-05)
  // -------------------------------------------------------------
  {
    id: "RD-01",
    name: "Khanapara Crossing",
    description: "Major southern junction connecting GS Road to Meghalaya corridor.",
    path: [
      [26.1320, 91.8105],
      [26.1275, 91.8155],
      [26.1230, 91.8195],
      [26.1185, 91.8235],
      [26.1165, 91.8250],
      [26.1170, 91.8260]
    ],
    timesteps: {
      NOW: { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.48, risk: "high", drainageStressPct: 98, timeToCritical: "48 min" },
      "+1HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.85, risk: "critical", drainageStressPct: 128, timeToCritical: "Critical now" },
      "+2HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 1.05, risk: "critical", drainageStressPct: 145, timeToCritical: "Submerged" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 1.25, risk: "critical", drainageStressPct: 160, timeToCritical: "Submerged" }
    }
  },
  {
    id: "RD-02",
    name: "Anil Nagar",
    description: "Low-lying bowl corridor prone to rapid Bharalu canal surcharge.",
    path: [
      [26.1855, 91.7735],
      [26.1830, 91.7720],
      [26.1805, 91.7705],
      [26.1780, 91.7680],
      [26.1755, 91.7645],
      [26.1735, 91.7610],
      [26.1718, 91.7562]
    ],
    timesteps: {
      NOW: { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.62, risk: "critical", drainageStressPct: 122, timeToCritical: "Critical now" },
      "+1HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.88, risk: "critical", drainageStressPct: 142, timeToCritical: "Critical now" },
      "+2HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 1.15, risk: "critical", drainageStressPct: 158, timeToCritical: "Submerged" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 1.35, risk: "critical", drainageStressPct: 175, timeToCritical: "Submerged" }
    }
  },
  {
    id: "RD-03",
    name: "Rukminigaon Road",
    description: "Depressed arterial link between Down Town hospital and GS Road.",
    path: [
      [26.1450, 91.7940],
      [26.1440, 91.7955],
      [26.1430, 91.7970],
      [26.1420, 91.7985],
      [26.1410, 91.7995],
      [26.1395, 91.8010],
      [26.1380, 91.8030]
    ],
    timesteps: {
      NOW: { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.44, risk: "high", drainageStressPct: 95, timeToCritical: "35 min" },
      "+1HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.74, risk: "critical", drainageStressPct: 124, timeToCritical: "Critical now" },
      "+2HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.96, risk: "critical", drainageStressPct: 140, timeToCritical: "Submerged" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 1.18, risk: "critical", drainageStressPct: 155, timeToCritical: "Submerged" }
    }
  },
  {
    id: "RD-04",
    name: "Bharalumukh Sluice Gate Approach",
    description: "Lower discharge node roadway near the Brahmaputra outfall.",
    path: [
      [26.1695, 91.7325],
      [26.1715, 91.7290],
      [26.1740, 91.7260],
      [26.1730, 91.7215]
    ],
    timesteps: {
      NOW: { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.65, risk: "critical", drainageStressPct: 126, timeToCritical: "Critical now" },
      "+1HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.82, risk: "critical", drainageStressPct: 138, timeToCritical: "Critical now" },
      "+2HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 1.02, risk: "critical", drainageStressPct: 150, timeToCritical: "Submerged" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 1.22, risk: "critical", drainageStressPct: 165, timeToCritical: "Submerged" }
    }
  },
  {
    id: "RD-05",
    name: "Hatigaon Canal Crossing",
    description: "Arterial bridge and road crossing adjacent to southern drainage collector.",
    path: [
      [26.1400, 91.7905],
      [26.1380, 91.7885],
      [26.1360, 91.7850],
      [26.1340, 91.7820],
      [26.1315, 91.7770],
      [26.1290, 91.7725],
      [26.1265, 91.7670]
    ],
    timesteps: {
      NOW: { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.38, risk: "high", drainageStressPct: 90, timeToCritical: "40 min" },
      "+1HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.72, risk: "critical", drainageStressPct: 122, timeToCritical: "Critical now" },
      "+2HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.94, risk: "critical", drainageStressPct: 139, timeToCritical: "Submerged" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 1.12, risk: "critical", drainageStressPct: 154, timeToCritical: "Submerged" }
    }
  },

  // -------------------------------------------------------------
  // 2. HIGH RISK CORRIDORS AT +1HR (RD-06 to RD-17)
  // -------------------------------------------------------------
  {
    id: "RD-06",
    name: "Zoo Road (RG Baruah Corridor)",
    description: "Major commercial artery prone to rapid runoff from surrounding hills.",
    path: [
      [26.1880, 91.7745],
      [26.1770, 91.7710],
      [26.1645, 91.7820],
      [26.1550, 91.7845]
    ],
    timesteps: {
      NOW: { riskState: "MODERATE", status: "caution", waterDepthM: 0.22, risk: "moderate", drainageStressPct: 82, timeToCritical: "1 hr 10 min" },
      "+1HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.52, risk: "high", drainageStressPct: 114, timeToCritical: "35 min" },
      "+2HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.76, risk: "critical", drainageStressPct: 132, timeToCritical: "Critical now" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.98, risk: "critical", drainageStressPct: 148, timeToCritical: "Submerged" }
    }
  },
  {
    id: "RD-07",
    name: "GS Road — Bhangagarh Junction",
    description: "Transit nexus receiving heavy mountain runoff from GMC medical hills.",
    path: [
      [26.1685, 91.7595],
      [26.1668, 91.7612],
      [26.1648, 91.7628],
      [26.1630, 91.7645],
      [26.1610, 91.7665],
      [26.1598, 91.7675],
      [26.1585, 91.7685]
    ],
    timesteps: {
      NOW: { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.36, risk: "high", drainageStressPct: 88, timeToCritical: "50 min" },
      "+1HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.58, risk: "high", drainageStressPct: 116, timeToCritical: "25 min" },
      "+2HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.82, risk: "critical", drainageStressPct: 135, timeToCritical: "Critical now" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 1.04, risk: "critical", drainageStressPct: 152, timeToCritical: "Submerged" }
    }
  },
  {
    id: "RD-08",
    name: "GS Road — Christian Basti Sector",
    description: "Mid-reach of primary highway experiencing backwater hydraulic surcharge.",
    path: [
      [26.1585, 91.7685],
      [26.1570, 91.7705],
      [26.1555, 91.7725],
      [26.1542, 91.7745],
      [26.1530, 91.7765],
      [26.1518, 91.7785],
      [26.1505, 91.7805],
      [26.1495, 91.7820]
    ],
    timesteps: {
      NOW: { riskState: "MODERATE", status: "caution", waterDepthM: 0.20, risk: "moderate", drainageStressPct: 76, timeToCritical: "1 hr 30 min" },
      "+1HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.48, risk: "high", drainageStressPct: 112, timeToCritical: "40 min" },
      "+2HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.68, risk: "high", drainageStressPct: 126, timeToCritical: "15 min" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.90, risk: "critical", drainageStressPct: 144, timeToCritical: "Critical now" }
    }
  },
  {
    id: "RD-09",
    name: "Ganeshguri Underpass Link",
    description: "Depressed roadway beneath flyover prone to rapid localized ponding.",
    path: [
      [26.1495, 91.7820],
      [26.1488, 91.7840],
      [26.1482, 91.7852],
      [26.1478, 91.7865],
      [26.1472, 91.7885],
      [26.1465, 91.7905],
      [26.1458, 91.7925]
    ],
    timesteps: {
      NOW: { riskState: "MODERATE", status: "caution", waterDepthM: 0.28, risk: "moderate", drainageStressPct: 86, timeToCritical: "1 hr 05 min" },
      "+1HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.55, risk: "high", drainageStressPct: 118, timeToCritical: "30 min" },
      "+2HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.84, risk: "critical", drainageStressPct: 136, timeToCritical: "Critical now" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 1.08, risk: "critical", drainageStressPct: 154, timeToCritical: "Submerged" }
    }
  },
  {
    id: "RD-10",
    name: "Lachit Nagar 2nd Link",
    description: "Dense residential corridor connecting Ulubari to Rajgarh.",
    path: [
      [26.1710, 91.7580],
      [26.1690, 91.7625],
      [26.1670, 91.7660]
    ],
    timesteps: {
      NOW: { riskState: "MODERATE", status: "caution", waterDepthM: 0.24, risk: "moderate", drainageStressPct: 80, timeToCritical: "1 hr 20 min" },
      "+1HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.46, risk: "high", drainageStressPct: 108, timeToCritical: "45 min" },
      "+2HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.64, risk: "high", drainageStressPct: 122, timeToCritical: "20 min" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.86, risk: "critical", drainageStressPct: 140, timeToCritical: "Critical now" }
    }
  },
  {
    id: "RD-11",
    name: "Tarun Nagar Arterial",
    description: "Lowland street running parallel to Bharalu collector drain.",
    path: [
      [26.1650, 91.7680],
      [26.1620, 91.7710],
      [26.1595, 91.7740]
    ],
    timesteps: {
      NOW: { riskState: "MODERATE", status: "caution", waterDepthM: 0.26, risk: "moderate", drainageStressPct: 84, timeToCritical: "1 hr 15 min" },
      "+1HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.50, risk: "high", drainageStressPct: 112, timeToCritical: "35 min" },
      "+2HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.70, risk: "high", drainageStressPct: 128, timeToCritical: "15 min" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.92, risk: "critical", drainageStressPct: 146, timeToCritical: "Critical now" }
    }
  },
  {
    id: "RD-12",
    name: "Ulubari Post Office Road",
    description: "Commercial crossway experiencing surface flow accumulation.",
    path: [
      [26.1730, 91.7530],
      [26.1700, 91.7565],
      [26.1675, 91.7600]
    ],
    timesteps: {
      NOW: { riskState: "MODERATE", status: "caution", waterDepthM: 0.21, risk: "moderate", drainageStressPct: 78, timeToCritical: "1 hr 35 min" },
      "+1HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.44, risk: "high", drainageStressPct: 106, timeToCritical: "50 min" },
      "+2HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.62, risk: "high", drainageStressPct: 120, timeToCritical: "25 min" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.82, risk: "critical", drainageStressPct: 138, timeToCritical: "Critical now" }
    }
  },
  {
    id: "RD-13",
    name: "Silsako Beel Inundation Approach",
    description: "Low-lying eastern retention basin road along Chachhal wetland fringe.",
    path: [
      [26.1560, 91.8100],
      [26.1530, 91.8140],
      [26.1500, 91.8180]
    ],
    timesteps: {
      NOW: { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.35, risk: "high", drainageStressPct: 89, timeToCritical: "55 min" },
      "+1HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.54, risk: "high", drainageStressPct: 115, timeToCritical: "30 min" },
      "+2HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.78, risk: "critical", drainageStressPct: 133, timeToCritical: "Critical now" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 1.02, risk: "critical", drainageStressPct: 151, timeToCritical: "Submerged" }
    }
  },
  {
    id: "RD-14",
    name: "Bhetapara Chariali Sector",
    description: "Crossroads carrying discharge toward southern Mora Bharalu canal.",
    path: [
      [26.1265, 91.7670],
      [26.1250, 91.7620],
      [26.1240, 91.7560],
      [26.1230, 91.7500],
      [26.1220, 91.7430],
      [26.1215, 91.7370]
    ],
    timesteps: {
      NOW: { riskState: "MODERATE", status: "caution", waterDepthM: 0.25, risk: "moderate", drainageStressPct: 83, timeToCritical: "1 hr 15 min" },
      "+1HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.49, risk: "high", drainageStressPct: 110, timeToCritical: "40 min" },
      "+2HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.67, risk: "high", drainageStressPct: 125, timeToCritical: "15 min" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.88, risk: "critical", drainageStressPct: 142, timeToCritical: "Critical now" }
    }
  },
  {
    id: "RD-15",
    name: "Down Town Hospital Service Road",
    description: "Critical access roadway connecting GS Road to emergency medical hub.",
    path: [
      [26.1430, 91.7950],
      [26.1405, 91.7980],
      [26.1380, 91.8010]
    ],
    timesteps: {
      NOW: { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.37, risk: "high", drainageStressPct: 91, timeToCritical: "45 min" },
      "+1HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.57, risk: "high", drainageStressPct: 117, timeToCritical: "25 min" },
      "+2HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.81, risk: "critical", drainageStressPct: 135, timeToCritical: "Critical now" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 1.05, risk: "critical", drainageStressPct: 153, timeToCritical: "Submerged" }
    }
  },
  {
    id: "RD-16",
    name: "Dispur Last Gate South",
    description: "Administrative approach corridor with limited stormwater cross-culverts.",
    path: [
      [26.1450, 91.7900],
      [26.1420, 91.7925],
      [26.1390, 91.7940]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.12, risk: "low", drainageStressPct: 62, timeToCritical: "2 hr 20 min" },
      "+1HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.38, risk: "high", drainageStressPct: 104, timeToCritical: "50 min" },
      "+2HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.58, risk: "high", drainageStressPct: 119, timeToCritical: "25 min" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.79, risk: "critical", drainageStressPct: 136, timeToCritical: "Critical now" }
    }
  },
  {
    id: "RD-17",
    name: "Six Mile Flyover Ground Link",
    description: "Surface grade level transit under Six Mile elevated intersection.",
    path: [
      [26.1360, 91.8060],
      [26.1335, 91.8090],
      [26.1310, 91.8125]
    ],
    timesteps: {
      NOW: { riskState: "MODERATE", status: "caution", waterDepthM: 0.22, risk: "moderate", drainageStressPct: 79, timeToCritical: "1 hr 30 min" },
      "+1HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.45, risk: "high", drainageStressPct: 108, timeToCritical: "45 min" },
      "+2HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.65, risk: "high", drainageStressPct: 124, timeToCritical: "20 min" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.85, risk: "critical", drainageStressPct: 141, timeToCritical: "Critical now" }
    }
  },

  // -------------------------------------------------------------
  // 3. MODERATE CORRIDORS AT +1HR (RD-18 to RD-35)
  // -------------------------------------------------------------
  {
    id: "RD-18",
    name: "GS Road — Ganeshguri to Six Mile",
    description: "Major highway stretch carrying heavy commuter traffic.",
    path: [
      [26.1458, 91.7925],
      [26.1440, 91.7955],
      [26.1410, 91.7995],
      [26.1380, 91.8030],
      [26.1370, 91.8045],
      [26.1360, 91.8055]
    ],
    timesteps: {
      NOW: { riskState: "MODERATE", status: "caution", waterDepthM: 0.15, risk: "moderate", drainageStressPct: 70, timeToCritical: "1 hr 45 min" },
      "+1HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.28, risk: "moderate", drainageStressPct: 92, timeToCritical: "1 hr 15 min" },
      "+2HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.54, risk: "high", drainageStressPct: 120, timeToCritical: "40 min" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.82, risk: "critical", drainageStressPct: 142, timeToCritical: "Critical now" }
    }
  },
  {
    id: "RD-19",
    name: "Jalukbari Road (AT Road - Maligaon Corridor)",
    description: "Western arterial corridor linking Gauhati University to downtown.",
    path: [
      [26.1510, 91.6885],
      [26.1555, 91.6975],
      [26.1590, 91.7080],
      [26.1620, 91.7160]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.04, risk: "low", drainageStressPct: 42, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.18, risk: "moderate", drainageStressPct: 74, timeToCritical: "2 hr 10 min" },
      "+2HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.28, risk: "moderate", drainageStressPct: 88, timeToCritical: "1 hr 20 min" },
      "+3HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.44, risk: "high", drainageStressPct: 112, timeToCritical: "45 min" }
    }
  },
  {
    id: "RD-20",
    name: "Maligaon Chariali Collector",
    description: "Railway colony commercial road west of Kamakhya foothills.",
    path: [
      [26.1620, 91.7160],
      [26.1645, 91.7210],
      [26.1670, 91.7250]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.06, risk: "low", drainageStressPct: 48, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.19, risk: "moderate", drainageStressPct: 76, timeToCritical: "2 hr 00 min" },
      "+2HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.29, risk: "moderate", drainageStressPct: 90, timeToCritical: "1 hr 15 min" },
      "+3HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.46, risk: "high", drainageStressPct: 114, timeToCritical: "40 min" }
    }
  },
  {
    id: "RD-21",
    name: "Bharalu Riverside West",
    description: "Service roadway bordering natural Bharalu drainage bank.",
    path: [
      [26.1680, 91.7350],
      [26.1660, 91.7400],
      [26.1635, 91.7440]
    ],
    timesteps: {
      NOW: { riskState: "MODERATE", status: "caution", waterDepthM: 0.16, risk: "moderate", drainageStressPct: 72, timeToCritical: "1 hr 40 min" },
      "+1HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.27, risk: "moderate", drainageStressPct: 90, timeToCritical: "1 hr 10 min" },
      "+2HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.52, risk: "high", drainageStressPct: 118, timeToCritical: "35 min" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.76, risk: "critical", drainageStressPct: 136, timeToCritical: "Critical now" }
    }
  },
  {
    id: "RD-22",
    name: "Santipur Main Road",
    description: "Riverside residential corridor prone to seasonal seepage.",
    path: [
      [26.1740, 91.7310],
      [26.1720, 91.7345],
      [26.1695, 91.7380]
    ],
    timesteps: {
      NOW: { riskState: "MODERATE", status: "caution", waterDepthM: 0.17, risk: "moderate", drainageStressPct: 74, timeToCritical: "1 hr 35 min" },
      "+1HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.29, risk: "moderate", drainageStressPct: 94, timeToCritical: "1 hr 05 min" },
      "+2HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.55, risk: "high", drainageStressPct: 121, timeToCritical: "30 min" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.79, risk: "critical", drainageStressPct: 139, timeToCritical: "Critical now" }
    }
  },
  {
    id: "RD-23",
    name: "Kumarpara Arterial",
    description: "Old city residential corridor with underground masonry drains.",
    path: [
      [26.1715, 91.7410],
      [26.1690, 91.7445],
      [26.1660, 91.7480]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.08, risk: "low", drainageStressPct: 52, timeToCritical: "2 hr 45 min" },
      "+1HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.22, risk: "moderate", drainageStressPct: 82, timeToCritical: "1 hr 45 min" },
      "+2HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.32, risk: "moderate", drainageStressPct: 96, timeToCritical: "1 hr 00 min" },
      "+3HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.52, risk: "high", drainageStressPct: 120, timeToCritical: "35 min" }
    }
  },
  {
    id: "RD-24",
    name: "Fancy Bazar Riverfront Road",
    description: "High-density wholesale market lane near Brahmaputra ghats.",
    path: [
      [26.1820, 91.7390],
      [26.1800, 91.7425],
      [26.1780, 91.7460]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.07, risk: "low", drainageStressPct: 50, timeToCritical: "2 hr 50 min" },
      "+1HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.21, risk: "moderate", drainageStressPct: 80, timeToCritical: "1 hr 50 min" },
      "+2HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.31, risk: "moderate", drainageStressPct: 94, timeToCritical: "1 hr 05 min" },
      "+3HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.49, risk: "high", drainageStressPct: 118, timeToCritical: "40 min" }
    }
  },
  {
    id: "RD-25",
    name: "Panbazar Overbridge Approach",
    description: "Key civic center link connecting central station to riverfront.",
    path: [
      [26.1825, 91.7480],
      [26.1795, 91.7505],
      [26.1765, 91.7530]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.05, risk: "low", drainageStressPct: 45, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.17, risk: "moderate", drainageStressPct: 75, timeToCritical: "2 hr 15 min" },
      "+2HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.27, risk: "moderate", drainageStressPct: 88, timeToCritical: "1 hr 25 min" },
      "+3HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.43, risk: "high", drainageStressPct: 110, timeToCritical: "50 min" }
    }
  },
  {
    id: "RD-26",
    name: "Chandmari Colony Link",
    description: "Lower hillside residential access street.",
    path: [
      [26.1890, 91.7700],
      [26.1865, 91.7730],
      [26.1840, 91.7760]
    ],
    timesteps: {
      NOW: { riskState: "MODERATE", status: "caution", waterDepthM: 0.14, risk: "moderate", drainageStressPct: 68, timeToCritical: "1 hr 50 min" },
      "+1HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.26, risk: "moderate", drainageStressPct: 88, timeToCritical: "1 hr 20 min" },
      "+2HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.50, risk: "high", drainageStressPct: 116, timeToCritical: "40 min" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.74, risk: "critical", drainageStressPct: 134, timeToCritical: "Critical now" }
    }
  },
  {
    id: "RD-27",
    name: "Geetanagar Collector",
    description: "Cross-district collector channel connecting Zoo Road to Noonmati.",
    path: [
      [26.1740, 91.7870],
      [26.1715, 91.7910],
      [26.1690, 91.7950]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.09, risk: "low", drainageStressPct: 55, timeToCritical: "2 hr 30 min" },
      "+1HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.24, risk: "moderate", drainageStressPct: 84, timeToCritical: "1 hr 35 min" },
      "+2HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.48, risk: "high", drainageStressPct: 114, timeToCritical: "45 min" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.72, risk: "critical", drainageStressPct: 132, timeToCritical: "Critical now" }
    }
  },
  {
    id: "RD-28",
    name: "Noonmati Refinery Road South",
    description: "Industrial feeder artery with open roadside stormwater channels.",
    path: [
      [26.1860, 91.8020],
      [26.1830, 91.8060],
      [26.1800, 91.8100]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.06, risk: "low", drainageStressPct: 46, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.19, risk: "moderate", drainageStressPct: 78, timeToCritical: "2 hr 05 min" },
      "+2HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.30, risk: "moderate", drainageStressPct: 92, timeToCritical: "1 hr 15 min" },
      "+3HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.47, risk: "high", drainageStressPct: 115, timeToCritical: "40 min" }
    }
  },
  {
    id: "RD-29",
    name: "Hengrabari Ridge Lower Road",
    description: "Slope-base street collecting surface runoff from secretariat hills.",
    path: [
      [26.1520, 91.7920],
      [26.1500, 91.7960],
      [26.1480, 91.8000]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.08, risk: "low", drainageStressPct: 53, timeToCritical: "2 hr 40 min" },
      "+1HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.23, risk: "moderate", drainageStressPct: 83, timeToCritical: "1 hr 40 min" },
      "+2HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.34, risk: "moderate", drainageStressPct: 98, timeToCritical: "55 min" },
      "+3HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.54, risk: "high", drainageStressPct: 122, timeToCritical: "30 min" }
    }
  },
  {
    id: "RD-30",
    name: "VIP Road Six Mile Approach",
    description: "Transition from elevated VIP expressway to southern urban surface roads.",
    path: [
      [26.1360, 91.8150],
      [26.1330, 91.8130],
      [26.1300, 91.8100]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.09, risk: "low", drainageStressPct: 54, timeToCritical: "2 hr 35 min" },
      "+1HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.25, risk: "moderate", drainageStressPct: 85, timeToCritical: "1 hr 30 min" },
      "+2HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.49, risk: "high", drainageStressPct: 115, timeToCritical: "40 min" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.73, risk: "critical", drainageStressPct: 133, timeToCritical: "Critical now" }
    }
  },
  {
    id: "RD-31",
    name: "Beltola Tiniali North Access",
    description: "Bustling junction leading into residential Beltola market district.",
    path: [
      [26.1360, 91.8055],
      [26.1350, 91.8045],
      [26.1335, 91.8030],
      [26.1320, 91.8015],
      [26.1305, 91.8000],
      [26.1292, 91.7988],
      [26.1280, 91.7980]
    ],
    timesteps: {
      NOW: { riskState: "MODERATE", status: "caution", waterDepthM: 0.15, risk: "moderate", drainageStressPct: 71, timeToCritical: "1 hr 45 min" },
      "+1HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.28, risk: "moderate", drainageStressPct: 91, timeToCritical: "1 hr 15 min" },
      "+2HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.52, risk: "high", drainageStressPct: 118, timeToCritical: "35 min" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.77, risk: "critical", drainageStressPct: 137, timeToCritical: "Critical now" }
    }
  },
  {
    id: "RD-32",
    name: "Jayanagar Arterial Link",
    description: "East Beltola residential connector with open concrete gutters.",
    path: [
      [26.1330, 91.8125],
      [26.1315, 91.8095],
      [26.1300, 91.8065],
      [26.1290, 91.8035],
      [26.1285, 91.8005],
      [26.1280, 91.7980]
    ],
    timesteps: {
      NOW: { riskState: "MODERATE", status: "caution", waterDepthM: 0.13, risk: "moderate", drainageStressPct: 69, timeToCritical: "1 hr 55 min" },
      "+1HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.27, risk: "moderate", drainageStressPct: 89, timeToCritical: "1 hr 20 min" },
      "+2HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.38, risk: "moderate", drainageStressPct: 102, timeToCritical: "50 min" },
      "+3HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.56, risk: "high", drainageStressPct: 124, timeToCritical: "25 min" }
    }
  },
  {
    id: "RD-33",
    name: "Basistha Mandir Road West",
    description: "Foothill approach road near holy Basistha stream confluence.",
    path: [
      [26.1210, 91.8080],
      [26.1170, 91.8050],
      [26.1130, 91.8020]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.07, risk: "low", drainageStressPct: 49, timeToCritical: "2 hr 55 min" },
      "+1HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.20, risk: "moderate", drainageStressPct: 79, timeToCritical: "1 hr 55 min" },
      "+2HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.31, risk: "moderate", drainageStressPct: 93, timeToCritical: "1 hr 10 min" },
      "+3HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.48, risk: "high", drainageStressPct: 116, timeToCritical: "40 min" }
    }
  },
  {
    id: "RD-34",
    name: "Boragaon Highway Feeder",
    description: "Western marshland bypass junction with Deepor Beel overflow link.",
    path: [
      [26.1215, 91.7370],
      [26.1230, 91.7310],
      [26.1260, 91.7240],
      [26.1295, 91.7170],
      [26.1330, 91.7105],
      [26.1365, 91.7050]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.08, risk: "low", drainageStressPct: 52, timeToCritical: "2 hr 45 min" },
      "+1HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.23, risk: "moderate", drainageStressPct: 83, timeToCritical: "1 hr 40 min" },
      "+2HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.47, risk: "high", drainageStressPct: 113, timeToCritical: "45 min" },
      "+3HR": { riskState: "BLOCKED", status: "impassable", waterDepthM: 0.71, risk: "critical", drainageStressPct: 131, timeToCritical: "Critical now" }
    }
  },
  {
    id: "RD-35",
    name: "Garchuk Market Connector",
    description: "Agricultural transport junction near highway interchange.",
    path: [
      [26.1260, 91.7180],
      [26.1230, 91.7220],
      [26.1200, 91.7260]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.06, risk: "low", drainageStressPct: 47, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.19, risk: "moderate", drainageStressPct: 77, timeToCritical: "2 hr 05 min" },
      "+2HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.29, risk: "moderate", drainageStressPct: 91, timeToCritical: "1 hr 20 min" },
      "+3HR": { riskState: "HIGH RISK", status: "caution", waterDepthM: 0.46, risk: "high", drainageStressPct: 114, timeToCritical: "45 min" }
    }
  },

  // -------------------------------------------------------------
  // 4. NORMAL SAFE CORRIDORS AT +1HR (RD-36 to RD-66) (31 Segments)
  // -------------------------------------------------------------
  {
    id: "RD-36",
    name: "VIP Road Six Mile Bypass (Elevated Ridge)",
    description: "High-elevation northern ridge corridor safely skirting depressed GS Road basins.",
    path: [
      [26.1815, 91.8055],
      [26.1790, 91.8065],
      [26.1760, 91.8075],
      [26.1725, 91.8085],
      [26.1680, 91.8100],
      [26.1630, 91.8115],
      [26.1580, 91.8130],
      [26.1520, 91.8145],
      [26.1470, 91.8160],
      [26.1420, 91.8170],
      [26.1380, 91.8165],
      [26.1355, 91.8150],
      [26.1330, 91.8125]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.02, risk: "low", drainageStressPct: 24, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.05, risk: "low", drainageStressPct: 38, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.09, risk: "low", drainageStressPct: 52, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.18, risk: "moderate", drainageStressPct: 76, timeToCritical: "2 hr 00 min" }
    }
  },
  {
    id: "RD-37",
    name: "NH 27 Southern Bypass East",
    description: "Grade-separated national highway with high-capacity drainage shoulders.",
    path: [
      [26.1165, 91.8250],
      [26.1155, 91.8200],
      [26.1148, 91.8120],
      [26.1142, 91.8040],
      [26.1140, 91.7950]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.02, risk: "low", drainageStressPct: 22, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.04, risk: "low", drainageStressPct: 35, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.08, risk: "low", drainageStressPct: 48, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.16, risk: "moderate", drainageStressPct: 70, timeToCritical: "2 hr 15 min" }
    }
  },
  {
    id: "RD-38",
    name: "NH 27 Southern Bypass Central",
    description: "Elevated southern bypass link avoiding Hatigaon valley basins.",
    path: [
      [26.1140, 91.7950],
      [26.1142, 91.7850],
      [26.1148, 91.7750],
      [26.1155, 91.7650],
      [26.1168, 91.7510]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.03, risk: "low", drainageStressPct: 26, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.06, risk: "low", drainageStressPct: 39, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.11, risk: "low", drainageStressPct: 58, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.20, risk: "moderate", drainageStressPct: 78, timeToCritical: "1 hr 50 min" }
    }
  },
  {
    id: "RD-39",
    name: "NH 27 Southern Bypass West",
    description: "Expressway section from Jalukbari to ISBT.",
    path: [
      [26.1168, 91.7510],
      [26.1185, 91.7420],
      [26.1205, 91.7330],
      [26.1235, 91.7240],
      [26.1275, 91.7160],
      [26.1320, 91.7095],
      [26.1365, 91.7050]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.03, risk: "low", drainageStressPct: 25, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.07, risk: "low", drainageStressPct: 40, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.12, risk: "low", drainageStressPct: 60, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.21, risk: "moderate", drainageStressPct: 80, timeToCritical: "1 hr 45 min" }
    }
  },
  {
    id: "RD-40",
    name: "MG Road (Brahmaputra Riverfront Corridor)",
    description: "Riverfront embankment road protected by natural river levee gradient.",
    path: [
      [26.1925, 91.7550],
      [26.1915, 91.7500],
      [26.1895, 91.7450],
      [26.1865, 91.7400],
      [26.1830, 91.7350],
      [26.1800, 91.7300],
      [26.1770, 91.7250],
      [26.1740, 91.7200]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.04, risk: "low", drainageStressPct: 30, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.08, risk: "low", drainageStressPct: 45, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.14, risk: "low", drainageStressPct: 65, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.25, risk: "moderate", drainageStressPct: 88, timeToCritical: "1 hr 30 min" }
    }
  },
  {
    id: "RD-41",
    name: "Nilachal Hill High Road",
    description: "Elevated bedrock roadway skirting northern hill slope.",
    path: [
      [26.1660, 91.7050],
      [26.1690, 91.7090],
      [26.1710, 91.7130]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.01, risk: "low", drainageStressPct: 15, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.02, risk: "low", drainageStressPct: 20, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.04, risk: "low", drainageStressPct: 28, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.07, risk: "low", drainageStressPct: 42, timeToCritical: ">3 hrs" }
    }
  },
  {
    id: "RD-42",
    name: "Kamakhya Access Ridge",
    description: "Natural high-elevation ridgeway free from urban waterlogging.",
    path: [
      [26.1640, 91.7020],
      [26.1670, 91.7060],
      [26.1700, 91.7100]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.01, risk: "low", drainageStressPct: 14, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.02, risk: "low", drainageStressPct: 18, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.03, risk: "low", drainageStressPct: 25, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.06, risk: "low", drainageStressPct: 38, timeToCritical: ">3 hrs" }
    }
  },
  {
    id: "RD-43",
    name: "Narengi High Road",
    description: "Eastern elevated arterial running across high alluvial ground.",
    path: [
      [26.1950, 91.8150],
      [26.1920, 91.8200],
      [26.1890, 91.8250]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.02, risk: "low", drainageStressPct: 22, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.05, risk: "low", drainageStressPct: 35, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.09, risk: "low", drainageStressPct: 50, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.17, risk: "moderate", drainageStressPct: 74, timeToCritical: "2 hr 10 min" }
    }
  },
  {
    id: "RD-44",
    name: "Forest Gate Ridge",
    description: "Elevated bypass sector north of Narengi army cantonment.",
    path: [
      [26.1900, 91.8220],
      [26.1860, 91.8260],
      [26.1820, 91.8290]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.01, risk: "low", drainageStressPct: 18, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.03, risk: "low", drainageStressPct: 28, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.06, risk: "low", drainageStressPct: 40, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.11, risk: "low", drainageStressPct: 58, timeToCritical: ">3 hrs" }
    }
  },
  {
    id: "RD-45",
    name: "Chandmari Hill Corridor",
    description: "Upper northern ridge roadway connecting Engineering Institute to riverbank.",
    path: [
      [26.1850, 91.7495],
      [26.1880, 91.7745],
      [26.1915, 91.7820]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.03, risk: "low", drainageStressPct: 25, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.06, risk: "low", drainageStressPct: 38, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.10, risk: "low", drainageStressPct: 55, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.19, risk: "moderate", drainageStressPct: 78, timeToCritical: "1 hr 50 min" }
    }
  },
  {
    id: "RD-46",
    name: "Navagraha Ridge Access",
    description: "Steep hillcrest route above eastern Guwahati.",
    path: [
      [26.1920, 91.7650],
      [26.1900, 91.7680],
      [26.1870, 91.7710]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.01, risk: "low", drainageStressPct: 12, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.02, risk: "low", drainageStressPct: 18, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.04, risk: "low", drainageStressPct: 26, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.07, risk: "low", drainageStressPct: 39, timeToCritical: ">3 hrs" }
    }
  },
  {
    id: "RD-47",
    name: "Sarania Hillcrest Way",
    description: "Natural topographic crest offering safe passage during intense storms.",
    path: [
      [26.1760, 91.7610],
      [26.1780, 91.7640],
      [26.1800, 91.7670]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.02, risk: "low", drainageStressPct: 20, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.04, risk: "low", drainageStressPct: 30, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.07, risk: "low", drainageStressPct: 44, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.12, risk: "low", drainageStressPct: 60, timeToCritical: ">3 hrs" }
    }
  },
  {
    id: "RD-48",
    name: "Nabagraha Road",
    description: "Historic elevated roadway with natural bedrock runoff channels.",
    path: [
      [26.1940, 91.7600],
      [26.1915, 91.7630],
      [26.1890, 91.7660]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.01, risk: "low", drainageStressPct: 15, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.03, risk: "low", drainageStressPct: 24, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.05, risk: "low", drainageStressPct: 36, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.09, risk: "low", drainageStressPct: 52, timeToCritical: ">3 hrs" }
    }
  },
  {
    id: "RD-49",
    name: "Kharguli Riverview Ridge",
    description: "Scenic embankment road perched well above maximum river flood stage.",
    path: [
      [26.1980, 91.7800],
      [26.1960, 91.7860],
      [26.1940, 91.7920]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.01, risk: "low", drainageStressPct: 16, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.03, risk: "low", drainageStressPct: 25, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.05, risk: "low", drainageStressPct: 37, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.08, risk: "low", drainageStressPct: 50, timeToCritical: ">3 hrs" }
    }
  },
  {
    id: "RD-50",
    name: "Uzanbazar High Ground",
    description: "High residential terrace overlooking the northern river bend.",
    path: [
      [26.1910, 91.7520],
      [26.1890, 91.7550],
      [26.1870, 91.7580]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.02, risk: "low", drainageStressPct: 20, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.05, risk: "low", drainageStressPct: 32, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.08, risk: "low", drainageStressPct: 47, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.16, risk: "moderate", drainageStressPct: 70, timeToCritical: "2 hr 15 min" }
    }
  },
  {
    id: "RD-51",
    name: "Guwahati Club North",
    description: "Cultural hub high crossway linking GNB Road to Latasil.",
    path: [
      [26.1860, 91.7550],
      [26.1840, 91.7580],
      [26.1820, 91.7610]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.03, risk: "low", drainageStressPct: 24, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.06, risk: "low", drainageStressPct: 38, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.10, risk: "low", drainageStressPct: 54, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.19, risk: "moderate", drainageStressPct: 76, timeToCritical: "1 hr 55 min" }
    }
  },
  {
    id: "RD-52",
    name: "Dighalipukhuri East High Street",
    description: "Elevated tree-lined avenue bordering historic civic lake.",
    path: [
      [26.1850, 91.7480],
      [26.1830, 91.7510],
      [26.1810, 91.7530]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.02, risk: "low", drainageStressPct: 21, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.05, risk: "low", drainageStressPct: 34, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.08, risk: "low", drainageStressPct: 48, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.17, risk: "moderate", drainageStressPct: 72, timeToCritical: "2 hr 05 min" }
    }
  },
  {
    id: "RD-53",
    name: "Paltan Bazar High Approach",
    description: "North access road from railway station terminal toward AT Road overpass.",
    path: [
      [26.1772, 91.7510],
      [26.1750, 91.7535],
      [26.1730, 91.7555]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.04, risk: "low", drainageStressPct: 32, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.08, risk: "low", drainageStressPct: 48, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.14, risk: "low", drainageStressPct: 66, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.23, risk: "moderate", drainageStressPct: 86, timeToCritical: "1 hr 35 min" }
    }
  },
  {
    id: "RD-54",
    name: "Rehabari South Feeder",
    description: "Mid-elevation urban road connecting Paltan Bazar to Arya Nagar.",
    path: [
      [26.1710, 91.7480],
      [26.1685, 91.7505],
      [26.1660, 91.7530]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.05, risk: "low", drainageStressPct: 36, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.09, risk: "low", drainageStressPct: 51, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.15, risk: "low", drainageStressPct: 68, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.25, risk: "moderate", drainageStressPct: 88, timeToCritical: "1 hr 30 min" }
    }
  },
  {
    id: "RD-55",
    name: "Arya Nagar High Ground",
    description: "Gentle hillside terrace street west of Chatribari.",
    path: [
      [26.1640, 91.7480],
      [26.1620, 91.7510],
      [26.1600, 91.7540]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.03, risk: "low", drainageStressPct: 26, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.06, risk: "low", drainageStressPct: 40, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.11, risk: "low", drainageStressPct: 56, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.20, risk: "moderate", drainageStressPct: 80, timeToCritical: "1 hr 45 min" }
    }
  },
  {
    id: "RD-56",
    name: "Birubari Ridge Link",
    description: "Foothill roadway linking Rupnagar to Dr. B. Borooah Cancer Institute.",
    path: [
      [26.1550, 91.7520],
      [26.1520, 91.7550],
      [26.1490, 91.7580]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.02, risk: "low", drainageStressPct: 22, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.05, risk: "low", drainageStressPct: 35, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.09, risk: "low", drainageStressPct: 50, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.18, risk: "moderate", drainageStressPct: 75, timeToCritical: "2 hr 00 min" }
    }
  },
  {
    id: "RD-57",
    name: "Odalbakra High Street",
    description: "Elevated bedrock street leading toward southern ridge passes.",
    path: [
      [26.1420, 91.7610],
      [26.1390, 91.7640],
      [26.1360, 91.7670]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.03, risk: "low", drainageStressPct: 25, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.07, risk: "low", drainageStressPct: 41, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.12, risk: "low", drainageStressPct: 59, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.22, risk: "moderate", drainageStressPct: 82, timeToCritical: "1 hr 40 min" }
    }
  },
  {
    id: "RD-58",
    name: "Lalmati Ridge Way",
    description: "Foothill highway link bordering southern green belt.",
    path: [
      [26.1280, 91.7700],
      [26.1250, 91.7740],
      [26.1220, 91.7780]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.02, risk: "low", drainageStressPct: 20, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.05, risk: "low", drainageStressPct: 34, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.09, risk: "low", drainageStressPct: 51, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.18, risk: "moderate", drainageStressPct: 75, timeToCritical: "2 hr 05 min" }
    }
  },
  {
    id: "RD-59",
    name: "Lokhra Elevated Bypass",
    description: "Southern bypass grade separation carrying long-haul freight.",
    path: [
      [26.1200, 91.7390],
      [26.1220, 91.7480],
      [26.1240, 91.7570]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.02, risk: "low", drainageStressPct: 22, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.04, risk: "low", drainageStressPct: 35, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.08, risk: "low", drainageStressPct: 49, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.17, risk: "moderate", drainageStressPct: 72, timeToCritical: "2 hr 10 min" }
    }
  },
  {
    id: "RD-60",
    name: "Betkuchi Highway Link",
    description: "Modern four-lane connector with reinforced box-culverts.",
    path: [
      [26.1240, 91.7280],
      [26.1220, 91.7330],
      [26.1200, 91.7380]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.03, risk: "low", drainageStressPct: 24, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.06, risk: "low", drainageStressPct: 38, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.10, risk: "low", drainageStressPct: 53, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.19, risk: "moderate", drainageStressPct: 76, timeToCritical: "1 hr 55 min" }
    }
  },
  {
    id: "RD-61",
    name: "ISBT Elevated Access",
    description: "Inter-State Bus Terminal dedicated flyover approach ramps.",
    path: [
      [26.1365, 91.7050],
      [26.1330, 91.7110],
      [26.1290, 91.7170]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.02, risk: "low", drainageStressPct: 21, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.05, risk: "low", drainageStressPct: 33, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.09, risk: "low", drainageStressPct: 49, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.18, risk: "moderate", drainageStressPct: 73, timeToCritical: "2 hr 05 min" }
    }
  },
  {
    id: "RD-62",
    name: "Jalukbari Rotary Elevated",
    description: "Grade-separated western entry rotunda above ground plain.",
    path: [
      [26.1510, 91.6885],
      [26.1480, 91.6910],
      [26.1450, 91.6935]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.01, risk: "low", drainageStressPct: 15, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.03, risk: "low", drainageStressPct: 24, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.05, risk: "low", drainageStressPct: 35, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.09, risk: "low", drainageStressPct: 52, timeToCritical: ">3 hrs" }
    }
  },
  {
    id: "RD-63",
    name: "Gorchuk High Flyover",
    description: "Elevated bypass deck running over low marshy agricultural land.",
    path: [
      [26.1320, 91.7130],
      [26.1280, 91.7190],
      [26.1250, 91.7240]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.01, risk: "low", drainageStressPct: 16, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.03, risk: "low", drainageStressPct: 26, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.06, risk: "low", drainageStressPct: 38, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.10, risk: "low", drainageStressPct: 55, timeToCritical: ">3 hrs" }
    }
  },
  {
    id: "RD-64",
    name: "Boragaon High Ridge",
    description: "Ridge corridor west of Pamohi river buffer.",
    path: [
      [26.1410, 91.7010],
      [26.1380, 91.7040],
      [26.1350, 91.7070]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.02, risk: "low", drainageStressPct: 22, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.05, risk: "low", drainageStressPct: 34, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.08, risk: "low", drainageStressPct: 48, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "MODERATE", status: "caution", waterDepthM: 0.17, risk: "moderate", drainageStressPct: 71, timeToCritical: "2 hr 10 min" }
    }
  },
  {
    id: "RD-65",
    name: "Deepor Ridge Highway",
    description: "Elevated eco-corridor running along the northern perimeter of Deepor Beel.",
    path: [
      [26.1310, 91.6750],
      [26.1350, 91.6820],
      [26.1390, 91.6890]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.02, risk: "low", drainageStressPct: 20, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.04, risk: "low", drainageStressPct: 32, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.07, risk: "low", drainageStressPct: 45, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.12, risk: "low", drainageStressPct: 62, timeToCritical: ">3 hrs" }
    }
  },
  {
    id: "RD-66",
    name: "Khanapara Meghalaya High Highway",
    description: "Inter-state border highway climbing steadily into Shillong plateau bedrock.",
    path: [
      [26.1150, 91.8260],
      [26.1110, 91.8295],
      [26.1070, 91.8330]
    ],
    timesteps: {
      NOW: { riskState: "NORMAL", status: "clear", waterDepthM: 0.01, risk: "low", drainageStressPct: 14, timeToCritical: ">3 hrs" },
      "+1HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.03, risk: "low", drainageStressPct: 22, timeToCritical: ">3 hrs" },
      "+2HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.05, risk: "low", drainageStressPct: 32, timeToCritical: ">3 hrs" },
      "+3HR": { riskState: "NORMAL", status: "clear", waterDepthM: 0.08, risk: "low", drainageStressPct: 48, timeToCritical: ">3 hrs" }
    }
  }
];
