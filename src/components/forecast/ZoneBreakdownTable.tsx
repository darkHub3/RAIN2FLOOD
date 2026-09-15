import React from 'react';
import { SCENARIO_IMPACT_DATA } from '../../data/forecastScenario';
import { useSimulation } from '../../context/SimulationContext';
import { Table, ShieldCheck, AlertTriangle } from 'lucide-react';

export const ZoneBreakdownTable: React.FC = () => {
  const { activeTimeStep } = useSimulation();

  return (
    <div className="bg-[#111827] border border-[#223554] rounded-xl p-4 shadow-md space-y-3">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <Table className="w-4 h-4 text-cyan-400" />
          <h3 className="font-mono font-bold text-white text-xs uppercase tracking-wider">
            Representative scenario impact table
          </h3>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            Selected Guwahati Pilot Study Area
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
            Simulated Prototype Data
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-[#0f172a] text-slate-400 text-[11px]">
              <th className="py-2.5 px-3">Zone / Catchment</th>
              <th className="py-2.5 px-2">Elev (MSL)</th>
              <th className={`py-2.5 px-2 text-center ${activeTimeStep === 'NOW' ? 'text-cyan-300 bg-cyan-950/40' : ''}`}>
                NOW
              </th>
              <th className={`py-2.5 px-2 text-center ${activeTimeStep === '+1HR' ? 'text-cyan-300 bg-cyan-950/40' : ''}`}>
                +1 HR
              </th>
              <th className={`py-2.5 px-2 text-center ${activeTimeStep === '+2HR' ? 'text-cyan-300 bg-cyan-950/40' : ''}`}>
                +2 HR
              </th>
              <th className={`py-2.5 px-2 text-center ${activeTimeStep === '+3HR' ? 'text-cyan-300 bg-cyan-950/40' : ''}`}>
                +3 HR
              </th>
              <th className="py-2.5 px-3">Primary Hydraulic Bottleneck</th>
              <th className="py-2.5 px-3">Transit Impact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {SCENARIO_IMPACT_DATA.map((row) => {
              return (
                <tr key={row.zoneId} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-white font-sans">{row.zoneName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{row.subCatchment}</div>
                  </td>
                  <td className="py-2.5 px-2 text-slate-400">{row.elevM}m</td>
                  <td className={`py-2.5 px-2 text-center ${activeTimeStep === 'NOW' ? 'font-bold text-cyan-300 bg-cyan-950/20' : ''}`}>
                    {row.simulatedDepthNow.toFixed(2)}m
                  </td>
                  <td className={`py-2.5 px-2 text-center ${activeTimeStep === '+1HR' ? 'font-bold text-cyan-300 bg-cyan-950/20' : ''}`}>
                    {row.simulatedDepthPlus1.toFixed(2)}m
                  </td>
                  <td className={`py-2.5 px-2 text-center ${activeTimeStep === '+2HR' ? 'font-bold text-cyan-300 bg-cyan-950/20' : ''}`}>
                    {row.simulatedDepthPlus2.toFixed(2)}m
                  </td>
                  <td className={`py-2.5 px-2 text-center ${activeTimeStep === '+3HR' ? 'font-bold text-cyan-300 bg-cyan-950/20' : ''}`}>
                    {row.simulatedDepthPlus3.toFixed(2)}m
                  </td>
                  <td className="py-2.5 px-3 text-[11px] text-slate-400">{row.keyBottleneck}</td>
                  <td className="py-2.5 px-3 text-[11px] text-amber-300/90 font-sans">{row.transitImpact}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="text-[10px] text-slate-400 font-mono pt-1 flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
        <span>Values are representative scenario demonstration data. Avoid claiming a scientifically validated vulnerability assessment.</span>
      </div>
    </div>
  );
};
