import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { RAINFALL_SCENARIOS } from '../../data/rainfallScenario';
import { TimeStep } from '../../types';
import {
  Play,
  Pause,
  RotateCcw,
  Radio,
  CloudRain,
  Droplets,
  Layers,
  AlertTriangle,
  MapPin
} from 'lucide-react';

const TIMESTEP_ITEMS: { id: TimeStep; label: string; desc: string }[] = [
  { id: 'NOW', label: 'NOW', desc: 'T+0 Baseline' },
  { id: '+1HR', label: '+1 HR', desc: 'T+1 Hour' },
  { id: '+2HR', label: '+2 HR', desc: 'T+2 Hours' },
  { id: '+3HR', label: '+3 HR', desc: 'T+3 Hours' },
];

export const BottomCommandBar: React.FC = () => {
  const {
    activeTimeStep,
    setTimeStep,
    isPlaying,
    runNowcast,
    pauseNowcast,
    resetNowcast,
  } = useSimulation();

  const current = RAINFALL_SCENARIOS[activeTimeStep];

  return (
    <div className="w-full bg-[#0b101c] border border-[#1e293b] rounded-lg p-2.5 shadow-xl text-slate-200 select-none space-y-2 font-mono">
      {/* 1. SCENARIO TIMELINE CONTROLS */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1e293b] pb-2">
        {/* Left: Buttons & Status */}
        <div className="flex items-center gap-2">
          {!isPlaying ? (
            <button
              onClick={runNowcast}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-all shadow-md active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>RUN NOWCAST</span>
            </button>
          ) : (
            <button
              onClick={pauseNowcast}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-all shadow-md active:scale-95"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>PAUSE</span>
            </button>
          )}

          <button
            onClick={resetNowcast}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#1e293b] hover:bg-slate-700 text-slate-300 text-xs transition-colors"
            title="Reset Scenario"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">RESET</span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-[#1e293b] text-xs">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#152033] border border-cyan-800/60 text-cyan-300">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-cyan-400 animate-ping' : 'bg-slate-500'}`}></span>
              <span className="text-[11px] font-bold uppercase tracking-wider">
                SIMULATED SCENARIO PLAYBACK
              </span>
            </div>
          </div>
        </div>

        {/* Center/Right: Visual Timeline Scrubber */}
        <div className="flex-1 max-w-xl mx-2 relative">
          {/* Progress bar background */}
          <div className="absolute top-4 left-6 right-6 h-1 bg-[#1e293b] rounded-full">
            <div
              className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
              style={{
                width:
                  activeTimeStep === 'NOW'
                    ? '0%'
                    : activeTimeStep === '+1HR'
                    ? '33.33%'
                    : activeTimeStep === '+2HR'
                    ? '66.66%'
                    : '100%',
              }}
            />
          </div>

          {/* 4 Clickable Step Points */}
          <div className="relative z-10 grid grid-cols-4 gap-1">
            {TIMESTEP_ITEMS.map((item) => {
              const isSelected = activeTimeStep === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    pauseNowcast();
                    setTimeStep(item.id);
                  }}
                  className="flex flex-col items-center group py-0.5"
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold transition-all ${
                      isSelected
                        ? 'bg-cyan-400 text-slate-950 ring-4 ring-cyan-500/20 scale-125'
                        : 'bg-[#152033] text-slate-400 border border-slate-700 group-hover:border-cyan-500'
                    }`}
                  >
                    ●
                  </div>
                  <span
                    className={`text-[10px] mt-1 tracking-wider ${
                      isSelected ? 'text-cyan-300 font-bold' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. BOTTOM KPI STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
        {/* KPI 1: RAINFALL */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded p-2 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">RAINFALL</div>
            <div className="text-base font-bold text-white mt-0.5">
              {current.rainfallIntensityMmHr} <span className="text-xs font-normal text-slate-400">mm/hr</span>
            </div>
          </div>
          <div className="p-1 rounded bg-blue-500/10 text-cyan-400">
            <CloudRain className="w-4 h-4" />
          </div>
        </div>

        {/* KPI 2: MAX FLOOD DEPTH */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded p-2 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">MAX FLOOD DEPTH</div>
            <div className="text-base font-bold text-white mt-0.5">
              {current.maxFloodDepthM.toFixed(2)} <span className="text-xs font-normal text-slate-400">m</span>
            </div>
          </div>
          <div className="p-1 rounded bg-amber-500/10 text-amber-400">
            <Droplets className="w-4 h-4" />
          </div>
        </div>

        {/* KPI 3: DRAINAGE LOAD */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded p-2 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">DRAINAGE LOAD</div>
            <div className="text-base font-bold text-white mt-0.5">
              {current.networkUtilizationPct} <span className="text-xs font-normal text-slate-400">%</span>
            </div>
          </div>
          <div className="p-1 rounded bg-cyan-500/10 text-cyan-400">
            <Layers className="w-4 h-4" />
          </div>
        </div>

        {/* KPI 4: CRITICAL ZONES */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded p-2 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">CRITICAL ZONES</div>
            <div className="text-base font-bold text-red-400 mt-0.5">
              {current.highRiskZonesCount} <span className="text-xs font-normal text-slate-400">zones</span>
            </div>
          </div>
          <div className="p-1 rounded bg-red-500/10 text-red-400">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>

        {/* KPI 5: FLOOD EXTENT */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded p-2 flex items-center justify-between col-span-2 sm:col-span-1">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">FLOOD EXTENT</div>
            <div className="text-sm font-bold text-cyan-300 mt-0.5">
              SIMULATED <span className="text-[10px] text-slate-400 font-normal">PILOT</span>
            </div>
          </div>
          <div className="p-1 rounded bg-emerald-500/10 text-emerald-400">
            <MapPin className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
