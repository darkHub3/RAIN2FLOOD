import React from 'react';
import {
  HelpCircle,
  CloudRain,
  Mountain,
  Network,
  Droplets,
  Navigation,
  Layers,
  ArrowDown,
  CheckCircle2,
  Server,
  Database,
  Cpu,
  ShieldCheck,
  AlertOctagon,
  ArrowRight
} from 'lucide-react';

export const HowItWorksView: React.FC = () => {
  const pipelineSteps = [
    {
      num: '01',
      title: 'Rainfall Nowcast',
      subtitle: '0–3 Hour Horizon',
      icon: <CloudRain className="w-5 h-5 text-cyan-400" />,
      desc: 'Provides short-term high-rate precipitation forecasts for the next 0–3 hours, capturing convective cloud bursts before surface impact.'
    },
    {
      num: '02',
      title: 'Rainfall → Runoff',
      subtitle: 'Impervious Surface Response',
      icon: <Droplets className="w-5 h-5 text-blue-400" />,
      desc: 'Converts localized precipitation into overland runoff volume based on urban land use, soil retention (SCS-CN), and asphalt imperviousness.'
    },
    {
      num: '03',
      title: 'High-Res DEM & Terrain',
      subtitle: 'Topographic Flow Direction',
      icon: <Mountain className="w-5 h-5 text-amber-400" />,
      desc: 'Digital Elevation Models calculate slope gradients and topographic flow accumulation vectors into natural depression basins.'
    },
    {
      num: '04',
      title: '2D Surface Flow',
      subtitle: 'Overland Flow Dynamics',
      icon: <Layers className="w-5 h-5 text-sky-400" />,
      desc: 'Determines how accumulated overland stormwater traverses street gutters and converges toward municipal drainage inlets.'
    },
    {
      num: '05',
      title: 'Drainage Graph Network',
      subtitle: 'Directed Conveyance Topology',
      icon: <Network className="w-5 h-5 text-emerald-400" />,
      desc: 'Represents inlets, manholes, junctions, and outfalls as nodes (V) and underground pipes, conduits, and box culverts as edges (E).'
    },
    {
      num: '06',
      title: 'Hydraulic Capacity Check',
      subtitle: 'Conveyance vs Inflow',
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      desc: "Evaluates whether conduit diameter, slope, and Manning roughness can accommodate incoming overland flows by gravity."
    },
    {
      num: '07',
      title: 'Surcharge & Overflow',
      subtitle: 'Hydraulic Backflow',
      icon: <AlertOctagon className="w-5 h-5 text-orange-400" />,
      desc: 'When Flow > Capacity, pipe pressurization occurs. Hydraulic head rises, expelling stormwater backwards through manholes onto streets.'
    },
    {
      num: '08',
      title: 'Street-Level Flood Depth',
      subtitle: 'Physical 2D Pooling',
      icon: <Droplets className="w-5 h-5 text-red-400" />,
      desc: 'Couples topographic depressions with drainage surcharge rates to calculate localized water depth (0.12m to 0.94m) across roads.'
    },
    {
      num: '09',
      title: 'Dynamic Flood Map',
      subtitle: 'GIS Command Center Visualization',
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      desc: 'Visualizes expanding inundation polygons, surcharged manholes, and overloaded conduits on an interactive GIS command interface.'
    },
    {
      num: '10',
      title: 'Flood-Safe Routing API',
      subtitle: 'Elevation-Aware Transit',
      icon: <Navigation className="w-5 h-5 text-emerald-400" />,
      desc: 'Ingests road inundation status to steer transit and emergency vehicles along higher elevation ridges with lower simulated flood exposure.'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-4">
      {/* Header */}
      <div className="bg-[#111827] border border-[#223554] rounded-xl p-5 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-mono">
                System Architecture &amp; Methodology
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                SIH 2026 PROPOSAL
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              The complete proposed physical workflow coupling short-term rainfall nowcasting, terrain hydraulics, drainage graph conveyance, and emergency routing.
            </p>
          </div>
        </div>

        {/* Technical Positioning Callout (Core Novelty) */}
        <div className="mt-4 p-3.5 rounded-lg bg-[#0b101c] border border-cyan-500/30 text-xs space-y-1.5">
          <div className="font-mono text-cyan-300 font-bold uppercase tracking-wider text-[11px] flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            Core Technical Novelty: Dynamic Physical Coupling (Not Static MCDA/AHP)
          </div>
          <p className="text-slate-300 leading-relaxed font-sans">
            Unlike traditional GIS flood hazard maps that rely on static weighted overlay / Multi-Criteria Decision Analysis (AHP), RAIN2FLOOD pioneers the dynamic physical coupling of:
          </p>
          <div className="font-mono text-xs text-cyan-400 bg-[#070b14] p-2 rounded border border-slate-800 flex flex-wrap items-center justify-center gap-2">
            <span className="text-white font-bold">RAIN NOWCAST</span>
            <span>+</span>
            <span className="text-amber-300 font-bold">TERRAIN (DEM)</span>
            <span>+</span>
            <span className="text-emerald-300 font-bold">DRAINAGE GRAPH CAPACITY</span>
            <span>→</span>
            <span className="text-red-400 font-bold">STREET-LEVEL SURCHARGE</span>
          </div>
          <p className="text-slate-400 text-[11px] font-sans">
            Terrain dictates where runoff accumulates; drainage capacity dictates whether pipes can convey it; and the condition <code className="text-amber-300 font-mono">Flow &gt; Capacity</code> triggers hydraulic surcharge, directly feeding the flood-safe routing engine.
          </p>
        </div>
      </div>

      {/* 10-Stage Proposed Architecture Flowchart */}
      <div className="bg-[#111827] border border-[#223554] rounded-xl p-5 shadow-md space-y-4">
        <h2 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
          <Network className="w-4 h-4 text-cyan-400" />
          Proposed 10-Stage Physical Architecture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {pipelineSteps.map((step, idx) => (
            <div
              key={step.num}
              className="bg-[#0f172a] border border-slate-800 hover:border-cyan-500/40 p-3 rounded-lg flex flex-col justify-between space-y-2 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">
                    STAGE {step.num}
                  </span>
                  <div className="p-1 rounded bg-slate-800/80">{step.icon}</div>
                </div>
                <h3 className="text-xs font-bold text-white font-sans mt-1.5">{step.title}</h3>
                <p className="text-[10px] font-mono text-slate-400 mb-1">{step.subtitle}</p>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{step.desc}</p>
              </div>

              {idx < pipelineSteps.length - 1 && (
                <div className="hidden lg:flex justify-end text-slate-600 pt-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* PROTOTYPE NOW vs FUTURE DEPLOYMENT MATRIX */}
      <div className="bg-[#111827] border border-[#223554] rounded-xl p-5 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Current Prototype vs. Future Production Deployment
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Roadmap to Municipal Operational System
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-[#0f172a] text-slate-400">
                <th className="py-2.5 px-3 uppercase text-[11px] w-1/4">System Dimension</th>
                <th className="py-2.5 px-3 uppercase text-[11px] w-3/8 text-amber-300">
                  Current Prototype (SIH Phase 1)
                </th>
                <th className="py-2.5 px-3 uppercase text-[11px] w-3/8 text-emerald-400">
                  Future Production Deployment (Phase 2)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 font-bold text-white">Rainfall Ingestion</td>
                <td className="py-2.5 px-3 text-amber-200/90 font-sans">
                  Predetermined simulated scenario values (78–101 mm/hr convective storm cell).
                </td>
                <td className="py-2.5 px-3 text-emerald-200/90 font-sans">
                  Live IMD Doppler Weather Radar feeds &amp; NCMRWF rapid satellite nowcast extrapolation.
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 font-bold text-white">Terrain / DEM Model</td>
                <td className="py-2.5 px-3 text-amber-200/90 font-sans">
                  Simulated elevation contours &amp; overland flow accumulation vectors.
                </td>
                <td className="py-2.5 px-3 text-emerald-200/90 font-sans">
                  High-resolution LiDAR / CartoDEM (1m–5m resolution) bare-earth digital elevation model.
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 font-bold text-white">Drainage GIS Network</td>
                <td className="py-2.5 px-3 text-amber-200/90 font-sans">
                  Reconstructed pilot drainage graph (36 nodes / 48 edges) from open geospatial and field data.
                </td>
                <td className="py-2.5 px-3 text-emerald-200/90 font-sans">
                  Authoritative Municipal Corporation GIS database with verified invert levels, pipe roughness, and siltation audits.
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 font-bold text-white">Hydraulic Engine</td>
                <td className="py-2.5 px-3 text-amber-200/90 font-sans">
                  Predefined steady-state surcharge states across 4 discrete timesteps.
                </td>
                <td className="py-2.5 px-3 text-emerald-200/90 font-sans">
                  Coupled 1D-2D hydrodynamic solver (e.g., EPA SWMM 1D pipe network + 2D shallow water overland flow).
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 font-bold text-white">IoT Sensors &amp; Calibration</td>
                <td className="py-2.5 px-3 text-amber-200/90 font-sans">
                  None (illustrative simulated demonstration data).
                </td>
                <td className="py-2.5 px-3 text-emerald-200/90 font-sans">
                  Real-time IoT ultrasonic water-level sensors in key manholes, pump stations, and Bharalu river sluices.
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 font-bold text-white">Emergency Routing</td>
                <td className="py-2.5 px-3 text-amber-200/90 font-sans">
                  Predefined scenario routing comparing Normal vs. Lower Simulated Flood Exposure.
                </td>
                <td className="py-2.5 px-3 text-emerald-200/90 font-sans">
                  Real-time Dijkstra/A* routing API dynamically ingesting street flood depths for emergency transit dispatch.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Future Backend Technical Note */}
        <div className="p-3 rounded-lg bg-[#0b101c] border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <span>Technical Architecture Note: Simulation layer can be replaced by real data/model services during deployment (FastAPI + PostGIS + SWMM).</span>
          </span>
          <span className="text-cyan-400 font-bold">API Modular</span>
        </div>
      </div>

      {/* Guwahati Geographic Context */}
      <div className="bg-[#111827] border border-[#223554] rounded-xl p-5 shadow-md space-y-3">
        <h2 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
          <Mountain className="w-4 h-4 text-cyan-400" />
          Guwahati Pilot Catchment Context (Assam, India)
        </h2>

        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          Guwahati presents a classic urban stormwater challenge characterized by steep granite hills surrounding low-lying alluvial flood basins. Key geographical and hydrological factors reflected in the simulated demonstrator include:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-sans">
          <div className="bg-[#0f172a] p-3 rounded-lg border border-slate-800 space-y-1">
            <h4 className="font-mono font-bold text-cyan-300 text-[11px] uppercase">
              1. Bharalu Stormwater Channel
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              The primary natural artery carrying central municipal runoff to the Brahmaputra. Backwater pressure at high river stages prevents gravity sluice discharge.
            </p>
          </div>

          <div className="bg-[#0f172a] p-3 rounded-lg border border-slate-800 space-y-1">
            <h4 className="font-mono font-bold text-sky-300 text-[11px] uppercase">
              2. Deepor Beel Ramsar Wetland
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Acts as a master ecological stormwater retention basin for western catchments, buffering flood peaks and protecting transit corridors.
            </p>
          </div>

          <div className="bg-[#0f172a] p-3 rounded-lg border border-slate-800 space-y-1">
            <h4 className="font-mono font-bold text-amber-300 text-[11px] uppercase">
              3. Anil Nagar &amp; GS Road Bowls
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Natural topographic depressions below river high-water line, creating chronic waterlogging whenever conduit conveyance capacities are exceeded.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
