import React, { useMemo } from 'react';
import { useSimulation, ActiveLayers } from '../../context/SimulationContext';
import { ROAD_SEGMENTS } from '../../data/roads';
import { RoadRiskState, RoadSegment } from '../../types';
import {
  Layers,
  Waves,
  Droplets,
  GitBranch,
  AlertTriangle,
  Navigation,
  GripVertical,
  ShieldAlert,
  MapPin,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';

export const LeftSidebar: React.FC = () => {
  const {
    activeLayers,
    toggleLayer,
    baseMapMode,
    setBaseMapMode,
    activeTimeStep,
    roadRiskFilter,
    setRoadRiskFilter,
    selectedRoad,
    focusRoad
  } = useSimulation();

  // Dynamic road counts per risk category for the active timestep
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

  // Affected roads list for active timestep
  const affectedRoads = useMemo(() => {
    return ROAD_SEGMENTS.filter((road) => {
      const state = road.timesteps[activeTimeStep];
      if (!state) return false;
      if (roadRiskFilter === 'ALL') {
        return state.riskState !== 'NORMAL';
      }
      return state.riskState === roadRiskFilter;
    }).slice(0, 8); // Top 8 for sidebar display
  }, [activeTimeStep, roadRiskFilter]);

  const layersList: {
    key: keyof ActiveLayers;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: 'rainfallNowcast',
      label: 'Rainfall (Nowcast)',
      icon: (
        <div className="w-4 h-4 rounded grid grid-cols-2 gap-0.5 p-0.5 bg-gradient-to-br from-amber-400 via-rose-500 to-cyan-500">
          <div className="bg-white/40 rounded-[1px]"></div>
          <div className="bg-white/60 rounded-[1px]"></div>
          <div className="bg-white/50 rounded-[1px]"></div>
          <div className="bg-white/80 rounded-[1px]"></div>
        </div>
      ),
    },
    {
      key: 'predictedFloodZones',
      label: 'Predicted Flood Zones',
      icon: <Waves className="w-4 h-4 text-cyan-400" />,
    },
    {
      key: 'waterDepth',
      label: 'Water Depth (cm)',
      icon: <Droplets className="w-4 h-4 text-blue-400" />,
    },
    {
      key: 'drainageNetwork',
      label: 'Drainage Network',
      icon: <GitBranch className="w-4 h-4 text-sky-400" />,
    },
    {
      key: 'historicalHotspots',
      label: 'Historical Flood Hotspots',
      icon: <AlertTriangle className="w-4 h-4 text-rose-400" />,
    },
    {
      key: 'roadNetwork',
      label: 'Road Network',
      icon: <Navigation className="w-4 h-4 text-cyan-300" />,
    },
  ];

  return (
    <div className="flex flex-col gap-3 bg-[#0a111c] border border-[#162236] rounded-xl p-3 text-xs font-sans text-slate-300 shadow-xl select-none h-full overflow-y-auto">
      {/* 1. LAYERS SECTION */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white text-[13px] tracking-wide">
              ROAD RISK & FLOOD STATUS
            </span>
          </div>
        </div>

        <div className="space-y-1">
          {layersList.map((layer) => {
            const isOn = Boolean(activeLayers[layer.key]);
            return (
              <div
                key={layer.key}
                onClick={() => toggleLayer(layer.key)}
                className="flex items-center justify-between py-1 px-1.5 rounded-lg hover:bg-[#121c2e] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="w-3 h-3 text-slate-600 group-hover:text-slate-400 transition-colors" />
                  {layer.icon}
                  <span className={`text-[11px] ${isOn ? 'text-slate-200 font-medium' : 'text-slate-500'}`}>
                    {layer.label}
                  </span>
                </div>

                {/* iOS-style Pill Switch Toggle */}
                <div
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-all duration-300 ${
                    isOn ? 'bg-cyan-500 justify-end' : 'bg-slate-700 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. ROAD RISK FILTER SECTION */}
      <div className="space-y-2 pt-2 border-t border-[#162236]">
        <div className="flex items-center justify-between pb-0.5">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white text-[13px] tracking-wide">
              Road Risk Filter
            </span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#132238] text-cyan-300 border border-cyan-800/60 font-semibold">
            {roadCounts.BLOCKED + roadCounts['HIGH RISK'] + roadCounts.MODERATE} Affected
          </span>
        </div>

        <div className="grid grid-cols-1 gap-1">
          {/* All Roads */}
          <button
            onClick={() => setRoadRiskFilter('ALL')}
            className={`flex items-center justify-between px-2 py-1 rounded-lg border text-left transition-all ${
              roadRiskFilter === 'ALL'
                ? 'bg-cyan-950/60 border-cyan-500/80 text-white font-semibold'
                : 'bg-[#0d1624] border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${roadRiskFilter === 'ALL' ? 'border-cyan-400 bg-cyan-500/20' : 'border-slate-600'}`}>
                {roadRiskFilter === 'ALL' && <div className="w-1.5 h-1.5 rounded-xs bg-cyan-400" />}
              </div>
              <span className="text-[11px]">All Roads</span>
            </div>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
              {roadCounts.ALL}
            </span>
          </button>

          {/* Blocked */}
          <button
            onClick={() => setRoadRiskFilter('BLOCKED')}
            className={`flex items-center justify-between px-2 py-1 rounded-lg border text-left transition-all ${
              roadRiskFilter === 'BLOCKED'
                ? 'bg-red-950/60 border-red-500/80 text-white font-semibold'
                : 'bg-[#0d1624] border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-red-900/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${roadRiskFilter === 'BLOCKED' ? 'border-red-400 bg-red-500/20' : 'border-slate-600'}`}>
                {roadRiskFilter === 'BLOCKED' && <div className="w-1.5 h-1.5 rounded-xs bg-red-400" />}
              </div>
              <span className="text-[11px] text-red-300 flex items-center gap-1 font-medium">
                <span>Blocked</span>
                <span className="text-[10px]">⛔</span>
              </span>
            </div>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800/60 font-bold">
              {roadCounts.BLOCKED}
            </span>
          </button>

          {/* High Risk */}
          <button
            onClick={() => setRoadRiskFilter('HIGH RISK')}
            className={`flex items-center justify-between px-2 py-1 rounded-lg border text-left transition-all ${
              roadRiskFilter === 'HIGH RISK'
                ? 'bg-orange-950/60 border-orange-500/80 text-white font-semibold'
                : 'bg-[#0d1624] border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-orange-900/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${roadRiskFilter === 'HIGH RISK' ? 'border-orange-400 bg-orange-500/20' : 'border-slate-600'}`}>
                {roadRiskFilter === 'HIGH RISK' && <div className="w-1.5 h-1.5 rounded-xs bg-orange-400" />}
              </div>
              <span className="text-[11px] text-orange-300 font-medium">High Risk</span>
            </div>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-orange-950/80 text-orange-300 border border-orange-800/60 font-bold">
              {roadCounts['HIGH RISK']}
            </span>
          </button>

          {/* Moderate */}
          <button
            onClick={() => setRoadRiskFilter('MODERATE')}
            className={`flex items-center justify-between px-2 py-1 rounded-lg border text-left transition-all ${
              roadRiskFilter === 'MODERATE'
                ? 'bg-amber-950/60 border-amber-500/80 text-white font-semibold'
                : 'bg-[#0d1624] border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-amber-900/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${roadRiskFilter === 'MODERATE' ? 'border-amber-400 bg-amber-500/20' : 'border-slate-600'}`}>
                {roadRiskFilter === 'MODERATE' && <div className="w-1.5 h-1.5 rounded-xs bg-amber-400" />}
              </div>
              <span className="text-[11px] text-amber-300 font-medium">Moderate</span>
            </div>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60 font-bold">
              {roadCounts.MODERATE}
            </span>
          </button>

          {/* Normal */}
          <button
            onClick={() => setRoadRiskFilter('NORMAL')}
            className={`flex items-center justify-between px-2 py-1 rounded-lg border text-left transition-all ${
              roadRiskFilter === 'NORMAL'
                ? 'bg-emerald-950/60 border-emerald-500/80 text-white font-semibold'
                : 'bg-[#0d1624] border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-emerald-900/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${roadRiskFilter === 'NORMAL' ? 'border-emerald-400 bg-emerald-500/20' : 'border-slate-600'}`}>
                {roadRiskFilter === 'NORMAL' && <div className="w-1.5 h-1.5 rounded-xs bg-emerald-400" />}
              </div>
              <span className="text-[11px] text-emerald-300 font-medium">Normal</span>
            </div>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-bold">
              {roadCounts.NORMAL}
            </span>
          </button>
        </div>
      </div>

      {/* 3. AFFECTED CORRIDORS (PRIORITY LIST) */}
      <div className="space-y-1.5 pt-2 border-t border-[#162236]">
        <div className="flex items-center justify-between">
          <span className="font-bold text-white text-[12px] tracking-wide flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            Priority Corridors
          </span>
          <span className="text-[9px] font-mono text-slate-400">Click to focus</span>
        </div>

        <div className="space-y-1 max-h-44 overflow-y-auto pr-0.5 custom-scrollbar">
          {affectedRoads.map((road) => {
            const state = road.timesteps[activeTimeStep];
            const isSelected = selectedRoad?.id === road.id;
            const isBlocked = state.riskState === 'BLOCKED';
            const isHigh = state.riskState === 'HIGH RISK';
            const isMod = state.riskState === 'MODERATE';

            const badgeColor = isBlocked
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
                className={`p-1.5 rounded-lg border transition-all cursor-pointer group flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-cyan-950/50 border-cyan-400 shadow-md ring-1 ring-cyan-400/40'
                    : 'bg-[#0d1624] border-slate-800/80 hover:bg-[#121f35] hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[11px] text-slate-200 group-hover:text-cyan-300 truncate max-w-[135px]">
                    {road.name}
                  </span>
                  <span className={`text-[8px] font-mono font-bold px-1.5 py-0.2 rounded border ${badgeColor}`}>
                    {state.riskState}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                  <span>Depth: <strong className="text-slate-300">{state.waterDepthM.toFixed(2)}m</strong></span>
                  <span className="text-cyan-400 group-hover:underline flex items-center gap-0.5 font-bold">
                    <span>VIEW</span>
                    <ChevronRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. BASE MAP SECTION */}
      <div className="space-y-2 pt-2 border-t border-[#162236]">
        <div className="font-bold text-white text-[13px] tracking-wide">
          Base Map
        </div>

        <div className="space-y-1 text-xs">
          {/* Satellite Option (Default) */}
          <label
            onClick={() => setBaseMapMode('satellite')}
            className="flex items-center gap-2.5 py-1 px-1.5 rounded hover:bg-[#121c2e] cursor-pointer text-slate-300"
          >
            <div className="w-4 h-4 rounded-full border border-cyan-500 flex items-center justify-center p-0.5">
              {baseMapMode === 'satellite' && (
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              )}
            </div>
            <span className={baseMapMode === 'satellite' ? 'text-white font-medium' : 'text-slate-400'}>
              Satellite
            </span>
          </label>

          {/* OpenStreetMap Option */}
          <label
            onClick={() => setBaseMapMode('osm')}
            className="flex items-center gap-2.5 py-1 px-1.5 rounded hover:bg-[#121c2e] cursor-pointer text-slate-300"
          >
            <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center p-0.5">
              {baseMapMode === 'osm' && (
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              )}
            </div>
            <span className={baseMapMode === 'osm' ? 'text-white font-medium' : 'text-slate-400'}>
              OpenStreetMap
            </span>
          </label>

          {/* Dark (Default) Option */}
          <label
            onClick={() => setBaseMapMode('dark')}
            className="flex items-center gap-2.5 py-1 px-1.5 rounded hover:bg-[#121c2e] cursor-pointer text-slate-300"
          >
            <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center p-0.5">
              {baseMapMode === 'dark' && (
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              )}
            </div>
            <span className={baseMapMode === 'dark' ? 'text-white font-medium' : 'text-slate-400'}>
              Dark (Default)
            </span>
          </label>
        </div>
      </div>

      {/* 5. LEGEND SECTION */}
      <div className="space-y-2.5 pt-2 border-t border-[#162236]">
        <div className="font-bold text-white text-[13px] tracking-wide flex items-center justify-between">
          <span>Legend</span>
          <span className="text-[9px] font-mono text-slate-400">GIS Overlay</span>
        </div>

        {/* Road Risk Status Legend */}
        <div className="bg-[#0d1624] p-2 rounded-lg border border-[#162236] space-y-1.5 text-[10px]">
          <div className="text-[10px] text-slate-400 font-semibold uppercase">Road Risk States</div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 bg-emerald-400 rounded-sm inline-block"></span>
              <span className="text-slate-300">Normal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 bg-amber-400 rounded-sm inline-block"></span>
              <span className="text-slate-300">Moderate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 bg-orange-500 rounded-sm inline-block"></span>
              <span className="text-slate-300">High Risk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 border-t-2 border-dashed border-red-500 inline-block"></span>
              <span className="text-red-300 font-semibold flex items-center gap-0.5">
                <span>Blocked</span>
                <span>⛔</span>
              </span>
            </div>
          </div>
        </div>

        {/* Dual Vertical Gradients (Rainfall Intensity & Water Depth) */}
        <div className="grid grid-cols-2 gap-2 bg-[#0d1624] p-2 rounded-lg border border-[#162236]">
          {/* Column 1: Rainfall Intensity */}
          <div className="space-y-1">
            <div className="text-[10px] text-slate-400 font-medium leading-tight">
              Rainfall (mm/hr)
            </div>

            <div className="flex gap-2 items-center pt-0.5">
              {/* Gradient vertical strip */}
              <div
                className="w-3.5 h-24 rounded-sm shadow-sm"
                style={{
                  background: 'linear-gradient(to bottom, #ef4444, #f97316, #eab308, #38bdf8, #0284c7)',
                }}
              />

              {/* Ticks */}
              <div className="flex flex-col justify-between h-24 text-[8px] font-mono text-slate-300 leading-none">
                <span>&gt; 50</span>
                <span>20–50</span>
                <span>10–20</span>
                <span>5–10</span>
                <span>1–5</span>
              </div>
            </div>
          </div>

          {/* Column 2: Water Depth */}
          <div className="space-y-1">
            <div className="text-[10px] text-slate-400 font-medium leading-tight">
              Water Depth (cm)
            </div>

            <div className="flex gap-2 items-center pt-0.5">
              {/* Gradient vertical strip */}
              <div
                className="w-3.5 h-24 rounded-sm shadow-sm"
                style={{
                  background: 'linear-gradient(to bottom, #ef4444, #f97316, #eab308, #06b6d4, #0284c7)',
                }}
              />

              {/* Ticks */}
              <div className="flex flex-col justify-between h-24 text-[8px] font-mono text-slate-300 leading-none">
                <span>&gt; 60</span>
                <span>30–60</span>
                <span>15–30</span>
                <span>5–15</span>
                <span>&lt; 5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Symbols List */}
        <div className="space-y-1.5 pt-1 text-[10px]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-cyan-400/25 border border-cyan-400/50 inline-block rounded-xs"></span>
            <span className="text-slate-300">Subtle Flood Zone</span>
          </div>

          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 fill-rose-500/20" />
            <span className="text-slate-300">Flood Hotspot Marker</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-emerald-400 bg-emerald-950 inline-block"></span>
            <span className="text-slate-300">Manhole / Drainage Node</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-1 bg-[#00d2ff] rounded inline-block shadow-sm"></span>
            <span className="text-slate-300">Natural Drainage Channel</span>
          </div>
        </div>
      </div>
    </div>
  );
};
