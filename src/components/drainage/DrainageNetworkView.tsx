import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { SchematicGraph } from './SchematicGraph';
import { GisMap } from '../map/GisMap';
import { NodeEdgeInspector } from '../dashboard/NodeEdgeInspector';
import { TimelineScrubber } from '../dashboard/TimelineScrubber';
import { DRAINAGE_DATA_DISCLAIMER } from '../../data/drainageNodes';
import { RAINFALL_SCENARIOS } from '../../data/rainfallScenario';
import { Network, MapPin, GitBranch, AlertTriangle, BookOpen, Layers, ShieldAlert, Cpu } from 'lucide-react';

export const DrainageNetworkView: React.FC = () => {
  const { activeTimeStep } = useSimulation();
  const scenario = RAINFALL_SCENARIOS[activeTimeStep];
  const [viewMode, setViewMode] = useState<'schematic' | 'map'>('schematic');

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 py-4">
      {/* Top Banner & Metrics Row */}
      <div className="bg-[#111827] border border-[#223554] rounded-xl p-4 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Network className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-mono">
                  Drainage Network Hydraulic Analysis
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  RECONSTRUCTED GRAPH
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Coupled gravity conveyance and hydraulic surcharge evaluation across simulated Guwahati pilot conduits.
              </p>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-[#0b101c] p-1 rounded-lg border border-slate-700 text-xs font-mono">
            <button
              onClick={() => setViewMode('schematic')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'schematic'
                  ? 'bg-cyan-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Schematic Table View
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'map'
                  ? 'bg-cyan-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Spatial GIS Map View
            </button>
          </div>
        </div>

        {/* 4 Summary Telemetry Badges */}
        <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="bg-[#0f172a] p-2.5 rounded-lg border border-slate-800">
            <div className="text-slate-400 text-[10px] uppercase">Simulated Nodes</div>
            <div className="text-lg font-bold text-white mt-0.5 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>36 Nodes</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Inlets, Manholes, Outfalls</div>
          </div>

          <div className="bg-[#0f172a] p-2.5 rounded-lg border border-slate-800">
            <div className="text-slate-400 text-[10px] uppercase">Simulated Conduits</div>
            <div className="text-lg font-bold text-white mt-0.5 flex items-center gap-1.5">
              <GitBranch className="w-4 h-4 text-cyan-400" />
              <span>48 Edges</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Pipes, Drains, Box Culverts</div>
          </div>

          <div className="bg-[#0f172a] p-2.5 rounded-lg border border-slate-800">
            <div className="text-slate-400 text-[10px] uppercase">Surcharged Nodes ({activeTimeStep})</div>
            <div className="text-lg font-bold text-red-400 mt-0.5 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>{scenario.surchargedNodesCount} Surcharged</span>
            </div>
            <div className="text-[10px] text-red-300/80 mt-1">Head rising above street level</div>
          </div>

          <div className="bg-[#0f172a] p-2.5 rounded-lg border border-slate-800">
            <div className="text-slate-400 text-[10px] uppercase">Overloaded Edges ({activeTimeStep})</div>
            <div className="text-lg font-bold text-orange-400 mt-0.5 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-orange-400" />
              <span>{scenario.overloadedEdgesCount} Overloaded</span>
            </div>
            <div className="text-[10px] text-orange-300/80 mt-1">Flow &gt; Hydraulic Capacity</div>
          </div>
        </div>
      </div>

      {/* Timeline Controls */}
      <TimelineScrubber />

      {/* Main Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-4">
          {viewMode === 'schematic' ? (
            <SchematicGraph />
          ) : (
            <div className="h-[620px]">
              <GisMap />
            </div>
          )}
        </div>

        {/* Sidebar Inspector & Educational Architecture Card */}
        <div className="lg:col-span-4 space-y-4">
          <NodeEdgeInspector />

          {/* WHAT IS A DRAINAGE GRAPH? Panel */}
          <div className="bg-[#111827] border border-[#223554] rounded-xl p-4 shadow-md text-xs space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold uppercase tracking-wider text-xs border-b border-slate-800 pb-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>What is a Drainage Graph?</span>
            </div>

            <p className="text-slate-300 leading-relaxed">
              In urban storm hydrology, municipal drainage is modeled as a <strong>directed topological network graph</strong> <span className="font-mono text-cyan-300">G = (V, E)</span>:
            </p>

            <ul className="space-y-2 text-slate-300 font-sans">
              <li className="flex items-start gap-2">
                <strong className="text-white font-mono min-w-[70px]">Nodes (V):</strong>
                <span>Street curb inlets, manholes, pump sumps, and river outfall sluices.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-white font-mono min-w-[70px]">Edges (E):</strong>
                <span>Underground circular pipes, open masonry drains, and concrete box culverts.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-white font-mono min-w-[70px]">Capacity:</strong>
                <span>Maximum conveyance rate calculated via Manning's equation based on slope, cross-section, and roughness.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-amber-300 font-mono min-w-[70px]">Surcharge:</strong>
                <span>When surface inflow exceeds pipe capacity, pressurized backflow forces water back onto streets.</span>
              </li>
            </ul>

            {/* Core physical flow */}
            <div className="bg-[#0b101c] p-2.5 rounded-lg border border-slate-800 text-[11px] font-mono text-cyan-300 space-y-1">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Physical Coupling Mechanism:</div>
              <div>Rainfall → Runoff → Surface Flow → Drainage Inlet → Drainage Graph → Capacity Check → Surcharge/Backflow → Street Flooding</div>
            </div>

            {/* Academic / Data Reality Note */}
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200/90 text-[11px] leading-relaxed space-y-1">
              <div className="flex items-center gap-1.5 font-bold font-mono text-amber-300 uppercase">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Academic Transparency Note</span>
              </div>
              <p>
                {DRAINAGE_DATA_DISCLAIMER}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
