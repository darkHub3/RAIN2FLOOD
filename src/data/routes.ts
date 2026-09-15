import { RouteScenario } from '../types';

export const ROUTING_DISCLAIMER =
  "SIMULATED ROUTING SCENARIO: Predefined demonstration routes illustrating how simulated flood inundation and surcharged drainage segments would be integrated into an elevation-aware routing engine. This is an idea-stage demonstrator and not a live navigation service.";

export const ROUTE_SCENARIOS: RouteScenario[] = [
  {
    id: "route-01",
    title: "Paltan Bazar to Beltola",
    origin: "Paltan Bazar Station",
    destination: "Beltola Tiniali",
    originCoords: [26.1772, 91.7510],
    destCoords: [26.1280, 91.7980],
    normalRoute: {
      path: [
        [26.1772, 91.7510],
        [26.1685, 91.7580],
        [26.1585, 91.7685],
        [26.1540, 91.7790],
        [26.1480, 91.7875],
        [26.1445, 91.8010],
        [26.1390, 91.7990],
        [26.1320, 91.8110],
        [26.1280, 91.7980]
      ],
      distanceKm: 8.4,
      estTimeMin: 45,
      floodExposure: "HIGH",
      maxDepthM: 0.64,
      status: "IMPASSABLE / HIGH FLOOD EXPOSURE",
      notes: "Direct corridor via GS Road traverses severe flood bottlenecks at Bhangagarh and Rukminigaon.",
      floodedSegments: [
        "GS Road (Bhangagarh) - Surcharged Conduit D-027",
        "Rukminigaon Lowland Culvert D-033 (>0.6m water depth)",
        "Ganeshguri Underpass Accumulation"
      ]
    },
    safeRoute: {
      path: [
        [26.1772, 91.7510],
        [26.1850, 91.7495],
        [26.1880, 91.7745],
        [26.1750, 91.8020],
        [26.1550, 91.8150],
        [26.1410, 91.8190],
        [26.1320, 91.8110],
        [26.1280, 91.7980]
      ],
      distanceKm: 9.1,
      estTimeMin: 28,
      floodExposure: "LOW",
      maxDepthM: 0.12,
      status: "LOWER SIMULATED FLOOD EXPOSURE",
      notes: "Rerouted via northern Chandmari ridge and VIP Road eastern elevated corridor, avoiding depressed GS Road basins.",
      elevationAdvantageM: 5.8
    }
  },
  {
    id: "route-02",
    title: "Chandmari to Jalukbari",
    origin: "Chandmari Engineering Hub",
    destination: "Jalukbari Rotary",
    originCoords: [26.1880, 91.7745],
    destCoords: [26.1510, 91.6885],
    normalRoute: {
      path: [
        [26.1880, 91.7745],
        [26.1770, 91.7710],
        [26.1715, 91.7640],
        [26.1685, 91.7580],
        [26.1702, 91.7225],
        [26.1552, 91.7042],
        [26.1510, 91.6885]
      ],
      distanceKm: 9.8,
      estTimeMin: 52,
      floodExposure: "HIGH",
      maxDepthM: 0.72,
      status: "IMPASSABLE / HIGH FLOOD EXPOSURE",
      notes: "Passes directly through the Anil Nagar low-lying depression and surcharged Santipur collectors.",
      floodedSegments: [
        "Anil Nagar Sump Zone (Inlet N-012 surcharged)",
        "Santipur Riverside Lowland D-005"
      ]
    },
    safeRoute: {
      path: [
        [26.1880, 91.7745],
        [26.1915, 91.7585],
        [26.1850, 91.7495],
        [26.1835, 91.7410],
        [26.1758, 91.7285],
        [26.1625, 91.7115],
        [26.1510, 91.6885]
      ],
      distanceKm: 10.4,
      estTimeMin: 32,
      floodExposure: "LOW",
      maxDepthM: 0.10,
      status: "LOWER SIMULATED FLOOD EXPOSURE",
      notes: "Follows the elevated Brahmaputra riverfront embankment and high ground north of Nilachal ridge.",
      elevationAdvantageM: 6.4
    }
  },
  {
    id: "route-03",
    title: "Dispur to Boragaon Bypass",
    origin: "Dispur Capital Complex",
    destination: "Boragaon Highway Junction",
    originCoords: [26.1420, 91.7920],
    destCoords: [26.1365, 91.7050],
    normalRoute: {
      path: [
        [26.1420, 91.7920],
        [26.1360, 91.7820],
        [26.1310, 91.7710],
        [26.1260, 91.7650],
        [26.1210, 91.7390],
        [26.1365, 91.7050]
      ],
      distanceKm: 8.9,
      estTimeMin: 48,
      floodExposure: "HIGH",
      maxDepthM: 0.58,
      status: "IMPASSABLE / HIGH FLOOD EXPOSURE",
      notes: "Passes through inundated Hatigaon-Bhetapara residential bottleneck with surcharging open drains.",
      floodedSegments: [
        "Hatigaon Main Road Surcharge",
        "Bhetapara Canal Crossing D-042"
      ]
    },
    safeRoute: {
      path: [
        [26.1420, 91.7920],
        [26.1480, 91.7875],
        [26.1320, 91.8110],
        [26.1180, 91.8220],
        [26.1260, 91.7650],
        [26.1210, 91.7390],
        [26.1365, 91.7050]
      ],
      distanceKm: 11.2,
      estTimeMin: 34,
      floodExposure: "LOW",
      maxDepthM: 0.14,
      status: "LOWER SIMULATED FLOOD EXPOSURE",
      notes: "Reroutes along the grade-separated southern National Highway bypass corridor.",
      elevationAdvantageM: 4.2
    }
  }
];
