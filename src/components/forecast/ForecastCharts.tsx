import React from 'react';
import { FORECAST_CHART_SERIES } from '../../data/forecastScenario';
import { useSimulation } from '../../context/SimulationContext';
import { CloudRain, Droplets, Layers, ArrowUpRight, TrendingUp } from 'lucide-react';

export const ForecastCharts: React.FC = () => {
  const { activeTimeStep, setTimeStep } = useSimulation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* CHART 1: RAINFALL INTENSITY */}
      <div className="bg-[#111827] border border-[#223554] rounded-xl p-4 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-cyan-400" />
            <span className="font-mono font-bold text-white text-xs uppercase tracking-wider">
              Rainfall Intensity (mm/hr)
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
            Simulated
          </span>
        </div>

        {/* Bar chart representation */}
        <div className="pt-2 flex items-end justify-between gap-3 h-36 px-2">
          {FORECAST_CHART_SERIES.map((pt) => {
            const isSelected = activeTimeStep === pt.timeStep;
            const heightPct = (pt.rainfallMmHr / 110) * 100;

            return (
              <div
                key={pt.timeStep}
                onClick={() => setTimeStep(pt.timeStep)}
                className="flex-1 flex flex-col items-center gap-1.5 cursor-pointer group"
              >
                <span className={`text-[10px] font-mono ${isSelected ? 'text-cyan-300 font-bold' : 'text-slate-400'}`}>
                  {pt.rainfallMmHr}
                </span>
                <div className="w-full max-w-[40px] bg-slate-800 rounded-t h-28 flex items-end overflow-hidden">
                  <div
                    className={`w-full transition-all duration-500 ${
                      isSelected
                        ? 'bg-gradient-to-t from-cyan-600 to-cyan-400 ring-2 ring-cyan-400/40'
                        : 'bg-cyan-700/60 group-hover:bg-cyan-600/80'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className={`text-[10px] font-mono uppercase ${isSelected ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}>
                  {pt.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CHART 2: ESTIMATED RUNOFF VOLUME */}
      <div className="bg-[#111827] border border-[#223554] rounded-xl p-4 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="font-mono font-bold text-white text-xs uppercase tracking-wider">
              Catchment Runoff Volume (m³/s)
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
            Simulated
          </span>
        </div>

        <div className="pt-2 flex items-end justify-between gap-3 h-36 px-2">
          {FORECAST_CHART_SERIES.map((pt) => {
            const isSelected = activeTimeStep === pt.timeStep;
            const heightPct = (pt.runoffM3s / 280) * 100;

            return (
              <div
                key={pt.timeStep}
                onClick={() => setTimeStep(pt.timeStep)}
                className="flex-1 flex flex-col items-center gap-1.5 cursor-pointer group"
              >
                <span className={`text-[10px] font-mono ${isSelected ? 'text-blue-300 font-bold' : 'text-slate-400'}`}>
                  {pt.runoffM3s}
                </span>
                <div className="w-full max-w-[40px] bg-slate-800 rounded-t h-28 flex items-end overflow-hidden">
                  <div
                    className={`w-full transition-all duration-500 ${
                      isSelected
                        ? 'bg-gradient-to-t from-blue-600 to-blue-400 ring-2 ring-blue-400/40'
                        : 'bg-blue-700/60 group-hover:bg-blue-600/80'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className={`text-[10px] font-mono uppercase ${isSelected ? 'text-blue-400 font-bold' : 'text-slate-400'}`}>
                  {pt.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CHART 3: DRAINAGE CAPACITY STRESS */}
      <div className="bg-[#111827] border border-[#223554] rounded-xl p-4 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span className="font-mono font-bold text-white text-xs uppercase tracking-wider">
              Drainage Network Utilization (%)
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
            Capacity Threshold: 100%
          </span>
        </div>

        <div className="pt-2 flex items-end justify-between gap-3 h-36 px-2">
          {FORECAST_CHART_SERIES.map((pt) => {
            const isSelected = activeTimeStep === pt.timeStep;
            const heightPct = (pt.drainageStressPct / 130) * 100;
            const isOverloaded = pt.drainageStressPct >= 100;

            return (
              <div
                key={pt.timeStep}
                onClick={() => setTimeStep(pt.timeStep)}
                className="flex-1 flex flex-col items-center gap-1.5 cursor-pointer group"
              >
                <span className={`text-[10px] font-mono ${isOverloaded ? 'text-red-400 font-bold' : 'text-slate-400'}`}>
                  {pt.drainageStressPct}%
                </span>
                <div className="w-full max-w-[40px] bg-slate-800 rounded-t h-28 flex items-end overflow-hidden">
                  <div
                    className={`w-full transition-all duration-500 ${
                      isOverloaded
                        ? 'bg-gradient-to-t from-red-600 to-orange-500'
                        : 'bg-gradient-to-t from-amber-600 to-yellow-400'
                    } ${isSelected ? 'ring-2 ring-white/60' : ''}`}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className={`text-[10px] font-mono uppercase ${isSelected ? 'text-white font-bold' : 'text-slate-400'}`}>
                  {pt.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CHART 4: PEAK STREET FLOOD DEPTH */}
      <div className="bg-[#111827] border border-[#223554] rounded-xl p-4 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-red-400" />
            <span className="font-mono font-bold text-white text-xs uppercase tracking-wider">
              Peak Street Inundation Depth (m)
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
            Critical &gt; 0.60 m
          </span>
        </div>

        <div className="pt-2 flex items-end justify-between gap-3 h-36 px-2">
          {FORECAST_CHART_SERIES.map((pt) => {
            const isSelected = activeTimeStep === pt.timeStep;
            const heightPct = (pt.maxFloodDepthM / 1.1) * 100;
            const isCritical = pt.maxFloodDepthM > 0.6;

            return (
              <div
                key={pt.timeStep}
                onClick={() => setTimeStep(pt.timeStep)}
                className="flex-1 flex flex-col items-center gap-1.5 cursor-pointer group"
              >
                <span className={`text-[10px] font-mono ${isCritical ? 'text-red-400 font-bold' : 'text-slate-400'}`}>
                  {pt.maxFloodDepthM.toFixed(2)}m
                </span>
                <div className="w-full max-w-[40px] bg-slate-800 rounded-t h-28 flex items-end overflow-hidden">
                  <div
                    className={`w-full transition-all duration-500 ${
                      isCritical
                        ? 'bg-gradient-to-t from-red-600 to-red-400'
                        : 'bg-gradient-to-t from-blue-500 to-cyan-400'
                    } ${isSelected ? 'ring-2 ring-white/60' : ''}`}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className={`text-[10px] font-mono uppercase ${isSelected ? 'text-white font-bold' : 'text-slate-400'}`}>
                  {pt.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
