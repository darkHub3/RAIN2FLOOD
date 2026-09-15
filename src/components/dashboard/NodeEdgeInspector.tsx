import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  MapPin,
  GitBranch,
  X,
  AlertTriangle,
  ArrowRight,
  Droplets,
  Activity,
  Layers,
  Info
} from 'lucide-react';

export const NodeEdgeInspector: React.FC = () => {
  const {
    selectedNode,
    setSelectedNode,
    selectedEdge,
    setSelectedEdge,
    activeTimeStep,
    selectNodeById,
    selectEdgeById
  } = useSimulation();

  if (!selectedNode && !selectedEdge) {
    return (
      <div className="bg-[#111827] border border-[#223554] rounded-xl p-4 text-center shadow-md flex flex-col items-center justify-center min-h-[220px]">
        <div className="p-3 rounded-full bg-slate-800/80 text-cyan-400 mb-2 border border-slate-700">
          <Activity className="w-5 h-5" />
        </div>
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
          Hydraulic Telemetry Inspector
        </h4>
        <p className="text-xs text-slate-400 mt-1 max-w-sm leading-relaxed">
          Click any <strong>Drainage Node</strong> (circle) or <strong>Drainage Edge</strong> (conduit line) on the GIS map or network view to inspect simulated flow and surcharge metrics.
        </p>
        <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
          <Info className="w-3 h-3 text-cyan-400" />
          <span>Try clicking Node N-014 or Edge D-027</span>
        </div>
      </div>
    );
  }

  // NODE INSPECTOR VIEW
  if (selectedNode) {
    const state = selectedNode.timesteps[activeTimeStep];
    const isSurcharged = state.status === 'surcharged' || state.status === 'critical';

    return (
      <div className="bg-[#111827] border border-[#223554] rounded-xl p-4 shadow-xl text-slate-200 space-y-3.5 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white font-mono uppercase tracking-wide">
                  {selectedNode.id}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 capitalize">
                  {selectedNode.type.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">{selectedNode.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
              SIMULATED NODE DATA
            </span>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Primary Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 text-center font-mono">
          <div className="bg-[#0f172a] p-2.5 rounded-lg border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Incoming Flow</div>
            <div className="text-base font-bold text-cyan-300 mt-0.5">
              {state.incomingFlowM3s.toFixed(1)} <span className="text-[10px] font-normal text-slate-400">m³/s</span>
            </div>
          </div>

          <div className="bg-[#0f172a] p-2.5 rounded-lg border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Capacity</div>
            <div className="text-base font-bold text-slate-200 mt-0.5">
              {state.capacityM3s.toFixed(1)} <span className="text-[10px] font-normal text-slate-400">m³/s</span>
            </div>
          </div>

          <div className="bg-[#0f172a] p-2.5 rounded-lg border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Utilization</div>
            <div
              className={`text-base font-bold mt-0.5 ${
                state.utilizationPct >= 100
                  ? 'text-red-400'
                  : state.utilizationPct >= 85
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            >
              {state.utilizationPct}%
            </div>
          </div>
        </div>

        {/* Surcharge & Risk Banner */}
        <div
          className={`p-2.5 rounded-lg border flex items-center justify-between text-xs font-mono ${
            isSurcharged
              ? 'bg-red-950/40 border-red-500/40 text-red-300'
              : state.status === 'warning'
              ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
              : 'bg-slate-900 border-slate-800 text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className={`w-4 h-4 ${isSurcharged ? 'text-red-400' : 'text-amber-400'}`} />
            <div>
              <span className="font-bold uppercase tracking-wider">
                STATUS: {state.status.toUpperCase()}
              </span>
              {state.surchargeDepthM > 0 && (
                <span className="ml-2 text-[11px] opacity-90">
                  Head Rise: +{state.surchargeDepthM.toFixed(2)} m
                </span>
              )}
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 uppercase">
            Risk: {state.nearbyFloodRisk}
          </span>
        </div>

        {/* Connected Edges */}
        <div className="space-y-1 text-xs">
          <span className="text-[11px] font-mono text-slate-400 uppercase">
            Connected Conduits:
          </span>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {selectedNode.connectedEdges.map((edgeId) => (
              <button
                key={edgeId}
                onClick={() => selectEdgeById(edgeId)}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-cyan-900/60 hover:text-cyan-300 text-slate-300 border border-slate-700 font-mono text-xs transition-colors flex items-center gap-1"
              >
                <GitBranch className="w-3 h-3 text-cyan-400" />
                <span>{edgeId}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Description & Elevation */}
        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between items-center">
          <span className="font-mono">Elevation: {selectedNode.elevationM} m MSL</span>
          <span className="text-slate-400 italic truncate max-w-[220px]">{selectedNode.description}</span>
        </div>
      </div>
    );
  }

  // EDGE INSPECTOR VIEW
  if (selectedEdge) {
    const state = selectedEdge.timesteps[activeTimeStep];
    const isOverloaded = state.status === 'overloaded' || state.status === 'critical';

    return (
      <div className="bg-[#111827] border border-[#223554] rounded-xl p-4 shadow-xl text-slate-200 space-y-3.5 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <GitBranch className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white font-mono uppercase tracking-wide">
                  {selectedEdge.id}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase">
                  {selectedEdge.type.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">{selectedEdge.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
              SIMULATED DRAINAGE DATA
            </span>
            <button
              onClick={() => setSelectedEdge(null)}
              className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Direction Indicator */}
        <div className="flex items-center justify-between bg-[#0f172a] px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">Flow Direction:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => selectNodeById(selectedEdge.fromNode)}
              className="text-cyan-400 hover:underline font-bold"
            >
              {selectedEdge.fromNode}
            </button>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => selectNodeById(selectedEdge.toNode)}
              className="text-cyan-400 hover:underline font-bold"
            >
              {selectedEdge.toNode}
            </button>
          </div>
        </div>

        {/* Flow vs Capacity Grid */}
        <div className="grid grid-cols-3 gap-2 text-center font-mono">
          <div className="bg-[#0f172a] p-2.5 rounded-lg border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Current Flow</div>
            <div className="text-base font-bold text-cyan-300 mt-0.5">
              {state.flowM3s.toFixed(1)} <span className="text-[10px] font-normal text-slate-400">m³/s</span>
            </div>
          </div>

          <div className="bg-[#0f172a] p-2.5 rounded-lg border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Capacity</div>
            <div className="text-base font-bold text-slate-200 mt-0.5">
              {selectedEdge.designCapacityM3s.toFixed(1)} <span className="text-[10px] font-normal text-slate-400">m³/s</span>
            </div>
          </div>

          <div className="bg-[#0f172a] p-2.5 rounded-lg border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Utilization</div>
            <div
              className={`text-base font-bold mt-0.5 ${
                state.utilizationPct >= 100
                  ? 'text-red-400'
                  : state.utilizationPct >= 85
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            >
              {state.utilizationPct}%
            </div>
          </div>
        </div>

        {/* Physical Surcharge Relationship Explainer */}
        <div
          className={`p-2.5 rounded-lg border text-xs font-mono space-y-1 ${
            isOverloaded
              ? 'bg-red-950/40 border-red-500/40 text-red-200'
              : state.status === 'warning'
              ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
              : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
          }`}
        >
          <div className="flex items-center justify-between font-bold">
            <span>STATUS: {state.status.toUpperCase()}</span>
            <span>Length: {selectedEdge.lengthM} m</span>
          </div>
          <div className="text-[11px] pt-1 border-t border-current/20 leading-relaxed">
            {isOverloaded ? (
              <span className="font-semibold text-red-300">
                FLOW &gt; CAPACITY ({state.flowM3s} &gt; {selectedEdge.designCapacityM3s} m³/s) → HYDRAULIC SURCHARGE → MANHOLE BACKFLOW ONTO STREET
              </span>
            ) : (
              <span className="text-emerald-300">
                FLOW ≤ CAPACITY ({state.flowM3s} ≤ {selectedEdge.designCapacityM3s} m³/s) → Free gravity conveyance to downstream outfalls
              </span>
            )}
          </div>
        </div>

        {/* Dimensions & Slope */}
        <div className="pt-1.5 text-[11px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-800">
          <span>Slope: {selectedEdge.slopePct}%</span>
          {selectedEdge.diameterMm && <span>Diameter: Ø{selectedEdge.diameterMm} mm</span>}
          <span>Conveyance: Gravity</span>
        </div>
      </div>
    );
  }

  return null;
};
