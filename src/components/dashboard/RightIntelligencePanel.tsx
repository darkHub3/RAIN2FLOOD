import React, { useMemo } from 'react';
import { useSimulation, TimeStep } from '../../context/SimulationContext';
import { DRAINAGE_EDGES } from '../../data/drainageEdges';
import { ROAD_SEGMENTS } from '../../data/roads';
import {
  Clock,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Navigation,
  Car,
  Activity,
  ArrowRight,
  Droplets,
  GitBranch,
  MapPin,
  X,
  Siren,
  ChevronRight,
  Route,
  Zap,
  Radio,
  Layers
} from 'lucide-react';

export const RightIntelligencePanel: React.FC = () => {
  const {
    activeTimeStep,
    setTimeStep,
    selectedEdge,
    setSelectedEdge,
    selectedNode,
    setSelectedNode,
    selectedRoad,
    setSelectedRoad,
    focusRoad,
    setActiveTab,
    setTargetLocation,
  } = useSimulation();

  // Active or default edge for Surcharge alert
  const defaultEdge = DRAINAGE_EDGES.find((e) => e.id === 'D-027') || DRAINAGE_EDGES[0];
  const activeAlertEdge = selectedEdge || defaultEdge;
  const edgeState = activeAlertEdge.timesteps[activeTimeStep];
  const isEdgeOverloaded = edgeState.flowM3s > activeAlertEdge.designCapacityM3s;

  const khanaparaRoad = ROAD_SEGMENTS.find((r) => r.id === 'RE-001' || r.legacyId === 'RD-01' || r.id === 'RD-01') || ROAD_SEGMENTS[0];
  const khanaparaState = khanaparaRoad.timesteps[activeTimeStep];

  const timelineSteps: { id: TimeStep | '+30MIN'; label: string; depth: string; targetStep: TimeStep }[] = [
    { id: 'NOW', label: 'Now', depth: '48cm', targetStep: 'NOW' },
    { id: '+30MIN', label: '+30min', depth: '68cm', targetStep: '+1HR' },
    { id: '+1HR', label: '+1hr', depth: '85cm', targetStep: '+1HR' },
    { id: '+2HR', label: '+2hr', depth: '105cm', targetStep: '+2HR' },
    { id: '+3HR', label: '+3hr', depth: '125cm', targetStep: '+3HR' },
  ];

  // Top 5 affected roads dynamically sorted by flood depth
  const topAffectedRoads = useMemo(() => {
    return [...ROAD_SEGMENTS]
      .filter((r) => r.timesteps[activeTimeStep]?.riskState !== 'NORMAL')
      .sort((a, b) => b.timesteps[activeTimeStep].waterDepthM - a.timesteps[activeTimeStep].waterDepthM)
      .slice(0, 5);
  }, [activeTimeStep]);

  return (
    <aside
      aria-label="Flood Intelligence Panel"
      className="flex flex-col gap-2.5 bg-[#0b121e]/95 backdrop-blur-md border border-[#1e293b] rounded-xl p-3 text-xs text-slate-300 shadow-2xl select-none h-full overflow-y-auto custom-scrollbar"
    >
      {/* 0. ACTIVE TELEMETRY INSPECTION (If user clicked node, edge, or road) */}
      {(selectedRoad || selectedNode || selectedEdge) && (
        <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/50 space-y-1.5 shadow-lg animate-fadeIn">
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-1">
            <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Active GIS Telemetry
            </span>
            <button
              onClick={() => {
                setSelectedRoad(null);
                setSelectedNode(null);
                setSelectedEdge(null);
              }}
              className="text-slate-400 hover:text-white p-0.5"
              title="Close inspection"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {selectedRoad && (
            <div className="space-y-1 text-[11px]">
              <div className="font-bold text-white">{selectedRoad.name}</div>
              <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-300">
                <div>Water Depth: <strong className="text-cyan-300">{selectedRoad.timesteps[activeTimeStep].waterDepthM.toFixed(2)}m</strong></div>
                <div>Status: <strong className="text-amber-300">{selectedRoad.timesteps[activeTimeStep].status.toUpperCase()}</strong></div>
              </div>
            </div>
          )}

          {selectedNode && (
            <div className="space-y-1 text-[11px]">
              <div className="font-bold text-emerald-400">{selectedNode.id}: {selectedNode.name}</div>
              <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-300">
                <div>Inflow: <strong className="text-cyan-300">{selectedNode.timesteps[activeTimeStep].incomingFlowM3s.toFixed(1)} m³/s</strong></div>
                <div>Util: <strong className="text-emerald-400">{selectedNode.timesteps[activeTimeStep].utilizationPct}%</strong></div>
              </div>
            </div>
          )}

          {selectedEdge && (
            <div className="space-y-1 text-[11px]">
              <div className="font-bold text-cyan-300">{selectedEdge.id}: {selectedEdge.name}</div>
              <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-300">
                <div>Flow: <strong className="text-cyan-300">{selectedEdge.timesteps[activeTimeStep].flowM3s.toFixed(1)} m³/s</strong></div>
                <div>Cap: <strong className="text-slate-200">{selectedEdge.designCapacityM3s.toFixed(1)} m³/s</strong></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 1. FLOOD RISK TIMELINE (KHANAPARA CROSSING) */}
      <section className="space-y-2">
        <div className="flex items-center justify-between border-b border-[#1e293b] pb-1.5">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <h2 className="text-[11px] font-bold text-white tracking-tight uppercase">
              Flood Risk Timeline
            </h2>
          </div>
          <span className="text-[10px] font-mono text-cyan-300 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Khanapara Crossing
          </span>
        </div>

        {/* 5-Node Timeline Strip */}
        <div className="relative pt-2 pb-1 px-1">
          {/* Track line behind nodes */}
          <div className="absolute top-[18px] left-4 right-4 h-0.5 bg-slate-800" />
          <div
            className="absolute top-[18px] left-4 h-0.5 bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-500 transition-all duration-300"
            style={{
              width:
                activeTimeStep === 'NOW'
                  ? '0%'
                  : activeTimeStep === '+1HR'
                  ? '48%'
                  : activeTimeStep === '+2HR'
                  ? '74%'
                  : '96%',
            }}
          />

          <div className="relative z-10 flex justify-between items-start">
            {timelineSteps.map((step) => {
              const isMatch =
                step.id === activeTimeStep ||
                (step.id === '+30MIN' && activeTimeStep === '+1HR');
              return (
                <button
                  key={step.id}
                  onClick={() => setTimeStep(step.targetStep)}
                  className="flex flex-col items-center group focus:outline-none transition-transform active:scale-95"
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                      isMatch
                        ? 'bg-cyan-400 ring-4 ring-cyan-500/30 scale-110'
                        : 'bg-[#121c2d] border border-slate-700 group-hover:border-cyan-400'
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        isMatch ? 'bg-[#090e18]' : 'bg-slate-400 group-hover:bg-cyan-300'
                      }`}
                    />
                  </div>
                  <span
                    className={`mt-1 text-[9px] font-mono font-medium ${
                      isMatch ? 'text-cyan-300 font-bold' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span
                    className={`text-[8px] font-mono font-bold ${
                      step.depth.includes('100')
                        ? 'text-rose-400'
                        : step.depth.includes('80') || step.depth.includes('95')
                        ? 'text-amber-400'
                        : 'text-cyan-400'
                    }`}
                  >
                    {step.depth}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. CRITICAL HAZARD ALERT CARD */}
      <div className={`relative overflow-hidden rounded-lg border p-3 shadow-lg transition-all ${
        khanaparaState.riskState === 'BLOCKED'
          ? 'bg-gradient-to-br from-red-950/80 via-rose-950/50 to-[#0d1522] border-rose-600/60 shadow-red-950/40'
          : 'bg-gradient-to-br from-orange-950/80 via-amber-950/50 to-[#0d1522] border-amber-500/50 shadow-amber-950/30'
      }`}>
        <div className="flex items-start gap-2.5">
          <div className={`p-2 rounded-lg shrink-0 mt-0.5 border ${
            khanaparaState.riskState === 'BLOCKED'
              ? 'bg-red-600/20 text-rose-400 border-red-500/40'
              : 'bg-amber-600/20 text-amber-400 border-amber-500/40'
          }`}>
            <AlertTriangle className="w-4 h-4 animate-bounce" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider text-white">
                {khanaparaState.riskState === 'BLOCKED'
                  ? 'KHANAPARA: SIMULATED BLOCKED CONDITION'
                  : 'KHANAPARA: PREDICTED HIGH FLOOD IMPACT'}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                khanaparaState.riskState === 'BLOCKED'
                  ? 'bg-red-500/20 text-red-300 border-red-500/40'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}>
                {khanaparaState.riskState === 'BLOCKED'
                  ? `Simulated Depth: ${khanaparaState.waterDepthM.toFixed(2)}m`
                  : `High Overland Runoff (${khanaparaState.waterDepthM.toFixed(2)}m)`}
              </span>
            </div>
            <p className="mt-1.5 text-[10px] text-rose-200/90 font-medium">
              {khanaparaState.riskState === 'BLOCKED'
                ? 'Predicted flood depth exceeds prototype road-impact threshold.'
                : 'Overland runoff accumulating rapidly from adjacent southern slopes.'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. AFFECTED ROADS (TOP 5) */}
      <section className="space-y-1.5">
        <div className="flex items-center justify-between border-b border-[#1e293b] pb-1">
          <div className="flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-rose-400" />
            <h3 className="text-[11px] font-bold text-white tracking-tight uppercase">
              Affected Corridors (Top 5)
            </h3>
          </div>
          <span className="text-[9px] text-slate-400 font-mono">Dynamic GIS Sync</span>
        </div>

        <div className="space-y-1 bg-[#090e18]/80 rounded-lg p-1.5 border border-[#1e293b]">
          {topAffectedRoads.map((road) => {
            const rState = road.timesteps[activeTimeStep];
            const isBlocked = rState.riskState === 'BLOCKED';
            const isHigh = rState.riskState === 'HIGH RISK';
            const isMod = rState.riskState === 'MODERATE';

            const badgeBg = isBlocked
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              : isHigh
              ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
              : isMod
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

            return (
              <div
                key={road.id}
                onClick={() => focusRoad(road)}
                className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-slate-800/60 cursor-pointer transition-colors group border border-transparent hover:border-slate-700"
                title={`Focus ${road.name} on map`}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-200 font-semibold text-[11px] group-hover:text-cyan-300 transition-colors">
                      {road.name}
                    </span>
                    <MapPin className="w-2.5 h-2.5 text-slate-500 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">
                    Depth: <strong className="text-cyan-300">{rState.waterDepthM.toFixed(2)}m</strong>
                    {rState.drainageStressPct ? ` | ${rState.drainageStressPct}% stress` : ''}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border ${badgeBg}`}>
                    {rState.riskState}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 w-16 text-right">
                    {rState.timeToCritical || 'Projected'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SCENARIO KPIs & INFRASTRUCTURE COUPLING */}
      <section className="space-y-1.5">
        <div className="flex items-center justify-between border-b border-[#1e293b] pb-1">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <h3 className="text-[11px] font-bold text-white tracking-tight uppercase">
              Scenario KPIs
            </h3>
          </div>
          <span className="text-[9px] text-amber-300 font-mono font-semibold">Simulated Scenario</span>
        </div>

        <div className="bg-[#090e18]/90 rounded-lg p-2.5 border border-[#1e293b] space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-[#0d1624] p-2 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400">Rainfall</div>
              <div className="text-sm font-bold text-cyan-400">
                {activeTimeStep === 'NOW' ? '45' : activeTimeStep === '+1HR' ? '68' : activeTimeStep === '+2HR' ? '82' : '95'} mm/hr
              </div>
            </div>
            <div className="bg-[#0d1624] p-2 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400">Flood Hotspots</div>
              <div className="text-sm font-bold text-amber-400">9 Active</div>
            </div>
            <div className="bg-[#0d1624] p-2 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400">High-Risk Roads</div>
              <div className="text-sm font-bold text-orange-400">
                {activeTimeStep === 'NOW' ? '6' : activeTimeStep === '+1HR' ? '12' : activeTimeStep === '+2HR' ? '18' : '22'}
              </div>
            </div>
            <div className="bg-[#0d1624] p-2 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400">Blocked Roads</div>
              <div className="text-sm font-bold text-rose-400">
                {activeTimeStep === 'NOW' ? '2' : activeTimeStep === '+1HR' ? '5' : activeTimeStep === '+2HR' ? '9' : '15'}
              </div>
            </div>
            <div className="bg-[#0d1624] p-2 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400">Drainage Stress</div>
              <div className="text-sm font-bold text-purple-400">
                {activeTimeStep === 'NOW' ? '73%' : activeTimeStep === '+1HR' ? '87%' : activeTimeStep === '+2HR' ? '94%' : '98%'}
              </div>
            </div>
            <div className="bg-[#0d1624] p-2 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400">Affected Area</div>
              <div className="text-sm font-bold text-blue-400">19.4 km²</div>
            </div>
          </div>

          <p className="text-[9px] text-slate-400 text-center font-mono">
            All values are simulated for the prototype.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('roadrisk')}
          className="w-full mt-1 py-1.5 px-2 rounded-lg bg-[#142033] hover:bg-cyan-950 text-cyan-300 hover:text-cyan-200 border border-cyan-800/60 text-[10px] transition-all flex items-center justify-center gap-1.5 font-bold shadow"
        >
          <span>Open Road Risk & Impact Analysis</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </section>
    </aside>
  );
};

