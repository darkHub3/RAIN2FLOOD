import React, { useState, useMemo } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { ROUTE_SCENARIOS, ROUTING_DISCLAIMER } from '../../data/routes';
import { ROAD_SEGMENTS } from '../../data/roads';
import { RoadSegment, RoadRiskState, TimeStep } from '../../types';
import { GisMap } from '../map/GisMap';
import {
  Navigation,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Info,
  MapPin,
  ChevronRight,
  Car,
  Filter
} from 'lucide-react';

export const SafeRouteView: React.FC = () => {
  const {
    selectedRouteId,
    setSelectedRouteId,
    activeTimeStep,
    setTimeStep,
    focusRoad,
    roadRiskFilter,
    setRoadRiskFilter,
    selectedRoad
  } = useSimulation();

  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [hasCalculated, setHasCalculated] = useState<boolean>(true);
  const [roadSearch, setRoadSearch] = useState<string>('');

  const activeScenario =
    ROUTE_SCENARIOS.find((r) => r.id === selectedRouteId) || ROUTE_SCENARIOS[0];

  // Dynamic road counts per risk category for active timestep
  const roadCounts = useMemo(() => {
    const counts: Record<'ALL' | RoadRiskState, number> = {
      ALL: ROAD_SEGMENTS.length,
      NORMAL: 0,
      MODERATE: 0,
      'HIGH RISK': 0,
      BLOCKED: 0,
    };
    for (const road of ROAD_SEGMENTS) {
      const state = road.timesteps[activeTimeStep];
      const risk = state?.riskState || 'NORMAL';
      if (counts[risk] !== undefined) {
        counts[risk]++;
      }
    }
    return counts;
  }, [activeTimeStep]);

  // Affected roads list for the panel
  const affectedRoads = useMemo(() => {
    return ROAD_SEGMENTS.filter((road) => {
      const state = road.timesteps[activeTimeStep];
      if (!state) return false;
      const matchesFilter =
        roadRiskFilter === 'ALL' || state.riskState === roadRiskFilter;
      const matchesSearch =
        roadSearch.trim() === '' ||
        road.name.toLowerCase().includes(roadSearch.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeTimeStep, roadRiskFilter, roadSearch]);

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setHasCalculated(true);
    }, 600);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 py-4">
      {/* 1. HEADER BANNER */}
      <div className="bg-[#0b121e] border border-[#1e293b] rounded-xl p-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Navigation className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-mono">
                  ROAD RISK & FLOOD-AWARE ROUTING
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  PROTOTYPE MODE | SIMULATED PILOT DATA
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-amber-800/60">
                  SIMULATED ROUTING SCENARIO
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Identifying flood-affected road segments and demonstrating lower-exposure route alternatives.
              </p>
            </div>
          </div>

          {/* Scenario Timestep Selector */}
          <div className="flex items-center gap-1.5 bg-[#080d16] p-1.5 rounded-lg border border-slate-800">
            <Clock className="w-3.5 h-3.5 text-cyan-400 ml-1 mr-0.5" />
            <span className="text-[11px] font-mono text-slate-400">Scenario:</span>
            {(['NOW', '+1HR', '+2HR', '+3HR'] as TimeStep[]).map((step) => (
              <button
                key={step}
                onClick={() => setTimeStep(step)}
                className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition-all ${
                  activeTimeStep === step
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {step}
              </button>
            ))}
          </div>
        </div>

        {/* 2. ROAD STATUS SUMMARY CARDS */}
        <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* BLOCKED CARD */}
          <button
            onClick={() => setRoadRiskFilter(roadRiskFilter === 'BLOCKED' ? 'ALL' : 'BLOCKED')}
            className={`p-3 rounded-xl border text-left transition-all ${
              roadRiskFilter === 'BLOCKED'
                ? 'bg-red-950/70 border-red-500 ring-2 ring-red-500/40'
                : 'bg-[#0d1522] border-red-500/30 hover:border-red-500/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                <span>Blocked</span>
                <span className="text-xs">⛔</span>
              </span>
              <span className="text-[9px] font-mono text-red-400/80">Impassable</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-black font-mono text-red-400">{roadCounts.BLOCKED}</span>
              <span className="text-[11px] font-mono text-slate-400">segments</span>
            </div>
          </button>

          {/* HIGH RISK CARD */}
          <button
            onClick={() => setRoadRiskFilter(roadRiskFilter === 'HIGH RISK' ? 'ALL' : 'HIGH RISK')}
            className={`p-3 rounded-xl border text-left transition-all ${
              roadRiskFilter === 'HIGH RISK'
                ? 'bg-orange-950/70 border-orange-500 ring-2 ring-orange-500/40'
                : 'bg-[#0d1522] border-orange-500/30 hover:border-orange-500/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-orange-400 uppercase tracking-wider">
                High Risk
              </span>
              <span className="text-[9px] font-mono text-orange-400/80">&gt;0.30m</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-black font-mono text-orange-400">{roadCounts['HIGH RISK']}</span>
              <span className="text-[11px] font-mono text-slate-400">segments</span>
            </div>
          </button>

          {/* MODERATE CARD */}
          <button
            onClick={() => setRoadRiskFilter(roadRiskFilter === 'MODERATE' ? 'ALL' : 'MODERATE')}
            className={`p-3 rounded-xl border text-left transition-all ${
              roadRiskFilter === 'MODERATE'
                ? 'bg-amber-950/70 border-amber-500 ring-2 ring-amber-500/40'
                : 'bg-[#0d1522] border-amber-500/30 hover:border-amber-500/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                Moderate
              </span>
              <span className="text-[9px] font-mono text-amber-400/80">0.15–0.30m</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-black font-mono text-amber-400">{roadCounts.MODERATE}</span>
              <span className="text-[11px] font-mono text-slate-400">segments</span>
            </div>
          </button>

          {/* NORMAL CARD */}
          <button
            onClick={() => setRoadRiskFilter(roadRiskFilter === 'NORMAL' ? 'ALL' : 'NORMAL')}
            className={`p-3 rounded-xl border text-left transition-all ${
              roadRiskFilter === 'NORMAL'
                ? 'bg-emerald-950/70 border-emerald-500 ring-2 ring-emerald-500/40'
                : 'bg-[#0d1522] border-emerald-500/30 hover:border-emerald-500/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Normal
              </span>
              <span className="text-[9px] font-mono text-emerald-400/80">&lt;0.15m</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-black font-mono text-emerald-400">{roadCounts.NORMAL}</span>
              <span className="text-[11px] font-mono text-slate-400">segments</span>
            </div>
          </button>
        </div>

        {/* 3. SCENARIO CORRIDOR SELECTION */}
        <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-slate-400 uppercase">
              Predefined Routing Corridor:
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

          <div className="bg-[#0f172a] p-2 rounded-lg border border-slate-800 text-xs font-mono flex items-center justify-between">
            <div className="truncate">
              <div className="text-[10px] text-slate-500 uppercase">Origin</div>
              <div className="font-bold text-cyan-400 truncate">{activeScenario.origin}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 mx-2 flex-shrink-0" />
            <div className="truncate text-right">
              <div className="text-[10px] text-slate-500 uppercase">Destination</div>
              <div className="font-bold text-emerald-400 truncate">{activeScenario.destination}</div>
            </div>
          </div>

          <div>
            <button
              onClick={handleCalculate}
              disabled={isCalculating}
              className="w-full py-2 px-4 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>{isCalculating ? 'EVALUATING ELEVATION MATRIX...' : 'REEVALUATE CORRIDOR'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. MAIN WORKSPACE: MAP + AFFECTED ROADS + ROUTE COMPARISON */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* PRIMARY MAP VIEW */}
        <div className="lg:col-span-8 flex flex-col h-[650px] relative">
          <GisMap showRoutes={hasCalculated} />
        </div>

        {/* SIDE PANELS: AFFECTED ROADS LIST + SECONDARY ROUTING COMPARISON */}
        <div className="lg:col-span-4 space-y-3.5">
          {/* AFFECTED ROADS LIST */}
          <div className="bg-[#0b121e] border border-[#1e293b] rounded-xl p-3 shadow-lg space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-400" />
                <h3 className="font-mono font-bold text-white uppercase tracking-wider text-xs">
                  Affected Corridors
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {affectedRoads.length} shown
              </span>
            </div>

            {/* Filter Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Filter corridor (e.g. Khanapara, Zoo Rd)..."
                value={roadSearch}
                onChange={(e) => setRoadSearch(e.target.value)}
                className="w-full bg-[#080d16] border border-slate-700/80 text-[11px] text-slate-200 placeholder-slate-500 px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            {/* Scrollable list */}
            <div className="space-y-1 max-h-52 overflow-y-auto pr-1 custom-scrollbar">
              {affectedRoads.map((road) => {
                const state = road.timesteps[activeTimeStep];
                const isSelected = selectedRoad?.id === road.id;
                const isBlocked = state.riskState === 'BLOCKED';
                const isHigh = state.riskState === 'HIGH RISK';
                const isMod = state.riskState === 'MODERATE';

                const badgeBg = isBlocked
                  ? 'bg-red-500/20 text-red-300 border-red-500/40'
                  : isHigh
                  ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                  : isMod
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

                return (
                  <div
                    key={road.id}
                    onClick={() => focusRoad(road)}
                    className={`p-2 rounded-lg border cursor-pointer transition-all flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-400 ring-1 ring-cyan-400/50 shadow-md'
                        : 'bg-[#0f172a]/80 border-slate-800 hover:border-slate-600 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[11px] text-white truncate max-w-[170px]">
                        {road.name}
                      </span>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${badgeBg}`}>
                        {state.riskState}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Depth: <strong className="text-slate-200">{state.waterDepthM.toFixed(2)}m</strong></span>
                      <span className="text-cyan-400 hover:underline flex items-center gap-0.5 font-bold">
                        <span>VIEW ON MAP</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECONDARY ROUTING COMPARISON */}
          {/* NORMAL DIRECT ROUTE CARD */}
          <div className="bg-[#0b121e] border border-red-500/40 rounded-xl p-3.5 shadow-lg text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-red-500/20 pb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 ring-4 ring-red-500/20"></span>
                <h4 className="font-mono font-bold text-white uppercase tracking-wider text-xs">
                  Normal Direct Route
                </h4>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 font-bold uppercase">
                {activeScenario.normalRoute.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono py-1">
              <div className="bg-[#0f172a] p-1.5 rounded-lg border border-slate-800">
                <div className="text-[9px] text-slate-400 uppercase">Blocked Segs</div>
                <div className="text-sm font-bold text-red-400 mt-0.5">
                  {activeScenario.normalRoute.blockedSegmentsCount ?? 3} blocked
                </div>
              </div>
              <div className="bg-[#0f172a] p-1.5 rounded-lg border border-slate-800">
                <div className="text-[9px] text-slate-400 uppercase">Exposure</div>
                <div className="text-sm font-bold text-red-400 mt-0.5">
                  {activeScenario.normalRoute.floodExposure}
                </div>
              </div>
              <div className="bg-[#0f172a] p-1.5 rounded-lg border border-slate-800">
                <div className="text-[9px] text-slate-400 uppercase">Max Depth</div>
                <div className="text-sm font-bold text-red-400 mt-0.5">
                  {activeScenario.normalRoute.maxDepthM} m
                </div>
              </div>
            </div>

            {/* Red Callout Box */}
            <div className="p-2 rounded bg-red-950/40 border border-red-500/40 text-[10px] font-mono text-red-200 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span className="font-bold uppercase tracking-tight">
                ROUTE BLOCKED BY SIMULATED FLOOD RISK
              </span>
            </div>

            <p className="text-slate-400 text-[11px] leading-relaxed">
              {activeScenario.normalRoute.notes}
            </p>
          </div>

          {/* LOWER-EXPOSURE ALTERNATIVE ROUTE CARD */}
          <div className="bg-[#0b121e] border border-emerald-500/40 rounded-xl p-3.5 shadow-lg text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20"></span>
                <h4 className="font-mono font-bold text-white uppercase tracking-wider text-xs">
                  Lower-Exposure Alternative
                </h4>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold uppercase">
                LOWER SIMULATED FLOOD EXPOSURE
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono py-1">
              <div className="bg-[#0f172a] p-1.5 rounded-lg border border-slate-800">
                <div className="text-[9px] text-slate-400 uppercase">Blocked Segs</div>
                <div className="text-sm font-bold text-emerald-300 mt-0.5">
                  0 blocked
                </div>
              </div>
              <div className="bg-[#0f172a] p-1.5 rounded-lg border border-slate-800">
                <div className="text-[9px] text-slate-400 uppercase">Exposure</div>
                <div className="text-sm font-bold text-emerald-300 mt-0.5">
                  LOW
                </div>
              </div>
              <div className="bg-[#0f172a] p-1.5 rounded-lg border border-slate-800">
                <div className="text-[9px] text-slate-400 uppercase">Max Depth</div>
                <div className="text-sm font-bold text-emerald-300 mt-0.5">
                  {activeScenario.safeRoute.maxDepthM} m
                </div>
              </div>
            </div>

            {/* Tag Callout */}
            <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/40 text-[10px] font-mono text-emerald-200 flex items-center justify-between">
              <span className="font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>TAG: LOWER SIMULATED FLOOD EXPOSURE</span>
              </span>
              <span className="text-emerald-300 font-mono">+{activeScenario.safeRoute.elevationAdvantageM || 4.2}m MSL</span>
            </div>

            <p className="text-slate-400 text-[11px] leading-relaxed">
              {activeScenario.safeRoute.notes}
            </p>
          </div>

          {/* PROTOTYPE HONESTY & TERMINOLOGY NOTICE */}
          <div className="p-3 rounded-xl bg-[#090e18] border border-[#223554] text-[10px] font-mono text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>Simulated Scenario Notice</span>
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
