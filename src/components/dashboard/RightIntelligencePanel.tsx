import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { FORECAST_CHART_SERIES } from '../../data/forecastScenario';
import { DRAINAGE_EDGES } from '../../data/drainageEdges';
import { DRAINAGE_NODES } from '../../data/drainageNodes';
import { ROUTE_SCENARIOS } from '../../data/routes';
import { TimeStep } from '../../types';
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
  X
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
    setActiveTab,
  } = useSimulation();

  // Active or default edge for Scenario Alert (defaults to D-027)
  const defaultEdge = DRAINAGE_EDGES.find((e) => e.id === 'D-027') || DRAINAGE_EDGES[0];
  const activeAlertEdge = selectedEdge || defaultEdge;
  const edgeState = activeAlertEdge.timesteps[activeTimeStep];
  const isEdgeOverloaded = edgeState.flowM3s > activeAlertEdge.designCapacityM3s;

  // Active route preview
  const routePreview = ROUTE_SCENARIOS[0]; // Paltan Bazar to Beltola

  // Dynamic Road Risk data per timestep with requested Watch/Flood Risk/High Exposure indicators
  const getRoadRiskList = (step: TimeStep) => {
    switch (step) {
      case 'NOW':
        return [
          { name: 'Khanapara', status: 'Watch', depth: '0.05m', badge: 'bg-yellow-950/70 text-yellow-300 border-yellow-700/80' },
          { name: 'Zoo Road', status: 'Watch', depth: '0.14m', badge: 'bg-yellow-950/70 text-yellow-300 border-yellow-700/80' },
          { name: 'GS Road', status: 'Watch', depth: '0.12m', badge: 'bg-yellow-950/70 text-yellow-300 border-yellow-700/80' },
          { name: 'Rukminigaon Road', status: 'Watch', depth: '0.18m', badge: 'bg-yellow-950/70 text-yellow-300 border-yellow-700/80' },
          { name: 'Jalukbari Road', status: 'Clear', depth: '0.04m', badge: 'bg-slate-900 text-slate-400 border-slate-700' },
        ];
      case '+1HR':
        return [
          { name: 'Khanapara', status: 'Watch', depth: '0.16m', badge: 'bg-yellow-950/70 text-yellow-300 border-yellow-700/80' },
          { name: 'Zoo Road', status: 'Flood Risk', depth: '0.30m', badge: 'bg-orange-950/80 text-orange-300 border-orange-600' },
          { name: 'GS Road', status: 'Flood Risk', depth: '0.28m', badge: 'bg-orange-950/80 text-orange-300 border-orange-600' },
          { name: 'Rukminigaon Road', status: 'Flood Risk', depth: '0.38m', badge: 'bg-orange-950/80 text-orange-300 border-orange-600' },
          { name: 'Jalukbari Road', status: 'Clear', depth: '0.10m', badge: 'bg-slate-900 text-slate-400 border-slate-700' },
        ];
      case '+2HR':
        return [
          { name: 'Khanapara', status: 'Flood Risk', depth: '0.28m', badge: 'bg-orange-950/80 text-orange-300 border-orange-600' },
          { name: 'Zoo Road', status: 'High Exposure', depth: '0.56m', badge: 'bg-rose-950 text-rose-200 border-rose-500 font-bold' },
          { name: 'GS Road', status: 'High Exposure', depth: '0.54m', badge: 'bg-rose-950 text-rose-200 border-rose-500 font-bold' },
          { name: 'Rukminigaon Road', status: 'High Exposure', depth: '0.65m', badge: 'bg-rose-950 text-rose-200 border-rose-500 font-bold' },
          { name: 'Jalukbari Road', status: 'Watch', depth: '0.22m', badge: 'bg-yellow-950/70 text-yellow-300 border-yellow-700/80' },
        ];
      case '+3HR':
      default:
        return [
          { name: 'Khanapara', status: 'High Exposure', depth: '0.46m', badge: 'bg-rose-950 text-rose-200 border-rose-500 font-bold' },
          { name: 'Zoo Road', status: 'High Exposure', depth: '0.85m', badge: 'bg-rose-950 text-rose-200 border-rose-500 font-bold' },
          { name: 'GS Road', status: 'High Exposure', depth: '0.82m', badge: 'bg-rose-950 text-rose-200 border-rose-500 font-bold' },
          { name: 'Rukminigaon Road', status: 'High Exposure', depth: '0.95m', badge: 'bg-rose-950 text-rose-200 border-rose-500 font-bold' },
          { name: 'Jalukbari Road', status: 'Flood Risk', depth: '0.35m', badge: 'bg-orange-950/80 text-orange-300 border-orange-600' },
        ];
    }
  };

  const roadRiskList = getRoadRiskList(activeTimeStep);

  return (
    <div className="flex flex-col gap-3 bg-[#0d131f] border border-[#1e293b] rounded-lg p-3 text-xs font-mono text-slate-300 shadow-md select-none h-full overflow-y-auto">
      {/* 0. ACTIVE TELEMETRY INSPECTION (When user clicks on a road, node, or conduit) */}
      {(selectedRoad || selectedNode || selectedEdge) && (
        <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/50 space-y-1.5 shadow-lg animate-fadeIn">
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-1">
            <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Active GIS Inspection
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

      {/* 1. FLOOD RISK TIMELINE */}
      <div className="space-y-2">
        <div className="flex items-center justify-between border-b border-[#1e293b] pb-1.5">
          <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            Flood Risk Timeline
          </span>
          <span className="text-[10px] text-cyan-400 font-bold">0–3h Horizon</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {FORECAST_CHART_SERIES.map((step) => {
            const isSelected = activeTimeStep === step.timeStep;
            const riskLabel =
              step.timeStep === 'NOW'
                ? 'MODERATE'
                : step.timeStep === '+1HR'
                ? 'HIGH'
                : step.timeStep === '+2HR'
                ? 'HIGH'
                : 'CRITICAL';

            const riskColor =
              riskLabel === 'CRITICAL'
                ? 'text-rose-400'
                : riskLabel === 'HIGH'
                ? 'text-orange-400'
                : 'text-amber-400';

            return (
              <button
                key={step.timeStep}
                onClick={() => setTimeStep(step.timeStep)}
                className={`p-1.5 rounded text-left transition-all border ${
                  isSelected
                    ? 'bg-[#152033] border-cyan-500/80 shadow-sm ring-1 ring-cyan-500/30'
                    : 'bg-[#090e18] border-[#1e293b] hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-bold text-[11px] ${isSelected ? 'text-cyan-300' : 'text-slate-300'}`}>
                    {step.timeStep === 'NOW' ? 'NOW' : step.label}
                  </span>
                  <span className={`text-[9px] font-bold ${riskColor}`}>
                    {riskLabel}
                  </span>
                </div>

                <div className="mt-1 space-y-0.5 text-[10px] text-slate-400 leading-tight">
                  <div className="flex justify-between">
                    <span>Rain:</span>
                    <span className="text-slate-200 font-bold">{step.rainfallMmHr}mm/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Depth:</span>
                    <span className={step.maxFloodDepthM > 0.5 ? 'text-rose-400 font-bold' : 'text-slate-200'}>
                      {step.maxFloodDepthM.toFixed(2)}m
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Load:</span>
                    <span className={step.drainageStressPct >= 100 ? 'text-orange-400 font-bold' : 'text-slate-200'}>
                      {step.drainageStressPct}%
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SCENARIO ALERT */}
      <div className="space-y-2 pt-1 border-t border-[#1e293b]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            Scenario Alert
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
            SIMULATED SCENARIO
          </span>
        </div>

        {/* Conduit Surcharge Alert Card */}
        <div
          className={`p-2.5 rounded-lg border space-y-1.5 ${
            isEdgeOverloaded
              ? 'bg-red-950/40 border-red-500/50 text-red-200'
              : 'bg-[#090e18] border-[#1e293b] text-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-white text-xs">
              <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
              <span>CONDUIT {activeAlertEdge.id}</span>
            </div>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                isEdgeOverloaded
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse'
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              }`}
            >
              {isEdgeOverloaded ? 'FLOW > CAPACITY' : 'FLOW ≤ CAPACITY'}
            </span>
          </div>

          <div className="text-[10px] text-slate-400">
            {activeAlertEdge.name}
          </div>

          {/* Flow vs Capacity Numbers */}
          <div className="grid grid-cols-3 gap-1 text-center text-[10px] py-1 bg-black/30 rounded border border-white/5">
            <div>
              <div className="text-slate-400">Sim Flow</div>
              <div className="font-bold text-cyan-300">{edgeState.flowM3s.toFixed(1)} m³/s</div>
            </div>
            <div>
              <div className="text-slate-400">Capacity</div>
              <div className="font-bold text-slate-200">{activeAlertEdge.designCapacityM3s.toFixed(1)} m³/s</div>
            </div>
            <div>
              <div className="text-slate-400">Stress</div>
              <div className={`font-bold ${edgeState.utilizationPct >= 100 ? 'text-red-400' : 'text-emerald-400'}`}>
                {edgeState.utilizationPct}%
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] pt-1 border-t border-current/20">
            <span className="font-bold tracking-wider uppercase text-red-300">
              {isEdgeOverloaded ? 'SURCHARGE CONDITION' : 'GRAVITY FLOW'}
            </span>
            <span className="text-slate-400 text-[9px]">
              Dir: {activeAlertEdge.fromNode} → {activeAlertEdge.toNode}
            </span>
          </div>
        </div>
      </div>

      {/* 3. AFFECTED ROADS */}
      <div className="space-y-1.5 pt-1 border-t border-[#1e293b]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-rose-400" />
            Affected Roads
          </span>
          <span className="text-[10px] text-slate-500">{activeTimeStep} Forecast</span>
        </div>

        <div className="space-y-1 bg-[#090e18] p-2 rounded border border-[#1e293b]">
          {roadRiskList.map((road) => (
            <div
              key={road.name}
              className="flex items-center justify-between py-1 text-[11px] border-b border-slate-800/60 last:border-0"
            >
              <div className="flex flex-col">
                <span className="text-slate-200 font-medium">{road.name}</span>
                <span className="text-[9px] text-slate-500">Depth: {road.depth}</span>
              </div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${road.badge}`}>
                {road.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. LOWER-EXPOSURE ROUTE */}
      <div className="space-y-1.5 pt-1 border-t border-[#1e293b]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-emerald-400" />
            Lower-Exposure Route
          </span>
          <span className="text-[10px] text-slate-500">Preview</span>
        </div>

        <div className="p-2 bg-[#090e18] rounded border border-[#1e293b] space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-white">
            <span>{routePreview.origin.split(' ')[0]} → {routePreview.destination.split(' ')[0]}</span>
            <span className="text-emerald-400 text-[10px]">PASSABLE</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
            <div className="p-1 rounded bg-red-950/20 border border-red-500/20">
              <div className="text-slate-400">Normal Direct</div>
              <div className="text-slate-300 font-bold">{routePreview.normalRoute.distanceKm} km</div>
              <div className="text-red-400 font-bold">Max {routePreview.normalRoute.maxDepthM}m</div>
            </div>

            <div className="p-1 rounded bg-emerald-950/20 border border-emerald-500/20">
              <div className="text-slate-400">Flood-Safe</div>
              <div className="text-slate-300 font-bold">{routePreview.safeRoute.distanceKm} km</div>
              <div className="text-emerald-400 font-bold">Max {routePreview.safeRoute.maxDepthM}m</div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('route')}
            className="w-full py-1.5 px-2 rounded bg-[#152033] hover:bg-cyan-950 text-cyan-300 hover:text-cyan-200 border border-cyan-800/60 text-[10px] transition-colors flex items-center justify-center gap-1 font-bold"
          >
            <span>Open Safe Route Analysis</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
