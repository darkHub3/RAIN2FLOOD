import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { ROUTE_SCENARIOS, ROUTING_DISCLAIMER } from '../../data/routes';
import { GisMap } from '../map/GisMap';
import {
  Navigation,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Milestone,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

export const SafeRouteView: React.FC = () => {
  const { selectedRouteId, setSelectedRouteId, activeTimeStep } = useSimulation();
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [hasCalculated, setHasCalculated] = useState<boolean>(true);

  const activeScenario =
    ROUTE_SCENARIOS.find((r) => r.id === selectedRouteId) || ROUTE_SCENARIOS[0];

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setHasCalculated(true);
    }, 800);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 py-4">
      {/* Header Banner */}
      <div className="bg-[#111827] border border-[#223554] rounded-xl p-4 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Navigation className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-mono">
                  Flood-Safe Routing Demonstration
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  SIMULATED ROUTING SCENARIO
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Evaluating path feasibility against predicted street-level inundation and surcharged drainage bottlenecks.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono text-slate-400">
            Active Scenario: <strong className="text-cyan-300 font-bold">{activeTimeStep}</strong>
          </span>
        </div>

        {/* Origin / Destination Selector Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          {/* Preset Route Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-slate-400 uppercase">
              Predefined Scenario Corridor:
            </label>
            <select
              value={selectedRouteId}
              onChange={(e) => setSelectedRouteId(e.target.value)}
              className="w-full bg-[#0f172a] border border-slate-700 text-xs text-slate-200 px-3 py-2 rounded-lg focus:outline-none focus:border-cyan-500 font-mono"
            >
              {ROUTE_SCENARIOS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title} ({r.origin} → {r.destination})
                </option>
              ))}
            </select>
          </div>

          {/* Active Endpoints Display */}
          <div className="bg-[#0f172a] p-2 rounded-lg border border-slate-800 text-xs font-mono flex items-center justify-between">
            <div className="truncate">
              <div className="text-[10px] text-slate-500 uppercase">From</div>
              <div className="font-bold text-cyan-400 truncate">{activeScenario.origin}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 mx-2 flex-shrink-0" />
            <div className="truncate text-right">
              <div className="text-[10px] text-slate-500 uppercase">To</div>
              <div className="font-bold text-emerald-400 truncate">{activeScenario.destination}</div>
            </div>
          </div>

          {/* Calculate Safe Route Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCalculate}
              disabled={isCalculating}
              className="w-full py-2 px-4 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>{isCalculating ? 'EVALUATING ELEVATION MATRIX...' : 'CALCULATE SAFE ROUTE'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: GIS Map with Routes + Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Map with Route Overlays */}
        <div className="lg:col-span-7 flex flex-col h-[580px]">
          <GisMap showRoutes={hasCalculated} />
        </div>

        {/* Route Comparison Side Panel */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* NORMAL ROUTE CARD */}
          <div className="bg-[#111827] border border-red-500/40 rounded-xl p-4 shadow-lg text-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-red-500/20 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 ring-4 ring-red-500/20"></span>
                <h3 className="font-mono font-bold text-white uppercase tracking-wider text-xs">
                  Normal Direct Route
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 font-bold uppercase">
                {activeScenario.normalRoute.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono py-1">
              <div className="bg-[#0f172a] p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Distance</div>
                <div className="text-base font-bold text-slate-200 mt-0.5">
                  {activeScenario.normalRoute.distanceKm} km
                </div>
              </div>
              <div className="bg-[#0f172a] p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Exposure</div>
                <div className="text-base font-bold text-red-400 mt-0.5">
                  {activeScenario.normalRoute.floodExposure}
                </div>
              </div>
              <div className="bg-[#0f172a] p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Max Water Depth</div>
                <div className="text-base font-bold text-red-400 mt-0.5">
                  {activeScenario.normalRoute.maxDepthM} m
                </div>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed font-sans">
              {activeScenario.normalRoute.notes}
            </p>

            {activeScenario.normalRoute.floodedSegments && (
              <div className="p-2 rounded bg-red-950/30 border border-red-500/30 text-[11px] font-mono text-red-300 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  <span>Submerged Corridors Encountered:</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 pl-1 opacity-90">
                  {activeScenario.normalRoute.floodedSegments.map((seg, i) => (
                    <li key={i}>{seg}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* FLOOD-SAFE ROUTE CARD */}
          <div className="bg-[#111827] border border-emerald-500/40 rounded-xl p-4 shadow-lg text-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></span>
                <h3 className="font-mono font-bold text-white uppercase tracking-wider text-xs">
                  Flood-Safe Alternative Route
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold uppercase">
                {activeScenario.safeRoute.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono py-1">
              <div className="bg-[#0f172a] p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Distance</div>
                <div className="text-base font-bold text-emerald-300 mt-0.5">
                  {activeScenario.safeRoute.distanceKm} km
                </div>
              </div>
              <div className="bg-[#0f172a] p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Exposure</div>
                <div className="text-base font-bold text-emerald-300 mt-0.5">
                  {activeScenario.safeRoute.floodExposure}
                </div>
              </div>
              <div className="bg-[#0f172a] p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Max Water Depth</div>
                <div className="text-base font-bold text-emerald-300 mt-0.5">
                  {activeScenario.safeRoute.maxDepthM} m
                </div>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed font-sans">
              {activeScenario.safeRoute.notes}
            </p>

            {activeScenario.safeRoute.elevationAdvantageM && (
              <div className="p-2 rounded bg-emerald-950/30 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 flex items-center justify-between">
                <span>Topographic Ridge Advantage:</span>
                <strong className="text-white">+{activeScenario.safeRoute.elevationAdvantageM} m MSL</strong>
              </div>
            )}
          </div>

          {/* Prototype Honesty Banner */}
          <div className="p-3 rounded-xl bg-[#0f172a] border border-[#223554] text-[11px] font-mono text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase">
              <Info className="w-3.5 h-3.5" />
              <span>Simulated Routing Scenario Notice</span>
            </div>
            <p className="leading-relaxed">
              {ROUTING_DISCLAIMER}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
