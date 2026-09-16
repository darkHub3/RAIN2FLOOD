import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { RAINFALL_SCENARIOS } from '../../data/rainfallScenario';
import {
  CloudRain,
  Waves,
  AlertTriangle,
  Layers,
  Activity,
  ShieldAlert
} from 'lucide-react';

export const BottomCommandBar: React.FC = () => {
  const { activeTimeStep } = useSimulation();
  const current = RAINFALL_SCENARIOS[activeTimeStep];

  return (
    <footer
      aria-label="System Overview Statistics"
      className="w-full bg-[#090e18]/95 backdrop-blur-md border border-[#1e293b] rounded-xl p-2.5 sm:p-3 shadow-2xl text-slate-200 select-none font-sans"
    >
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* 4 STATISTIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 flex-1">
          {/* Card 1: Rainfall */}
          <div className="bg-[#0e1626]/90 border border-cyan-900/40 rounded-lg p-2.5 flex items-center justify-between gap-2.5 shadow-sm hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shrink-0">
                <CloudRain className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white tracking-tight">Rainfall</span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">
                    {current.rainfallIntensityMmHr.toFixed(0)} mm/h
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  Intense rainfall expected in next 3 hours
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Drainage */}
          <div className="bg-[#0e1626]/90 border border-blue-900/40 rounded-lg p-2.5 flex items-center justify-between gap-2.5 shadow-sm hover:border-blue-500/50 transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/30 shrink-0">
                <Waves className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white tracking-tight">Drainage</span>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                    current.networkUtilizationPct >= 100
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    {current.networkUtilizationPct}% load
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  Several drains operating near capacity
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Historical Hotspots */}
          <div className="bg-[#0e1626]/90 border border-amber-900/40 rounded-lg p-2.5 flex items-center justify-between gap-2.5 shadow-sm hover:border-amber-500/50 transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white tracking-tight">Historical Hotspots</span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                    High recurrence
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  Khanapara, Zoo Road, GS Road
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Predicted Flood Zones */}
          <div className="bg-[#0e1626]/90 border border-indigo-900/40 rounded-lg p-2.5 flex items-center justify-between gap-2.5 shadow-sm hover:border-indigo-500/50 transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white tracking-tight">Predicted Flood Zones</span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                    19.4 km²
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  19.4 km² (estimated area) within 3 hours
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SLOGAN & BRAND EMBLEM */}
        <div className="flex items-center justify-center lg:justify-end gap-3 px-3 py-1.5 border-t lg:border-t-0 lg:border-l border-slate-800 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
            <Waves className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col text-left">
            <div className="text-xs font-semibold tracking-wide text-cyan-300">
              Be prepared. Stay informed. Stay safe.
            </div>
            <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
              SIMULATED PILOT DATA • SIH 2026
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

