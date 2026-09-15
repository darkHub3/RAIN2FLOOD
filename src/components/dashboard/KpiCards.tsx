import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { RAINFALL_SCENARIOS } from '../../data/rainfallScenario';
import { CloudRain, Clock, AlertTriangle, Layers, TrendingUp } from 'lucide-react';

export const KpiCards: React.FC = () => {
  const { activeTimeStep } = useSimulation();
  const current = RAINFALL_SCENARIOS[activeTimeStep];

  // Derive risk badge styling
  const getRiskColor = (riskCount: number) => {
    if (riskCount >= 7) return 'text-red-400 border-red-500/40 bg-red-950/30';
    if (riskCount >= 5) return 'text-amber-400 border-amber-500/40 bg-amber-950/30';
    return 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30';
  };

  const getLoadColor = (utilization: number) => {
    if (utilization >= 110) return 'text-red-400 border-red-500/40 bg-red-950/30';
    if (utilization >= 100) return 'text-orange-400 border-orange-500/40 bg-orange-950/30';
    if (utilization >= 85) return 'text-amber-400 border-amber-500/40 bg-amber-950/30';
    return 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30';
  };

  return (
    <div className="space-y-2">
      {/* Header bar for KPIs */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-200 uppercase tracking-wider">
            Scenario KPIs
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            Simulated Scenario Values
          </span>
        </div>
        <span className="text-[11px] text-slate-400">
          Timestep: <strong className="text-cyan-400 font-semibold">{current.label}</strong>
        </span>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* CARD 1: RAINFALL */}
        <div className="bg-[#111827] border border-[#223554] rounded-xl p-3.5 flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] uppercase font-mono tracking-wider font-semibold text-slate-300">
              Rainfall
            </span>
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-cyan-400">
              <CloudRain className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-black text-white font-mono">
              {current.rainfallIntensityMmHr}
            </span>
            <span className="text-xs text-slate-400 font-medium">mm/hr</span>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-cyan-400 flex items-center gap-1 font-mono">
              <TrendingUp className="w-3 h-3" />
              +{current.trendPct}% in last 30 min
            </span>
            <span className="text-slate-400 text-[10px] font-mono">Simulated</span>
          </div>
        </div>

        {/* CARD 2: NOWCAST WINDOW */}
        <div className="bg-[#111827] border border-[#223554] rounded-xl p-3.5 flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] uppercase font-mono tracking-wider font-semibold text-slate-300">
              Nowcast Window
            </span>
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-black text-white font-mono">
              0–3
            </span>
            <span className="text-xs text-slate-400 font-medium">HOURS</span>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-300 truncate font-mono text-[10px]">
              {current.nowcastConfidence}
            </span>
            <span className="text-slate-400 text-[10px] font-mono">T+{current.hoursAhead}h</span>
          </div>
        </div>

        {/* CARD 3: FLOOD RISK */}
        <div className="bg-[#111827] border border-[#223554] rounded-xl p-3.5 flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] uppercase font-mono tracking-wider font-semibold text-slate-300">
              Flood Risk
            </span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl lg:text-3xl font-black text-white font-mono">
              {current.hoursAhead === 0 ? 'MODERATE' : current.hoursAhead <= 2 ? 'HIGH' : 'CRITICAL'}
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getRiskColor(current.highRiskZonesCount)}`}>
              {current.highRiskZonesCount} zones
            </span>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-300 text-[11px] font-mono">
              Max Depth: <strong className="text-white">{current.maxFloodDepthM.toFixed(2)} m</strong>
            </span>
            <span className="text-slate-400 text-[10px] font-mono">Representative</span>
          </div>
        </div>

        {/* CARD 4: DRAINAGE LOAD */}
        <div className="bg-[#111827] border border-[#223554] rounded-xl p-3.5 flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] uppercase font-mono tracking-wider font-semibold text-slate-300">
              Drainage Load
            </span>
            <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl lg:text-3xl font-black text-white font-mono">
                {current.networkUtilizationPct}
              </span>
              <span className="text-xs text-slate-400 font-mono">%</span>
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getLoadColor(current.networkUtilizationPct)}`}>
              {current.overloadedEdgesCount} overloaded
            </span>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-300 text-[11px] font-mono">
              Surcharged: <strong className="text-white">{current.surchargedNodesCount} nodes</strong>
            </span>
            <span className="text-slate-400 text-[10px] font-mono">Simulated</span>
          </div>
        </div>
      </div>
    </div>
  );
};
