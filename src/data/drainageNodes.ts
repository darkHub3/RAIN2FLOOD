import { DrainageNode } from '../types';

export const DRAINAGE_DATA_DISCLAIMER =
  "Detailed, machine-readable, street-level underground drainage attributes are not readily available to us for the prototype. Phase-1 therefore uses a reconstructed drainage graph from available geospatial, published, satellite and field-observation data. Production deployment would integrate the authoritative municipal drainage GIS.";

export const DRAINAGE_NODES: DrainageNode[] = [
  {
    id: "N-001",
    name: "Jalukbari Rotary Inlet",
    type: "inlet",
    lat: 26.1510,
    lng: 91.6885,
    elevationM: 54.2,
    connectedEdges: ["D-001", "D-002"],
    description: "Western arterial collector inlet receiving overland flow from university foothills.",
    timesteps: {
      NOW: { incomingFlowM3s: 2.1, capacityM3s: 4.5, utilizationPct: 47, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 3.2, capacityM3s: 4.5, utilizationPct: 71, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+2HR": { incomingFlowM3s: 4.2, capacityM3s: 4.5, utilizationPct: 93, status: "warning", surchargeDepthM: 0.05, nearbyFloodRisk: "moderate" },
      "+3HR": { incomingFlowM3s: 5.1, capacityM3s: 4.5, utilizationPct: 113, status: "surcharged", surchargeDepthM: 0.18, nearbyFloodRisk: "high" }
    }
  },
  {
    id: "N-002",
    name: "Maligaon Junction M-1",
    type: "junction",
    lat: 26.1552,
    lng: 91.7042,
    elevationM: 52.8,
    connectedEdges: ["D-001", "D-003", "D-004"],
    description: "Railway colony junction collecting storm runoff from Kamakhya hill western slopes.",
    timesteps: {
      NOW: { incomingFlowM3s: 3.8, capacityM3s: 5.2, utilizationPct: 73, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 4.8, capacityM3s: 5.2, utilizationPct: 92, status: "warning", surchargeDepthM: 0.04, nearbyFloodRisk: "moderate" },
      "+2HR": { incomingFlowM3s: 5.9, capacityM3s: 5.2, utilizationPct: 113, status: "surcharged", surchargeDepthM: 0.22, nearbyFloodRisk: "high" },
      "+3HR": { incomingFlowM3s: 6.8, capacityM3s: 5.2, utilizationPct: 131, status: "critical", surchargeDepthM: 0.45, nearbyFloodRisk: "critical" }
    }
  },
  {
    id: "N-003",
    name: "Bharalumukh Outfall Sluice",
    type: "outfall",
    lat: 26.1758,
    lng: 91.7285,
    elevationM: 49.1,
    connectedEdges: ["D-004", "D-005", "D-006"],
    description: "Simulated outfall connected to representative natural drainage channels/water bodies (Bharalu river confluence).",
    timesteps: {
      NOW: { incomingFlowM3s: 7.2, capacityM3s: 10.5, utilizationPct: 69, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 9.4, capacityM3s: 10.5, utilizationPct: 90, status: "warning", surchargeDepthM: 0.08, nearbyFloodRisk: "moderate" },
      "+2HR": { incomingFlowM3s: 11.6, capacityM3s: 10.5, utilizationPct: 110, status: "surcharged", surchargeDepthM: 0.35, nearbyFloodRisk: "high" },
      "+3HR": { incomingFlowM3s: 13.5, capacityM3s: 10.5, utilizationPct: 129, status: "critical", surchargeDepthM: 0.65, nearbyFloodRisk: "critical" }
    }
  },
  {
    id: "N-004",
    name: "Santipur Manhole SM-4",
    type: "manhole",
    lat: 26.1702,
    lng: 91.7225,
    elevationM: 50.4,
    connectedEdges: ["D-005", "D-007"],
    description: "Intermediate maintenance manhole on the lower Bharalu riverside collector conduit.",
    timesteps: {
      NOW: { incomingFlowM3s: 2.8, capacityM3s: 4.0, utilizationPct: 70, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 3.6, capacityM3s: 4.0, utilizationPct: 90, status: "warning", surchargeDepthM: 0.05, nearbyFloodRisk: "moderate" },
      "+2HR": { incomingFlowM3s: 4.5, capacityM3s: 4.0, utilizationPct: 112, status: "surcharged", surchargeDepthM: 0.28, nearbyFloodRisk: "high" },
      "+3HR": { incomingFlowM3s: 5.3, capacityM3s: 4.0, utilizationPct: 132, status: "critical", surchargeDepthM: 0.52, nearbyFloodRisk: "critical" }
    }
  },
  {
    id: "N-005",
    name: "Fancy Bazar Commercial Inlet",
    type: "inlet",
    lat: 26.1835,
    lng: 91.7410,
    elevationM: 51.5,
    connectedEdges: ["D-008", "D-009"],
    description: "High-density market surface grate inlet near Brahmaputra riverfront.",
    timesteps: {
      NOW: { incomingFlowM3s: 3.1, capacityM3s: 4.8, utilizationPct: 65, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 4.0, capacityM3s: 4.8, utilizationPct: 83, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+2HR": { incomingFlowM3s: 5.1, capacityM3s: 4.8, utilizationPct: 106, status: "surcharged", surchargeDepthM: 0.15, nearbyFloodRisk: "moderate" },
      "+3HR": { incomingFlowM3s: 6.0, capacityM3s: 4.8, utilizationPct: 125, status: "critical", surchargeDepthM: 0.38, nearbyFloodRisk: "high" }
    }
  },
  {
    id: "N-006",
    name: "Pan Bazar Collector Junction",
    type: "junction",
    lat: 26.1850,
    lng: 91.7495,
    elevationM: 53.0,
    connectedEdges: ["D-009", "D-010", "D-011"],
    description: "Interconnecting chamber receiving flows from Cotton University precinct and court road.",
    timesteps: {
      NOW: { incomingFlowM3s: 4.2, capacityM3s: 6.0, utilizationPct: 70, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 5.3, capacityM3s: 6.0, utilizationPct: 88, status: "warning", surchargeDepthM: 0.02, nearbyFloodRisk: "low" },
      "+2HR": { incomingFlowM3s: 6.6, capacityM3s: 6.0, utilizationPct: 110, status: "surcharged", surchargeDepthM: 0.20, nearbyFloodRisk: "moderate" },
      "+3HR": { incomingFlowM3s: 7.7, capacityM3s: 6.0, utilizationPct: 128, status: "critical", surchargeDepthM: 0.45, nearbyFloodRisk: "high" }
    }
  },
  {
    id: "N-007",
    name: "Paltan Bazar Station Inlet",
    type: "inlet",
    lat: 26.1772,
    lng: 91.7510,
    elevationM: 51.0,
    connectedEdges: ["D-011", "D-012"],
    description: "Critical railway transit zone surface inlet prone to high pedestrian and vehicular density.",
    timesteps: {
      NOW: { incomingFlowM3s: 4.5, capacityM3s: 5.5, utilizationPct: 82, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "moderate" },
      "+1HR": { incomingFlowM3s: 5.7, capacityM3s: 5.5, utilizationPct: 104, status: "surcharged", surchargeDepthM: 0.16, nearbyFloodRisk: "high" },
      "+2HR": { incomingFlowM3s: 6.9, capacityM3s: 5.5, utilizationPct: 125, status: "critical", surchargeDepthM: 0.48, nearbyFloodRisk: "critical" },
      "+3HR": { incomingFlowM3s: 8.0, capacityM3s: 5.5, utilizationPct: 145, status: "critical", surchargeDepthM: 0.72, nearbyFloodRisk: "critical" }
    }
  },
  {
    id: "N-008",
    name: "Ulubari Junction U-1",
    type: "junction",
    lat: 26.1685,
    lng: 91.7580,
    elevationM: 50.2,
    connectedEdges: ["D-012", "D-013", "D-014"],
    description: "Major intersection chamber linking GS Road trunk drain with central Bharalu tributary.",
    timesteps: {
      NOW: { incomingFlowM3s: 6.1, capacityM3s: 7.5, utilizationPct: 81, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "moderate" },
      "+1HR": { incomingFlowM3s: 7.5, capacityM3s: 7.5, utilizationPct: 100, status: "warning", surchargeDepthM: 0.12, nearbyFloodRisk: "high" },
      "+2HR": { incomingFlowM3s: 9.2, capacityM3s: 7.5, utilizationPct: 123, status: "surcharged", surchargeDepthM: 0.44, nearbyFloodRisk: "critical" },
      "+3HR": { incomingFlowM3s: 10.6, capacityM3s: 7.5, utilizationPct: 141, status: "critical", surchargeDepthM: 0.78, nearbyFloodRisk: "critical" }
    }
  },
  {
    id: "N-009",
    name: "Lachit Nagar Manhole LN-2",
    type: "manhole",
    lat: 26.1715,
    lng: 91.7640,
    elevationM: 49.8,
    connectedEdges: ["D-013", "D-015"],
    description: "Low-lying residential collector manhole downstream of Nabagraha hill slope runoff.",
    timesteps: {
      NOW: { incomingFlowM3s: 3.4, capacityM3s: 4.2, utilizationPct: 81, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "moderate" },
      "+1HR": { incomingFlowM3s: 4.4, capacityM3s: 4.2, utilizationPct: 105, status: "surcharged", surchargeDepthM: 0.18, nearbyFloodRisk: "high" },
      "+2HR": { incomingFlowM3s: 5.5, capacityM3s: 4.2, utilizationPct: 131, status: "critical", surchargeDepthM: 0.50, nearbyFloodRisk: "critical" },
      "+3HR": { incomingFlowM3s: 6.3, capacityM3s: 4.2, utilizationPct: 150, status: "critical", surchargeDepthM: 0.82, nearbyFloodRisk: "critical" }
    }
  },
  {
    id: "N-010",
    name: "Chandmari Junction C-1",
    type: "junction",
    lat: 26.1880,
    lng: 91.7745,
    elevationM: 55.4,
    connectedEdges: ["D-016", "D-017"],
    description: "Elevated junction receiving stormwater from eastern hills towards Silpukhuri basin.",
    timesteps: {
      NOW: { incomingFlowM3s: 3.5, capacityM3s: 5.8, utilizationPct: 60, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 4.6, capacityM3s: 5.8, utilizationPct: 79, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+2HR": { incomingFlowM3s: 5.8, capacityM3s: 5.8, utilizationPct: 100, status: "warning", surchargeDepthM: 0.05, nearbyFloodRisk: "moderate" },
      "+3HR": { incomingFlowM3s: 6.9, capacityM3s: 5.8, utilizationPct: 119, status: "surcharged", surchargeDepthM: 0.25, nearbyFloodRisk: "high" }
    }
  },
  {
    id: "N-011",
    name: "Silpukhuri Retention Inlet",
    type: "inlet",
    lat: 26.1820,
    lng: 91.7680,
    elevationM: 52.0,
    connectedEdges: ["D-017", "D-018"],
    description: "Historical pond buffer inlet providing intermediate stormwater buffering.",
    timesteps: {
      NOW: { incomingFlowM3s: 3.9, capacityM3s: 6.2, utilizationPct: 63, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 5.0, capacityM3s: 6.2, utilizationPct: 81, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+2HR": { incomingFlowM3s: 6.4, capacityM3s: 6.2, utilizationPct: 103, status: "surcharged", surchargeDepthM: 0.12, nearbyFloodRisk: "moderate" },
      "+3HR": { incomingFlowM3s: 7.5, capacityM3s: 6.2, utilizationPct: 121, status: "critical", surchargeDepthM: 0.36, nearbyFloodRisk: "high" }
    }
  },
  {
    id: "N-012",
    name: "Anil Nagar Lowland Sump",
    type: "inlet",
    lat: 26.1770,
    lng: 91.7710,
    elevationM: 48.4,
    connectedEdges: ["D-018", "D-019"],
    description: "Severe depression bowl inlet prone to chronic inundation during high Bharalu river stages.",
    timesteps: {
      NOW: { incomingFlowM3s: 5.8, capacityM3s: 5.0, utilizationPct: 116, status: "surcharged", surchargeDepthM: 0.25, nearbyFloodRisk: "high" },
      "+1HR": { incomingFlowM3s: 7.4, capacityM3s: 5.0, utilizationPct: 148, status: "critical", surchargeDepthM: 0.55, nearbyFloodRisk: "critical" },
      "+2HR": { incomingFlowM3s: 9.1, capacityM3s: 5.0, utilizationPct: 182, status: "critical", surchargeDepthM: 0.88, nearbyFloodRisk: "critical" },
      "+3HR": { incomingFlowM3s: 10.4, capacityM3s: 5.0, utilizationPct: 208, status: "critical", surchargeDepthM: 1.15, nearbyFloodRisk: "critical" }
    }
  },
  {
    id: "N-013",
    name: "Nabin Nagar Flood Relief Pump",
    type: "pump_station",
    lat: 26.1740,
    lng: 91.7745,
    elevationM: 48.6,
    connectedEdges: ["D-019", "D-020"],
    description: "Simulated emergency pump station attempting conveyance into primary Bharalu channel.",
    timesteps: {
      NOW: { incomingFlowM3s: 5.5, capacityM3s: 6.0, utilizationPct: 92, status: "warning", surchargeDepthM: 0.10, nearbyFloodRisk: "high" },
      "+1HR": { incomingFlowM3s: 7.1, capacityM3s: 6.0, utilizationPct: 118, status: "surcharged", surchargeDepthM: 0.42, nearbyFloodRisk: "critical" },
      "+2HR": { incomingFlowM3s: 8.8, capacityM3s: 6.0, utilizationPct: 147, status: "critical", surchargeDepthM: 0.76, nearbyFloodRisk: "critical" },
      "+3HR": { incomingFlowM3s: 10.1, capacityM3s: 6.0, utilizationPct: 168, status: "critical", surchargeDepthM: 1.05, nearbyFloodRisk: "critical" }
    }
  },
  {
    id: "N-014",
    name: "Bhangagarh Central Junction N-014",
    type: "junction",
    lat: 26.1585,
    lng: 91.7685,
    elevationM: 49.5,
    connectedEdges: ["D-014", "D-015", "D-027"],
    description: "High-stress multi-barrel confluence on GS Road directly upstream of medical corridor.",
    timesteps: {
      NOW: { incomingFlowM3s: 5.2, capacityM3s: 6.1, utilizationPct: 85, status: "warning", surchargeDepthM: 0.08, nearbyFloodRisk: "moderate" },
      "+1HR": { incomingFlowM3s: 6.8, capacityM3s: 6.1, utilizationPct: 111, status: "surcharged", surchargeDepthM: 0.32, nearbyFloodRisk: "high" },
      "+2HR": { incomingFlowM3s: 8.4, capacityM3s: 6.1, utilizationPct: 138, status: "critical", surchargeDepthM: 0.64, nearbyFloodRisk: "critical" },
      "+3HR": { incomingFlowM3s: 9.8, capacityM3s: 6.1, utilizationPct: 161, status: "critical", surchargeDepthM: 0.92, nearbyFloodRisk: "critical" }
    }
  },
  {
    id: "N-015",
    name: "Guwahati Medical College Inlet",
    type: "inlet",
    lat: 26.1535,
    lng: 91.7760,
    elevationM: 58.2,
    connectedEdges: ["D-021", "D-022"],
    description: "Hillside drainage inlet receiving rapid runoff from GMCH hill ridge.",
    timesteps: {
      NOW: { incomingFlowM3s: 2.6, capacityM3s: 4.8, utilizationPct: 54, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 3.5, capacityM3s: 4.8, utilizationPct: 73, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+2HR": { incomingFlowM3s: 4.6, capacityM3s: 4.8, utilizationPct: 96, status: "warning", surchargeDepthM: 0.05, nearbyFloodRisk: "moderate" },
      "+3HR": { incomingFlowM3s: 5.6, capacityM3s: 4.8, utilizationPct: 117, status: "surcharged", surchargeDepthM: 0.22, nearbyFloodRisk: "high" }
    }
  },
  {
    id: "N-016",
    name: "Zoo Road Tiniali Junction",
    type: "junction",
    lat: 26.1645,
    lng: 91.7820,
    elevationM: 50.8,
    connectedEdges: ["D-023", "D-024", "D-025"],
    description: "Major 3-way urban commercial junction receiving heavy runoff from RG Baruah Road.",
    timesteps: {
      NOW: { incomingFlowM3s: 4.8, capacityM3s: 5.6, utilizationPct: 86, status: "warning", surchargeDepthM: 0.05, nearbyFloodRisk: "moderate" },
      "+1HR": { incomingFlowM3s: 6.2, capacityM3s: 5.6, utilizationPct: 111, status: "surcharged", surchargeDepthM: 0.30, nearbyFloodRisk: "high" },
      "+2HR": { incomingFlowM3s: 7.7, capacityM3s: 5.6, utilizationPct: 138, status: "critical", surchargeDepthM: 0.62, nearbyFloodRisk: "critical" },
      "+3HR": { incomingFlowM3s: 8.9, capacityM3s: 5.6, utilizationPct: 159, status: "critical", surchargeDepthM: 0.88, nearbyFloodRisk: "critical" }
    }
  },
  {
    id: "N-017",
    name: "Geetanagar Manhole GN-1",
    type: "manhole",
    lat: 26.1720,
    lng: 91.7910,
    elevationM: 53.5,
    connectedEdges: ["D-025", "D-026"],
    description: "Sub-catchment manhole collecting flows from residential lanes east of the State Zoo.",
    timesteps: {
      NOW: { incomingFlowM3s: 2.5, capacityM3s: 4.0, utilizationPct: 63, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 3.3, capacityM3s: 4.0, utilizationPct: 83, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+2HR": { incomingFlowM3s: 4.3, capacityM3s: 4.0, utilizationPct: 108, status: "surcharged", surchargeDepthM: 0.16, nearbyFloodRisk: "moderate" },
      "+3HR": { incomingFlowM3s: 5.1, capacityM3s: 4.0, utilizationPct: 128, status: "critical", surchargeDepthM: 0.42, nearbyFloodRisk: "high" }
    }
  },
  {
    id: "N-018",
    name: "Christian Basti Conduit C-2",
    type: "manhole",
    lat: 26.1540,
    lng: 91.7790,
    elevationM: 51.2,
    connectedEdges: ["D-027", "D-028"],
    description: "Intermediate conduit along GS Road commercial stretch between Bhangagarh and Walford.",
    timesteps: {
      NOW: { incomingFlowM3s: 4.9, capacityM3s: 6.0, utilizationPct: 82, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "moderate" },
      "+1HR": { incomingFlowM3s: 6.3, capacityM3s: 6.0, utilizationPct: 105, status: "surcharged", surchargeDepthM: 0.22, nearbyFloodRisk: "high" },
      "+2HR": { incomingFlowM3s: 7.9, capacityM3s: 6.0, utilizationPct: 132, status: "critical", surchargeDepthM: 0.58, nearbyFloodRisk: "critical" },
      "+3HR": { incomingFlowM3s: 9.2, capacityM3s: 6.0, utilizationPct: 153, status: "critical", surchargeDepthM: 0.85, nearbyFloodRisk: "critical" }
    }
  },
  {
    id: "N-019",
    name: "Ganeshguri Flyover Junction",
    type: "junction",
    lat: 26.1480,
    lng: 91.7875,
    elevationM: 52.4,
    connectedEdges: ["D-028", "D-029", "D-030"],
    description: "High-traffic nodal junction under the flyover funneling water towards Dispur capital complex.",
    timesteps: {
      NOW: { incomingFlowM3s: 5.6, capacityM3s: 7.2, utilizationPct: 78, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 7.2, capacityM3s: 7.2, utilizationPct: 100, status: "warning", surchargeDepthM: 0.12, nearbyFloodRisk: "moderate" },
      "+2HR": { incomingFlowM3s: 9.0, capacityM3s: 7.2, utilizationPct: 125, status: "surcharged", surchargeDepthM: 0.46, nearbyFloodRisk: "high" },
      "+3HR": { incomingFlowM3s: 10.5, capacityM3s: 7.2, utilizationPct: 146, status: "critical", surchargeDepthM: 0.75, nearbyFloodRisk: "critical" }
    }
  },
  {
    id: "N-020",
    name: "Dispur Secretariat Sluice",
    type: "outfall",
    lat: 26.1420,
    lng: 91.7920,
    elevationM: 51.5,
    connectedEdges: ["D-030", "D-031"],
    description: "Simulated outfall connected to representative natural drainage channels/water bodies near capital canal.",
    timesteps: {
      NOW: { incomingFlowM3s: 4.8, capacityM3s: 7.0, utilizationPct: 69, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 6.2, capacityM3s: 7.0, utilizationPct: 89, status: "warning", surchargeDepthM: 0.04, nearbyFloodRisk: "low" },
      "+2HR": { incomingFlowM3s: 7.8, capacityM3s: 7.0, utilizationPct: 111, status: "surcharged", surchargeDepthM: 0.28, nearbyFloodRisk: "moderate" },
      "+3HR": { incomingFlowM3s: 9.1, capacityM3s: 7.0, utilizationPct: 130, status: "critical", surchargeDepthM: 0.56, nearbyFloodRisk: "high" }
    }
  },
  {
    id: "N-021",
    name: "Down Town Hospital Manhole DTH-1",
    type: "manhole",
    lat: 26.1445,
    lng: 91.8010,
    elevationM: 53.0,
    connectedEdges: ["D-032", "D-033"],
    description: "Emergency corridor manhole along GS Road in front of medical facilities.",
    timesteps: {
      NOW: { incomingFlowM3s: 3.2, capacityM3s: 5.0, utilizationPct: 64, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 4.2, capacityM3s: 5.0, utilizationPct: 84, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+2HR": { incomingFlowM3s: 5.3, capacityM3s: 5.0, utilizationPct: 106, status: "surcharged", surchargeDepthM: 0.15, nearbyFloodRisk: "moderate" },
      "+3HR": { incomingFlowM3s: 6.2, capacityM3s: 5.0, utilizationPct: 124, status: "critical", surchargeDepthM: 0.39, nearbyFloodRisk: "high" }
    }
  },
  {
    id: "N-022",
    name: "Rukminigaon Lowland Inlet",
    type: "inlet",
    lat: 26.1390,
    lng: 91.7990,
    elevationM: 48.9,
    connectedEdges: ["D-033", "D-034"],
    description: "Deep natural depression vulnerable to sudden backwater inundation from clogged culverts.",
    timesteps: {
      NOW: { incomingFlowM3s: 4.8, capacityM3s: 4.4, utilizationPct: 109, status: "surcharged", surchargeDepthM: 0.20, nearbyFloodRisk: "high" },
      "+1HR": { incomingFlowM3s: 6.2, capacityM3s: 4.4, utilizationPct: 141, status: "critical", surchargeDepthM: 0.48, nearbyFloodRisk: "critical" },
      "+2HR": { incomingFlowM3s: 7.7, capacityM3s: 4.4, utilizationPct: 175, status: "critical", surchargeDepthM: 0.79, nearbyFloodRisk: "critical" },
      "+3HR": { incomingFlowM3s: 8.9, capacityM3s: 4.4, utilizationPct: 202, status: "critical", surchargeDepthM: 1.08, nearbyFloodRisk: "critical" }
    }
  },
  {
    id: "N-023",
    name: "Six Mile Flyover Junction",
    type: "junction",
    lat: 26.1320,
    lng: 91.8110,
    elevationM: 54.6,
    connectedEdges: ["D-035", "D-036", "D-037"],
    description: "High-volume intersection chamber linking VIP Road and GS Road stormwater systems.",
    timesteps: {
      NOW: { incomingFlowM3s: 4.2, capacityM3s: 6.5, utilizationPct: 65, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 5.5, capacityM3s: 6.5, utilizationPct: 85, status: "warning", surchargeDepthM: 0.02, nearbyFloodRisk: "low" },
      "+2HR": { incomingFlowM3s: 6.9, capacityM3s: 6.5, utilizationPct: 106, status: "surcharged", surchargeDepthM: 0.18, nearbyFloodRisk: "moderate" },
      "+3HR": { incomingFlowM3s: 8.2, capacityM3s: 6.5, utilizationPct: 126, status: "critical", surchargeDepthM: 0.45, nearbyFloodRisk: "high" }
    }
  },
  {
    id: "N-024",
    name: "Khanapara Gateway Inlet",
    type: "inlet",
    lat: 26.1180,
    lng: 91.8220,
    elevationM: 62.0,
    connectedEdges: ["D-037", "D-038"],
    description: "Interstate terminus inlet located at high elevation near Meghalaya border hills.",
    timesteps: {
      NOW: { incomingFlowM3s: 3.1, capacityM3s: 5.5, utilizationPct: 56, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 4.0, capacityM3s: 5.5, utilizationPct: 73, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+2HR": { incomingFlowM3s: 5.1, capacityM3s: 5.5, utilizationPct: 93, status: "warning", surchargeDepthM: 0.04, nearbyFloodRisk: "low" },
      "+3HR": { incomingFlowM3s: 6.2, capacityM3s: 5.5, utilizationPct: 113, status: "surcharged", surchargeDepthM: 0.20, nearbyFloodRisk: "moderate" }
    }
  },
  {
    id: "N-025",
    name: "Beltola Tiniali Junction",
    type: "junction",
    lat: 26.1280,
    lng: 91.7980,
    elevationM: 53.8,
    connectedEdges: ["D-036", "D-039", "D-040"],
    description: "Traditional market junction connecting Basistha catchment collectors with municipal network.",
    timesteps: {
      NOW: { incomingFlowM3s: 4.6, capacityM3s: 6.2, utilizationPct: 74, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 6.0, capacityM3s: 6.2, utilizationPct: 97, status: "warning", surchargeDepthM: 0.08, nearbyFloodRisk: "moderate" },
      "+2HR": { incomingFlowM3s: 7.5, capacityM3s: 6.2, utilizationPct: 121, status: "surcharged", surchargeDepthM: 0.35, nearbyFloodRisk: "high" },
      "+3HR": { incomingFlowM3s: 8.8, capacityM3s: 6.2, utilizationPct: 142, status: "critical", surchargeDepthM: 0.68, nearbyFloodRisk: "critical" }
    }
  },
  {
    id: "N-026",
    name: "Basistha Mandir Sluice",
    type: "outfall",
    lat: 26.1050,
    lng: 91.8020,
    elevationM: 68.5,
    connectedEdges: ["D-040", "D-041"],
    description: "Simulated outfall connected to representative natural drainage channels/water bodies (Basistha stream).",
    timesteps: {
      NOW: { incomingFlowM3s: 2.8, capacityM3s: 6.0, utilizationPct: 47, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 3.8, capacityM3s: 6.0, utilizationPct: 63, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+2HR": { incomingFlowM3s: 4.9, capacityM3s: 6.0, utilizationPct: 82, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+3HR": { incomingFlowM3s: 6.1, capacityM3s: 6.0, utilizationPct: 102, status: "warning", surchargeDepthM: 0.12, nearbyFloodRisk: "moderate" }
    }
  },
  {
    id: "N-027",
    name: "Hatigaon Bhetapara Junction",
    type: "junction",
    lat: 26.1360,
    lng: 91.7820,
    elevationM: 50.1,
    connectedEdges: ["D-039", "D-042", "D-043"],
    description: "Rapidly expanding residential intersection with high surface runoff and narrow earthen side drains.",
    timesteps: {
      NOW: { incomingFlowM3s: 4.8, capacityM3s: 5.2, utilizationPct: 92, status: "warning", surchargeDepthM: 0.08, nearbyFloodRisk: "moderate" },
      "+1HR": { incomingFlowM3s: 6.3, capacityM3s: 5.2, utilizationPct: 121, status: "surcharged", surchargeDepthM: 0.38, nearbyFloodRisk: "high" },
      "+2HR": { incomingFlowM3s: 7.9, capacityM3s: 5.2, utilizationPct: 152, status: "critical", surchargeDepthM: 0.70, nearbyFloodRisk: "critical" },
      "+3HR": { incomingFlowM3s: 9.2, capacityM3s: 5.2, utilizationPct: 177, status: "critical", surchargeDepthM: 0.98, nearbyFloodRisk: "critical" }
    }
  },
  {
    id: "N-028",
    name: "Lalmati NH Bypass Sump",
    type: "inlet",
    lat: 26.1260,
    lng: 91.7650,
    elevationM: 51.0,
    connectedEdges: ["D-043", "D-044"],
    description: "Highway shoulder inlet collecting highway runoff along the southern bypass.",
    timesteps: {
      NOW: { incomingFlowM3s: 3.2, capacityM3s: 4.8, utilizationPct: 67, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 4.2, capacityM3s: 4.8, utilizationPct: 88, status: "warning", surchargeDepthM: 0.02, nearbyFloodRisk: "low" },
      "+2HR": { incomingFlowM3s: 5.4, capacityM3s: 4.8, utilizationPct: 113, status: "surcharged", surchargeDepthM: 0.22, nearbyFloodRisk: "moderate" },
      "+3HR": { incomingFlowM3s: 6.4, capacityM3s: 4.8, utilizationPct: 133, status: "critical", surchargeDepthM: 0.48, nearbyFloodRisk: "high" }
    }
  },
  {
    id: "N-029",
    name: "Betkuchi ISBT Junction",
    type: "junction",
    lat: 26.1210,
    lng: 91.7390,
    elevationM: 51.4,
    connectedEdges: ["D-044", "D-045"],
    description: "Interstate bus terminal transit junction on heavy transportation corridor.",
    timesteps: {
      NOW: { incomingFlowM3s: 3.5, capacityM3s: 5.2, utilizationPct: 67, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 4.6, capacityM3s: 5.2, utilizationPct: 88, status: "warning", surchargeDepthM: 0.04, nearbyFloodRisk: "low" },
      "+2HR": { incomingFlowM3s: 5.8, capacityM3s: 5.2, utilizationPct: 112, status: "surcharged", surchargeDepthM: 0.24, nearbyFloodRisk: "moderate" },
      "+3HR": { incomingFlowM3s: 6.8, capacityM3s: 5.2, utilizationPct: 131, status: "critical", surchargeDepthM: 0.50, nearbyFloodRisk: "high" }
    }
  },
  {
    id: "N-030",
    name: "Deepor Beel North Outfall",
    type: "outfall",
    lat: 26.1280,
    lng: 91.6780,
    elevationM: 48.0,
    connectedEdges: ["D-045", "D-046", "D-047"],
    description: "Simulated outfall connected to representative natural drainage channels/water bodies (Deepor Beel wetland).",
    timesteps: {
      NOW: { incomingFlowM3s: 6.5, capacityM3s: 12.0, utilizationPct: 54, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 8.8, capacityM3s: 12.0, utilizationPct: 73, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+2HR": { incomingFlowM3s: 11.2, capacityM3s: 12.0, utilizationPct: 93, status: "warning", surchargeDepthM: 0.08, nearbyFloodRisk: "low" },
      "+3HR": { incomingFlowM3s: 13.8, capacityM3s: 12.0, utilizationPct: 115, status: "surcharged", surchargeDepthM: 0.35, nearbyFloodRisk: "moderate" }
    }
  },
  {
    id: "N-031",
    name: "Boragaon Lowland Manhole B-1",
    type: "manhole",
    lat: 26.1365,
    lng: 91.7050,
    elevationM: 49.5,
    connectedEdges: ["D-046", "D-048"],
    description: "Peripheral conduit manhole near highway bypass wetland transition zone.",
    timesteps: {
      NOW: { incomingFlowM3s: 3.8, capacityM3s: 4.8, utilizationPct: 79, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 4.9, capacityM3s: 4.8, utilizationPct: 102, status: "surcharged", surchargeDepthM: 0.12, nearbyFloodRisk: "moderate" },
      "+2HR": { incomingFlowM3s: 6.2, capacityM3s: 4.8, utilizationPct: 129, status: "critical", surchargeDepthM: 0.42, nearbyFloodRisk: "high" },
      "+3HR": { incomingFlowM3s: 7.3, capacityM3s: 4.8, utilizationPct: 152, status: "critical", surchargeDepthM: 0.72, nearbyFloodRisk: "critical" }
    }
  },
  {
    id: "N-032",
    name: "Fatasil Ambari Junction",
    type: "junction",
    lat: 26.1620,
    lng: 91.7380,
    elevationM: 52.1,
    connectedEdges: ["D-007", "D-014", "D-048"],
    description: "High-density residential junction conveying water into Mora Bharalu branch.",
    timesteps: {
      NOW: { incomingFlowM3s: 4.6, capacityM3s: 5.8, utilizationPct: 79, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 5.9, capacityM3s: 5.8, utilizationPct: 102, status: "surcharged", surchargeDepthM: 0.14, nearbyFloodRisk: "moderate" },
      "+2HR": { incomingFlowM3s: 7.4, capacityM3s: 5.8, utilizationPct: 128, status: "critical", surchargeDepthM: 0.48, nearbyFloodRisk: "high" },
      "+3HR": { incomingFlowM3s: 8.7, capacityM3s: 5.8, utilizationPct: 150, status: "critical", surchargeDepthM: 0.76, nearbyFloodRisk: "critical" }
    }
  },
  {
    id: "N-033",
    name: "VIP Road Six Mile Manhole V-1",
    type: "manhole",
    lat: 26.1410,
    lng: 91.8190,
    elevationM: 56.5,
    connectedEdges: ["D-035", "D-023"],
    description: "Elevated connector along VIP road providing alternative northern bypass.",
    timesteps: {
      NOW: { incomingFlowM3s: 2.2, capacityM3s: 4.5, utilizationPct: 49, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 2.9, capacityM3s: 4.5, utilizationPct: 64, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+2HR": { incomingFlowM3s: 3.8, capacityM3s: 4.5, utilizationPct: 84, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+3HR": { incomingFlowM3s: 4.7, capacityM3s: 4.5, utilizationPct: 104, status: "surcharged", surchargeDepthM: 0.12, nearbyFloodRisk: "moderate" }
    }
  },
  {
    id: "N-034",
    name: "Uzan Bazar Riverfront Sluice",
    type: "outfall",
    lat: 26.1915,
    lng: 91.7585,
    elevationM: 50.8,
    connectedEdges: ["D-010", "D-016"],
    description: "Simulated outfall connected to representative natural drainage channels/water bodies (Brahmaputra bank).",
    timesteps: {
      NOW: { incomingFlowM3s: 4.0, capacityM3s: 7.5, utilizationPct: 53, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 5.2, capacityM3s: 7.5, utilizationPct: 69, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+2HR": { incomingFlowM3s: 6.6, capacityM3s: 7.5, utilizationPct: 88, status: "warning", surchargeDepthM: 0.05, nearbyFloodRisk: "low" },
      "+3HR": { incomingFlowM3s: 8.0, capacityM3s: 7.5, utilizationPct: 107, status: "surcharged", surchargeDepthM: 0.22, nearbyFloodRisk: "moderate" }
    }
  },
  {
    id: "N-035",
    name: "Kamakhya Foothills Inlet",
    type: "inlet",
    lat: 26.1625,
    lng: 91.7115,
    elevationM: 61.2,
    connectedEdges: ["D-002", "D-003"],
    description: "Steep slope mountain drainage interceptor channeling debris and storm torrents.",
    timesteps: {
      NOW: { incomingFlowM3s: 2.9, capacityM3s: 5.0, utilizationPct: 58, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 3.8, capacityM3s: 5.0, utilizationPct: 76, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+2HR": { incomingFlowM3s: 4.9, capacityM3s: 5.0, utilizationPct: 98, status: "warning", surchargeDepthM: 0.06, nearbyFloodRisk: "moderate" },
      "+3HR": { incomingFlowM3s: 5.9, capacityM3s: 5.0, utilizationPct: 118, status: "surcharged", surchargeDepthM: 0.25, nearbyFloodRisk: "high" }
    }
  },
  {
    id: "N-036",
    name: "Bhetapara Outfall Sluice",
    type: "outfall",
    lat: 26.1310,
    lng: 91.7710,
    elevationM: 49.3,
    connectedEdges: ["D-042", "D-047"],
    description: "Simulated outfall connected to representative natural drainage channels/water bodies (Mora Bharalu canal).",
    timesteps: {
      NOW: { incomingFlowM3s: 5.1, capacityM3s: 8.0, utilizationPct: 64, status: "normal", surchargeDepthM: 0.0, nearbyFloodRisk: "low" },
      "+1HR": { incomingFlowM3s: 6.8, capacityM3s: 8.0, utilizationPct: 85, status: "warning", surchargeDepthM: 0.05, nearbyFloodRisk: "moderate" },
      "+2HR": { incomingFlowM3s: 8.6, capacityM3s: 8.0, utilizationPct: 108, status: "surcharged", surchargeDepthM: 0.28, nearbyFloodRisk: "high" },
      "+3HR": { incomingFlowM3s: 10.2, capacityM3s: 8.0, utilizationPct: 128, status: "critical", surchargeDepthM: 0.60, nearbyFloodRisk: "critical" }
    }
  }
];
