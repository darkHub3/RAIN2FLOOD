import React from 'react';
import { ForecastCharts } from './ForecastCharts';
import { ZoneBreakdownTable } from './ZoneBreakdownTable';
import { TimelineScrubber } from '../dashboard/TimelineScrubber';
import { useSimulation } from '../../context/SimulationContext';
import { RAINFALL_SCENARIOS } from '../../data/rainfallScenario';
import { CloudRain, ArrowRight, ShieldCheck, Activity, Droplets } from 'lucide-react';

export const ScenarioForecastView: React.FC = () => {
  const { activeTimeStep } = useSimulation();
  const currentScenario = RAINFALL_SCENARIOS[activeTimeStep];

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 py-4">
      {/* Header Banner */}
      <div className="bg-[#111827] border border-[#223554] rounded-xl p-4 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <CloudRain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-mono">
                  Scenario Forecast
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
                  SIMULATED FLOOD SCENARIO
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Predetermined convective rainfall progression and catchment inundation modeling for the Guwahati pilot study area.
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <span>Scenario Horizon:</span>
            <span className="text-cyan-300 font-bold px-2 py-0.5 rounded bg-[#0f172a] border border-slate-800">
              0 to 3 Hours Ahead
            </span>
          </div>
        </div>

        {/* Visual Storytelling Pipeline Callout */}
        <div className="mt-4 pt-3 border-t border-slate-800 bg-[#0b101c] p-3 rounded-lg border border-slate-800/80">
          <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold mb-1">
            Physical Correlation Chain Demonstrated:
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-200">
            <span className="text-cyan-400 font-semibold">Increasing Rainfall ({currentScenario.rainfallIntensityMmHr} mm/h)</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-blue-400 font-semibold">Increasing Runoff ({currentScenario.catchmentRunoffM3s} m³/s)</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-amber-400 font-semibold">Drainage Load Stress ({currentScenario.networkUtilizationPct}%)</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-red-400 font-semibold">Street Surcharge &amp; Flood Depth ({currentScenario.maxFloodDepthM.toFixed(2)} m)</span>
          </div>
        </div>
      </div>

      {/* Timeline Scrubber */}
      <TimelineScrubber />

      {/* Synced Scenario Charts */}
      <ForecastCharts />

      {/* Representative Scenario Impact Table */}
      <ZoneBreakdownTable />

      {/* Bottom Technical Disclosure */}
      <div className="p-3 rounded-xl bg-[#0f172a] border border-[#223554] text-[11px] font-mono text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Note: Values reflect predetermined simulated scenario states. Future deployment connects Doppler Radar nowcasts and coupled 2D hydrodynamic solvers.</span>
        </span>
        <span className="text-slate-400">SIH 2026 Demonstrator</span>
      </div>
    </div>
  );
};
