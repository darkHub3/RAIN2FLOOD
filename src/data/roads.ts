import { RoadNode, RoadSegment } from "../types";

export const ROADS_DISCLAIMER =
  "Representative road flood risk based on simulated overland inundation and drainage surcharge states. DEMO / REPRESENTATIVE PILOT DATA. Not authoritative municipal GIS road geometry.";

// -------------------------------------------------------------
// DECOUPLED ROAD GRAPH: INTERSECTION NODES (R-001 to R-050)
// Used exclusively for road-network topology and risk visualization.
// -------------------------------------------------------------
export const ROAD_NODES: RoadNode[] = [
  {
    "id": "R-001",
    "name": "Jalukbari Rotary",
    "lat": 26.151,
    "lng": 91.6885,
    "corridor": "AT Road / NH-27",
    "elevationM": 54.0
  },
  {
    "id": "R-002",
    "name": "Maligaon Chariali",
    "lat": 26.162,
    "lng": 91.716,
    "corridor": "AT Road",
    "elevationM": 52.5
  },
  {
    "id": "R-003",
    "name": "Kamakhya Gate",
    "lat": 26.17,
    "lng": 91.724,
    "corridor": "AT Road",
    "elevationM": 53.0
  },
  {
    "id": "R-004",
    "name": "Bharalumukh Junction",
    "lat": 26.1735,
    "lng": 91.7265,
    "corridor": "MG Road / AT Road",
    "elevationM": 49.5
  },
  {
    "id": "R-005",
    "name": "Machkhowa Riverfront",
    "lat": 26.1785,
    "lng": 91.734,
    "corridor": "MG Road",
    "elevationM": 51.0
  },
  {
    "id": "R-006",
    "name": "Fancy Bazar Riverfront",
    "lat": 26.182,
    "lng": 91.739,
    "corridor": "MG Road",
    "elevationM": 51.5
  },
  {
    "id": "R-007",
    "name": "Panbazar / High Court",
    "lat": 26.185,
    "lng": 91.748,
    "corridor": "MG Road / GNB Road",
    "elevationM": 53.0
  },
  {
    "id": "R-008",
    "name": "Uzanbazar Riverfront",
    "lat": 26.1915,
    "lng": 91.752,
    "corridor": "MG Road",
    "elevationM": 54.0
  },
  {
    "id": "R-009",
    "name": "Guwahati Club",
    "lat": 26.186,
    "lng": 91.755,
    "corridor": "GNB Road / B. Baruah Road",
    "elevationM": 52.0
  },
  {
    "id": "R-010",
    "name": "Paltan Bazar Station Point",
    "lat": 26.1772,
    "lng": 91.751,
    "corridor": "GS Road / AT Road",
    "elevationM": 50.8
  },
  {
    "id": "R-011",
    "name": "Rehabari Chariali",
    "lat": 26.17,
    "lng": 91.749,
    "corridor": "AK Azad Road",
    "elevationM": 50.5
  },
  {
    "id": "R-012",
    "name": "Arya Nagar Junction",
    "lat": 26.164,
    "lng": 91.748,
    "corridor": "AK Azad Road",
    "elevationM": 51.2
  },
  {
    "id": "R-013",
    "name": "Sarabbhati / Birubari",
    "lat": 26.155,
    "lng": 91.746,
    "corridor": "AK Azad Road",
    "elevationM": 52.0
  },
  {
    "id": "R-014",
    "name": "Lalganesh Tiniali",
    "lat": 26.143,
    "lng": 91.745,
    "corridor": "AK Azad Road",
    "elevationM": 52.5
  },
  {
    "id": "R-015",
    "name": "Odalbakra Junction",
    "lat": 26.136,
    "lng": 91.747,
    "corridor": "AK Azad Road",
    "elevationM": 53.0
  },
  {
    "id": "R-016",
    "name": "Lokhra Chariali (NH-27)",
    "lat": 26.12,
    "lng": 91.745,
    "corridor": "NH-27 / AK Azad Road",
    "elevationM": 53.5
  },
  {
    "id": "R-017",
    "name": "Ulubari Chariali",
    "lat": 26.1705,
    "lng": 91.7565,
    "corridor": "GS Road / B. Baruah Road",
    "elevationM": 50.2
  },
  {
    "id": "R-018",
    "name": "Lachit Nagar Junction",
    "lat": 26.165,
    "lng": 91.763,
    "corridor": "GS Road",
    "elevationM": 49.8
  },
  {
    "id": "R-019",
    "name": "Bhangagarh Flyover (GMCH)",
    "lat": 26.1585,
    "lng": 91.7685,
    "corridor": "GS Road / Rajgarh Road",
    "elevationM": 49.0
  },
  {
    "id": "R-020",
    "name": "Christian Basti",
    "lat": 26.153,
    "lng": 91.7765,
    "corridor": "GS Road",
    "elevationM": 49.5
  },
  {
    "id": "R-021",
    "name": "Ganeshguri Flyover",
    "lat": 26.1495,
    "lng": 91.782,
    "corridor": "GS Road / Zoo Road / Dispur",
    "elevationM": 50.0
  },
  {
    "id": "R-022",
    "name": "Zoo Road Tiniali",
    "lat": 26.177,
    "lng": 91.771,
    "corridor": "RG Baruah Road / Rajgarh Road",
    "elevationM": 51.0
  },
  {
    "id": "R-023",
    "name": "Chandmari Flyover",
    "lat": 26.188,
    "lng": 91.7745,
    "corridor": "GNB Road / RG Baruah Road / MRD Road",
    "elevationM": 53.0
  },
  {
    "id": "R-024",
    "name": "Bamunimaidam Junction",
    "lat": 26.186,
    "lng": 91.788,
    "corridor": "MRD Road",
    "elevationM": 52.0
  },
  {
    "id": "R-025",
    "name": "Noonmati Refinery Roundabout",
    "lat": 26.184,
    "lng": 91.808,
    "corridor": "MRD Road / VIP Road",
    "elevationM": 54.0
  },
  {
    "id": "R-026",
    "name": "Assam State Zoo Gate",
    "lat": 26.1645,
    "lng": 91.782,
    "corridor": "RG Baruah Road",
    "elevationM": 51.5
  },
  {
    "id": "R-027",
    "name": "Ambikagirinagar",
    "lat": 26.155,
    "lng": 91.7845,
    "corridor": "RG Baruah Road",
    "elevationM": 50.8
  },
  {
    "id": "R-028",
    "name": "Dispur / Supermarket",
    "lat": 26.142,
    "lng": 91.792,
    "corridor": "GS Road / Hatigaon Road",
    "elevationM": 50.5
  },
  {
    "id": "R-029",
    "name": "Down Town Hospital",
    "lat": 26.1405,
    "lng": 91.798,
    "corridor": "GS Road",
    "elevationM": 49.5
  },
  {
    "id": "R-030",
    "name": "Rukminigaon Sump",
    "lat": 26.1385,
    "lng": 91.8015,
    "corridor": "GS Road",
    "elevationM": 47.8
  },
  {
    "id": "R-031",
    "name": "Six Mile Flyover",
    "lat": 26.136,
    "lng": 91.8055,
    "corridor": "GS Road / VIP Road / Beltola",
    "elevationM": 51.0
  },
  {
    "id": "R-032",
    "name": "Beltola Tiniali",
    "lat": 26.128,
    "lng": 91.798,
    "corridor": "Beltola Road",
    "elevationM": 52.0
  },
  {
    "id": "R-033",
    "name": "Basistha Chariali (NH-27)",
    "lat": 26.115,
    "lng": 91.798,
    "corridor": "NH-27 / Basistha Road",
    "elevationM": 53.0
  },
  {
    "id": "R-034",
    "name": "Basistha Mandir Gate",
    "lat": 26.11,
    "lng": 91.802,
    "corridor": "Basistha Mandir Road",
    "elevationM": 62.0
  },
  {
    "id": "R-035",
    "name": "Khanapara Rotary",
    "lat": 26.1165,
    "lng": 91.825,
    "corridor": "GS Road / NH-27 / Meghalaya Hwy",
    "elevationM": 54.5
  },
  {
    "id": "R-036",
    "name": "VIP Road Chachhal (Silsako Edge)",
    "lat": 26.155,
    "lng": 91.812,
    "corridor": "VIP Road",
    "elevationM": 53.5
  },
  {
    "id": "R-037",
    "name": "VIP Road Narengi Link",
    "lat": 26.176,
    "lng": 91.8075,
    "corridor": "VIP Road",
    "elevationM": 54.0
  },
  {
    "id": "R-038",
    "name": "Narengi Tiniali",
    "lat": 26.185,
    "lng": 91.822,
    "corridor": "MRD Road / VIP Road",
    "elevationM": 55.0
  },
  {
    "id": "R-039",
    "name": "Hatigaon Chariali",
    "lat": 26.134,
    "lng": 91.782,
    "corridor": "Hatigaon Road",
    "elevationM": 48.5
  },
  {
    "id": "R-040",
    "name": "Bhetapara Chariali",
    "lat": 26.1265,
    "lng": 91.767,
    "corridor": "Bhetapara Road",
    "elevationM": 49.0
  },
  {
    "id": "R-041",
    "name": "Kahilipara Junction",
    "lat": 26.138,
    "lng": 91.775,
    "corridor": "Kahilipara Road",
    "elevationM": 54.0
  },
  {
    "id": "R-042",
    "name": "NH-27 Gorchuk / ISBT",
    "lat": 26.126,
    "lng": 91.718,
    "corridor": "NH-27",
    "elevationM": 53.0
  },
  {
    "id": "R-043",
    "name": "NH-27 Betkuchi",
    "lat": 26.122,
    "lng": 91.733,
    "corridor": "NH-27",
    "elevationM": 53.2
  },
  {
    "id": "R-044",
    "name": "NH-27 Lalmati / Beharbari",
    "lat": 26.117,
    "lng": 91.765,
    "corridor": "NH-27",
    "elevationM": 53.4
  },
  {
    "id": "R-045",
    "name": "NH-27 Boragaon Deepor Crossing",
    "lat": 26.1365,
    "lng": 91.705,
    "corridor": "NH-27",
    "elevationM": 52.8
  },
  {
    "id": "R-046",
    "name": "Kharghuli River View Ridge",
    "lat": 26.198,
    "lng": 91.78,
    "corridor": "MG Road Extension",
    "elevationM": 65.0
  },
  {
    "id": "R-047",
    "name": "Anil Nagar Bharalu Culvert",
    "lat": 26.1755,
    "lng": 91.7645,
    "corridor": "Anil Nagar Link",
    "elevationM": 47.5
  },
  {
    "id": "R-048",
    "name": "Nabin Nagar Bharalu Culvert",
    "lat": 26.1805,
    "lng": 91.7705,
    "corridor": "Nabin Nagar Link",
    "elevationM": 47.9
  },
  {
    "id": "R-049",
    "name": "Dighalipukhuri East Point",
    "lat": 26.185,
    "lng": 91.748,
    "corridor": "Dighalipukhuri Loop",
    "elevationM": 53.2
  },
  {
    "id": "R-050",
    "name": "Rajgarh Bharalu Bridge",
    "lat": 26.166,
    "lng": 91.769,
    "corridor": "Rajgarh Road",
    "elevationM": 49.5
  }
];

// -------------------------------------------------------------
// DECOUPLED ROAD GRAPH: CORRIDOR SEGMENTS (RE-001 to RE-066)
// Every segment uses high-fidelity, road-following polyline geometry
// with 6 to 25 vertices following real Guwahati street curves.
// -------------------------------------------------------------
export const ROAD_SEGMENTS: RoadSegment[] = [
  {
    "id": "RE-001",
    "legacyId": "RD-01",
    "name": "Khanapara Crossing Corridor",
    "roadName": "GS Road Southern Sector",
    "from": "R-031",
    "to": "R-035",
    "geometry": [
      [
        91.8055,
        26.136
      ],
      [
        91.80667,
        26.135
      ],
      [
        91.80783,
        26.134
      ],
      [
        91.809,
        26.133
      ],
      [
        91.81033,
        26.13167
      ],
      [
        91.81167,
        26.13033
      ],
      [
        91.813,
        26.129
      ],
      [
        91.8145,
        26.1275
      ],
      [
        91.816,
        26.126
      ],
      [
        91.8175,
        26.1245
      ],
      [
        91.81883,
        26.12317
      ],
      [
        91.82017,
        26.12183
      ],
      [
        91.8215,
        26.1205
      ],
      [
        91.82217,
        26.11967
      ],
      [
        91.82283,
        26.11883
      ],
      [
        91.8235,
        26.118
      ],
      [
        91.824,
        26.1175
      ],
      [
        91.8245,
        26.117
      ],
      [
        91.825,
        26.1165
      ]
    ],
    "path": [
      [
        26.136,
        91.8055
      ],
      [
        26.135,
        91.80667
      ],
      [
        26.134,
        91.80783
      ],
      [
        26.133,
        91.809
      ],
      [
        26.13167,
        91.81033
      ],
      [
        26.13033,
        91.81167
      ],
      [
        26.129,
        91.813
      ],
      [
        26.1275,
        91.8145
      ],
      [
        26.126,
        91.816
      ],
      [
        26.1245,
        91.8175
      ],
      [
        26.12317,
        91.81883
      ],
      [
        26.12183,
        91.82017
      ],
      [
        26.1205,
        91.8215
      ],
      [
        26.11967,
        91.82217
      ],
      [
        26.11883,
        91.82283
      ],
      [
        26.118,
        91.8235
      ],
      [
        26.1175,
        91.824
      ],
      [
        26.117,
        91.8245
      ],
      [
        26.1165,
        91.825
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.48,
        "risk": "high",
        "drainageStressPct": 98,
        "timeToCritical": "48 min"
      },
      "+1HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.85,
        "risk": "critical",
        "drainageStressPct": 128,
        "timeToCritical": "Critical now"
      },
      "+2HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 1.05,
        "risk": "critical",
        "drainageStressPct": 145,
        "timeToCritical": "Submerged"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 1.25,
        "risk": "critical",
        "drainageStressPct": 160,
        "timeToCritical": "Submerged"
      }
    },
    "description": "Major southern transit corridor connecting Six Mile to Meghalaya gateway."
  },
  {
    "id": "RE-002",
    "legacyId": "RD-02",
    "name": "Anil Nagar Canal Corridor",
    "roadName": "Anil Nagar Lowland",
    "from": "R-047",
    "to": "R-048",
    "geometry": [
      [
        91.7645,
        26.1755
      ],
      [
        91.765,
        26.17583
      ],
      [
        91.7655,
        26.17617
      ],
      [
        91.766,
        26.1765
      ],
      [
        91.7666,
        26.177
      ],
      [
        91.7672,
        26.1775
      ],
      [
        91.7678,
        26.178
      ],
      [
        91.7682,
        26.1784
      ],
      [
        91.7686,
        26.1788
      ],
      [
        91.769,
        26.1792
      ],
      [
        91.7695,
        26.17963
      ],
      [
        91.77,
        26.18007
      ],
      [
        91.7705,
        26.1805
      ]
    ],
    "path": [
      [
        26.1755,
        91.7645
      ],
      [
        26.17583,
        91.765
      ],
      [
        26.17617,
        91.7655
      ],
      [
        26.1765,
        91.766
      ],
      [
        26.177,
        91.7666
      ],
      [
        26.1775,
        91.7672
      ],
      [
        26.178,
        91.7678
      ],
      [
        26.1784,
        91.7682
      ],
      [
        26.1788,
        91.7686
      ],
      [
        26.1792,
        91.769
      ],
      [
        26.17963,
        91.7695
      ],
      [
        26.18007,
        91.77
      ],
      [
        26.1805,
        91.7705
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.62,
        "risk": "critical",
        "drainageStressPct": 122,
        "timeToCritical": "Critical now"
      },
      "+1HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.88,
        "risk": "critical",
        "drainageStressPct": 142,
        "timeToCritical": "Critical now"
      },
      "+2HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 1.15,
        "risk": "critical",
        "drainageStressPct": 158,
        "timeToCritical": "Submerged"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 1.35,
        "risk": "critical",
        "drainageStressPct": 175,
        "timeToCritical": "Submerged"
      }
    },
    "description": "Low-lying bowl corridor prone to rapid Bharalu canal backwater surcharge."
  },
  {
    "id": "RE-003",
    "legacyId": "RD-03",
    "name": "Rukminigaon Depressed Link",
    "roadName": "GS Road Rukminigaon Sump",
    "from": "R-029",
    "to": "R-030",
    "geometry": [
      [
        91.798,
        26.1405
      ],
      [
        91.79833,
        26.14033
      ],
      [
        91.79867,
        26.14017
      ],
      [
        91.799,
        26.14
      ],
      [
        91.7994,
        26.13973
      ],
      [
        91.7998,
        26.13947
      ],
      [
        91.8002,
        26.1392
      ],
      [
        91.80047,
        26.13907
      ],
      [
        91.80073,
        26.13893
      ],
      [
        91.801,
        26.1388
      ],
      [
        91.80117,
        26.1387
      ],
      [
        91.80133,
        26.1386
      ],
      [
        91.8015,
        26.1385
      ]
    ],
    "path": [
      [
        26.1405,
        91.798
      ],
      [
        26.14033,
        91.79833
      ],
      [
        26.14017,
        91.79867
      ],
      [
        26.14,
        91.799
      ],
      [
        26.13973,
        91.7994
      ],
      [
        26.13947,
        91.7998
      ],
      [
        26.1392,
        91.8002
      ],
      [
        26.13907,
        91.80047
      ],
      [
        26.13893,
        91.80073
      ],
      [
        26.1388,
        91.801
      ],
      [
        26.1387,
        91.80117
      ],
      [
        26.1386,
        91.80133
      ],
      [
        26.1385,
        91.8015
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.44,
        "risk": "high",
        "drainageStressPct": 95,
        "timeToCritical": "35 min"
      },
      "+1HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.74,
        "risk": "critical",
        "drainageStressPct": 124,
        "timeToCritical": "Critical now"
      },
      "+2HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.96,
        "risk": "critical",
        "drainageStressPct": 140,
        "timeToCritical": "Submerged"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 1.18,
        "risk": "critical",
        "drainageStressPct": 155,
        "timeToCritical": "Submerged"
      }
    },
    "description": "Depressed arterial link between Down Town hospital and Rukminigaon."
  },
  {
    "id": "RE-004",
    "legacyId": "RD-04",
    "name": "Bharalumukh Sluice Gate Approach",
    "roadName": "AT Road / Sluice Gate",
    "from": "R-003",
    "to": "R-004",
    "geometry": [
      [
        91.724,
        26.17
      ],
      [
        91.72427,
        26.1704
      ],
      [
        91.72453,
        26.1708
      ],
      [
        91.7248,
        26.1712
      ],
      [
        91.72513,
        26.17163
      ],
      [
        91.72547,
        26.17207
      ],
      [
        91.7258,
        26.1725
      ],
      [
        91.72603,
        26.17283
      ],
      [
        91.72627,
        26.17317
      ],
      [
        91.7265,
        26.1735
      ]
    ],
    "path": [
      [
        26.17,
        91.724
      ],
      [
        26.1704,
        91.72427
      ],
      [
        26.1708,
        91.72453
      ],
      [
        26.1712,
        91.7248
      ],
      [
        26.17163,
        91.72513
      ],
      [
        26.17207,
        91.72547
      ],
      [
        26.1725,
        91.7258
      ],
      [
        26.17283,
        91.72603
      ],
      [
        26.17317,
        91.72627
      ],
      [
        26.1735,
        91.7265
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.65,
        "risk": "critical",
        "drainageStressPct": 126,
        "timeToCritical": "Critical now"
      },
      "+1HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.82,
        "risk": "critical",
        "drainageStressPct": 138,
        "timeToCritical": "Critical now"
      },
      "+2HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 1.02,
        "risk": "critical",
        "drainageStressPct": 150,
        "timeToCritical": "Submerged"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 1.22,
        "risk": "critical",
        "drainageStressPct": 165,
        "timeToCritical": "Submerged"
      }
    },
    "description": "Lower discharge roadway near the Brahmaputra natural outfall gate."
  },
  {
    "id": "RE-005",
    "legacyId": "RD-05",
    "name": "Hatigaon Canal Crossing",
    "roadName": "Hatigaon Main Road",
    "from": "R-028",
    "to": "R-039",
    "geometry": [
      [
        91.792,
        26.142
      ],
      [
        91.791,
        26.14117
      ],
      [
        91.79,
        26.14033
      ],
      [
        91.789,
        26.1395
      ],
      [
        91.788,
        26.13883
      ],
      [
        91.787,
        26.13817
      ],
      [
        91.786,
        26.1375
      ],
      [
        91.78527,
        26.13683
      ],
      [
        91.78453,
        26.13617
      ],
      [
        91.7838,
        26.1355
      ],
      [
        91.7832,
        26.135
      ],
      [
        91.7826,
        26.1345
      ],
      [
        91.782,
        26.134
      ]
    ],
    "path": [
      [
        26.142,
        91.792
      ],
      [
        26.14117,
        91.791
      ],
      [
        26.14033,
        91.79
      ],
      [
        26.1395,
        91.789
      ],
      [
        26.13883,
        91.788
      ],
      [
        26.13817,
        91.787
      ],
      [
        26.1375,
        91.786
      ],
      [
        26.13683,
        91.78527
      ],
      [
        26.13617,
        91.78453
      ],
      [
        26.1355,
        91.7838
      ],
      [
        26.135,
        91.7832
      ],
      [
        26.1345,
        91.7826
      ],
      [
        26.134,
        91.782
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.38,
        "risk": "high",
        "drainageStressPct": 90,
        "timeToCritical": "40 min"
      },
      "+1HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.72,
        "risk": "critical",
        "drainageStressPct": 122,
        "timeToCritical": "Critical now"
      },
      "+2HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.94,
        "risk": "critical",
        "drainageStressPct": 139,
        "timeToCritical": "Submerged"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 1.12,
        "risk": "critical",
        "drainageStressPct": 154,
        "timeToCritical": "Submerged"
      }
    },
    "description": "Arterial road adjacent to southern Hatigaon drainage collector."
  },
  {
    "id": "RE-006",
    "legacyId": "RD-06",
    "name": "Zoo Road (RG Baruah Central)",
    "roadName": "RG Baruah Corridor",
    "from": "R-022",
    "to": "R-026",
    "geometry": [
      [
        91.771,
        26.177
      ],
      [
        91.7715,
        26.176
      ],
      [
        91.772,
        26.175
      ],
      [
        91.7725,
        26.174
      ],
      [
        91.77333,
        26.173
      ],
      [
        91.77417,
        26.172
      ],
      [
        91.775,
        26.171
      ],
      [
        91.776,
        26.17017
      ],
      [
        91.777,
        26.16933
      ],
      [
        91.778,
        26.1685
      ],
      [
        91.77883,
        26.16767
      ],
      [
        91.77967,
        26.16683
      ],
      [
        91.7805,
        26.166
      ],
      [
        91.781,
        26.1655
      ],
      [
        91.7815,
        26.165
      ],
      [
        91.782,
        26.1645
      ]
    ],
    "path": [
      [
        26.177,
        91.771
      ],
      [
        26.176,
        91.7715
      ],
      [
        26.175,
        91.772
      ],
      [
        26.174,
        91.7725
      ],
      [
        26.173,
        91.77333
      ],
      [
        26.172,
        91.77417
      ],
      [
        26.171,
        91.775
      ],
      [
        26.17017,
        91.776
      ],
      [
        26.16933,
        91.777
      ],
      [
        26.1685,
        91.778
      ],
      [
        26.16767,
        91.77883
      ],
      [
        26.16683,
        91.77967
      ],
      [
        26.166,
        91.7805
      ],
      [
        26.1655,
        91.781
      ],
      [
        26.165,
        91.7815
      ],
      [
        26.1645,
        91.782
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.22,
        "risk": "moderate",
        "drainageStressPct": 82,
        "timeToCritical": "1 hr 10 min"
      },
      "+1HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.52,
        "risk": "high",
        "drainageStressPct": 114,
        "timeToCritical": "35 min"
      },
      "+2HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.76,
        "risk": "critical",
        "drainageStressPct": 132,
        "timeToCritical": "Critical now"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.98,
        "risk": "critical",
        "drainageStressPct": 148,
        "timeToCritical": "Submerged"
      }
    },
    "description": "Major commercial artery curving around the Assam State Zoo foothills."
  },
  {
    "id": "RE-007",
    "legacyId": "RD-07",
    "name": "GS Road \u2014 Bhangagarh Flyover Sector",
    "roadName": "GS Road Central",
    "from": "R-018",
    "to": "R-019",
    "geometry": [
      [
        91.763,
        26.165
      ],
      [
        91.7635,
        26.16433
      ],
      [
        91.764,
        26.16367
      ],
      [
        91.7645,
        26.163
      ],
      [
        91.76517,
        26.16233
      ],
      [
        91.76583,
        26.16167
      ],
      [
        91.7665,
        26.161
      ],
      [
        91.76693,
        26.1605
      ],
      [
        91.76737,
        26.16
      ],
      [
        91.7678,
        26.1595
      ],
      [
        91.76803,
        26.15917
      ],
      [
        91.76827,
        26.15883
      ],
      [
        91.7685,
        26.1585
      ]
    ],
    "path": [
      [
        26.165,
        91.763
      ],
      [
        26.16433,
        91.7635
      ],
      [
        26.16367,
        91.764
      ],
      [
        26.163,
        91.7645
      ],
      [
        26.16233,
        91.76517
      ],
      [
        26.16167,
        91.76583
      ],
      [
        26.161,
        91.7665
      ],
      [
        26.1605,
        91.76693
      ],
      [
        26.16,
        91.76737
      ],
      [
        26.1595,
        91.7678
      ],
      [
        26.15917,
        91.76803
      ],
      [
        26.15883,
        91.76827
      ],
      [
        26.1585,
        91.7685
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.36,
        "risk": "high",
        "drainageStressPct": 88,
        "timeToCritical": "50 min"
      },
      "+1HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.58,
        "risk": "high",
        "drainageStressPct": 116,
        "timeToCritical": "25 min"
      },
      "+2HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.82,
        "risk": "critical",
        "drainageStressPct": 135,
        "timeToCritical": "Critical now"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 1.04,
        "risk": "critical",
        "drainageStressPct": 152,
        "timeToCritical": "Submerged"
      }
    },
    "description": "Transit nexus receiving mountain runoff from GMC medical hills."
  },
  {
    "id": "RE-008",
    "legacyId": "RD-08",
    "name": "GS Road \u2014 Christian Basti Sector",
    "roadName": "GS Road Central",
    "from": "R-019",
    "to": "R-020",
    "geometry": [
      [
        91.7685,
        26.1585
      ],
      [
        91.7694,
        26.15783
      ],
      [
        91.7703,
        26.15717
      ],
      [
        91.7712,
        26.1565
      ],
      [
        91.77197,
        26.156
      ],
      [
        91.77273,
        26.1555
      ],
      [
        91.7735,
        26.155
      ],
      [
        91.77407,
        26.1546
      ],
      [
        91.77463,
        26.1542
      ],
      [
        91.7752,
        26.1538
      ],
      [
        91.77563,
        26.15353
      ],
      [
        91.77607,
        26.15327
      ],
      [
        91.7765,
        26.153
      ]
    ],
    "path": [
      [
        26.1585,
        91.7685
      ],
      [
        26.15783,
        91.7694
      ],
      [
        26.15717,
        91.7703
      ],
      [
        26.1565,
        91.7712
      ],
      [
        26.156,
        91.77197
      ],
      [
        26.1555,
        91.77273
      ],
      [
        26.155,
        91.7735
      ],
      [
        26.1546,
        91.77407
      ],
      [
        26.1542,
        91.77463
      ],
      [
        26.1538,
        91.7752
      ],
      [
        26.15353,
        91.77563
      ],
      [
        26.15327,
        91.77607
      ],
      [
        26.153,
        91.7765
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.2,
        "risk": "moderate",
        "drainageStressPct": 76,
        "timeToCritical": "1 hr 30 min"
      },
      "+1HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.48,
        "risk": "high",
        "drainageStressPct": 112,
        "timeToCritical": "40 min"
      },
      "+2HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.68,
        "risk": "high",
        "drainageStressPct": 126,
        "timeToCritical": "15 min"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.9,
        "risk": "critical",
        "drainageStressPct": 144,
        "timeToCritical": "Critical now"
      }
    },
    "description": "Mid-reach highway experiencing backwater hydraulic surcharge."
  },
  {
    "id": "RE-009",
    "legacyId": "RD-09",
    "name": "Ganeshguri Underpass Link",
    "roadName": "GS Road Ganeshguri",
    "from": "R-020",
    "to": "R-021",
    "geometry": [
      [
        91.7765,
        26.153
      ],
      [
        91.77717,
        26.1526
      ],
      [
        91.77783,
        26.1522
      ],
      [
        91.7785,
        26.1518
      ],
      [
        91.77917,
        26.15137
      ],
      [
        91.77983,
        26.15093
      ],
      [
        91.7805,
        26.1505
      ],
      [
        91.781,
        26.15017
      ],
      [
        91.7815,
        26.14983
      ],
      [
        91.782,
        26.1495
      ]
    ],
    "path": [
      [
        26.153,
        91.7765
      ],
      [
        26.1526,
        91.77717
      ],
      [
        26.1522,
        91.77783
      ],
      [
        26.1518,
        91.7785
      ],
      [
        26.15137,
        91.77917
      ],
      [
        26.15093,
        91.77983
      ],
      [
        26.1505,
        91.7805
      ],
      [
        26.15017,
        91.781
      ],
      [
        26.14983,
        91.7815
      ],
      [
        26.1495,
        91.782
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.28,
        "risk": "moderate",
        "drainageStressPct": 86,
        "timeToCritical": "1 hr 05 min"
      },
      "+1HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.55,
        "risk": "high",
        "drainageStressPct": 118,
        "timeToCritical": "30 min"
      },
      "+2HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.84,
        "risk": "critical",
        "drainageStressPct": 136,
        "timeToCritical": "Critical now"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 1.08,
        "risk": "critical",
        "drainageStressPct": 154,
        "timeToCritical": "Submerged"
      }
    },
    "description": "Depressed roadway beneath flyover prone to rapid localized ponding."
  },
  {
    "id": "RE-010",
    "legacyId": "RD-10",
    "name": "Lachit Nagar Commercial Link",
    "roadName": "GS Road Ulubari-Lachit",
    "from": "R-017",
    "to": "R-018",
    "geometry": [
      [
        91.7565,
        26.1705
      ],
      [
        91.75717,
        26.16993
      ],
      [
        91.75783,
        26.16937
      ],
      [
        91.7585,
        26.1688
      ],
      [
        91.75927,
        26.1682
      ],
      [
        91.76003,
        26.1676
      ],
      [
        91.7608,
        26.167
      ],
      [
        91.76153,
        26.16633
      ],
      [
        91.76227,
        26.16567
      ],
      [
        91.763,
        26.165
      ]
    ],
    "path": [
      [
        26.1705,
        91.7565
      ],
      [
        26.16993,
        91.75717
      ],
      [
        26.16937,
        91.75783
      ],
      [
        26.1688,
        91.7585
      ],
      [
        26.1682,
        91.75927
      ],
      [
        26.1676,
        91.76003
      ],
      [
        26.167,
        91.7608
      ],
      [
        26.16633,
        91.76153
      ],
      [
        26.16567,
        91.76227
      ],
      [
        26.165,
        91.763
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.24,
        "risk": "moderate",
        "drainageStressPct": 80,
        "timeToCritical": "1 hr 20 min"
      },
      "+1HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.46,
        "risk": "high",
        "drainageStressPct": 108,
        "timeToCritical": "45 min"
      },
      "+2HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.64,
        "risk": "high",
        "drainageStressPct": 122,
        "timeToCritical": "20 min"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.86,
        "risk": "critical",
        "drainageStressPct": 140,
        "timeToCritical": "Critical now"
      }
    },
    "description": "Dense commercial corridor connecting Ulubari to Lachit Nagar."
  },
  {
    "id": "RE-011",
    "legacyId": "RD-11",
    "name": "Rajgarh Canal Side Arterial",
    "roadName": "Rajgarh Road",
    "from": "R-019",
    "to": "R-050",
    "geometry": [
      [
        91.7685,
        26.1585
      ],
      [
        91.7686,
        26.15917
      ],
      [
        91.7687,
        26.15983
      ],
      [
        91.7688,
        26.1605
      ],
      [
        91.76887,
        26.16133
      ],
      [
        91.76893,
        26.16217
      ],
      [
        91.769,
        26.163
      ],
      [
        91.769,
        26.164
      ],
      [
        91.769,
        26.165
      ],
      [
        91.769,
        26.166
      ]
    ],
    "path": [
      [
        26.1585,
        91.7685
      ],
      [
        26.15917,
        91.7686
      ],
      [
        26.15983,
        91.7687
      ],
      [
        26.1605,
        91.7688
      ],
      [
        26.16133,
        91.76887
      ],
      [
        26.16217,
        91.76893
      ],
      [
        26.163,
        91.769
      ],
      [
        26.164,
        91.769
      ],
      [
        26.165,
        91.769
      ],
      [
        26.166,
        91.769
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.26,
        "risk": "moderate",
        "drainageStressPct": 84,
        "timeToCritical": "1 hr 15 min"
      },
      "+1HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.5,
        "risk": "high",
        "drainageStressPct": 112,
        "timeToCritical": "35 min"
      },
      "+2HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.7,
        "risk": "high",
        "drainageStressPct": 128,
        "timeToCritical": "15 min"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.92,
        "risk": "critical",
        "drainageStressPct": 146,
        "timeToCritical": "Critical now"
      }
    },
    "description": "Lowland street running along Bharalu canal between Bhangagarh and Rajgarh."
  },
  {
    "id": "RE-012",
    "legacyId": "RD-12",
    "name": "Paltan Bazar to Ulubari Arterial",
    "roadName": "GS Road Entry",
    "from": "R-010",
    "to": "R-017",
    "geometry": [
      [
        91.751,
        26.1772
      ],
      [
        91.7516,
        26.17647
      ],
      [
        91.7522,
        26.17573
      ],
      [
        91.7528,
        26.175
      ],
      [
        91.75337,
        26.17433
      ],
      [
        91.75393,
        26.17367
      ],
      [
        91.7545,
        26.173
      ],
      [
        91.75493,
        26.1725
      ],
      [
        91.75537,
        26.172
      ],
      [
        91.7558,
        26.1715
      ],
      [
        91.75603,
        26.17117
      ],
      [
        91.75627,
        26.17083
      ],
      [
        91.7565,
        26.1705
      ]
    ],
    "path": [
      [
        26.1772,
        91.751
      ],
      [
        26.17647,
        91.7516
      ],
      [
        26.17573,
        91.7522
      ],
      [
        26.175,
        91.7528
      ],
      [
        26.17433,
        91.75337
      ],
      [
        26.17367,
        91.75393
      ],
      [
        26.173,
        91.7545
      ],
      [
        26.1725,
        91.75493
      ],
      [
        26.172,
        91.75537
      ],
      [
        26.1715,
        91.7558
      ],
      [
        26.17117,
        91.75603
      ],
      [
        26.17083,
        91.75627
      ],
      [
        26.1705,
        91.7565
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.21,
        "risk": "moderate",
        "drainageStressPct": 78,
        "timeToCritical": "1 hr 35 min"
      },
      "+1HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.44,
        "risk": "high",
        "drainageStressPct": 106,
        "timeToCritical": "50 min"
      },
      "+2HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.62,
        "risk": "high",
        "drainageStressPct": 120,
        "timeToCritical": "25 min"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.82,
        "risk": "critical",
        "drainageStressPct": 138,
        "timeToCritical": "Critical now"
      }
    },
    "description": "High-traffic entry corridor from railway station terminal into GS Road."
  },
  {
    "id": "RE-013",
    "legacyId": "RD-13",
    "name": "Silsako Wetland Inundation Approach",
    "roadName": "Chachhal Low Link",
    "from": "R-036",
    "to": "R-031",
    "geometry": [
      [
        91.812,
        26.155
      ],
      [
        91.8115,
        26.15333
      ],
      [
        91.811,
        26.15167
      ],
      [
        91.8105,
        26.15
      ],
      [
        91.80983,
        26.14833
      ],
      [
        91.80917,
        26.14667
      ],
      [
        91.8085,
        26.145
      ],
      [
        91.808,
        26.14333
      ],
      [
        91.8075,
        26.14167
      ],
      [
        91.807,
        26.14
      ],
      [
        91.8065,
        26.13867
      ],
      [
        91.806,
        26.13733
      ],
      [
        91.8055,
        26.136
      ]
    ],
    "path": [
      [
        26.155,
        91.812
      ],
      [
        26.15333,
        91.8115
      ],
      [
        26.15167,
        91.811
      ],
      [
        26.15,
        91.8105
      ],
      [
        26.14833,
        91.80983
      ],
      [
        26.14667,
        91.80917
      ],
      [
        26.145,
        91.8085
      ],
      [
        26.14333,
        91.808
      ],
      [
        26.14167,
        91.8075
      ],
      [
        26.14,
        91.807
      ],
      [
        26.13867,
        91.8065
      ],
      [
        26.13733,
        91.806
      ],
      [
        26.136,
        91.8055
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.35,
        "risk": "high",
        "drainageStressPct": 89,
        "timeToCritical": "55 min"
      },
      "+1HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.54,
        "risk": "high",
        "drainageStressPct": 115,
        "timeToCritical": "30 min"
      },
      "+2HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.78,
        "risk": "critical",
        "drainageStressPct": 133,
        "timeToCritical": "Critical now"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 1.02,
        "risk": "critical",
        "drainageStressPct": 151,
        "timeToCritical": "Submerged"
      }
    },
    "description": "Low-lying retention basin approach road along Chachhal wetland fringe."
  },
  {
    "id": "RE-014",
    "legacyId": "RD-14",
    "name": "Bhetapara Mora Bharalu Crossing",
    "roadName": "Bhetapara Road",
    "from": "R-039",
    "to": "R-040",
    "geometry": [
      [
        91.782,
        26.134
      ],
      [
        91.78067,
        26.13333
      ],
      [
        91.77933,
        26.13267
      ],
      [
        91.778,
        26.132
      ],
      [
        91.77633,
        26.13117
      ],
      [
        91.77467,
        26.13033
      ],
      [
        91.773,
        26.1295
      ],
      [
        91.77183,
        26.12883
      ],
      [
        91.77067,
        26.12817
      ],
      [
        91.7695,
        26.1275
      ],
      [
        91.76867,
        26.12717
      ],
      [
        91.76783,
        26.12683
      ],
      [
        91.767,
        26.1265
      ]
    ],
    "path": [
      [
        26.134,
        91.782
      ],
      [
        26.13333,
        91.78067
      ],
      [
        26.13267,
        91.77933
      ],
      [
        26.132,
        91.778
      ],
      [
        26.13117,
        91.77633
      ],
      [
        26.13033,
        91.77467
      ],
      [
        26.1295,
        91.773
      ],
      [
        26.12883,
        91.77183
      ],
      [
        26.12817,
        91.77067
      ],
      [
        26.1275,
        91.7695
      ],
      [
        26.12717,
        91.76867
      ],
      [
        26.12683,
        91.76783
      ],
      [
        26.1265,
        91.767
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.25,
        "risk": "moderate",
        "drainageStressPct": 83,
        "timeToCritical": "1 hr 15 min"
      },
      "+1HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.49,
        "risk": "high",
        "drainageStressPct": 110,
        "timeToCritical": "40 min"
      },
      "+2HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.67,
        "risk": "high",
        "drainageStressPct": 125,
        "timeToCritical": "15 min"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.88,
        "risk": "critical",
        "drainageStressPct": 142,
        "timeToCritical": "Critical now"
      }
    },
    "description": "Crossroads carrying southern runoff toward Mora Bharalu canal."
  },
  {
    "id": "RE-015",
    "legacyId": "RD-15",
    "name": "Down Town Hospital Access Road",
    "roadName": "GS Road Dispur-Downtown",
    "from": "R-028",
    "to": "R-029",
    "geometry": [
      [
        91.792,
        26.142
      ],
      [
        91.79267,
        26.14183
      ],
      [
        91.79333,
        26.14167
      ],
      [
        91.794,
        26.1415
      ],
      [
        91.79467,
        26.14133
      ],
      [
        91.79533,
        26.14117
      ],
      [
        91.796,
        26.141
      ],
      [
        91.79667,
        26.14083
      ],
      [
        91.79733,
        26.14067
      ],
      [
        91.798,
        26.1405
      ]
    ],
    "path": [
      [
        26.142,
        91.792
      ],
      [
        26.14183,
        91.79267
      ],
      [
        26.14167,
        91.79333
      ],
      [
        26.1415,
        91.794
      ],
      [
        26.14133,
        91.79467
      ],
      [
        26.14117,
        91.79533
      ],
      [
        26.141,
        91.796
      ],
      [
        26.14083,
        91.79667
      ],
      [
        26.14067,
        91.79733
      ],
      [
        26.1405,
        91.798
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.37,
        "risk": "high",
        "drainageStressPct": 91,
        "timeToCritical": "45 min"
      },
      "+1HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.57,
        "risk": "high",
        "drainageStressPct": 117,
        "timeToCritical": "25 min"
      },
      "+2HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.81,
        "risk": "critical",
        "drainageStressPct": 135,
        "timeToCritical": "Critical now"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 1.05,
        "risk": "critical",
        "drainageStressPct": 153,
        "timeToCritical": "Submerged"
      }
    },
    "description": "Critical access roadway connecting Dispur Supermarket to emergency medical center."
  },
  {
    "id": "RE-016",
    "legacyId": "RD-16",
    "name": "Dispur Last Gate Secretariat Link",
    "roadName": "GS Road Dispur",
    "from": "R-021",
    "to": "R-028",
    "geometry": [
      [
        91.782,
        26.1495
      ],
      [
        91.783,
        26.14883
      ],
      [
        91.784,
        26.14817
      ],
      [
        91.785,
        26.1475
      ],
      [
        91.78617,
        26.14683
      ],
      [
        91.78733,
        26.14617
      ],
      [
        91.7885,
        26.1455
      ],
      [
        91.78917,
        26.14483
      ],
      [
        91.78983,
        26.14417
      ],
      [
        91.7905,
        26.1435
      ],
      [
        91.791,
        26.143
      ],
      [
        91.7915,
        26.1425
      ],
      [
        91.792,
        26.142
      ]
    ],
    "path": [
      [
        26.1495,
        91.782
      ],
      [
        26.14883,
        91.783
      ],
      [
        26.14817,
        91.784
      ],
      [
        26.1475,
        91.785
      ],
      [
        26.14683,
        91.78617
      ],
      [
        26.14617,
        91.78733
      ],
      [
        26.1455,
        91.7885
      ],
      [
        26.14483,
        91.78917
      ],
      [
        26.14417,
        91.78983
      ],
      [
        26.1435,
        91.7905
      ],
      [
        26.143,
        91.791
      ],
      [
        26.1425,
        91.7915
      ],
      [
        26.142,
        91.792
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.12,
        "risk": "low",
        "drainageStressPct": 62,
        "timeToCritical": "2 hr 20 min"
      },
      "+1HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.38,
        "risk": "high",
        "drainageStressPct": 104,
        "timeToCritical": "50 min"
      },
      "+2HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.58,
        "risk": "high",
        "drainageStressPct": 119,
        "timeToCritical": "25 min"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.79,
        "risk": "critical",
        "drainageStressPct": 136,
        "timeToCritical": "Critical now"
      }
    },
    "description": "Administrative approach corridor with roadside stormwater conduits."
  },
  {
    "id": "RE-017",
    "legacyId": "RD-17",
    "name": "Six Mile Surface Intersection Link",
    "roadName": "GS Road Six Mile Approach",
    "from": "R-030",
    "to": "R-031",
    "geometry": [
      [
        91.8015,
        26.1385
      ],
      [
        91.80207,
        26.13817
      ],
      [
        91.80263,
        26.13783
      ],
      [
        91.8032,
        26.1375
      ],
      [
        91.80363,
        26.13727
      ],
      [
        91.80407,
        26.13703
      ],
      [
        91.8045,
        26.1368
      ],
      [
        91.80483,
        26.13653
      ],
      [
        91.80517,
        26.13627
      ],
      [
        91.8055,
        26.136
      ]
    ],
    "path": [
      [
        26.1385,
        91.8015
      ],
      [
        26.13817,
        91.80207
      ],
      [
        26.13783,
        91.80263
      ],
      [
        26.1375,
        91.8032
      ],
      [
        26.13727,
        91.80363
      ],
      [
        26.13703,
        91.80407
      ],
      [
        26.1368,
        91.8045
      ],
      [
        26.13653,
        91.80483
      ],
      [
        26.13627,
        91.80517
      ],
      [
        26.136,
        91.8055
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.22,
        "risk": "moderate",
        "drainageStressPct": 79,
        "timeToCritical": "1 hr 30 min"
      },
      "+1HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.45,
        "risk": "high",
        "drainageStressPct": 108,
        "timeToCritical": "45 min"
      },
      "+2HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.65,
        "risk": "high",
        "drainageStressPct": 124,
        "timeToCritical": "20 min"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.85,
        "risk": "critical",
        "drainageStressPct": 141,
        "timeToCritical": "Critical now"
      }
    },
    "description": "Surface grade level transit under Six Mile elevated intersection."
  },
  {
    "id": "RE-018",
    "legacyId": "RD-18",
    "name": "GS Road \u2014 Dispur to Six Mile Corridor",
    "roadName": "GS Road Main Spine",
    "from": "R-028",
    "to": "R-031",
    "geometry": [
      [
        91.792,
        26.142
      ],
      [
        91.794,
        26.1415
      ],
      [
        91.796,
        26.141
      ],
      [
        91.798,
        26.1405
      ],
      [
        91.79917,
        26.13983
      ],
      [
        91.80033,
        26.13917
      ],
      [
        91.8015,
        26.1385
      ],
      [
        91.80283,
        26.13767
      ],
      [
        91.80417,
        26.13683
      ],
      [
        91.8055,
        26.136
      ]
    ],
    "path": [
      [
        26.142,
        91.792
      ],
      [
        26.1415,
        91.794
      ],
      [
        26.141,
        91.796
      ],
      [
        26.1405,
        91.798
      ],
      [
        26.13983,
        91.79917
      ],
      [
        26.13917,
        91.80033
      ],
      [
        26.1385,
        91.8015
      ],
      [
        26.13767,
        91.80283
      ],
      [
        26.13683,
        91.80417
      ],
      [
        26.136,
        91.8055
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.15,
        "risk": "moderate",
        "drainageStressPct": 70,
        "timeToCritical": "1 hr 45 min"
      },
      "+1HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.28,
        "risk": "moderate",
        "drainageStressPct": 92,
        "timeToCritical": "1 hr 15 min"
      },
      "+2HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.54,
        "risk": "high",
        "drainageStressPct": 120,
        "timeToCritical": "40 min"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.82,
        "risk": "critical",
        "drainageStressPct": 142,
        "timeToCritical": "Critical now"
      }
    },
    "description": "Major highway stretch carrying heavy commuter transit."
  },
  {
    "id": "RE-019",
    "legacyId": "RD-19",
    "name": "AT Road \u2014 Jalukbari to Maligaon",
    "roadName": "AT Road Western Arterial",
    "from": "R-001",
    "to": "R-002",
    "geometry": [
      [
        91.6885,
        26.151
      ],
      [
        91.69067,
        26.15183
      ],
      [
        91.69283,
        26.15267
      ],
      [
        91.695,
        26.1535
      ],
      [
        91.69733,
        26.1545
      ],
      [
        91.69967,
        26.1555
      ],
      [
        91.702,
        26.1565
      ],
      [
        91.70433,
        26.1575
      ],
      [
        91.70667,
        26.1585
      ],
      [
        91.709,
        26.1595
      ],
      [
        91.71133,
        26.16033
      ],
      [
        91.71367,
        26.16117
      ],
      [
        91.716,
        26.162
      ]
    ],
    "path": [
      [
        26.151,
        91.6885
      ],
      [
        26.15183,
        91.69067
      ],
      [
        26.15267,
        91.69283
      ],
      [
        26.1535,
        91.695
      ],
      [
        26.1545,
        91.69733
      ],
      [
        26.1555,
        91.69967
      ],
      [
        26.1565,
        91.702
      ],
      [
        26.1575,
        91.70433
      ],
      [
        26.1585,
        91.70667
      ],
      [
        26.1595,
        91.709
      ],
      [
        26.16033,
        91.71133
      ],
      [
        26.16117,
        91.71367
      ],
      [
        26.162,
        91.716
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.04,
        "risk": "low",
        "drainageStressPct": 42,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.18,
        "risk": "moderate",
        "drainageStressPct": 74,
        "timeToCritical": "2 hr 10 min"
      },
      "+2HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.28,
        "risk": "moderate",
        "drainageStressPct": 88,
        "timeToCritical": "1 hr 20 min"
      },
      "+3HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.44,
        "risk": "high",
        "drainageStressPct": 112,
        "timeToCritical": "45 min"
      }
    },
    "description": "Western arterial corridor linking Gauhati University to Maligaon."
  },
  {
    "id": "RE-020",
    "legacyId": "RD-20",
    "name": "AT Road \u2014 Maligaon to Kamakhya Gate",
    "roadName": "AT Road Central",
    "from": "R-002",
    "to": "R-003",
    "geometry": [
      [
        91.716,
        26.162
      ],
      [
        91.717,
        26.163
      ],
      [
        91.718,
        26.164
      ],
      [
        91.719,
        26.165
      ],
      [
        91.71983,
        26.16583
      ],
      [
        91.72067,
        26.16667
      ],
      [
        91.7215,
        26.1675
      ],
      [
        91.72233,
        26.16833
      ],
      [
        91.72317,
        26.16917
      ],
      [
        91.724,
        26.17
      ]
    ],
    "path": [
      [
        26.162,
        91.716
      ],
      [
        26.163,
        91.717
      ],
      [
        26.164,
        91.718
      ],
      [
        26.165,
        91.719
      ],
      [
        26.16583,
        91.71983
      ],
      [
        26.16667,
        91.72067
      ],
      [
        26.1675,
        91.7215
      ],
      [
        26.16833,
        91.72233
      ],
      [
        26.16917,
        91.72317
      ],
      [
        26.17,
        91.724
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.06,
        "risk": "low",
        "drainageStressPct": 48,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.19,
        "risk": "moderate",
        "drainageStressPct": 76,
        "timeToCritical": "2 hr 00 min"
      },
      "+2HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.29,
        "risk": "moderate",
        "drainageStressPct": 90,
        "timeToCritical": "1 hr 15 min"
      },
      "+3HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.46,
        "risk": "high",
        "drainageStressPct": 114,
        "timeToCritical": "40 min"
      }
    },
    "description": "Railway colony commercial corridor west of Kamakhya foothills."
  },
  {
    "id": "RE-021",
    "legacyId": "RD-21",
    "name": "AT Road \u2014 Bharalumukh to Athgaon",
    "roadName": "AT Road Old City",
    "from": "R-004",
    "to": "R-010",
    "geometry": [
      [
        91.7265,
        26.1735
      ],
      [
        91.72867,
        26.17317
      ],
      [
        91.73083,
        26.17283
      ],
      [
        91.733,
        26.1725
      ],
      [
        91.735,
        26.17233
      ],
      [
        91.737,
        26.17217
      ],
      [
        91.739,
        26.172
      ],
      [
        91.741,
        26.1725
      ],
      [
        91.743,
        26.173
      ],
      [
        91.745,
        26.1735
      ],
      [
        91.747,
        26.17473
      ],
      [
        91.749,
        26.17597
      ],
      [
        91.751,
        26.1772
      ]
    ],
    "path": [
      [
        26.1735,
        91.7265
      ],
      [
        26.17317,
        91.72867
      ],
      [
        26.17283,
        91.73083
      ],
      [
        26.1725,
        91.733
      ],
      [
        26.17233,
        91.735
      ],
      [
        26.17217,
        91.737
      ],
      [
        26.172,
        91.739
      ],
      [
        26.1725,
        91.741
      ],
      [
        26.173,
        91.743
      ],
      [
        26.1735,
        91.745
      ],
      [
        26.17473,
        91.747
      ],
      [
        26.17597,
        91.749
      ],
      [
        26.1772,
        91.751
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.16,
        "risk": "moderate",
        "drainageStressPct": 72,
        "timeToCritical": "1 hr 40 min"
      },
      "+1HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.27,
        "risk": "moderate",
        "drainageStressPct": 90,
        "timeToCritical": "1 hr 10 min"
      },
      "+2HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.52,
        "risk": "high",
        "drainageStressPct": 118,
        "timeToCritical": "35 min"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.76,
        "risk": "critical",
        "drainageStressPct": 136,
        "timeToCritical": "Critical now"
      }
    },
    "description": "Historical urban road linking Bharalumukh to Guwahati Railway Station."
  },
  {
    "id": "RE-022",
    "legacyId": "RD-22",
    "name": "MG Road \u2014 Bharalumukh to Machkhowa",
    "roadName": "MG Road Riverfront",
    "from": "R-004",
    "to": "R-005",
    "geometry": [
      [
        91.7265,
        26.1735
      ],
      [
        91.72733,
        26.174
      ],
      [
        91.72817,
        26.1745
      ],
      [
        91.729,
        26.175
      ],
      [
        91.72983,
        26.1756
      ],
      [
        91.73067,
        26.1762
      ],
      [
        91.7315,
        26.1768
      ],
      [
        91.73233,
        26.17737
      ],
      [
        91.73317,
        26.17793
      ],
      [
        91.734,
        26.1785
      ]
    ],
    "path": [
      [
        26.1735,
        91.7265
      ],
      [
        26.174,
        91.72733
      ],
      [
        26.1745,
        91.72817
      ],
      [
        26.175,
        91.729
      ],
      [
        26.1756,
        91.72983
      ],
      [
        26.1762,
        91.73067
      ],
      [
        26.1768,
        91.7315
      ],
      [
        26.17737,
        91.73233
      ],
      [
        26.17793,
        91.73317
      ],
      [
        26.1785,
        91.734
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.17,
        "risk": "moderate",
        "drainageStressPct": 74,
        "timeToCritical": "1 hr 35 min"
      },
      "+1HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.29,
        "risk": "moderate",
        "drainageStressPct": 94,
        "timeToCritical": "1 hr 05 min"
      },
      "+2HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.55,
        "risk": "high",
        "drainageStressPct": 121,
        "timeToCritical": "30 min"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.79,
        "risk": "critical",
        "drainageStressPct": 139,
        "timeToCritical": "Critical now"
      }
    },
    "description": "Brahmaputra embankment road running along the riverbank."
  },
  {
    "id": "RE-023",
    "legacyId": "RD-23",
    "name": "AK Azad Road \u2014 Rehabari to Arya Nagar",
    "roadName": "AK Azad Road",
    "from": "R-011",
    "to": "R-012",
    "geometry": [
      [
        91.749,
        26.17
      ],
      [
        91.74887,
        26.16933
      ],
      [
        91.74873,
        26.16867
      ],
      [
        91.7486,
        26.168
      ],
      [
        91.74847,
        26.16733
      ],
      [
        91.74833,
        26.16667
      ],
      [
        91.7482,
        26.166
      ],
      [
        91.74813,
        26.16533
      ],
      [
        91.74807,
        26.16467
      ],
      [
        91.748,
        26.164
      ]
    ],
    "path": [
      [
        26.17,
        91.749
      ],
      [
        26.16933,
        91.74887
      ],
      [
        26.16867,
        91.74873
      ],
      [
        26.168,
        91.7486
      ],
      [
        26.16733,
        91.74847
      ],
      [
        26.16667,
        91.74833
      ],
      [
        26.166,
        91.7482
      ],
      [
        26.16533,
        91.74813
      ],
      [
        26.16467,
        91.74807
      ],
      [
        26.164,
        91.748
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.08,
        "risk": "low",
        "drainageStressPct": 52,
        "timeToCritical": "2 hr 45 min"
      },
      "+1HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.22,
        "risk": "moderate",
        "drainageStressPct": 82,
        "timeToCritical": "1 hr 45 min"
      },
      "+2HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.32,
        "risk": "moderate",
        "drainageStressPct": 96,
        "timeToCritical": "1 hr 00 min"
      },
      "+3HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.52,
        "risk": "high",
        "drainageStressPct": 120,
        "timeToCritical": "35 min"
      }
    },
    "description": "Urban collector road through historic residential district."
  },
  {
    "id": "RE-024",
    "legacyId": "RD-24",
    "name": "MG Road \u2014 Machkhowa to Fancy Bazar",
    "roadName": "MG Road Riverfront",
    "from": "R-005",
    "to": "R-006",
    "geometry": [
      [
        91.734,
        26.1785
      ],
      [
        91.73467,
        26.17893
      ],
      [
        91.73533,
        26.17937
      ],
      [
        91.736,
        26.1798
      ],
      [
        91.7365,
        26.1802
      ],
      [
        91.737,
        26.1806
      ],
      [
        91.7375,
        26.181
      ],
      [
        91.738,
        26.18133
      ],
      [
        91.7385,
        26.18167
      ],
      [
        91.739,
        26.182
      ]
    ],
    "path": [
      [
        26.1785,
        91.734
      ],
      [
        26.17893,
        91.73467
      ],
      [
        26.17937,
        91.73533
      ],
      [
        26.1798,
        91.736
      ],
      [
        26.1802,
        91.7365
      ],
      [
        26.1806,
        91.737
      ],
      [
        26.181,
        91.7375
      ],
      [
        26.18133,
        91.738
      ],
      [
        26.18167,
        91.7385
      ],
      [
        26.182,
        91.739
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.07,
        "risk": "low",
        "drainageStressPct": 50,
        "timeToCritical": "2 hr 50 min"
      },
      "+1HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.21,
        "risk": "moderate",
        "drainageStressPct": 80,
        "timeToCritical": "1 hr 50 min"
      },
      "+2HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.31,
        "risk": "moderate",
        "drainageStressPct": 94,
        "timeToCritical": "1 hr 05 min"
      },
      "+3HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.49,
        "risk": "high",
        "drainageStressPct": 118,
        "timeToCritical": "40 min"
      }
    },
    "description": "High-density market riverfront lane along Brahmaputra ghats."
  },
  {
    "id": "RE-025",
    "legacyId": "RD-25",
    "name": "MG Road \u2014 Fancy Bazar to Panbazar",
    "roadName": "MG Road Riverfront",
    "from": "R-006",
    "to": "R-007",
    "geometry": [
      [
        91.739,
        26.182
      ],
      [
        91.74,
        26.1824
      ],
      [
        91.741,
        26.1828
      ],
      [
        91.742,
        26.1832
      ],
      [
        91.743,
        26.18353
      ],
      [
        91.744,
        26.18387
      ],
      [
        91.745,
        26.1842
      ],
      [
        91.746,
        26.18447
      ],
      [
        91.747,
        26.18473
      ],
      [
        91.748,
        26.185
      ]
    ],
    "path": [
      [
        26.182,
        91.739
      ],
      [
        26.1824,
        91.74
      ],
      [
        26.1828,
        91.741
      ],
      [
        26.1832,
        91.742
      ],
      [
        26.18353,
        91.743
      ],
      [
        26.18387,
        91.744
      ],
      [
        26.1842,
        91.745
      ],
      [
        26.18447,
        91.746
      ],
      [
        26.18473,
        91.747
      ],
      [
        26.185,
        91.748
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.05,
        "risk": "low",
        "drainageStressPct": 45,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.17,
        "risk": "moderate",
        "drainageStressPct": 75,
        "timeToCritical": "2 hr 15 min"
      },
      "+2HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.27,
        "risk": "moderate",
        "drainageStressPct": 88,
        "timeToCritical": "1 hr 25 min"
      },
      "+3HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.43,
        "risk": "high",
        "drainageStressPct": 110,
        "timeToCritical": "50 min"
      }
    },
    "description": "Civic center riverfront link past High Court and Sukreswar temple."
  },
  {
    "id": "RE-026",
    "legacyId": "RD-26",
    "name": "RG Baruah \u2014 Chandmari to Zoo Road Tiniali",
    "roadName": "RG Baruah Road North",
    "from": "R-023",
    "to": "R-022",
    "geometry": [
      [
        91.7745,
        26.188
      ],
      [
        91.77417,
        26.187
      ],
      [
        91.77383,
        26.186
      ],
      [
        91.7735,
        26.185
      ],
      [
        91.77307,
        26.18383
      ],
      [
        91.77263,
        26.18267
      ],
      [
        91.7722,
        26.1815
      ],
      [
        91.7718,
        26.18
      ],
      [
        91.7714,
        26.1785
      ],
      [
        91.771,
        26.177
      ]
    ],
    "path": [
      [
        26.188,
        91.7745
      ],
      [
        26.187,
        91.77417
      ],
      [
        26.186,
        91.77383
      ],
      [
        26.185,
        91.7735
      ],
      [
        26.18383,
        91.77307
      ],
      [
        26.18267,
        91.77263
      ],
      [
        26.1815,
        91.7722
      ],
      [
        26.18,
        91.7718
      ],
      [
        26.1785,
        91.7714
      ],
      [
        26.177,
        91.771
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.14,
        "risk": "moderate",
        "drainageStressPct": 68,
        "timeToCritical": "1 hr 50 min"
      },
      "+1HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.26,
        "risk": "moderate",
        "drainageStressPct": 88,
        "timeToCritical": "1 hr 20 min"
      },
      "+2HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.5,
        "risk": "high",
        "drainageStressPct": 116,
        "timeToCritical": "40 min"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.74,
        "risk": "critical",
        "drainageStressPct": 134,
        "timeToCritical": "Critical now"
      }
    },
    "description": "Northern reach of Zoo Road past Commerce College."
  },
  {
    "id": "RE-027",
    "legacyId": "RD-27",
    "name": "RG Baruah \u2014 Ambikagirinagar to Ganeshguri",
    "roadName": "RG Baruah Road South",
    "from": "R-026",
    "to": "R-021",
    "geometry": [
      [
        91.782,
        26.1645
      ],
      [
        91.7825,
        26.163
      ],
      [
        91.783,
        26.1615
      ],
      [
        91.7835,
        26.16
      ],
      [
        91.78383,
        26.15833
      ],
      [
        91.78417,
        26.15667
      ],
      [
        91.7845,
        26.155
      ],
      [
        91.78407,
        26.154
      ],
      [
        91.78363,
        26.153
      ],
      [
        91.7832,
        26.152
      ],
      [
        91.7828,
        26.15117
      ],
      [
        91.7824,
        26.15033
      ],
      [
        91.782,
        26.1495
      ]
    ],
    "path": [
      [
        26.1645,
        91.782
      ],
      [
        26.163,
        91.7825
      ],
      [
        26.1615,
        91.783
      ],
      [
        26.16,
        91.7835
      ],
      [
        26.15833,
        91.78383
      ],
      [
        26.15667,
        91.78417
      ],
      [
        26.155,
        91.7845
      ],
      [
        26.154,
        91.78407
      ],
      [
        26.153,
        91.78363
      ],
      [
        26.152,
        91.7832
      ],
      [
        26.15117,
        91.7828
      ],
      [
        26.15033,
        91.7824
      ],
      [
        26.1495,
        91.782
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.09,
        "risk": "low",
        "drainageStressPct": 55,
        "timeToCritical": "2 hr 30 min"
      },
      "+1HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.24,
        "risk": "moderate",
        "drainageStressPct": 84,
        "timeToCritical": "1 hr 35 min"
      },
      "+2HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.48,
        "risk": "high",
        "drainageStressPct": 114,
        "timeToCritical": "45 min"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.72,
        "risk": "critical",
        "drainageStressPct": 132,
        "timeToCritical": "Critical now"
      }
    },
    "description": "Zoo Road southern approach into Ganeshguri intersection."
  },
  {
    "id": "RE-028",
    "legacyId": "RD-28",
    "name": "MRD Road \u2014 Bamunimaidam to Noonmati",
    "roadName": "MRD Road",
    "from": "R-024",
    "to": "R-025",
    "geometry": [
      [
        91.788,
        26.186
      ],
      [
        91.79,
        26.18583
      ],
      [
        91.792,
        26.18567
      ],
      [
        91.794,
        26.1855
      ],
      [
        91.796,
        26.18533
      ],
      [
        91.798,
        26.18517
      ],
      [
        91.8,
        26.185
      ],
      [
        91.80267,
        26.18467
      ],
      [
        91.80533,
        26.18433
      ],
      [
        91.808,
        26.184
      ]
    ],
    "path": [
      [
        26.186,
        91.788
      ],
      [
        26.18583,
        91.79
      ],
      [
        26.18567,
        91.792
      ],
      [
        26.1855,
        91.794
      ],
      [
        26.18533,
        91.796
      ],
      [
        26.18517,
        91.798
      ],
      [
        26.185,
        91.8
      ],
      [
        26.18467,
        91.80267
      ],
      [
        26.18433,
        91.80533
      ],
      [
        26.184,
        91.808
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.06,
        "risk": "low",
        "drainageStressPct": 46,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.19,
        "risk": "moderate",
        "drainageStressPct": 78,
        "timeToCritical": "2 hr 05 min"
      },
      "+2HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.3,
        "risk": "moderate",
        "drainageStressPct": 92,
        "timeToCritical": "1 hr 15 min"
      },
      "+3HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.47,
        "risk": "high",
        "drainageStressPct": 115,
        "timeToCritical": "40 min"
      }
    },
    "description": "Industrial feeder artery with roadside stormwater channels."
  },
  {
    "id": "RE-029",
    "legacyId": "RD-29",
    "name": "Rajgarh \u2014 Bharalu to Zoo Road Tiniali",
    "roadName": "Rajgarh Road North",
    "from": "R-050",
    "to": "R-022",
    "geometry": [
      [
        91.769,
        26.166
      ],
      [
        91.76927,
        26.16717
      ],
      [
        91.76953,
        26.16833
      ],
      [
        91.7698,
        26.1695
      ],
      [
        91.77003,
        26.17083
      ],
      [
        91.77027,
        26.17217
      ],
      [
        91.7705,
        26.1735
      ],
      [
        91.77067,
        26.17467
      ],
      [
        91.77083,
        26.17583
      ],
      [
        91.771,
        26.177
      ]
    ],
    "path": [
      [
        26.166,
        91.769
      ],
      [
        26.16717,
        91.76927
      ],
      [
        26.16833,
        91.76953
      ],
      [
        26.1695,
        91.7698
      ],
      [
        26.17083,
        91.77003
      ],
      [
        26.17217,
        91.77027
      ],
      [
        26.1735,
        91.7705
      ],
      [
        26.17467,
        91.77067
      ],
      [
        26.17583,
        91.77083
      ],
      [
        26.177,
        91.771
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.08,
        "risk": "low",
        "drainageStressPct": 53,
        "timeToCritical": "2 hr 40 min"
      },
      "+1HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.23,
        "risk": "moderate",
        "drainageStressPct": 83,
        "timeToCritical": "1 hr 40 min"
      },
      "+2HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.34,
        "risk": "moderate",
        "drainageStressPct": 98,
        "timeToCritical": "55 min"
      },
      "+3HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.54,
        "risk": "high",
        "drainageStressPct": 122,
        "timeToCritical": "30 min"
      }
    },
    "description": "Slope-base street collecting surface runoff from hillside blocks."
  },
  {
    "id": "RE-030",
    "legacyId": "RD-30",
    "name": "Six Mile to VIP Road Link",
    "roadName": "VIP Road Southern Reach",
    "from": "R-031",
    "to": "R-036",
    "geometry": [
      [
        91.8055,
        26.136
      ],
      [
        91.80617,
        26.13767
      ],
      [
        91.80683,
        26.13933
      ],
      [
        91.8075,
        26.141
      ],
      [
        91.80817,
        26.143
      ],
      [
        91.80883,
        26.145
      ],
      [
        91.8095,
        26.147
      ],
      [
        91.81033,
        26.14967
      ],
      [
        91.81117,
        26.15233
      ],
      [
        91.812,
        26.155
      ]
    ],
    "path": [
      [
        26.136,
        91.8055
      ],
      [
        26.13767,
        91.80617
      ],
      [
        26.13933,
        91.80683
      ],
      [
        26.141,
        91.8075
      ],
      [
        26.143,
        91.80817
      ],
      [
        26.145,
        91.80883
      ],
      [
        26.147,
        91.8095
      ],
      [
        26.14967,
        91.81033
      ],
      [
        26.15233,
        91.81117
      ],
      [
        26.155,
        91.812
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.09,
        "risk": "low",
        "drainageStressPct": 54,
        "timeToCritical": "2 hr 35 min"
      },
      "+1HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.25,
        "risk": "moderate",
        "drainageStressPct": 85,
        "timeToCritical": "1 hr 30 min"
      },
      "+2HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.49,
        "risk": "high",
        "drainageStressPct": 115,
        "timeToCritical": "40 min"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.73,
        "risk": "critical",
        "drainageStressPct": 133,
        "timeToCritical": "Critical now"
      }
    },
    "description": "Transition from Six Mile flyover into elevated VIP ridge."
  },
  {
    "id": "RE-031",
    "legacyId": "RD-31",
    "name": "Beltola Tiniali North Access",
    "roadName": "Beltola Road",
    "from": "R-031",
    "to": "R-032",
    "geometry": [
      [
        91.8055,
        26.136
      ],
      [
        91.80467,
        26.13517
      ],
      [
        91.80383,
        26.13433
      ],
      [
        91.803,
        26.1335
      ],
      [
        91.802,
        26.1325
      ],
      [
        91.801,
        26.1315
      ],
      [
        91.8,
        26.1305
      ],
      [
        91.79933,
        26.12967
      ],
      [
        91.79867,
        26.12883
      ],
      [
        91.798,
        26.128
      ]
    ],
    "path": [
      [
        26.136,
        91.8055
      ],
      [
        26.13517,
        91.80467
      ],
      [
        26.13433,
        91.80383
      ],
      [
        26.1335,
        91.803
      ],
      [
        26.1325,
        91.802
      ],
      [
        26.1315,
        91.801
      ],
      [
        26.1305,
        91.8
      ],
      [
        26.12967,
        91.79933
      ],
      [
        26.12883,
        91.79867
      ],
      [
        26.128,
        91.798
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.15,
        "risk": "moderate",
        "drainageStressPct": 71,
        "timeToCritical": "1 hr 45 min"
      },
      "+1HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.28,
        "risk": "moderate",
        "drainageStressPct": 91,
        "timeToCritical": "1 hr 15 min"
      },
      "+2HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.52,
        "risk": "high",
        "drainageStressPct": 118,
        "timeToCritical": "35 min"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.77,
        "risk": "critical",
        "drainageStressPct": 137,
        "timeToCritical": "Critical now"
      }
    },
    "description": "Bustling junction leading into residential Beltola market district."
  },
  {
    "id": "RE-032",
    "legacyId": "RD-32",
    "name": "Beltola to Basistha Chariali",
    "roadName": "Basistha Road",
    "from": "R-032",
    "to": "R-033",
    "geometry": [
      [
        91.798,
        26.128
      ],
      [
        91.798,
        26.12667
      ],
      [
        91.798,
        26.12533
      ],
      [
        91.798,
        26.124
      ],
      [
        91.798,
        26.12233
      ],
      [
        91.798,
        26.12067
      ],
      [
        91.798,
        26.119
      ],
      [
        91.798,
        26.11767
      ],
      [
        91.798,
        26.11633
      ],
      [
        91.798,
        26.115
      ]
    ],
    "path": [
      [
        26.128,
        91.798
      ],
      [
        26.12667,
        91.798
      ],
      [
        26.12533,
        91.798
      ],
      [
        26.124,
        91.798
      ],
      [
        26.12233,
        91.798
      ],
      [
        26.12067,
        91.798
      ],
      [
        26.119,
        91.798
      ],
      [
        26.11767,
        91.798
      ],
      [
        26.11633,
        91.798
      ],
      [
        26.115,
        91.798
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.13,
        "risk": "moderate",
        "drainageStressPct": 69,
        "timeToCritical": "1 hr 55 min"
      },
      "+1HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.27,
        "risk": "moderate",
        "drainageStressPct": 89,
        "timeToCritical": "1 hr 20 min"
      },
      "+2HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.38,
        "risk": "moderate",
        "drainageStressPct": 102,
        "timeToCritical": "50 min"
      },
      "+3HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.56,
        "risk": "high",
        "drainageStressPct": 124,
        "timeToCritical": "25 min"
      }
    },
    "description": "East Beltola residential connector with open roadside conduits."
  },
  {
    "id": "RE-033",
    "legacyId": "RD-33",
    "name": "Basistha Mandir Pilgrim Route",
    "roadName": "Basistha Mandir Road",
    "from": "R-033",
    "to": "R-034",
    "geometry": [
      [
        91.798,
        26.115
      ],
      [
        91.7985,
        26.11433
      ],
      [
        91.799,
        26.11367
      ],
      [
        91.7995,
        26.113
      ],
      [
        91.8,
        26.1125
      ],
      [
        91.8005,
        26.112
      ],
      [
        91.801,
        26.1115
      ],
      [
        91.80133,
        26.111
      ],
      [
        91.80167,
        26.1105
      ],
      [
        91.802,
        26.11
      ]
    ],
    "path": [
      [
        26.115,
        91.798
      ],
      [
        26.11433,
        91.7985
      ],
      [
        26.11367,
        91.799
      ],
      [
        26.113,
        91.7995
      ],
      [
        26.1125,
        91.8
      ],
      [
        26.112,
        91.8005
      ],
      [
        26.1115,
        91.801
      ],
      [
        26.111,
        91.80133
      ],
      [
        26.1105,
        91.80167
      ],
      [
        26.11,
        91.802
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.07,
        "risk": "low",
        "drainageStressPct": 49,
        "timeToCritical": "2 hr 55 min"
      },
      "+1HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.2,
        "risk": "moderate",
        "drainageStressPct": 79,
        "timeToCritical": "1 hr 55 min"
      },
      "+2HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.31,
        "risk": "moderate",
        "drainageStressPct": 93,
        "timeToCritical": "1 hr 10 min"
      },
      "+3HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.48,
        "risk": "high",
        "drainageStressPct": 116,
        "timeToCritical": "40 min"
      }
    },
    "description": "Foothill approach road near holy Basistha stream confluence."
  },
  {
    "id": "RE-034",
    "legacyId": "RD-34",
    "name": "NH-27 \u2014 Boragaon Bypass Corridor",
    "roadName": "NH-27 Western Reach",
    "from": "R-045",
    "to": "R-042",
    "geometry": [
      [
        91.705,
        26.1365
      ],
      [
        91.70667,
        26.13533
      ],
      [
        91.70833,
        26.13417
      ],
      [
        91.71,
        26.133
      ],
      [
        91.7115,
        26.13183
      ],
      [
        91.713,
        26.13067
      ],
      [
        91.7145,
        26.1295
      ],
      [
        91.71567,
        26.12833
      ],
      [
        91.71683,
        26.12717
      ],
      [
        91.718,
        26.126
      ]
    ],
    "path": [
      [
        26.1365,
        91.705
      ],
      [
        26.13533,
        91.70667
      ],
      [
        26.13417,
        91.70833
      ],
      [
        26.133,
        91.71
      ],
      [
        26.13183,
        91.7115
      ],
      [
        26.13067,
        91.713
      ],
      [
        26.1295,
        91.7145
      ],
      [
        26.12833,
        91.71567
      ],
      [
        26.12717,
        91.71683
      ],
      [
        26.126,
        91.718
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.08,
        "risk": "low",
        "drainageStressPct": 52,
        "timeToCritical": "2 hr 45 min"
      },
      "+1HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.23,
        "risk": "moderate",
        "drainageStressPct": 83,
        "timeToCritical": "1 hr 40 min"
      },
      "+2HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.47,
        "risk": "high",
        "drainageStressPct": 113,
        "timeToCritical": "45 min"
      },
      "+3HR": {
        "riskState": "BLOCKED",
        "status": "impassable",
        "waterDepthM": 0.71,
        "risk": "critical",
        "drainageStressPct": 131,
        "timeToCritical": "Critical now"
      }
    },
    "description": "Western marshland bypass junction with Deepor Beel overflow link."
  },
  {
    "id": "RE-035",
    "legacyId": "RD-35",
    "name": "NH-27 \u2014 Gorchuk to Betkuchi",
    "roadName": "NH-27 Gorchuk",
    "from": "R-042",
    "to": "R-043",
    "geometry": [
      [
        91.718,
        26.126
      ],
      [
        91.72,
        26.1255
      ],
      [
        91.722,
        26.125
      ],
      [
        91.724,
        26.1245
      ],
      [
        91.72567,
        26.124
      ],
      [
        91.72733,
        26.1235
      ],
      [
        91.729,
        26.123
      ],
      [
        91.73033,
        26.12267
      ],
      [
        91.73167,
        26.12233
      ],
      [
        91.733,
        26.122
      ]
    ],
    "path": [
      [
        26.126,
        91.718
      ],
      [
        26.1255,
        91.72
      ],
      [
        26.125,
        91.722
      ],
      [
        26.1245,
        91.724
      ],
      [
        26.124,
        91.72567
      ],
      [
        26.1235,
        91.72733
      ],
      [
        26.123,
        91.729
      ],
      [
        26.12267,
        91.73033
      ],
      [
        26.12233,
        91.73167
      ],
      [
        26.122,
        91.733
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.06,
        "risk": "low",
        "drainageStressPct": 47,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.19,
        "risk": "moderate",
        "drainageStressPct": 77,
        "timeToCritical": "2 hr 05 min"
      },
      "+2HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.29,
        "risk": "moderate",
        "drainageStressPct": 91,
        "timeToCritical": "1 hr 20 min"
      },
      "+3HR": {
        "riskState": "HIGH RISK",
        "status": "caution",
        "waterDepthM": 0.46,
        "risk": "high",
        "drainageStressPct": 114,
        "timeToCritical": "45 min"
      }
    },
    "description": "Highway transit connector near ISBT interchange."
  },
  {
    "id": "RE-036",
    "legacyId": "RD-36",
    "name": "VIP Road Eastern Ridge Corridor",
    "roadName": "VIP Road Ridge",
    "from": "R-037",
    "to": "R-036",
    "geometry": [
      [
        91.8075,
        26.176
      ],
      [
        91.808,
        26.174
      ],
      [
        91.8085,
        26.172
      ],
      [
        91.809,
        26.17
      ],
      [
        91.8095,
        26.168
      ],
      [
        91.81,
        26.166
      ],
      [
        91.8105,
        26.164
      ],
      [
        91.81083,
        26.16233
      ],
      [
        91.81117,
        26.16067
      ],
      [
        91.8115,
        26.159
      ],
      [
        91.81167,
        26.15767
      ],
      [
        91.81183,
        26.15633
      ],
      [
        91.812,
        26.155
      ]
    ],
    "path": [
      [
        26.176,
        91.8075
      ],
      [
        26.174,
        91.808
      ],
      [
        26.172,
        91.8085
      ],
      [
        26.17,
        91.809
      ],
      [
        26.168,
        91.8095
      ],
      [
        26.166,
        91.81
      ],
      [
        26.164,
        91.8105
      ],
      [
        26.16233,
        91.81083
      ],
      [
        26.16067,
        91.81117
      ],
      [
        26.159,
        91.8115
      ],
      [
        26.15767,
        91.81167
      ],
      [
        26.15633,
        91.81183
      ],
      [
        26.155,
        91.812
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.02,
        "risk": "low",
        "drainageStressPct": 24,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.05,
        "risk": "low",
        "drainageStressPct": 38,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.09,
        "risk": "low",
        "drainageStressPct": 52,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.18,
        "risk": "moderate",
        "drainageStressPct": 76,
        "timeToCritical": "2 hr 00 min"
      }
    },
    "description": "High-elevation northern ridge corridor safely skirting depressed GS Road basins."
  },
  {
    "id": "RE-037",
    "legacyId": "RD-37",
    "name": "NH-27 Southern Bypass East",
    "roadName": "NH-27 Expressway",
    "from": "R-033",
    "to": "R-035",
    "geometry": [
      [
        91.798,
        26.115
      ],
      [
        91.80067,
        26.11517
      ],
      [
        91.80333,
        26.11533
      ],
      [
        91.806,
        26.1155
      ],
      [
        91.809,
        26.11567
      ],
      [
        91.812,
        26.11583
      ],
      [
        91.815,
        26.116
      ],
      [
        91.81833,
        26.11617
      ],
      [
        91.82167,
        26.11633
      ],
      [
        91.825,
        26.1165
      ]
    ],
    "path": [
      [
        26.115,
        91.798
      ],
      [
        26.11517,
        91.80067
      ],
      [
        26.11533,
        91.80333
      ],
      [
        26.1155,
        91.806
      ],
      [
        26.11567,
        91.809
      ],
      [
        26.11583,
        91.812
      ],
      [
        26.116,
        91.815
      ],
      [
        26.11617,
        91.81833
      ],
      [
        26.11633,
        91.82167
      ],
      [
        26.1165,
        91.825
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.02,
        "risk": "low",
        "drainageStressPct": 22,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.04,
        "risk": "low",
        "drainageStressPct": 35,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.08,
        "risk": "low",
        "drainageStressPct": 48,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.16,
        "risk": "moderate",
        "drainageStressPct": 70,
        "timeToCritical": "2 hr 15 min"
      }
    },
    "description": "Grade-separated national highway with high-capacity drainage shoulders."
  },
  {
    "id": "RE-038",
    "legacyId": "RD-38",
    "name": "NH-27 Southern Bypass Central",
    "roadName": "NH-27 Expressway",
    "from": "R-016",
    "to": "R-044",
    "geometry": [
      [
        91.745,
        26.12
      ],
      [
        91.74733,
        26.11967
      ],
      [
        91.74967,
        26.11933
      ],
      [
        91.752,
        26.119
      ],
      [
        91.754,
        26.11867
      ],
      [
        91.756,
        26.11833
      ],
      [
        91.758,
        26.118
      ],
      [
        91.76033,
        26.11767
      ],
      [
        91.76267,
        26.11733
      ],
      [
        91.765,
        26.117
      ]
    ],
    "path": [
      [
        26.12,
        91.745
      ],
      [
        26.11967,
        91.74733
      ],
      [
        26.11933,
        91.74967
      ],
      [
        26.119,
        91.752
      ],
      [
        26.11867,
        91.754
      ],
      [
        26.11833,
        91.756
      ],
      [
        26.118,
        91.758
      ],
      [
        26.11767,
        91.76033
      ],
      [
        26.11733,
        91.76267
      ],
      [
        26.117,
        91.765
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.03,
        "risk": "low",
        "drainageStressPct": 26,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.06,
        "risk": "low",
        "drainageStressPct": 39,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.11,
        "risk": "low",
        "drainageStressPct": 58,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.2,
        "risk": "moderate",
        "drainageStressPct": 78,
        "timeToCritical": "1 hr 50 min"
      }
    },
    "description": "Elevated southern bypass link avoiding Hatigaon valley basins."
  },
  {
    "id": "RE-039",
    "legacyId": "RD-39",
    "name": "NH-27 \u2014 Lalmati to Basistha Chariali",
    "roadName": "NH-27 Expressway",
    "from": "R-044",
    "to": "R-033",
    "geometry": [
      [
        91.765,
        26.117
      ],
      [
        91.76867,
        26.11683
      ],
      [
        91.77233,
        26.11667
      ],
      [
        91.776,
        26.1165
      ],
      [
        91.77967,
        26.11627
      ],
      [
        91.78333,
        26.11603
      ],
      [
        91.787,
        26.1158
      ],
      [
        91.79067,
        26.11553
      ],
      [
        91.79433,
        26.11527
      ],
      [
        91.798,
        26.115
      ]
    ],
    "path": [
      [
        26.117,
        91.765
      ],
      [
        26.11683,
        91.76867
      ],
      [
        26.11667,
        91.77233
      ],
      [
        26.1165,
        91.776
      ],
      [
        26.11627,
        91.77967
      ],
      [
        26.11603,
        91.78333
      ],
      [
        26.1158,
        91.787
      ],
      [
        26.11553,
        91.79067
      ],
      [
        26.11527,
        91.79433
      ],
      [
        26.115,
        91.798
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.03,
        "risk": "low",
        "drainageStressPct": 25,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.07,
        "risk": "low",
        "drainageStressPct": 40,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.12,
        "risk": "low",
        "drainageStressPct": 60,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.21,
        "risk": "moderate",
        "drainageStressPct": 80,
        "timeToCritical": "1 hr 45 min"
      }
    },
    "description": "Expressway section past Sarusajai stadium interchange."
  },
  {
    "id": "RE-040",
    "legacyId": "RD-40",
    "name": "MG Road Riverfront Embankment",
    "roadName": "MG Road Embankment",
    "from": "R-007",
    "to": "R-008",
    "geometry": [
      [
        91.748,
        26.185
      ],
      [
        91.7485,
        26.18567
      ],
      [
        91.749,
        26.18633
      ],
      [
        91.7495,
        26.187
      ],
      [
        91.75,
        26.18783
      ],
      [
        91.7505,
        26.18867
      ],
      [
        91.751,
        26.1895
      ],
      [
        91.75133,
        26.19017
      ],
      [
        91.75167,
        26.19083
      ],
      [
        91.752,
        26.1915
      ]
    ],
    "path": [
      [
        26.185,
        91.748
      ],
      [
        26.18567,
        91.7485
      ],
      [
        26.18633,
        91.749
      ],
      [
        26.187,
        91.7495
      ],
      [
        26.18783,
        91.75
      ],
      [
        26.18867,
        91.7505
      ],
      [
        26.1895,
        91.751
      ],
      [
        26.19017,
        91.75133
      ],
      [
        26.19083,
        91.75167
      ],
      [
        26.1915,
        91.752
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.04,
        "risk": "low",
        "drainageStressPct": 30,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.08,
        "risk": "low",
        "drainageStressPct": 45,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.14,
        "risk": "low",
        "drainageStressPct": 65,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.25,
        "risk": "moderate",
        "drainageStressPct": 88,
        "timeToCritical": "1 hr 30 min"
      }
    },
    "description": "Riverfront embankment road protected by natural river levee gradient."
  },
  {
    "id": "RE-041",
    "legacyId": "RD-41",
    "name": "Kamakhya Hill Access Road",
    "roadName": "Kamakhya Foothill Link",
    "from": "R-002",
    "to": "R-003",
    "geometry": [
      [
        91.716,
        26.162
      ],
      [
        91.71683,
        26.16267
      ],
      [
        91.71767,
        26.16333
      ],
      [
        91.7185,
        26.164
      ],
      [
        91.7195,
        26.165
      ],
      [
        91.7205,
        26.166
      ],
      [
        91.7215,
        26.167
      ],
      [
        91.72233,
        26.168
      ],
      [
        91.72317,
        26.169
      ],
      [
        91.724,
        26.17
      ]
    ],
    "path": [
      [
        26.162,
        91.716
      ],
      [
        26.16267,
        91.71683
      ],
      [
        26.16333,
        91.71767
      ],
      [
        26.164,
        91.7185
      ],
      [
        26.165,
        91.7195
      ],
      [
        26.166,
        91.7205
      ],
      [
        26.167,
        91.7215
      ],
      [
        26.168,
        91.72233
      ],
      [
        26.169,
        91.72317
      ],
      [
        26.17,
        91.724
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.01,
        "risk": "low",
        "drainageStressPct": 15,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.02,
        "risk": "low",
        "drainageStressPct": 20,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.04,
        "risk": "low",
        "drainageStressPct": 28,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.07,
        "risk": "low",
        "drainageStressPct": 42,
        "timeToCritical": ">3 hrs"
      }
    },
    "description": "Elevated bedrock roadway skirting northern hill slope."
  },
  {
    "id": "RE-042",
    "legacyId": "RD-42",
    "name": "Kamakhya Temple Ridge Way",
    "roadName": "Nilachal Ridge",
    "from": "R-003",
    "to": "R-004",
    "geometry": [
      [
        91.724,
        26.17
      ],
      [
        91.72427,
        26.1704
      ],
      [
        91.72453,
        26.1708
      ],
      [
        91.7248,
        26.1712
      ],
      [
        91.72513,
        26.17163
      ],
      [
        91.72547,
        26.17207
      ],
      [
        91.7258,
        26.1725
      ],
      [
        91.72603,
        26.17283
      ],
      [
        91.72627,
        26.17317
      ],
      [
        91.7265,
        26.1735
      ]
    ],
    "path": [
      [
        26.17,
        91.724
      ],
      [
        26.1704,
        91.72427
      ],
      [
        26.1708,
        91.72453
      ],
      [
        26.1712,
        91.7248
      ],
      [
        26.17163,
        91.72513
      ],
      [
        26.17207,
        91.72547
      ],
      [
        26.1725,
        91.7258
      ],
      [
        26.17283,
        91.72603
      ],
      [
        26.17317,
        91.72627
      ],
      [
        26.1735,
        91.7265
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.01,
        "risk": "low",
        "drainageStressPct": 14,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.02,
        "risk": "low",
        "drainageStressPct": 18,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.03,
        "risk": "low",
        "drainageStressPct": 25,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.06,
        "risk": "low",
        "drainageStressPct": 38,
        "timeToCritical": ">3 hrs"
      }
    },
    "description": "Natural high-elevation ridgeway free from urban waterlogging."
  },
  {
    "id": "RE-043",
    "legacyId": "RD-43",
    "name": "MRD Road \u2014 Noonmati to Narengi",
    "roadName": "MRD Road Eastern Sector",
    "from": "R-025",
    "to": "R-038",
    "geometry": [
      [
        91.808,
        26.184
      ],
      [
        91.80967,
        26.18417
      ],
      [
        91.81133,
        26.18433
      ],
      [
        91.813,
        26.1845
      ],
      [
        91.8145,
        26.1846
      ],
      [
        91.816,
        26.1847
      ],
      [
        91.8175,
        26.1848
      ],
      [
        91.819,
        26.18487
      ],
      [
        91.8205,
        26.18493
      ],
      [
        91.822,
        26.185
      ]
    ],
    "path": [
      [
        26.184,
        91.808
      ],
      [
        26.18417,
        91.80967
      ],
      [
        26.18433,
        91.81133
      ],
      [
        26.1845,
        91.813
      ],
      [
        26.1846,
        91.8145
      ],
      [
        26.1847,
        91.816
      ],
      [
        26.1848,
        91.8175
      ],
      [
        26.18487,
        91.819
      ],
      [
        26.18493,
        91.8205
      ],
      [
        26.185,
        91.822
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.02,
        "risk": "low",
        "drainageStressPct": 22,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.05,
        "risk": "low",
        "drainageStressPct": 35,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.09,
        "risk": "low",
        "drainageStressPct": 50,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.17,
        "risk": "moderate",
        "drainageStressPct": 74,
        "timeToCritical": "2 hr 10 min"
      }
    },
    "description": "Eastern elevated arterial running across high alluvial ground."
  },
  {
    "id": "RE-044",
    "legacyId": "RD-44",
    "name": "VIP Road \u2014 Narengi Ridge Link",
    "roadName": "VIP Road High North",
    "from": "R-038",
    "to": "R-037",
    "geometry": [
      [
        91.822,
        26.185
      ],
      [
        91.82033,
        26.184
      ],
      [
        91.81867,
        26.183
      ],
      [
        91.817,
        26.182
      ],
      [
        91.81533,
        26.181
      ],
      [
        91.81367,
        26.18
      ],
      [
        91.812,
        26.179
      ],
      [
        91.8105,
        26.178
      ],
      [
        91.809,
        26.177
      ],
      [
        91.8075,
        26.176
      ]
    ],
    "path": [
      [
        26.185,
        91.822
      ],
      [
        26.184,
        91.82033
      ],
      [
        26.183,
        91.81867
      ],
      [
        26.182,
        91.817
      ],
      [
        26.181,
        91.81533
      ],
      [
        26.18,
        91.81367
      ],
      [
        26.179,
        91.812
      ],
      [
        26.178,
        91.8105
      ],
      [
        26.177,
        91.809
      ],
      [
        26.176,
        91.8075
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.01,
        "risk": "low",
        "drainageStressPct": 18,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.03,
        "risk": "low",
        "drainageStressPct": 28,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.06,
        "risk": "low",
        "drainageStressPct": 40,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.11,
        "risk": "low",
        "drainageStressPct": 58,
        "timeToCritical": ">3 hrs"
      }
    },
    "description": "Elevated bypass sector north of Narengi army cantonment."
  },
  {
    "id": "RE-045",
    "legacyId": "RD-45",
    "name": "GNB Road \u2014 Guwahati Club to Chandmari",
    "roadName": "GNB Road Eastern Half",
    "from": "R-009",
    "to": "R-023",
    "geometry": [
      [
        91.755,
        26.186
      ],
      [
        91.75717,
        26.18617
      ],
      [
        91.75933,
        26.18633
      ],
      [
        91.7615,
        26.1865
      ],
      [
        91.76367,
        26.18673
      ],
      [
        91.76583,
        26.18697
      ],
      [
        91.768,
        26.1872
      ],
      [
        91.77017,
        26.18747
      ],
      [
        91.77233,
        26.18773
      ],
      [
        91.7745,
        26.188
      ]
    ],
    "path": [
      [
        26.186,
        91.755
      ],
      [
        26.18617,
        91.75717
      ],
      [
        26.18633,
        91.75933
      ],
      [
        26.1865,
        91.7615
      ],
      [
        26.18673,
        91.76367
      ],
      [
        26.18697,
        91.76583
      ],
      [
        26.1872,
        91.768
      ],
      [
        26.18747,
        91.77017
      ],
      [
        26.18773,
        91.77233
      ],
      [
        26.188,
        91.7745
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.03,
        "risk": "low",
        "drainageStressPct": 25,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.06,
        "risk": "low",
        "drainageStressPct": 38,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.1,
        "risk": "low",
        "drainageStressPct": 55,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.19,
        "risk": "moderate",
        "drainageStressPct": 78,
        "timeToCritical": "1 hr 50 min"
      }
    },
    "description": "Historic tree-lined avenue connecting Guwahati Club to Chandmari."
  },
  {
    "id": "RE-046",
    "legacyId": "RD-46",
    "name": "Kharghuli River Terrace Road",
    "roadName": "MG Road Extension",
    "from": "R-008",
    "to": "R-046",
    "geometry": [
      [
        91.752,
        26.1915
      ],
      [
        91.755,
        26.19217
      ],
      [
        91.758,
        26.19283
      ],
      [
        91.761,
        26.1935
      ],
      [
        91.76433,
        26.19433
      ],
      [
        91.76767,
        26.19517
      ],
      [
        91.771,
        26.196
      ],
      [
        91.774,
        26.19667
      ],
      [
        91.777,
        26.19733
      ],
      [
        91.78,
        26.198
      ]
    ],
    "path": [
      [
        26.1915,
        91.752
      ],
      [
        26.19217,
        91.755
      ],
      [
        26.19283,
        91.758
      ],
      [
        26.1935,
        91.761
      ],
      [
        26.19433,
        91.76433
      ],
      [
        26.19517,
        91.76767
      ],
      [
        26.196,
        91.771
      ],
      [
        26.19667,
        91.774
      ],
      [
        26.19733,
        91.777
      ],
      [
        26.198,
        91.78
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.01,
        "risk": "low",
        "drainageStressPct": 12,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.02,
        "risk": "low",
        "drainageStressPct": 18,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.04,
        "risk": "low",
        "drainageStressPct": 26,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.07,
        "risk": "low",
        "drainageStressPct": 39,
        "timeToCritical": ">3 hrs"
      }
    },
    "description": "High bedrock terrace overlooking the northern river bend."
  },
  {
    "id": "RE-047",
    "legacyId": "RD-47",
    "name": "B. Baruah Road \u2014 Ulubari to Guwahati Club",
    "roadName": "B. Baruah Road",
    "from": "R-017",
    "to": "R-009",
    "geometry": [
      [
        91.7565,
        26.1705
      ],
      [
        91.7564,
        26.17183
      ],
      [
        91.7563,
        26.17317
      ],
      [
        91.7562,
        26.1745
      ],
      [
        91.75607,
        26.176
      ],
      [
        91.75593,
        26.1775
      ],
      [
        91.7558,
        26.179
      ],
      [
        91.75567,
        26.18033
      ],
      [
        91.75553,
        26.18167
      ],
      [
        91.7554,
        26.183
      ],
      [
        91.75527,
        26.184
      ],
      [
        91.75513,
        26.185
      ],
      [
        91.755,
        26.186
      ]
    ],
    "path": [
      [
        26.1705,
        91.7565
      ],
      [
        26.17183,
        91.7564
      ],
      [
        26.17317,
        91.7563
      ],
      [
        26.1745,
        91.7562
      ],
      [
        26.176,
        91.75607
      ],
      [
        26.1775,
        91.75593
      ],
      [
        26.179,
        91.7558
      ],
      [
        26.18033,
        91.75567
      ],
      [
        26.18167,
        91.75553
      ],
      [
        26.183,
        91.7554
      ],
      [
        26.184,
        91.75527
      ],
      [
        26.185,
        91.75513
      ],
      [
        26.186,
        91.755
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.02,
        "risk": "low",
        "drainageStressPct": 20,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.04,
        "risk": "low",
        "drainageStressPct": 30,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.07,
        "risk": "low",
        "drainageStressPct": 44,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.12,
        "risk": "low",
        "drainageStressPct": 60,
        "timeToCritical": ">3 hrs"
      }
    },
    "description": "Direct arterial link past Nehru Stadium connecting GS Road to GNB Road."
  },
  {
    "id": "RE-048",
    "legacyId": "RD-48",
    "name": "GNB Road \u2014 Panbazar to Guwahati Club",
    "roadName": "GNB Road Western Half",
    "from": "R-007",
    "to": "R-009",
    "geometry": [
      [
        91.748,
        26.185
      ],
      [
        91.74883,
        26.1851
      ],
      [
        91.74967,
        26.1852
      ],
      [
        91.7505,
        26.1853
      ],
      [
        91.75127,
        26.1854
      ],
      [
        91.75203,
        26.1855
      ],
      [
        91.7528,
        26.1856
      ],
      [
        91.75353,
        26.18573
      ],
      [
        91.75427,
        26.18587
      ],
      [
        91.755,
        26.186
      ]
    ],
    "path": [
      [
        26.185,
        91.748
      ],
      [
        26.1851,
        91.74883
      ],
      [
        26.1852,
        91.74967
      ],
      [
        26.1853,
        91.7505
      ],
      [
        26.1854,
        91.75127
      ],
      [
        26.1855,
        91.75203
      ],
      [
        26.1856,
        91.7528
      ],
      [
        26.18573,
        91.75353
      ],
      [
        26.18587,
        91.75427
      ],
      [
        26.186,
        91.755
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.01,
        "risk": "low",
        "drainageStressPct": 15,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.03,
        "risk": "low",
        "drainageStressPct": 24,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.05,
        "risk": "low",
        "drainageStressPct": 36,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.09,
        "risk": "low",
        "drainageStressPct": 52,
        "timeToCritical": ">3 hrs"
      }
    },
    "description": "Historic central civic avenue past Nehru Park and Reserve Bank."
  },
  {
    "id": "RE-049",
    "legacyId": "RD-49",
    "name": "MRD Road \u2014 Chandmari to Bamunimaidam",
    "roadName": "MRD Road Western Sector",
    "from": "R-023",
    "to": "R-024",
    "geometry": [
      [
        91.7745,
        26.188
      ],
      [
        91.776,
        26.18773
      ],
      [
        91.7775,
        26.18747
      ],
      [
        91.779,
        26.1872
      ],
      [
        91.7805,
        26.187
      ],
      [
        91.782,
        26.1868
      ],
      [
        91.7835,
        26.1866
      ],
      [
        91.785,
        26.1864
      ],
      [
        91.7865,
        26.1862
      ],
      [
        91.788,
        26.186
      ]
    ],
    "path": [
      [
        26.188,
        91.7745
      ],
      [
        26.18773,
        91.776
      ],
      [
        26.18747,
        91.7775
      ],
      [
        26.1872,
        91.779
      ],
      [
        26.187,
        91.7805
      ],
      [
        26.1868,
        91.782
      ],
      [
        26.1866,
        91.7835
      ],
      [
        26.1864,
        91.785
      ],
      [
        26.1862,
        91.7865
      ],
      [
        26.186,
        91.788
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.01,
        "risk": "low",
        "drainageStressPct": 16,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.03,
        "risk": "low",
        "drainageStressPct": 25,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.05,
        "risk": "low",
        "drainageStressPct": 37,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.08,
        "risk": "low",
        "drainageStressPct": 50,
        "timeToCritical": ">3 hrs"
      }
    },
    "description": "Connecting Chandmari overpass to Bamunimaidam railway district."
  },
  {
    "id": "RE-050",
    "legacyId": "RD-50",
    "name": "Uzanbazar High Terrace Street",
    "roadName": "Uzanbazar Terrace",
    "from": "R-007",
    "to": "R-008",
    "geometry": [
      [
        91.748,
        26.185
      ],
      [
        91.7485,
        26.18583
      ],
      [
        91.749,
        26.18667
      ],
      [
        91.7495,
        26.1875
      ],
      [
        91.75,
        26.18817
      ],
      [
        91.7505,
        26.18883
      ],
      [
        91.751,
        26.1895
      ],
      [
        91.75133,
        26.19017
      ],
      [
        91.75167,
        26.19083
      ],
      [
        91.752,
        26.1915
      ]
    ],
    "path": [
      [
        26.185,
        91.748
      ],
      [
        26.18583,
        91.7485
      ],
      [
        26.18667,
        91.749
      ],
      [
        26.1875,
        91.7495
      ],
      [
        26.18817,
        91.75
      ],
      [
        26.18883,
        91.7505
      ],
      [
        26.1895,
        91.751
      ],
      [
        26.19017,
        91.75133
      ],
      [
        26.19083,
        91.75167
      ],
      [
        26.1915,
        91.752
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.02,
        "risk": "low",
        "drainageStressPct": 20,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.05,
        "risk": "low",
        "drainageStressPct": 32,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.08,
        "risk": "low",
        "drainageStressPct": 47,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.16,
        "risk": "moderate",
        "drainageStressPct": 70,
        "timeToCritical": "2 hr 15 min"
      }
    },
    "description": "High residential terrace overlooking the northern river bend."
  },
  {
    "id": "RE-051",
    "legacyId": "RD-51",
    "name": "Dighalipukhuri Loop North",
    "roadName": "Civic Lake Road",
    "from": "R-007",
    "to": "R-049",
    "geometry": [
      [
        91.748,
        26.185
      ],
      [
        91.74833,
        26.18507
      ],
      [
        91.74867,
        26.18513
      ],
      [
        91.749,
        26.1852
      ],
      [
        91.74933,
        26.18513
      ],
      [
        91.74967,
        26.18507
      ],
      [
        91.75,
        26.185
      ],
      [
        91.75033,
        26.18493
      ],
      [
        91.75067,
        26.18487
      ],
      [
        91.751,
        26.1848
      ]
    ],
    "path": [
      [
        26.185,
        91.748
      ],
      [
        26.18507,
        91.74833
      ],
      [
        26.18513,
        91.74867
      ],
      [
        26.1852,
        91.749
      ],
      [
        26.18513,
        91.74933
      ],
      [
        26.18507,
        91.74967
      ],
      [
        26.185,
        91.75
      ],
      [
        26.18493,
        91.75033
      ],
      [
        26.18487,
        91.75067
      ],
      [
        26.1848,
        91.751
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.03,
        "risk": "low",
        "drainageStressPct": 24,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.06,
        "risk": "low",
        "drainageStressPct": 38,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.1,
        "risk": "low",
        "drainageStressPct": 54,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.19,
        "risk": "moderate",
        "drainageStressPct": 76,
        "timeToCritical": "1 hr 55 min"
      }
    },
    "description": "Cultural loop high crossway linking GNB Road to Latasil."
  },
  {
    "id": "RE-052",
    "legacyId": "RD-52",
    "name": "Dighalipukhuri East High Street",
    "roadName": "Civic Lake East",
    "from": "R-049",
    "to": "R-009",
    "geometry": [
      [
        91.751,
        26.1848
      ],
      [
        91.7515,
        26.18493
      ],
      [
        91.752,
        26.18507
      ],
      [
        91.7525,
        26.1852
      ],
      [
        91.75293,
        26.18533
      ],
      [
        91.75337,
        26.18547
      ],
      [
        91.7538,
        26.1856
      ],
      [
        91.7542,
        26.18573
      ],
      [
        91.7546,
        26.18587
      ],
      [
        91.755,
        26.186
      ]
    ],
    "path": [
      [
        26.1848,
        91.751
      ],
      [
        26.18493,
        91.7515
      ],
      [
        26.18507,
        91.752
      ],
      [
        26.1852,
        91.7525
      ],
      [
        26.18533,
        91.75293
      ],
      [
        26.18547,
        91.75337
      ],
      [
        26.1856,
        91.7538
      ],
      [
        26.18573,
        91.7542
      ],
      [
        26.18587,
        91.7546
      ],
      [
        26.186,
        91.755
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.02,
        "risk": "low",
        "drainageStressPct": 21,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.05,
        "risk": "low",
        "drainageStressPct": 34,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.08,
        "risk": "low",
        "drainageStressPct": 48,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.17,
        "risk": "moderate",
        "drainageStressPct": 72,
        "timeToCritical": "2 hr 05 min"
      }
    },
    "description": "Elevated tree-lined avenue bordering historic civic lake."
  },
  {
    "id": "RE-053",
    "legacyId": "RD-53",
    "name": "Paltan Bazar Station Approach",
    "roadName": "AK Azad Road North",
    "from": "R-010",
    "to": "R-011",
    "geometry": [
      [
        91.751,
        26.1772
      ],
      [
        91.75073,
        26.1764
      ],
      [
        91.75047,
        26.1756
      ],
      [
        91.7502,
        26.1748
      ],
      [
        91.74997,
        26.17403
      ],
      [
        91.74973,
        26.17327
      ],
      [
        91.7495,
        26.1725
      ],
      [
        91.74933,
        26.17167
      ],
      [
        91.74917,
        26.17083
      ],
      [
        91.749,
        26.17
      ]
    ],
    "path": [
      [
        26.1772,
        91.751
      ],
      [
        26.1764,
        91.75073
      ],
      [
        26.1756,
        91.75047
      ],
      [
        26.1748,
        91.7502
      ],
      [
        26.17403,
        91.74997
      ],
      [
        26.17327,
        91.74973
      ],
      [
        26.1725,
        91.7495
      ],
      [
        26.17167,
        91.74933
      ],
      [
        26.17083,
        91.74917
      ],
      [
        26.17,
        91.749
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.04,
        "risk": "low",
        "drainageStressPct": 32,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.08,
        "risk": "low",
        "drainageStressPct": 48,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.14,
        "risk": "low",
        "drainageStressPct": 66,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.23,
        "risk": "moderate",
        "drainageStressPct": 86,
        "timeToCritical": "1 hr 35 min"
      }
    },
    "description": "South access road from railway station terminal toward Rehabari."
  },
  {
    "id": "RE-054",
    "legacyId": "RD-54",
    "name": "AK Azad Road \u2014 Arya Nagar to Sarabbhati",
    "roadName": "AK Azad Road",
    "from": "R-012",
    "to": "R-013",
    "geometry": [
      [
        91.748,
        26.164
      ],
      [
        91.74773,
        26.163
      ],
      [
        91.74747,
        26.162
      ],
      [
        91.7472,
        26.161
      ],
      [
        91.747,
        26.16
      ],
      [
        91.7468,
        26.159
      ],
      [
        91.7466,
        26.158
      ],
      [
        91.7464,
        26.157
      ],
      [
        91.7462,
        26.156
      ],
      [
        91.746,
        26.155
      ]
    ],
    "path": [
      [
        26.164,
        91.748
      ],
      [
        26.163,
        91.74773
      ],
      [
        26.162,
        91.74747
      ],
      [
        26.161,
        91.7472
      ],
      [
        26.16,
        91.747
      ],
      [
        26.159,
        91.7468
      ],
      [
        26.158,
        91.7466
      ],
      [
        26.157,
        91.7464
      ],
      [
        26.156,
        91.7462
      ],
      [
        26.155,
        91.746
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.05,
        "risk": "low",
        "drainageStressPct": 36,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.09,
        "risk": "low",
        "drainageStressPct": 51,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.15,
        "risk": "low",
        "drainageStressPct": 68,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.25,
        "risk": "moderate",
        "drainageStressPct": 88,
        "timeToCritical": "1 hr 30 min"
      }
    },
    "description": "Mid-elevation urban road connecting Arya Nagar to Sarabbhati."
  },
  {
    "id": "RE-055",
    "legacyId": "RD-55",
    "name": "AK Azad Road \u2014 Sarabbhati to Lalganesh",
    "roadName": "AK Azad Road",
    "from": "R-013",
    "to": "R-014",
    "geometry": [
      [
        91.746,
        26.155
      ],
      [
        91.74587,
        26.15367
      ],
      [
        91.74573,
        26.15233
      ],
      [
        91.7456,
        26.151
      ],
      [
        91.74547,
        26.14967
      ],
      [
        91.74533,
        26.14833
      ],
      [
        91.7452,
        26.147
      ],
      [
        91.74513,
        26.14567
      ],
      [
        91.74507,
        26.14433
      ],
      [
        91.745,
        26.143
      ]
    ],
    "path": [
      [
        26.155,
        91.746
      ],
      [
        26.15367,
        91.74587
      ],
      [
        26.15233,
        91.74573
      ],
      [
        26.151,
        91.7456
      ],
      [
        26.14967,
        91.74547
      ],
      [
        26.14833,
        91.74533
      ],
      [
        26.147,
        91.7452
      ],
      [
        26.14567,
        91.74513
      ],
      [
        26.14433,
        91.74507
      ],
      [
        26.143,
        91.745
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.03,
        "risk": "low",
        "drainageStressPct": 26,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.06,
        "risk": "low",
        "drainageStressPct": 40,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.11,
        "risk": "low",
        "drainageStressPct": 56,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.2,
        "risk": "moderate",
        "drainageStressPct": 80,
        "timeToCritical": "1 hr 45 min"
      }
    },
    "description": "Gentle hillside terrace street through Cycle Factory."
  },
  {
    "id": "RE-056",
    "legacyId": "RD-56",
    "name": "AK Azad Road \u2014 Lalganesh to Odalbakra",
    "roadName": "AK Azad Road South",
    "from": "R-014",
    "to": "R-015",
    "geometry": [
      [
        91.745,
        26.143
      ],
      [
        91.74527,
        26.14217
      ],
      [
        91.74553,
        26.14133
      ],
      [
        91.7458,
        26.1405
      ],
      [
        91.74603,
        26.13967
      ],
      [
        91.74627,
        26.13883
      ],
      [
        91.7465,
        26.138
      ],
      [
        91.74667,
        26.13733
      ],
      [
        91.74683,
        26.13667
      ],
      [
        91.747,
        26.136
      ]
    ],
    "path": [
      [
        26.143,
        91.745
      ],
      [
        26.14217,
        91.74527
      ],
      [
        26.14133,
        91.74553
      ],
      [
        26.1405,
        91.7458
      ],
      [
        26.13967,
        91.74603
      ],
      [
        26.13883,
        91.74627
      ],
      [
        26.138,
        91.7465
      ],
      [
        26.13733,
        91.74667
      ],
      [
        26.13667,
        91.74683
      ],
      [
        26.136,
        91.747
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.02,
        "risk": "low",
        "drainageStressPct": 22,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.05,
        "risk": "low",
        "drainageStressPct": 35,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.09,
        "risk": "low",
        "drainageStressPct": 50,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.18,
        "risk": "moderate",
        "drainageStressPct": 75,
        "timeToCritical": "2 hr 00 min"
      }
    },
    "description": "Roadway linking Lalganesh to Odalbakra junction."
  },
  {
    "id": "RE-057",
    "legacyId": "RD-57",
    "name": "AK Azad Road \u2014 Odalbakra to Lokhra Chariali",
    "roadName": "AK Azad Road Expressway Link",
    "from": "R-015",
    "to": "R-016",
    "geometry": [
      [
        91.747,
        26.136
      ],
      [
        91.74683,
        26.13433
      ],
      [
        91.74667,
        26.13267
      ],
      [
        91.7465,
        26.131
      ],
      [
        91.74627,
        26.12917
      ],
      [
        91.74603,
        26.12733
      ],
      [
        91.7458,
        26.1255
      ],
      [
        91.74553,
        26.12367
      ],
      [
        91.74527,
        26.12183
      ],
      [
        91.745,
        26.12
      ]
    ],
    "path": [
      [
        26.136,
        91.747
      ],
      [
        26.13433,
        91.74683
      ],
      [
        26.13267,
        91.74667
      ],
      [
        26.131,
        91.7465
      ],
      [
        26.12917,
        91.74627
      ],
      [
        26.12733,
        91.74603
      ],
      [
        26.1255,
        91.7458
      ],
      [
        26.12367,
        91.74553
      ],
      [
        26.12183,
        91.74527
      ],
      [
        26.12,
        91.745
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.03,
        "risk": "low",
        "drainageStressPct": 25,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.07,
        "risk": "low",
        "drainageStressPct": 41,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.12,
        "risk": "low",
        "drainageStressPct": 59,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.22,
        "risk": "moderate",
        "drainageStressPct": 82,
        "timeToCritical": "1 hr 40 min"
      }
    },
    "description": "Elevated bedrock street leading to the NH-27 bypass at Lokhra."
  },
  {
    "id": "RE-058",
    "legacyId": "RD-58",
    "name": "Bhetapara to NH-27 Lalmati Link",
    "roadName": "Bhetapara South",
    "from": "R-040",
    "to": "R-044",
    "geometry": [
      [
        91.767,
        26.1265
      ],
      [
        91.76683,
        26.1255
      ],
      [
        91.76667,
        26.1245
      ],
      [
        91.7665,
        26.1235
      ],
      [
        91.76627,
        26.12233
      ],
      [
        91.76603,
        26.12117
      ],
      [
        91.7658,
        26.12
      ],
      [
        91.76553,
        26.119
      ],
      [
        91.76527,
        26.118
      ],
      [
        91.765,
        26.117
      ]
    ],
    "path": [
      [
        26.1265,
        91.767
      ],
      [
        26.1255,
        91.76683
      ],
      [
        26.1245,
        91.76667
      ],
      [
        26.1235,
        91.7665
      ],
      [
        26.12233,
        91.76627
      ],
      [
        26.12117,
        91.76603
      ],
      [
        26.12,
        91.7658
      ],
      [
        26.119,
        91.76553
      ],
      [
        26.118,
        91.76527
      ],
      [
        26.117,
        91.765
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.02,
        "risk": "low",
        "drainageStressPct": 20,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.05,
        "risk": "low",
        "drainageStressPct": 34,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.09,
        "risk": "low",
        "drainageStressPct": 51,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.18,
        "risk": "moderate",
        "drainageStressPct": 75,
        "timeToCritical": "2 hr 05 min"
      }
    },
    "description": "Foothill highway link connecting Bhetapara to NH-27."
  },
  {
    "id": "RE-059",
    "legacyId": "RD-59",
    "name": "NH-27 \u2014 Betkuchi to Lokhra",
    "roadName": "NH-27 Central",
    "from": "R-043",
    "to": "R-016",
    "geometry": [
      [
        91.733,
        26.122
      ],
      [
        91.73433,
        26.12183
      ],
      [
        91.73567,
        26.12167
      ],
      [
        91.737,
        26.1215
      ],
      [
        91.73833,
        26.12127
      ],
      [
        91.73967,
        26.12103
      ],
      [
        91.741,
        26.1208
      ],
      [
        91.74233,
        26.12053
      ],
      [
        91.74367,
        26.12027
      ],
      [
        91.745,
        26.12
      ]
    ],
    "path": [
      [
        26.122,
        91.733
      ],
      [
        26.12183,
        91.73433
      ],
      [
        26.12167,
        91.73567
      ],
      [
        26.1215,
        91.737
      ],
      [
        26.12127,
        91.73833
      ],
      [
        26.12103,
        91.73967
      ],
      [
        26.1208,
        91.741
      ],
      [
        26.12053,
        91.74233
      ],
      [
        26.12027,
        91.74367
      ],
      [
        26.12,
        91.745
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.02,
        "risk": "low",
        "drainageStressPct": 22,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.04,
        "risk": "low",
        "drainageStressPct": 35,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.08,
        "risk": "low",
        "drainageStressPct": 49,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.17,
        "risk": "moderate",
        "drainageStressPct": 72,
        "timeToCritical": "2 hr 10 min"
      }
    },
    "description": "Southern bypass grade separation carrying national highway traffic."
  },
  {
    "id": "RE-060",
    "legacyId": "RD-60",
    "name": "Kahilipara to Dispur Link",
    "roadName": "Kahilipara Road",
    "from": "R-021",
    "to": "R-041",
    "geometry": [
      [
        91.782,
        26.1495
      ],
      [
        91.78133,
        26.14817
      ],
      [
        91.78067,
        26.14683
      ],
      [
        91.78,
        26.1455
      ],
      [
        91.77917,
        26.14417
      ],
      [
        91.77833,
        26.14283
      ],
      [
        91.7775,
        26.1415
      ],
      [
        91.77667,
        26.14033
      ],
      [
        91.77583,
        26.13917
      ],
      [
        91.775,
        26.138
      ]
    ],
    "path": [
      [
        26.1495,
        91.782
      ],
      [
        26.14817,
        91.78133
      ],
      [
        26.14683,
        91.78067
      ],
      [
        26.1455,
        91.78
      ],
      [
        26.14417,
        91.77917
      ],
      [
        26.14283,
        91.77833
      ],
      [
        26.1415,
        91.7775
      ],
      [
        26.14033,
        91.77667
      ],
      [
        26.13917,
        91.77583
      ],
      [
        26.138,
        91.775
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.03,
        "risk": "low",
        "drainageStressPct": 24,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.06,
        "risk": "low",
        "drainageStressPct": 38,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.1,
        "risk": "low",
        "drainageStressPct": 53,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.19,
        "risk": "moderate",
        "drainageStressPct": 76,
        "timeToCritical": "1 hr 55 min"
      }
    },
    "description": "Modern connector street with reinforced roadside box-culverts."
  },
  {
    "id": "RE-061",
    "legacyId": "RD-61",
    "name": "ISBT Terminal Access Highway Ramp",
    "roadName": "NH-27 ISBT Interchange",
    "from": "R-042",
    "to": "R-045",
    "geometry": [
      [
        91.718,
        26.126
      ],
      [
        91.71683,
        26.12717
      ],
      [
        91.71567,
        26.12833
      ],
      [
        91.7145,
        26.1295
      ],
      [
        91.713,
        26.13067
      ],
      [
        91.7115,
        26.13183
      ],
      [
        91.71,
        26.133
      ],
      [
        91.70833,
        26.13417
      ],
      [
        91.70667,
        26.13533
      ],
      [
        91.705,
        26.1365
      ]
    ],
    "path": [
      [
        26.126,
        91.718
      ],
      [
        26.12717,
        91.71683
      ],
      [
        26.12833,
        91.71567
      ],
      [
        26.1295,
        91.7145
      ],
      [
        26.13067,
        91.713
      ],
      [
        26.13183,
        91.7115
      ],
      [
        26.133,
        91.71
      ],
      [
        26.13417,
        91.70833
      ],
      [
        26.13533,
        91.70667
      ],
      [
        26.1365,
        91.705
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.02,
        "risk": "low",
        "drainageStressPct": 21,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.05,
        "risk": "low",
        "drainageStressPct": 33,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.09,
        "risk": "low",
        "drainageStressPct": 49,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.18,
        "risk": "moderate",
        "drainageStressPct": 73,
        "timeToCritical": "2 hr 05 min"
      }
    },
    "description": "Inter-State Bus Terminal dedicated expressway access ramps."
  },
  {
    "id": "RE-062",
    "legacyId": "RD-62",
    "name": "NH-27 \u2014 Jalukbari to Boragaon",
    "roadName": "NH-27 Western Arc",
    "from": "R-001",
    "to": "R-045",
    "geometry": [
      [
        91.6885,
        26.151
      ],
      [
        91.68983,
        26.14983
      ],
      [
        91.69117,
        26.14867
      ],
      [
        91.6925,
        26.1475
      ],
      [
        91.694,
        26.14617
      ],
      [
        91.6955,
        26.14483
      ],
      [
        91.697,
        26.1435
      ],
      [
        91.69833,
        26.14233
      ],
      [
        91.69967,
        26.14117
      ],
      [
        91.701,
        26.14
      ],
      [
        91.70233,
        26.13883
      ],
      [
        91.70367,
        26.13767
      ],
      [
        91.705,
        26.1365
      ]
    ],
    "path": [
      [
        26.151,
        91.6885
      ],
      [
        26.14983,
        91.68983
      ],
      [
        26.14867,
        91.69117
      ],
      [
        26.1475,
        91.6925
      ],
      [
        26.14617,
        91.694
      ],
      [
        26.14483,
        91.6955
      ],
      [
        26.1435,
        91.697
      ],
      [
        26.14233,
        91.69833
      ],
      [
        26.14117,
        91.69967
      ],
      [
        26.14,
        91.701
      ],
      [
        26.13883,
        91.70233
      ],
      [
        26.13767,
        91.70367
      ],
      [
        26.1365,
        91.705
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.01,
        "risk": "low",
        "drainageStressPct": 15,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.03,
        "risk": "low",
        "drainageStressPct": 24,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.05,
        "risk": "low",
        "drainageStressPct": 35,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.09,
        "risk": "low",
        "drainageStressPct": 52,
        "timeToCritical": ">3 hrs"
      }
    },
    "description": "Elevated western entry arc skirting Deepor Beel sanctuary."
  },
  {
    "id": "RE-063",
    "legacyId": "RD-63",
    "name": "NH-27 Flyover Deck (Gorchuk)",
    "roadName": "NH-27 Elevated",
    "from": "R-042",
    "to": "R-043",
    "geometry": [
      [
        91.718,
        26.126
      ],
      [
        91.72,
        26.1255
      ],
      [
        91.722,
        26.125
      ],
      [
        91.724,
        26.1245
      ],
      [
        91.72567,
        26.124
      ],
      [
        91.72733,
        26.1235
      ],
      [
        91.729,
        26.123
      ],
      [
        91.73033,
        26.12267
      ],
      [
        91.73167,
        26.12233
      ],
      [
        91.733,
        26.122
      ]
    ],
    "path": [
      [
        26.126,
        91.718
      ],
      [
        26.1255,
        91.72
      ],
      [
        26.125,
        91.722
      ],
      [
        26.1245,
        91.724
      ],
      [
        26.124,
        91.72567
      ],
      [
        26.1235,
        91.72733
      ],
      [
        26.123,
        91.729
      ],
      [
        26.12267,
        91.73033
      ],
      [
        26.12233,
        91.73167
      ],
      [
        26.122,
        91.733
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.01,
        "risk": "low",
        "drainageStressPct": 16,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.03,
        "risk": "low",
        "drainageStressPct": 26,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.06,
        "risk": "low",
        "drainageStressPct": 38,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.1,
        "risk": "low",
        "drainageStressPct": 55,
        "timeToCritical": ">3 hrs"
      }
    },
    "description": "Elevated bypass deck running over low agricultural land."
  },
  {
    "id": "RE-064",
    "legacyId": "RD-64",
    "name": "Pamohi River Buffer Ridge Road",
    "roadName": "Deepor Ridge",
    "from": "R-001",
    "to": "R-045",
    "geometry": [
      [
        91.6885,
        26.151
      ],
      [
        91.69,
        26.14983
      ],
      [
        91.6915,
        26.14867
      ],
      [
        91.693,
        26.1475
      ],
      [
        91.69483,
        26.14567
      ],
      [
        91.69667,
        26.14383
      ],
      [
        91.6985,
        26.142
      ],
      [
        91.70067,
        26.14017
      ],
      [
        91.70283,
        26.13833
      ],
      [
        91.705,
        26.1365
      ]
    ],
    "path": [
      [
        26.151,
        91.6885
      ],
      [
        26.14983,
        91.69
      ],
      [
        26.14867,
        91.6915
      ],
      [
        26.1475,
        91.693
      ],
      [
        26.14567,
        91.69483
      ],
      [
        26.14383,
        91.69667
      ],
      [
        26.142,
        91.6985
      ],
      [
        26.14017,
        91.70067
      ],
      [
        26.13833,
        91.70283
      ],
      [
        26.1365,
        91.705
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.02,
        "risk": "low",
        "drainageStressPct": 22,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.05,
        "risk": "low",
        "drainageStressPct": 34,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.08,
        "risk": "low",
        "drainageStressPct": 48,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "MODERATE",
        "status": "caution",
        "waterDepthM": 0.17,
        "risk": "moderate",
        "drainageStressPct": 71,
        "timeToCritical": "2 hr 10 min"
      }
    },
    "description": "High ridge corridor west of Pamohi river buffer."
  },
  {
    "id": "RE-065",
    "legacyId": "RD-65",
    "name": "Deepor Beel North Perimeter Road",
    "roadName": "Deepor Eco-Corridor",
    "from": "R-001",
    "to": "R-045",
    "geometry": [
      [
        91.6885,
        26.151
      ],
      [
        91.69033,
        26.14933
      ],
      [
        91.69217,
        26.14767
      ],
      [
        91.694,
        26.146
      ],
      [
        91.69583,
        26.14433
      ],
      [
        91.69767,
        26.14267
      ],
      [
        91.6995,
        26.141
      ],
      [
        91.70133,
        26.1395
      ],
      [
        91.70317,
        26.138
      ],
      [
        91.705,
        26.1365
      ]
    ],
    "path": [
      [
        26.151,
        91.6885
      ],
      [
        26.14933,
        91.69033
      ],
      [
        26.14767,
        91.69217
      ],
      [
        26.146,
        91.694
      ],
      [
        26.14433,
        91.69583
      ],
      [
        26.14267,
        91.69767
      ],
      [
        26.141,
        91.6995
      ],
      [
        26.1395,
        91.70133
      ],
      [
        26.138,
        91.70317
      ],
      [
        26.1365,
        91.705
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.02,
        "risk": "low",
        "drainageStressPct": 20,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.04,
        "risk": "low",
        "drainageStressPct": 32,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.07,
        "risk": "low",
        "drainageStressPct": 45,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.12,
        "risk": "low",
        "drainageStressPct": 62,
        "timeToCritical": ">3 hrs"
      }
    },
    "description": "Elevated eco-corridor running along the northern perimeter of Deepor Beel."
  },
  {
    "id": "RE-066",
    "legacyId": "RD-66",
    "name": "Khanapara Meghalaya Plateau Highway",
    "roadName": "GS Road Highway South",
    "from": "R-035",
    "to": "R-035",
    "geometry": [
      [
        91.825,
        26.1165
      ],
      [
        91.82567,
        26.11567
      ],
      [
        91.82633,
        26.11483
      ],
      [
        91.827,
        26.114
      ],
      [
        91.82783,
        26.113
      ],
      [
        91.82867,
        26.112
      ],
      [
        91.8295,
        26.111
      ],
      [
        91.83027,
        26.11
      ],
      [
        91.83103,
        26.109
      ],
      [
        91.8318,
        26.108
      ],
      [
        91.83253,
        26.107
      ],
      [
        91.83327,
        26.106
      ],
      [
        91.834,
        26.105
      ]
    ],
    "path": [
      [
        26.1165,
        91.825
      ],
      [
        26.11567,
        91.82567
      ],
      [
        26.11483,
        91.82633
      ],
      [
        26.114,
        91.827
      ],
      [
        26.113,
        91.82783
      ],
      [
        26.112,
        91.82867
      ],
      [
        26.111,
        91.8295
      ],
      [
        26.11,
        91.83027
      ],
      [
        26.109,
        91.83103
      ],
      [
        26.108,
        91.8318
      ],
      [
        26.107,
        91.83253
      ],
      [
        26.106,
        91.83327
      ],
      [
        26.105,
        91.834
      ]
    ],
    "timesteps": {
      "NOW": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.01,
        "risk": "low",
        "drainageStressPct": 14,
        "timeToCritical": ">3 hrs"
      },
      "+1HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.03,
        "risk": "low",
        "drainageStressPct": 22,
        "timeToCritical": ">3 hrs"
      },
      "+2HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.05,
        "risk": "low",
        "drainageStressPct": 32,
        "timeToCritical": ">3 hrs"
      },
      "+3HR": {
        "riskState": "NORMAL",
        "status": "clear",
        "waterDepthM": 0.08,
        "risk": "low",
        "drainageStressPct": 48,
        "timeToCritical": ">3 hrs"
      }
    },
    "description": "Inter-state border highway climbing steadily into Shillong plateau bedrock."
  }
];
