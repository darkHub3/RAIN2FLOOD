import React from 'react';
import { Info, AlertTriangle } from 'lucide-react';

export const MapLegend: React.FC = () => {
  return (
    <div className="bg-[#0f172a]/95 backdrop-blur-md border border-[#223554] rounded-xl p-3 text-[11px] font-mono text-slate-300 shadow-2xl space-y-2.5 max-w-xs select-none">
      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold uppercase tracking-wider text-slate-200">
        <span>Map Legend</span>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-500/40 text-amber-300 font-bold">
          PROTOTYPE
        </span>
      </div>

      {/* 1. Natural vs Man-Made Drainage */}
      <div className="space-y-1.5">
        <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
          Drainage Infrastructure
        </div>
        <div className="space-y-1 text-[10px]">
          <div className="flex items-center gap-2">
            <span className="w-4 h-1 bg-[#00d2ff] rounded shadow-[0_0_8px_rgba(0,210,255,0.7)]"></span>
            <span className="text-cyan-200 font-medium">Natural Channels (Blue/Cyan)</span>
          </div>
          <p className="text-[9px] text-slate-400 pl-6 leading-tight">
            Bharalu, Bahini, Mora Bharalu, Basistha, Lakhimijan, Bondajan
          </p>

          <div className="flex items-center gap-2 pt-0.5">
            <span className="w-4 h-1 bg-[#a855f7] rounded shadow-[0_0_6px_rgba(168,85,247,0.6)]"></span>
            <span className="text-purple-200 font-medium">Representative Drains (Purple/Orange)</span>
          </div>
          <p className="text-[9px] text-slate-400 pl-6 leading-tight">
            Feeder drains, culverts, pump links (Stress: Purple normal → Orange high)
          </p>
        </div>
      </div>

      {/* 2. Road Network Risk */}
      <div className="space-y-1.5 pt-1.5 border-t border-slate-800">
        <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
          Road Network Risk (Coupled)
        </div>
        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1 bg-emerald-400 rounded"></span>
            <span className="text-emerald-300">Normal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1 bg-amber-400 rounded"></span>
            <span className="text-amber-300">Moderate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1 bg-orange-500 rounded"></span>
            <span className="text-orange-300">High Risk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1 border-t-2 border-dashed border-red-500"></span>
            <span className="text-red-300 font-semibold flex items-center gap-0.5">
              <span>Blocked</span>
              <span>⛔</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. Simulated Flood Depth */}
      <div className="space-y-1 pt-1.5 border-t border-slate-800">
        <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
          Simulated Flood Depth
        </div>
        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-blue-500/40 border border-blue-400"></span>
            <span>&lt;0.15 m (Low)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-amber-500/40 border border-amber-400"></span>
            <span>0.15–0.30 m (Mod)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-orange-500/50 border border-orange-400"></span>
            <span>0.30–0.60 m (High)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-red-600/60 border border-red-500"></span>
            <span>&gt;0.60 m (Critical)</span>
          </div>
        </div>
      </div>

      {/* 4. Hotspots */}
      <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-amber-200">Flood Hotspots</span>
        </div>
        <span className="text-[9px] text-slate-400 font-mono">Click to inspect</span>
      </div>

      {/* Data Disclosure */}
      <div className="text-[9px] text-slate-400 pt-1.5 border-t border-slate-800 space-y-0.5">
        <div className="flex items-center gap-1 text-cyan-300">
          <Info className="w-3 h-3 text-cyan-400 shrink-0" />
          <span className="font-semibold">Roads: OpenStreetMap (OSM) Centerlines</span>
        </div>
        <div className="text-[8.5px] text-slate-400 pl-4 leading-tight">
          Overland flood risk coupled via hydrologic proximity simulation.
        </div>
      </div>
    </div>
  );
};

