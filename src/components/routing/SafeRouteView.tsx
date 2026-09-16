import React, { useState, useMemo } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { ROAD_SEGMENTS } from '../../data/roads';
import { RoadSegment, RoadRiskState, TimeStep } from '../../types';
import { GisMap } from '../map/GisMap';
import {
  ShieldAlert,
  AlertTriangle,
  Clock,
  ArrowRight,
  Sparkles,
  Info,
  MapPin,
  ChevronRight,
  Filter,
  Layers,
  CheckCircle2,
  Cpu,
  Search,
  Zap,
  HelpCircle,
  Car
} from 'lucide-react';

export const SafeRouteView: React.FC = () => {
  const {
    activeTimeStep,
    setTimeStep,
    focusRoad,
    roadRiskFilter,
    setRoadRiskFilter,
    selectedRoad,
    setSelectedRoad,
  } = useSimulation();

  const [roadSearch, setRoadSearch] = useState<string>('');

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

  // Affected roads list for the interactive browser
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

  // Active road for inspection card (defaults to Khanapara or first blocked road)
  const activeInspectRoad =
    selectedRoad ||
    affectedRoads.find((r) => r.timesteps[activeTimeStep]?.riskState === 'BLOCKED') ||
    ROAD_SEGMENTS[0];

  const activeInspectState = activeInspectRoad.timesteps[activeTimeStep];
  const isBlocked = activeInspectState.riskState === 'BLOCKED';
  const isHigh = activeInspectState.riskState === 'HIGH RISK';
  const isMod = activeInspectState.riskState === 'MODERATE';

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-3 sm:px-6 py-4 select-none">
      {/* 1. HEADER BANNER */}
      <div className="bg-[#0b121e] border border-[#1e293b] rounded-xl p-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-mono">
                  ROAD-LEVEL FLOOD IMPACT & BLOCKED ROAD IDENTIFICATION
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-800/60 font-bold">
                  PROTOTYPE MODE | SIMULATED PILOT DATA
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-800/60 font-bold">
                  GUWAHATI PILOT STUDY AREA
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Answering the core operational question: <strong className="text-slate-200">"Which roads are affected or blocked?"</strong> based on coupled simulated runoff and drainage surcharge.
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
                className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all ${
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

        {/* 2. ROAD STATUS SUMMARY FILTER CARDS */}
        <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* BLOCKED CARD */}
          <button
            onClick={() => setRoadRiskFilter(roadRiskFilter === 'BLOCKED' ? 'ALL' : 'BLOCKED')}
            className={`p-3 rounded-xl border text-left transition-all ${
              roadRiskFilter === 'BLOCKED'
                ? 'bg-red-950/80 border-red-500 ring-2 ring-red-500/40'
                : 'bg-[#0d1522] border-red-500/30 hover:border-red-500/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                <span>Blocked</span>
                <span className="text-xs">⛔</span>
              </span>
              <span className="text-[9px] font-mono text-red-400/80">&gt;0.60m depth</span>
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
                ? 'bg-orange-950/80 border-orange-500 ring-2 ring-orange-500/40'
                : 'bg-[#0d1522] border-orange-500/30 hover:border-orange-500/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-orange-400 uppercase tracking-wider">
                High Risk
              </span>
              <span className="text-[9px] font-mono text-orange-400/80">0.30–0.60m</span>
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
                ? 'bg-amber-950/80 border-amber-500 ring-2 ring-amber-500/40'
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
                ? 'bg-emerald-950/80 border-emerald-500 ring-2 ring-emerald-500/40'
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
      </div>

      {/* 3. MAIN WORKSPACE: MAP VIEW + INTERACTIVE INSPECTOR PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-[580px]">
        {/* MAP CONTAINER (Col 7 on Desktop) */}
        <div className="lg:col-span-7 h-[460px] lg:h-[620px] rounded-xl overflow-hidden border border-[#1e293b] shadow-xl">
          <GisMap showRoutes={false} />
        </div>

        {/* ROAD IMPACT INSPECTOR & CORRIDOR DIRECTORY (Col 5 on Desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-3 h-[460px] lg:h-[620px] overflow-hidden">
          {/* SECTION 15 BLOCKED ROAD INSPECTOR CARD */}
          <div className={`p-4 rounded-xl border shadow-xl transition-all ${
            isBlocked
              ? 'bg-red-950/40 border-red-500/60'
              : isHigh
              ? 'bg-orange-950/40 border-orange-500/60'
              : 'bg-[#0c1422] border-cyan-500/40'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  ROAD IMPACT
                </span>
                {isBlocked && (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-red-600/30 text-red-300 border border-red-500/50 font-bold">
                    ⛔ BLOCKED
                  </span>
                )}
              </div>
              <span className="text-[10px] font-mono text-amber-300">
                Timestep: {activeTimeStep}
              </span>
            </div>

            <div className="mt-3 space-y-2 font-mono text-xs text-slate-300">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-sans">Road:</span>
                <span className="text-white font-bold">{activeInspectRoad.name}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-sans">Status:</span>
                <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                  isBlocked
                    ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                    : isHigh
                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/50'
                    : isMod
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                }`}>
                  {isBlocked ? 'SIMULATED BLOCKED CONDITION' : activeInspectState.riskState}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-sans">Simulated Flood Depth:</span>
                <strong className="text-cyan-300 text-sm font-black">{activeInspectState.waterDepthM.toFixed(2)} m</strong>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-sans">Drainage Stress:</span>
                <strong className="text-rose-400 font-bold">{activeInspectState.drainageStressPct || 90}%</strong>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-sans">Scenario:</span>
                <span className="text-amber-300 font-bold">{activeTimeStep}</span>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] leading-relaxed">
                <span className="text-slate-400 font-sans font-semibold">Reason: </span>
                <span className="text-rose-200">
                  {isBlocked
                    ? 'Predicted flood depth exceeds prototype road-impact threshold.'
                    : isHigh
                    ? 'Excess surface runoff from upstream hill catchments exceeding roadside gutter capacity.'
                    : 'Overland water depth currently within passable threshold.'}
                </span>
              </div>
            </div>

            <button
              onClick={() => focusRoad(activeInspectRoad)}
              className="mt-3 w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>LOCATE ON SATELLITE MAP</span>
            </button>
          </div>

          {/* CORRIDOR DIRECTORY / SEARCH LIST */}
          <div className="flex-1 bg-[#0a111c] border border-[#1e293b] rounded-xl p-3 flex flex-col gap-2 min-h-0">
            <div className="flex items-center justify-between gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search Guwahati corridor (e.g. GS Road, Anil Nagar)..."
                  value={roadSearch}
                  onChange={(e) => setRoadSearch(e.target.value)}
                  className="w-full bg-[#111927] border border-slate-700/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
              <span className="text-[11px] font-mono text-slate-400 shrink-0">
                {affectedRoads.length} roads
              </span>
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
              {affectedRoads.map((road) => {
                const rState = road.timesteps[activeTimeStep];
                const roadBlocked = rState.riskState === 'BLOCKED';
                const roadHigh = rState.riskState === 'HIGH RISK';
                const roadMod = rState.riskState === 'MODERATE';
                const isSelected = activeInspectRoad.id === road.id;

                const badgeBg = roadBlocked
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : roadHigh
                  ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                  : roadMod
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

                return (
                  <div
                    key={road.id}
                    onClick={() => {
                      setSelectedRoad(road);
                      focusRoad(road);
                    }}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-cyan-950/50 border-cyan-500 ring-1 ring-cyan-500/40'
                        : 'bg-[#0d1624] border-slate-800/80 hover:border-slate-700 hover:bg-[#131f32]'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-semibold text-white text-xs truncate">
                        {road.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                        <span>Depth: <strong className="text-cyan-300">{rState.waterDepthM.toFixed(2)}m</strong></span>
                        <span>•</span>
                        <span>Stress: <strong className="text-slate-200">{rState.drainageStressPct || 85}%</strong></span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5">
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${badgeBg}`}>
                        {roadBlocked ? '⛔ BLOCKED' : rState.riskState}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 4. CURRENT PROTOTYPE VS FUTURE SCOPE (SECTIONS 13 & 22) */}
      <div className="bg-[#0b121e] border border-[#1e293b] rounded-xl p-5 shadow-2xl space-y-4">
        <div className="border-b border-slate-800 pb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              SYSTEM ARCHITECTURE: CURRENT PROTOTYPE VS FUTURE SCOPE
            </h2>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            Smart India Hackathon (SIH 2026) Technical Roadmap
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CURRENT PROTOTYPE */}
          <div className="bg-[#0e1726] border border-cyan-500/30 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs font-mono uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Current Implemented Prototype</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Demonstrating the physics-informed coupling: <em>Rainfall + Terrain + Drainage Capacity → Flood Risk → Road Impact</em>.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Guwahati-focused GIS dashboard with high-res satellite basemap</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Simulated rainfall scenario timeline (NOW → +1HR → +2HR → +3HR)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Simulated flood extent polygons & ⚠️ hotspot click inspectors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Two strictly separated graphs: Drainage (D-*) vs Roads (R-*)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Natural Drainage (Blue/Cyan) vs Representative Drainage (Purple/Orange)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Road-level flood impact & blocked-road condition identification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Switchable map modes: [ FLOOD & DRAINAGE ] ↕ [ ROAD RISK ]</span>
              </li>
            </ul>
          </div>

          {/* FUTURE SCOPE */}
          <div className="bg-[#0e1726] border border-amber-500/30 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Future System & Vehicle Routing (Production Scope)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Vehicle routing is treated honestly as production future scope rather than faking a live turn-by-turn navigation engine:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">→</span>
                <span>IMD / NCMRWF Doppler radar real-time rainfall nowcast ingestion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">→</span>
                <span>1-meter LiDAR DEM & 2D hydrodynamic simulation engine (EPA SWMM / LISFLOOD)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">→</span>
                <span>Authoritative GMC / GMDA underground municipal drainage GIS integration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">→</span>
                <span>IoT ultrasonic water-level sensors deployed in primary urban outfalls</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">→</span>
                <span>Dynamic road closures coordinated with Guwahati Traffic Police</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">→</span>
                <span>Flood-aware routing API & navigation service integration (emergency vehicles)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
