# RAIN2FLOOD — Urban Flood Nowcasting System
**Smart India Hackathon (SIH 2026) Idea-Stage Software Demonstrator**  
**Pilot Study Area: Guwahati, Assam, India**

![Prototype Status](https://img.shields.io/badge/Prototype-Simulated%20Pilot%20Data-amber)
![Engine](https://img.shields.io/badge/Simulation-Active-emerald)
![Pilot](https://img.shields.io/badge/Pilot%20Area-Guwahati%2C%20Assam-cyan)

RAIN2FLOOD is an interactive web-based proof-of-concept demonstrator developed for an idea-stage proposal at the Smart India Hackathon (SIH 2026). It demonstrates how short-term convective rainfall nowcasts, high-resolution terrain surface flow, and a directed municipal drainage graph can be dynamically coupled to predict street-level flood depth and identify flood-safe evacuation routes.

---

## ⚠️ Prototype Disclosure & Honesty Notice

> **IMPORTANT**: This is an **idea-stage software demonstrator**, NOT an operational real-time prediction system.
>
> All values displayed in the current prototype—including rainfall intensities (78–101 mm/hr), water depths (0.12–0.94 m), pipe capacities, and evacuation routes—are **predetermined simulated scenario data** for a selected Guwahati study area.
>
> *"Detailed, machine-readable, street-level underground drainage attributes are not readily available to us for the prototype. Phase-1 therefore uses a reconstructed drainage graph from available geospatial, published, satellite and field-observation data. Production deployment would integrate the authoritative municipal drainage GIS."*

---

## 🏛️ Proposed Physical Architecture

Rather than relying on static weighted overlay / Multi-Criteria Decision Analysis (MCDA / AHP), the core technical contribution of RAIN2FLOOD is the dynamic physical coupling of:

$$\textbf{RAIN NOWCAST} + \textbf{TERRAIN (DEM)} + \textbf{DRAINAGE CAPACITY CHECK} \longrightarrow \textbf{STREET SURCHARGE}$$

1. **Short-Term Rainfall Nowcast**: 0–3 hour horizon capturing rapid convective precipitation.
2. **Rainfall–Runoff Transformation**: Estimating overland runoff volume via imperviousness & soil retention (SCS-CN).
3. **DEM & 2D Surface Flow**: Digital Elevation Model calculates flow accumulation into natural valley basins.
4. **Drainage Inlets & Surface Inflow**: Overland water directed into municipal curb inlets and collection sumps.
5. **Drainage Graph Network**: Inlets/manholes/junctions modeled as nodes ($V$) and conduits/culverts as edges ($E$).
6. **Hydraulic Capacity Check**: Comparing incoming surface inflow against Manning conveyance capacity.
7. **Hydraulic Surcharge & Backflow**: When $\text{Flow} > \text{Capacity}$, hydraulic head rises, forcing pressurized backflow out of manholes.
8. **Street-Level Flood Depth**: Estimating 2D surface water depth ($0.12\text{m}$ to $0.94\text{m}$) across urban corridors.
9. **Flood-Inundation GIS Map**: Visualizing expanding flood zones and conduit loads on a command center interface.
10. **Flood-Safe Routing API**: Identifying elevation-aware bypass corridors with lower simulated flood exposure.

---

## 🗺️ Key Features Built in Prototype

* **Map-Centric GIS Command Center**:
  * Real basemap tiling centered on Guwahati (`26.1540° N, 91.7650° E`) with **Dark GIS** and **Satellite** modes.
  * Semi-transparent depth-categorized simulated flood polygons (Low: blue/cyan, Moderate: yellow, High: orange, Critical: red/magenta).
  * 36 simulated nodes (inlets, manholes, junctions, river outfall sluices) and 48 conduits.
  * Natural waterways (Brahmaputra shoreline, Bharalu channel, Mora Bharalu, Deepor Beel, and Silsako Beel).
* **Interactive Scenario Playback (`▶ RUN NOWCAST`)**:
  * 4-step timeline (`NOW ───── +1 HR ───── +2 HR ───── +3 HR`) with automated playback, pause, and reset.
* **Hydraulic Telemetry Inspector**:
  * Click any node (e.g. `N-014 Junction`) or conduit (e.g. `D-027 GS Road Trunk`) to inspect inflow, design capacity, utilization %, and surcharge state.
* **Flood-Safe Routing Demonstration**:
  * Compares Normal Route (impassable direct corridor) with Flood-Safe Route (lower simulated flood exposure via higher elevation bypasses).
* **Scenario Forecast Analytics**:
  * Synchronized time-series curves and a Representative Scenario Impact Table for Guwahati localities.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation & Local Run
```bash
# 1. Clone the repository
git clone https://github.com/darkHub3/RAIN2FLOOD.git
cd RAIN2FLOOD

# 2. Install dependencies
npm install

# 3. Start the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
```
Creates an optimized static bundle in `dist/`.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS (Dark command center theme)
- **GIS Cartography**: Leaflet + CartoDB Dark Matter / Esri World Imagery + SVG Vector Fallback
- **Icons**: Lucide React
- **Target OS**: Cross-platform (optimized for desktop GIS command workstations)

---

## 📜 License & Hackathon Context

Developed for the **Smart India Hackathon (SIH 2026)** proposal demonstrator.  
All geographic base layers &copy; OpenStreetMap contributors, CARTO, and Esri.  
Simulated hydrological parameters and drainage topology are representative research pilot data for academic and evaluation purposes.
