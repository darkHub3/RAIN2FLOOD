import { DrainageEdge } from '../types';

export const DRAINAGE_EDGES: DrainageEdge[] = [
  {
    id: "D-001",
    name: "Jalukbari-Maligaon Western Trunk",
    fromNode: "N-001",
    toNode: "N-002",
    type: "box_culvert",
    lengthM: 850,
    slopePct: 0.22,
    designCapacityM3s: 5.2,
    timesteps: {
      NOW: { flowM3s: 2.1, utilizationPct: 40, status: "normal" },
      "+1HR": { flowM3s: 3.4, utilizationPct: 65, status: "normal" },
      "+2HR": { flowM3s: 4.6, utilizationPct: 88, status: "warning" },
      "+3HR": { flowM3s: 5.8, utilizationPct: 112, status: "overloaded" }
    }
  },
  {
    id: "D-002",
    name: "Kamakhya West Interceptor",
    fromNode: "N-035",
    toNode: "N-001",
    type: "pipe",
    lengthM: 620,
    diameterMm: 1200,
    slopePct: 1.1,
    designCapacityM3s: 4.8,
    timesteps: {
      NOW: { flowM3s: 2.0, utilizationPct: 42, status: "normal" },
      "+1HR": { flowM3s: 3.1, utilizationPct: 65, status: "normal" },
      "+2HR": { flowM3s: 4.2, utilizationPct: 88, status: "warning" },
      "+3HR": { flowM3s: 5.2, utilizationPct: 108, status: "overloaded" }
    }
  },
  {
    id: "D-003",
    name: "Kamakhya East Ridge Collector",
    fromNode: "N-035",
    toNode: "N-002",
    type: "pipe",
    lengthM: 780,
    diameterMm: 1400,
    slopePct: 0.95,
    designCapacityM3s: 5.0,
    timesteps: {
      NOW: { flowM3s: 2.8, utilizationPct: 56, status: "normal" },
      "+1HR": { flowM3s: 3.9, utilizationPct: 78, status: "normal" },
      "+2HR": { flowM3s: 4.9, utilizationPct: 98, status: "warning" },
      "+3HR": { flowM3s: 5.9, utilizationPct: 118, status: "overloaded" }
    }
  },
  {
    id: "D-004",
    name: "Maligaon-Bharalumukh Conduit",
    fromNode: "N-002",
    toNode: "N-003",
    type: "box_culvert",
    lengthM: 920,
    slopePct: 0.35,
    designCapacityM3s: 6.5,
    timesteps: {
      NOW: { flowM3s: 3.8, utilizationPct: 58, status: "normal" },
      "+1HR": { flowM3s: 5.2, utilizationPct: 80, status: "normal" },
      "+2HR": { flowM3s: 6.7, utilizationPct: 103, status: "overloaded" },
      "+3HR": { flowM3s: 7.9, utilizationPct: 122, status: "critical" }
    }
  },
  {
    id: "D-005",
    name: "Santipur Outfall Feeder",
    fromNode: "N-004",
    toNode: "N-003",
    type: "open_channel",
    lengthM: 540,
    slopePct: 0.28,
    designCapacityM3s: 4.5,
    timesteps: {
      NOW: { flowM3s: 2.8, utilizationPct: 62, status: "normal" },
      "+1HR": { flowM3s: 3.8, utilizationPct: 84, status: "normal" },
      "+2HR": { flowM3s: 4.9, utilizationPct: 109, status: "overloaded" },
      "+3HR": { flowM3s: 5.8, utilizationPct: 129, status: "critical" }
    }
  },
  {
    id: "D-006",
    name: "Bharalumukh Riverfront Sluice Edge",
    fromNode: "N-003",
    toNode: "N-005",
    type: "open_channel",
    lengthM: 710,
    slopePct: 0.15,
    designCapacityM3s: 8.5,
    timesteps: {
      NOW: { flowM3s: 5.5, utilizationPct: 65, status: "normal" },
      "+1HR": { flowM3s: 7.2, utilizationPct: 85, status: "warning" },
      "+2HR": { flowM3s: 9.0, utilizationPct: 106, status: "overloaded" },
      "+3HR": { flowM3s: 10.6, utilizationPct: 125, status: "critical" }
    }
  },
  {
    id: "D-007",
    name: "Fatasil to Santipur Link",
    fromNode: "N-032",
    toNode: "N-004",
    type: "pipe",
    lengthM: 680,
    diameterMm: 1200,
    slopePct: 0.32,
    designCapacityM3s: 4.2,
    timesteps: {
      NOW: { flowM3s: 2.7, utilizationPct: 64, status: "normal" },
      "+1HR": { flowM3s: 3.6, utilizationPct: 86, status: "warning" },
      "+2HR": { flowM3s: 4.6, utilizationPct: 110, status: "overloaded" },
      "+3HR": { flowM3s: 5.5, utilizationPct: 131, status: "critical" }
    }
  },
  {
    id: "D-008",
    name: "Fancy Bazar Riverside Drain",
    fromNode: "N-005",
    toNode: "N-006",
    type: "box_culvert",
    lengthM: 490,
    slopePct: 0.18,
    designCapacityM3s: 5.0,
    timesteps: {
      NOW: { flowM3s: 3.1, utilizationPct: 62, status: "normal" },
      "+1HR": { flowM3s: 4.2, utilizationPct: 84, status: "normal" },
      "+2HR": { flowM3s: 5.4, utilizationPct: 108, status: "overloaded" },
      "+3HR": { flowM3s: 6.3, utilizationPct: 126, status: "critical" }
    }
  },
  {
    id: "D-009",
    name: "Pan Bazar Commercial Cross-Drain",
    fromNode: "N-005",
    toNode: "N-007",
    type: "pipe",
    lengthM: 520,
    diameterMm: 1100,
    slopePct: 0.25,
    designCapacityM3s: 4.6,
    timesteps: {
      NOW: { flowM3s: 2.9, utilizationPct: 63, status: "normal" },
      "+1HR": { flowM3s: 3.9, utilizationPct: 85, status: "warning" },
      "+2HR": { flowM3s: 5.1, utilizationPct: 111, status: "overloaded" },
      "+3HR": { flowM3s: 6.0, utilizationPct: 130, status: "critical" }
    }
  },
  {
    id: "D-010",
    name: "Pan Bazar to Uzan Bazar Link",
    fromNode: "N-006",
    toNode: "N-034",
    type: "open_channel",
    lengthM: 610,
    slopePct: 0.40,
    designCapacityM3s: 5.5,
    timesteps: {
      NOW: { flowM3s: 2.8, utilizationPct: 51, status: "normal" },
      "+1HR": { flowM3s: 3.9, utilizationPct: 71, status: "normal" },
      "+2HR": { flowM3s: 5.0, utilizationPct: 91, status: "warning" },
      "+3HR": { flowM3s: 6.0, utilizationPct: 109, status: "overloaded" }
    }
  },
  {
    id: "D-011",
    name: "Paltan Bazar North Collector",
    fromNode: "N-006",
    toNode: "N-007",
    type: "box_culvert",
    lengthM: 430,
    slopePct: 0.22,
    designCapacityM3s: 5.2,
    timesteps: {
      NOW: { flowM3s: 3.6, utilizationPct: 69, status: "normal" },
      "+1HR": { flowM3s: 4.8, utilizationPct: 92, status: "warning" },
      "+2HR": { flowM3s: 6.1, utilizationPct: 117, status: "overloaded" },
      "+3HR": { flowM3s: 7.2, utilizationPct: 138, status: "critical" }
    }
  },
  {
    id: "D-012",
    name: "Paltan Bazar to Ulubari Trunk",
    fromNode: "N-007",
    toNode: "N-008",
    type: "box_culvert",
    lengthM: 580,
    slopePct: 0.20,
    designCapacityM3s: 6.2,
    timesteps: {
      NOW: { flowM3s: 4.8, utilizationPct: 77, status: "normal" },
      "+1HR": { flowM3s: 6.2, utilizationPct: 100, status: "warning" },
      "+2HR": { flowM3s: 7.8, utilizationPct: 126, status: "critical" },
      "+3HR": { flowM3s: 9.1, utilizationPct: 147, status: "critical" }
    }
  },
  {
    id: "D-013",
    name: "Ulubari to Lachit Nagar Feeder",
    fromNode: "N-008",
    toNode: "N-009",
    type: "pipe",
    lengthM: 410,
    diameterMm: 1200,
    slopePct: 0.18,
    designCapacityM3s: 4.4,
    timesteps: {
      NOW: { flowM3s: 3.2, utilizationPct: 73, status: "normal" },
      "+1HR": { flowM3s: 4.2, utilizationPct: 95, status: "warning" },
      "+2HR": { flowM3s: 5.4, utilizationPct: 123, status: "critical" },
      "+3HR": { flowM3s: 6.3, utilizationPct: 143, status: "critical" }
    }
  },
  {
    id: "D-014",
    name: "Ulubari to Bhangagarh GS Road Drain",
    fromNode: "N-008",
    toNode: "N-014",
    type: "box_culvert",
    lengthM: 650,
    slopePct: 0.15,
    designCapacityM3s: 6.8,
    timesteps: {
      NOW: { flowM3s: 5.3, utilizationPct: 78, status: "normal" },
      "+1HR": { flowM3s: 6.9, utilizationPct: 101, status: "overloaded" },
      "+2HR": { flowM3s: 8.6, utilizationPct: 126, status: "critical" },
      "+3HR": { flowM3s: 10.0, utilizationPct: 147, status: "critical" }
    }
  },
  {
    id: "D-015",
    name: "Lachit Nagar to Bhangagarh Link",
    fromNode: "N-009",
    toNode: "N-014",
    type: "pipe",
    lengthM: 460,
    diameterMm: 1000,
    slopePct: 0.20,
    designCapacityM3s: 3.8,
    timesteps: {
      NOW: { flowM3s: 3.0, utilizationPct: 79, status: "normal" },
      "+1HR": { flowM3s: 4.0, utilizationPct: 105, status: "overloaded" },
      "+2HR": { flowM3s: 5.1, utilizationPct: 134, status: "critical" },
      "+3HR": { flowM3s: 6.0, utilizationPct: 158, status: "critical" }
    }
  },
  {
    id: "D-016",
    name: "Chandmari to Uzan Bazar Link",
    fromNode: "N-010",
    toNode: "N-034",
    type: "pipe",
    lengthM: 690,
    diameterMm: 1300,
    slopePct: 0.85,
    designCapacityM3s: 5.2,
    timesteps: {
      NOW: { flowM3s: 2.6, utilizationPct: 50, status: "normal" },
      "+1HR": { flowM3s: 3.6, utilizationPct: 69, status: "normal" },
      "+2HR": { flowM3s: 4.7, utilizationPct: 90, status: "warning" },
      "+3HR": { flowM3s: 5.7, utilizationPct: 110, status: "overloaded" }
    }
  },
  {
    id: "D-017",
    name: "Chandmari to Silpukhuri Channel",
    fromNode: "N-010",
    toNode: "N-011",
    type: "open_channel",
    lengthM: 510,
    slopePct: 0.60,
    designCapacityM3s: 5.8,
    timesteps: {
      NOW: { flowM3s: 3.3, utilizationPct: 57, status: "normal" },
      "+1HR": { flowM3s: 4.4, utilizationPct: 76, status: "normal" },
      "+2HR": { flowM3s: 5.6, utilizationPct: 97, status: "warning" },
      "+3HR": { flowM3s: 6.7, utilizationPct: 116, status: "overloaded" }
    }
  },
  {
    id: "D-018",
    name: "Silpukhuri to Anil Nagar Depression Channel",
    fromNode: "N-011",
    toNode: "N-012",
    type: "open_channel",
    lengthM: 480,
    slopePct: 0.12,
    designCapacityM3s: 4.8,
    timesteps: {
      NOW: { flowM3s: 4.6, utilizationPct: 96, status: "warning" },
      "+1HR": { flowM3s: 6.2, utilizationPct: 129, status: "critical" },
      "+2HR": { flowM3s: 7.9, utilizationPct: 165, status: "critical" },
      "+3HR": { flowM3s: 9.3, utilizationPct: 194, status: "critical" }
    }
  },
  {
    id: "D-019",
    name: "Anil Nagar to Nabin Nagar Overflow Link",
    fromNode: "N-012",
    toNode: "N-013",
    type: "open_channel",
    lengthM: 390,
    slopePct: 0.08,
    designCapacityM3s: 4.2,
    timesteps: {
      NOW: { flowM3s: 4.8, utilizationPct: 114, status: "overloaded" },
      "+1HR": { flowM3s: 6.5, utilizationPct: 155, status: "critical" },
      "+2HR": { flowM3s: 8.2, utilizationPct: 195, status: "critical" },
      "+3HR": { flowM3s: 9.6, utilizationPct: 229, status: "critical" }
    }
  },
  {
    id: "D-020",
    name: "Nabin Nagar Pump Discharge Conduit",
    fromNode: "N-013",
    toNode: "N-016",
    type: "pipe",
    lengthM: 610,
    diameterMm: 1400,
    slopePct: 0.25,
    designCapacityM3s: 5.6,
    timesteps: {
      NOW: { flowM3s: 4.6, utilizationPct: 82, status: "normal" },
      "+1HR": { flowM3s: 6.1, utilizationPct: 109, status: "overloaded" },
      "+2HR": { flowM3s: 7.6, utilizationPct: 136, status: "critical" },
      "+3HR": { flowM3s: 8.8, utilizationPct: 157, status: "critical" }
    }
  },
  {
    id: "D-021",
    name: "GMCH Hill Descent Pipe",
    fromNode: "N-015",
    toNode: "N-014",
    type: "pipe",
    lengthM: 470,
    diameterMm: 1100,
    slopePct: 1.45,
    designCapacityM3s: 4.6,
    timesteps: {
      NOW: { flowM3s: 2.2, utilizationPct: 48, status: "normal" },
      "+1HR": { flowM3s: 3.1, utilizationPct: 67, status: "normal" },
      "+2HR": { flowM3s: 4.1, utilizationPct: 89, status: "warning" },
      "+3HR": { flowM3s: 5.0, utilizationPct: 109, status: "overloaded" }
    }
  },
  {
    id: "D-022",
    name: "GMCH Ridge to Christian Basti",
    fromNode: "N-015",
    toNode: "N-018",
    type: "pipe",
    lengthM: 520,
    diameterMm: 1000,
    slopePct: 1.20,
    designCapacityM3s: 4.2,
    timesteps: {
      NOW: { flowM3s: 2.1, utilizationPct: 50, status: "normal" },
      "+1HR": { flowM3s: 3.0, utilizationPct: 71, status: "normal" },
      "+2HR": { flowM3s: 4.0, utilizationPct: 95, status: "warning" },
      "+3HR": { flowM3s: 4.9, utilizationPct: 117, status: "overloaded" }
    }
  },
  {
    id: "D-023",
    name: "Zoo Road Tiniali North Trunk",
    fromNode: "N-016",
    toNode: "N-033",
    type: "box_culvert",
    lengthM: 730,
    slopePct: 0.30,
    designCapacityM3s: 5.4,
    timesteps: {
      NOW: { flowM3s: 3.8, utilizationPct: 70, status: "normal" },
      "+1HR": { flowM3s: 5.0, utilizationPct: 93, status: "warning" },
      "+2HR": { flowM3s: 6.3, utilizationPct: 117, status: "overloaded" },
      "+3HR": { flowM3s: 7.4, utilizationPct: 137, status: "critical" }
    }
  },
  {
    id: "D-024",
    name: "Zoo Road to Ganeshguri Lateral",
    fromNode: "N-016",
    toNode: "N-019",
    type: "box_culvert",
    lengthM: 680,
    slopePct: 0.22,
    designCapacityM3s: 5.8,
    timesteps: {
      NOW: { flowM3s: 4.2, utilizationPct: 72, status: "normal" },
      "+1HR": { flowM3s: 5.6, utilizationPct: 97, status: "warning" },
      "+2HR": { flowM3s: 7.1, utilizationPct: 122, status: "critical" },
      "+3HR": { flowM3s: 8.3, utilizationPct: 143, status: "critical" }
    }
  },
  {
    id: "D-025",
    name: "Zoo Road to Geetanagar Branch",
    fromNode: "N-016",
    toNode: "N-017",
    type: "pipe",
    lengthM: 450,
    diameterMm: 1100,
    slopePct: 0.35,
    designCapacityM3s: 4.0,
    timesteps: {
      NOW: { flowM3s: 2.3, utilizationPct: 58, status: "normal" },
      "+1HR": { flowM3s: 3.2, utilizationPct: 80, status: "normal" },
      "+2HR": { flowM3s: 4.2, utilizationPct: 105, status: "overloaded" },
      "+3HR": { flowM3s: 5.0, utilizationPct: 125, status: "critical" }
    }
  },
  {
    id: "D-026",
    name: "Geetanagar Eastern Outflow Drain",
    fromNode: "N-017",
    toNode: "N-033",
    type: "open_channel",
    lengthM: 560,
    slopePct: 0.28,
    designCapacityM3s: 4.4,
    timesteps: {
      NOW: { flowM3s: 2.2, utilizationPct: 50, status: "normal" },
      "+1HR": { flowM3s: 3.0, utilizationPct: 68, status: "normal" },
      "+2HR": { flowM3s: 4.0, utilizationPct: 91, status: "warning" },
      "+3HR": { flowM3s: 4.8, utilizationPct: 109, status: "overloaded" }
    }
  },
  {
    id: "D-027",
    name: "GS Road Central Trunk Conduit D-027",
    fromNode: "N-014",
    toNode: "N-018",
    type: "box_culvert",
    lengthM: 420,
    slopePct: 0.16,
    designCapacityM3s: 5.8,
    timesteps: {
      NOW: { flowM3s: 4.8, utilizationPct: 83, status: "normal" },
      "+1HR": { flowM3s: 6.1, utilizationPct: 105, status: "overloaded" },
      "+2HR": { flowM3s: 7.2, utilizationPct: 124, status: "critical" },
      "+3HR": { flowM3s: 8.6, utilizationPct: 148, status: "critical" }
    }
  },
  {
    id: "D-028",
    name: "Christian Basti to Ganeshguri Conduit",
    fromNode: "N-018",
    toNode: "N-019",
    type: "box_culvert",
    lengthM: 520,
    slopePct: 0.18,
    designCapacityM3s: 6.2,
    timesteps: {
      NOW: { flowM3s: 5.0, utilizationPct: 81, status: "normal" },
      "+1HR": { flowM3s: 6.5, utilizationPct: 105, status: "overloaded" },
      "+2HR": { flowM3s: 8.1, utilizationPct: 131, status: "critical" },
      "+3HR": { flowM3s: 9.5, utilizationPct: 153, status: "critical" }
    }
  },
  {
    id: "D-029",
    name: "Ganeshguri to Down Town Hospital Conduit",
    fromNode: "N-019",
    toNode: "N-021",
    type: "pipe",
    lengthM: 540,
    diameterMm: 1300,
    slopePct: 0.22,
    designCapacityM3s: 5.5,
    timesteps: {
      NOW: { flowM3s: 4.1, utilizationPct: 75, status: "normal" },
      "+1HR": { flowM3s: 5.3, utilizationPct: 96, status: "warning" },
      "+2HR": { flowM3s: 6.8, utilizationPct: 124, status: "critical" },
      "+3HR": { flowM3s: 7.9, utilizationPct: 144, status: "critical" }
    }
  },
  {
    id: "D-030",
    name: "Ganeshguri to Dispur Secretariat Canal",
    fromNode: "N-019",
    toNode: "N-020",
    type: "open_channel",
    lengthM: 480,
    slopePct: 0.24,
    designCapacityM3s: 6.5,
    timesteps: {
      NOW: { flowM3s: 4.4, utilizationPct: 68, status: "normal" },
      "+1HR": { flowM3s: 5.8, utilizationPct: 89, status: "warning" },
      "+2HR": { flowM3s: 7.3, utilizationPct: 112, status: "overloaded" },
      "+3HR": { flowM3s: 8.6, utilizationPct: 132, status: "critical" }
    }
  },
  {
    id: "D-031",
    name: "Dispur Canal to Bhetapara Drainage Link",
    fromNode: "N-020",
    toNode: "N-027",
    type: "open_channel",
    lengthM: 610,
    slopePct: 0.19,
    designCapacityM3s: 6.0,
    timesteps: {
      NOW: { flowM3s: 4.0, utilizationPct: 67, status: "normal" },
      "+1HR": { flowM3s: 5.3, utilizationPct: 88, status: "warning" },
      "+2HR": { flowM3s: 6.8, utilizationPct: 113, status: "overloaded" },
      "+3HR": { flowM3s: 8.0, utilizationPct: 133, status: "critical" }
    }
  },
  {
    id: "D-032",
    name: "Dispur to Down Town Connection",
    fromNode: "N-020",
    toNode: "N-021",
    type: "pipe",
    lengthM: 430,
    diameterMm: 1100,
    slopePct: 0.20,
    designCapacityM3s: 4.5,
    timesteps: {
      NOW: { flowM3s: 2.8, utilizationPct: 62, status: "normal" },
      "+1HR": { flowM3s: 3.8, utilizationPct: 84, status: "normal" },
      "+2HR": { flowM3s: 4.9, utilizationPct: 109, status: "overloaded" },
      "+3HR": { flowM3s: 5.8, utilizationPct: 129, status: "critical" }
    }
  },
  {
    id: "D-033",
    name: "Down Town to Rukminigaon Bottleneck Culvert",
    fromNode: "N-021",
    toNode: "N-022",
    type: "pipe",
    lengthM: 410,
    diameterMm: 1100,
    slopePct: 0.12,
    designCapacityM3s: 4.0,
    timesteps: {
      NOW: { flowM3s: 4.2, utilizationPct: 105, status: "overloaded" },
      "+1HR": { flowM3s: 5.8, utilizationPct: 145, status: "critical" },
      "+2HR": { flowM3s: 7.3, utilizationPct: 183, status: "critical" },
      "+3HR": { flowM3s: 8.6, utilizationPct: 215, status: "critical" }
    }
  },
  {
    id: "D-034",
    name: "Rukminigaon Lowland to Six Mile Trunk",
    fromNode: "N-022",
    toNode: "N-023",
    type: "box_culvert",
    lengthM: 590,
    slopePct: 0.18,
    designCapacityM3s: 5.5,
    timesteps: {
      NOW: { flowM3s: 4.4, utilizationPct: 80, status: "normal" },
      "+1HR": { flowM3s: 5.9, utilizationPct: 107, status: "overloaded" },
      "+2HR": { flowM3s: 7.5, utilizationPct: 136, status: "critical" },
      "+3HR": { flowM3s: 8.8, utilizationPct: 160, status: "critical" }
    }
  },
  {
    id: "D-035",
    name: "VIP Road Six Mile Northern Collector",
    fromNode: "N-033",
    toNode: "N-023",
    type: "box_culvert",
    lengthM: 640,
    slopePct: 0.32,
    designCapacityM3s: 5.8,
    timesteps: {
      NOW: { flowM3s: 3.1, utilizationPct: 53, status: "normal" },
      "+1HR": { flowM3s: 4.2, utilizationPct: 72, status: "normal" },
      "+2HR": { flowM3s: 5.3, utilizationPct: 91, status: "warning" },
      "+3HR": { flowM3s: 6.4, utilizationPct: 110, status: "overloaded" }
    }
  },
  {
    id: "D-036",
    name: "Six Mile to Beltola Link Conduit",
    fromNode: "N-023",
    toNode: "N-025",
    type: "pipe",
    lengthM: 510,
    diameterMm: 1300,
    slopePct: 0.26,
    designCapacityM3s: 5.2,
    timesteps: {
      NOW: { flowM3s: 3.4, utilizationPct: 65, status: "normal" },
      "+1HR": { flowM3s: 4.6, utilizationPct: 88, status: "warning" },
      "+2HR": { flowM3s: 5.8, utilizationPct: 112, status: "overloaded" },
      "+3HR": { flowM3s: 6.9, utilizationPct: 133, status: "critical" }
    }
  },
  {
    id: "D-037",
    name: "Six Mile to Khanapara Foothill Edge",
    fromNode: "N-023",
    toNode: "N-024",
    type: "open_channel",
    lengthM: 780,
    slopePct: 0.45,
    designCapacityM3s: 6.0,
    timesteps: {
      NOW: { flowM3s: 3.2, utilizationPct: 53, status: "normal" },
      "+1HR": { flowM3s: 4.3, utilizationPct: 72, status: "normal" },
      "+2HR": { flowM3s: 5.5, utilizationPct: 92, status: "warning" },
      "+3HR": { flowM3s: 6.6, utilizationPct: 110, status: "overloaded" }
    }
  },
  {
    id: "D-038",
    name: "Khanapara Border Sump Channel",
    fromNode: "N-024",
    toNode: "N-026",
    type: "open_channel",
    lengthM: 850,
    slopePct: 0.65,
    designCapacityM3s: 5.5,
    timesteps: {
      NOW: { flowM3s: 2.7, utilizationPct: 49, status: "normal" },
      "+1HR": { flowM3s: 3.7, utilizationPct: 67, status: "normal" },
      "+2HR": { flowM3s: 4.8, utilizationPct: 87, status: "warning" },
      "+3HR": { flowM3s: 5.8, utilizationPct: 105, status: "overloaded" }
    }
  },
  {
    id: "D-039",
    name: "Beltola to Hatigaon Connector Drain",
    fromNode: "N-025",
    toNode: "N-027",
    type: "pipe",
    lengthM: 590,
    diameterMm: 1200,
    slopePct: 0.18,
    designCapacityM3s: 4.6,
    timesteps: {
      NOW: { flowM3s: 3.8, utilizationPct: 83, status: "normal" },
      "+1HR": { flowM3s: 5.1, utilizationPct: 111, status: "overloaded" },
      "+2HR": { flowM3s: 6.5, utilizationPct: 141, status: "critical" },
      "+3HR": { flowM3s: 7.7, utilizationPct: 167, status: "critical" }
    }
  },
  {
    id: "D-040",
    name: "Beltola to Basistha Mandir Outfall",
    fromNode: "N-025",
    toNode: "N-026",
    type: "open_channel",
    lengthM: 740,
    slopePct: 0.52,
    designCapacityM3s: 6.2,
    timesteps: {
      NOW: { flowM3s: 3.2, utilizationPct: 52, status: "normal" },
      "+1HR": { flowM3s: 4.4, utilizationPct: 71, status: "normal" },
      "+2HR": { flowM3s: 5.6, utilizationPct: 90, status: "warning" },
      "+3HR": { flowM3s: 6.7, utilizationPct: 108, status: "overloaded" }
    }
  },
  {
    id: "D-041",
    name: "Basistha Foothill Natural Outfall Channel",
    fromNode: "N-026",
    toNode: "N-028",
    type: "open_channel",
    lengthM: 920,
    slopePct: 0.38,
    designCapacityM3s: 6.8,
    timesteps: {
      NOW: { flowM3s: 3.0, utilizationPct: 44, status: "normal" },
      "+1HR": { flowM3s: 4.1, utilizationPct: 60, status: "normal" },
      "+2HR": { flowM3s: 5.3, utilizationPct: 78, status: "normal" },
      "+3HR": { flowM3s: 6.4, utilizationPct: 94, status: "warning" }
    }
  },
  {
    id: "D-042",
    name: "Hatigaon to Bhetapara Sluice",
    fromNode: "N-027",
    toNode: "N-036",
    type: "open_channel",
    lengthM: 480,
    slopePct: 0.20,
    designCapacityM3s: 5.0,
    timesteps: {
      NOW: { flowM3s: 4.4, utilizationPct: 88, status: "warning" },
      "+1HR": { flowM3s: 6.0, utilizationPct: 120, status: "critical" },
      "+2HR": { flowM3s: 7.7, utilizationPct: 154, status: "critical" },
      "+3HR": { flowM3s: 9.0, utilizationPct: 180, status: "critical" }
    }
  },
  {
    id: "D-043",
    name: "Bhetapara to Lalmati Southern Highway Link",
    fromNode: "N-027",
    toNode: "N-028",
    type: "box_culvert",
    lengthM: 670,
    slopePct: 0.22,
    designCapacityM3s: 5.2,
    timesteps: {
      NOW: { flowM3s: 3.3, utilizationPct: 63, status: "normal" },
      "+1HR": { flowM3s: 4.5, utilizationPct: 87, status: "warning" },
      "+2HR": { flowM3s: 5.8, utilizationPct: 112, status: "overloaded" },
      "+3HR": { flowM3s: 6.9, utilizationPct: 133, status: "critical" }
    }
  },
  {
    id: "D-044",
    name: "Lalmati to Betkuchi Trunk",
    fromNode: "N-028",
    toNode: "N-029",
    type: "box_culvert",
    lengthM: 710,
    slopePct: 0.18,
    designCapacityM3s: 5.5,
    timesteps: {
      NOW: { flowM3s: 3.4, utilizationPct: 62, status: "normal" },
      "+1HR": { flowM3s: 4.6, utilizationPct: 84, status: "normal" },
      "+2HR": { flowM3s: 5.9, utilizationPct: 107, status: "overloaded" },
      "+3HR": { flowM3s: 7.0, utilizationPct: 127, status: "critical" }
    }
  },
  {
    id: "D-045",
    name: "Betkuchi ISBT to Deepor Beel Outfall Channel",
    fromNode: "N-029",
    toNode: "N-030",
    type: "open_channel",
    lengthM: 940,
    slopePct: 0.15,
    designCapacityM3s: 8.0,
    timesteps: {
      NOW: { flowM3s: 4.2, utilizationPct: 53, status: "normal" },
      "+1HR": { flowM3s: 5.8, utilizationPct: 73, status: "normal" },
      "+2HR": { flowM3s: 7.5, utilizationPct: 94, status: "warning" },
      "+3HR": { flowM3s: 9.1, utilizationPct: 114, status: "overloaded" }
    }
  },
  {
    id: "D-046",
    name: "Deepor Beel North to Boragaon Edge",
    fromNode: "N-030",
    toNode: "N-031",
    type: "open_channel",
    lengthM: 810,
    slopePct: 0.12,
    designCapacityM3s: 6.5,
    timesteps: {
      NOW: { flowM3s: 3.8, utilizationPct: 58, status: "normal" },
      "+1HR": { flowM3s: 5.1, utilizationPct: 78, status: "normal" },
      "+2HR": { flowM3s: 6.6, utilizationPct: 102, status: "overloaded" },
      "+3HR": { flowM3s: 7.9, utilizationPct: 122, status: "critical" }
    }
  },
  {
    id: "D-047",
    name: "Bhetapara Outfall to Deepor Wetland Buffer",
    fromNode: "N-036",
    toNode: "N-030",
    type: "open_channel",
    lengthM: 1150,
    slopePct: 0.10,
    designCapacityM3s: 9.0,
    timesteps: {
      NOW: { flowM3s: 5.2, utilizationPct: 58, status: "normal" },
      "+1HR": { flowM3s: 7.1, utilizationPct: 79, status: "normal" },
      "+2HR": { flowM3s: 9.2, utilizationPct: 102, status: "overloaded" },
      "+3HR": { flowM3s: 11.0, utilizationPct: 122, status: "critical" }
    }
  },
  {
    id: "D-048",
    name: "Fatasil to Boragaon Southern Outlet",
    fromNode: "N-032",
    toNode: "N-031",
    type: "box_culvert",
    lengthM: 880,
    slopePct: 0.16,
    designCapacityM3s: 5.2,
    timesteps: {
      NOW: { flowM3s: 3.5, utilizationPct: 67, status: "normal" },
      "+1HR": { flowM3s: 4.8, utilizationPct: 92, status: "warning" },
      "+2HR": { flowM3s: 6.1, utilizationPct: 117, status: "overloaded" },
      "+3HR": { flowM3s: 7.2, utilizationPct: 138, status: "critical" }
    }
  }
];
