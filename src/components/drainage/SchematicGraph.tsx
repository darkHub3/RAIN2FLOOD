import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { DRAINAGE_NODES } from '../../data/drainageNodes';
import { DRAINAGE_EDGES } from '../../data/drainageEdges';
import { DrainageNode, DrainageEdge } from '../../types';
import { GitBranch, MapPin, Search, Filter } from 'lucide-react';

export const SchematicGraph: React.FC = () => {
  const {
    activeTimeStep,
    selectedNode,
    setSelectedNode,
    selectedEdge,
    setSelectedEdge,
  } = useSimulation();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filtered nodes
  const filteredNodes = DRAINAGE_NODES.filter((node) => {
    const state = node.timesteps[activeTimeStep];
    const matchesSearch =
      node.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'surcharged' && (state.status === 'surcharged' || state.status === 'critical')) ||
      (statusFilter === 'warning' && state.status === 'warning') ||
      (statusFilter === 'normal' && state.status === 'normal');
    return matchesSearch && matchesStatus;
  });

  // Filtered edges
  const filteredEdges = DRAINAGE_EDGES.filter((edge) => {
    const state = edge.timesteps[activeTimeStep];
    const matchesSearch =
      edge.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      edge.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'overloaded' && (state.status === 'overloaded' || state.status === 'critical')) ||
      (statusFilter === 'warning' && state.status === 'warning') ||
      (statusFilter === 'normal' && state.status === 'normal');
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0f172a] p-3 rounded-xl border border-[#223554]">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search Node ID (e.g. N-014) or Edge ID (e.g. D-027)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111827] border border-slate-700 text-xs text-slate-200 pl-9 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#111827] border border-slate-700 text-xs text-slate-200 px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="all">All Elements</option>
            <option value="surcharged">Surcharged / Overloaded Only</option>
            <option value="warning">Warning Thresholds Only</option>
            <option value="normal">Normal Conveyance Only</option>
          </select>
        </div>
      </div>

      {/* Grid of Nodes and Edges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Nodes Table / Cards */}
        <div className="bg-[#111827] border border-[#223554] rounded-xl p-4 shadow-md space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Simulated Drainage Nodes ({filteredNodes.length} of {DRAINAGE_NODES.length})
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">
              Timestep: {activeTimeStep}
            </span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredNodes.map((node) => {
              const state = node.timesteps[activeTimeStep];
              const isSelected = selectedNode?.id === node.id;
              const isSurcharged = state.status === 'surcharged' || state.status === 'critical';

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-400 shadow-md'
                      : isSurcharged
                      ? 'bg-red-950/20 border-red-500/40 hover:border-red-400'
                      : state.status === 'warning'
                      ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-400'
                      : 'bg-[#0f172a] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{node.id}</span>
                      <span className="text-[10px] text-slate-400 capitalize">({node.type})</span>
                    </div>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                        isSurcharged
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : state.status === 'warning'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}
                    >
                      {state.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 truncate mt-1">{node.name}</p>

                  <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] font-mono text-slate-400 pt-1.5 border-t border-slate-800/80">
                    <div>
                      Inflow: <span className="text-cyan-300 font-bold">{state.incomingFlowM3s.toFixed(1)}</span> m³/s
                    </div>
                    <div>
                      Cap: <span className="text-slate-200">{state.capacityM3s.toFixed(1)}</span> m³/s
                    </div>
                    <div>
                      Util: <span className={state.utilizationPct >= 100 ? 'text-red-400 font-bold' : 'text-slate-200'}>{state.utilizationPct}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Edges Table / Cards */}
        <div className="bg-[#111827] border border-[#223554] rounded-xl p-4 shadow-md space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Simulated Drainage Conduits ({filteredEdges.length} of {DRAINAGE_EDGES.length})
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800">
              Timestep: {activeTimeStep}
            </span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredEdges.map((edge) => {
              const state = edge.timesteps[activeTimeStep];
              const isSelected = selectedEdge?.id === edge.id;
              const isOverloaded = state.status === 'overloaded' || state.status === 'critical';

              return (
                <div
                  key={edge.id}
                  onClick={() => setSelectedEdge(edge)}
                  className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-400 shadow-md'
                      : isOverloaded
                      ? 'bg-red-950/20 border-red-500/40 hover:border-red-400'
                      : state.status === 'warning'
                      ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-400'
                      : 'bg-[#0f172a] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{edge.id}</span>
                      <span className="text-[10px] text-cyan-400">
                        {edge.fromNode} → {edge.toNode}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                        isOverloaded
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : state.status === 'warning'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                      }`}
                    >
                      {state.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 truncate mt-1">{edge.name}</p>

                  <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] font-mono text-slate-400 pt-1.5 border-t border-slate-800/80">
                    <div>
                      Flow: <span className="text-cyan-300 font-bold">{state.flowM3s.toFixed(1)}</span> m³/s
                    </div>
                    <div>
                      Cap: <span className="text-slate-200">{edge.designCapacityM3s.toFixed(1)}</span> m³/s
                    </div>
                    <div>
                      Util: <span className={state.utilizationPct >= 100 ? 'text-red-400 font-bold' : 'text-slate-200'}>{state.utilizationPct}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
