import { NaturalWaterway } from '../types';

export const NATURAL_DRAINAGE_NOTE =
  "Natural drainage features and wetlands serve as an additional environmental/conveyance layer affecting overland runoff movement and retention. They complement rather than replace the man-made drainage network.";

export const NATURAL_WATERWAYS: NaturalWaterway[] = [
  {
    id: "NW-01",
    name: "Brahmaputra Riverfront Buffer",
    type: "river",
    path: [
      [26.1550, 91.6850],
      [26.1680, 91.7050],
      [26.1820, 91.7250],
      [26.1920, 91.7480],
      [26.1950, 91.7750],
      [26.1980, 91.8100]
    ],
    capacityRole: "Master regional receiving body. High monsoon stage creates backwater pressure on outfall sluices.",
    notes: "Environmental boundary condition influencing gravity discharge feasibility."
  },
  {
    id: "NW-02",
    name: "Bharalu Natural Stormwater Channel",
    type: "channel",
    path: [
      [26.1400, 91.7900],
      [26.1520, 91.7780],
      [26.1620, 91.7680],
      [26.1700, 91.7520],
      [26.1730, 91.7380],
      [26.1760, 91.7280]
    ],
    capacityRole: "Primary central natural urban conveyance channel collecting runoff from municipal collectors.",
    notes: "Represents critical surface drainage corridor. Conveyance restricted by siltation and structural encroachments."
  },
  {
    id: "NW-03",
    name: "Mora Bharalu Natural Channel",
    type: "channel",
    path: [
      [26.1380, 91.7850],
      [26.1340, 91.7730],
      [26.1300, 91.7550],
      [26.1320, 91.7350],
      [26.1350, 91.7100],
      [26.1300, 91.6850]
    ],
    capacityRole: "Southern tributary conveyance channel routing stormwater towards western lowlands.",
    notes: "Provides natural secondary relief route for southern urban catchments."
  },
  {
    id: "NW-04",
    name: "Deepor Beel Ramsar Wetland & Retention Basin",
    type: "wetland",
    polygon: [
      [26.1450, 91.6600],
      [26.1420, 91.6900],
      [26.1250, 91.6950],
      [26.1150, 91.6700],
      [26.1280, 91.6500]
    ],
    capacityRole: "Major natural urban flood water retention basin absorbing western Guwahati stormwater runoff.",
    notes: "Crucial ecological reservoir preventing widespread inundation across western highway corridors."
  },
  {
    id: "NW-05",
    name: "Silsako Beel Wetland & Retention Basin",
    type: "wetland",
    polygon: [
      [26.1620, 91.8080],
      [26.1640, 91.8220],
      [26.1530, 91.8260],
      [26.1470, 91.8150],
      [26.1520, 91.8060]
    ],
    capacityRole: "Eastern major stormwater retention wetland absorbing runoff from Chachhal, Hengrabari and VIP Road.",
    notes: "Critical ecological retention buffer. Encroachment reduction zone."
  },
  {
    id: "NW-06",
    name: "Basistha Natural Stream Channel",
    type: "channel",
    path: [
      [26.1020, 91.8050],
      [26.1150, 91.8010],
      [26.1280, 91.7980],
      [26.1340, 91.7730]
    ],
    capacityRole: "Southern foothill stream feeding into Mora Bharalu canal.",
    notes: "Carries high-velocity monsoon runoff from Meghalaya border ridges."
  },
  {
    id: "NW-07",
    name: "Bahini Natural Urban Stream",
    type: "channel",
    category: "natural",
    path: [
      [26.1150, 91.8020],
      [26.1250, 91.7990],
      [26.1340, 91.7940],
      [26.1410, 91.7880],
      [26.1480, 91.7820]
    ],
    capacityRole: "Upper tributary feeding storm runoff from southern foothills into the Bharalu urban channel system.",
    notes: "Critical upstream conveyor responsible for backwater surge along Rukminigaon and Beltola Road."
  },
  {
    id: "NW-08",
    name: "Lakhimijan Natural Channel",
    type: "channel",
    category: "natural",
    path: [
      [26.1720, 91.8120],
      [26.1800, 91.8220],
      [26.1880, 91.8300],
      [26.1940, 91.8340]
    ],
    capacityRole: "Northeast conveyance channel receiving overflow runoff from Noonmati and Eastern refinery foothills.",
    notes: "Natural arterial channel draining eastern catchments toward the Brahmaputra."
  },
  {
    id: "NW-09",
    name: "Bondajan Natural Channel & Basin",
    type: "channel",
    category: "natural",
    path: [
      [26.1650, 91.8310],
      [26.1760, 91.8360],
      [26.1870, 91.8390],
      [26.1960, 91.8420]
    ],
    capacityRole: "Eastern primary natural outfall channel draining Silsako overflow and Narengi basin storm discharge.",
    notes: "Major eastern drainage relief channel discharging into the Brahmaputra floodplain."
  }
];

