import React from 'react';
import { Info } from 'lucide-react';

export const MapLegend: React.FC = () => {
  return (
    <div className="bg-[#0f172a]/95 backdrop-blur-md border border-[#223554] rounded-lg p-3 text-[11px] font-mono text-slate-300 shadow-xl space-y-2.5 max-w-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold uppercase tracking-wider text-slate-200">
        <span>Map Legend</span>
        <span className="text-[9px] px-1 rounded bg-slate-800 text-slate-400">GIS Layers</span>
      </div>

      {/* Simulated Flood Depth */}
      <div className="space-y-1">
        <div className="text-[10px] text-slate-400 font-semibold uppercase">Simulated Flood Depth</div>
        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-blue-500/40 border border-blue-400"></span>
            <span>0–0.15 m (Low)</span>
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

      {/* Drainage Conduits (Edges) */}
      <div className="space-y-1 pt-1 border-t border-slate-800">
        <div className="text-[10px] text-slate-400 font-semibold uppercase">Drainage Conduits (Load)</div>
        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-1 bg-cyan-400 rounded"></span>
            <span>&lt;85% Normal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-1 bg-amber-400 rounded"></span>
            <span>85–100% Warning</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-1 bg-orange-500 rounded"></span>
            <span>&gt;100% Overload</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-1 bg-red-500 rounded animate-pulse"></span>
            <span>&gt;125% Surcharged</span>
          </div>
        </div>
      </div>

      {/* Nodes */}
      <div className="space-y-1 pt-1 border-t border-slate-800">
        <div className="text-[10px] text-slate-400 font-semibold uppercase">Drainage Nodes</div>
        <div className="flex flex-wrap gap-2 text-[10px]">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>Normal</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>Warning</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-red-400/40"></span>
            <span>Surcharged</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-cyan-300 font-bold">◆</span>
            <span>Outfall</span>
          </div>
        </div>
      </div>

      {/* Road Risk Network */}
      <div className="space-y-1.5 pt-1.5 border-t border-slate-800 text-[10px]">
        <div className="text-[10px] text-slate-400 font-semibold uppercase">Road Network Risk</div>
        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1 bg-emerald-400 rounded"></span>
            <span>Normal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1 bg-amber-400 rounded"></span>
            <span>Moderate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1 bg-orange-500 rounded"></span>
            <span>High Risk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1 border-t-2 border-dashed border-red-500"></span>
            <span className="text-red-300 font-semibold flex items-center gap-0.5">
              <span>Blocked</span>
              <span>⛔</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-0.5">
          <span className="w-4 h-1 bg-cyan-400 rounded shadow-sm"></span>
          <span className="text-cyan-300">Lower-Exposure Alternative Route</span>
        </div>
      </div>

      <div className="text-[9px] text-slate-400 pt-1 border-t border-slate-800 flex items-center gap-1">
        <Info className="w-3 h-3 text-cyan-400" />
        <span>Predefined simulated pilot scenario</span>
      </div>
    </div>
  );
};
