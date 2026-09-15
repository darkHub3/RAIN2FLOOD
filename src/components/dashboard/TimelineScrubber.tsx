import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { TimeStep } from '../../types';
import { Play, Pause, RotateCcw, SkipForward, Radio } from 'lucide-react';

const TIMESTEP_ITEMS: { id: TimeStep; label: string; desc: string; rainfall: string; depth: string; load: string }[] = [
  { id: 'NOW', label: 'NOW', desc: 'Baseline (T+0)', rainfall: '78 mm/h', depth: '0.18 m', load: '72%' },
  { id: '+1HR', label: '+1 HR', desc: 'T+1 Hour', rainfall: '86 mm/h', depth: '0.32 m', load: '87%' },
  { id: '+2HR', label: '+2 HR', desc: 'T+2 Hours', rainfall: '94 mm/h', depth: '0.61 m', load: '103%' },
  { id: '+3HR', label: '+3 HR', desc: 'T+3 Hours', rainfall: '101 mm/h', depth: '0.94 m', load: '119%' }
];

export const TimelineScrubber: React.FC = () => {
  const { activeTimeStep, setTimeStep, isPlaying, runNowcast, pauseNowcast, resetNowcast, stepForward } = useSimulation();

  return (
    <div className="bg-[#111827] border border-[#223554] rounded-xl p-3.5 shadow-md space-y-3">
      {/* Top Bar: Actions & Playback Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          {/* RUN NOWCAST Button */}
          {!isPlaying ? (
            <button
              onClick={runNowcast}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-all shadow-md active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>RUN NOWCAST</span>
            </button>
          ) : (
            <button
              onClick={pauseNowcast}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold transition-all shadow-md active:scale-95"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>PAUSE</span>
            </button>
          )}

          {/* Step Forward */}
          <button
            onClick={stepForward}
            disabled={isPlaying}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition-colors"
            title="Advance one timestep"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Step</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={resetNowcast}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset to NOW"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Scenario Playback Indicator */}
        <div className="flex items-center gap-2 font-mono text-[11px]">
          {isPlaying ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 animate-pulse">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              <span>SIMULATED SCENARIO PLAYBACK ACTIVE</span>
            </div>
          ) : (
            <div className="text-slate-400">
              <span>Scenario Timeline Scrubber</span>
            </div>
          )}
        </div>
      </div>

      {/* Timeline Visual Track */}
      <div className="relative pt-1 pb-1">
        {/* Progress line */}
        <div className="absolute top-5 left-6 right-6 h-1 bg-slate-800 rounded-full">
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
                  : '100%'
            }}
          />
        </div>

        {/* 4 Clickable Step Nodes */}
        <div className="relative z-10 grid grid-cols-4 gap-2">
          {TIMESTEP_ITEMS.map((item) => {
            const isSelected = activeTimeStep === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  pauseNowcast();
                  setTimeStep(item.id);
                }}
                className={`flex flex-col items-center text-center p-2 rounded-lg transition-all ${
                  isSelected
                    ? 'bg-cyan-950/40 border border-cyan-500/50 shadow-md'
                    : 'hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                {/* Node Pill */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold mb-1 transition-all ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 ring-4 ring-cyan-500/20 shadow-lg scale-110'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  ●
                </div>

                {/* Timestep Label */}
                <span className={`text-xs font-bold font-mono tracking-wider ${isSelected ? 'text-cyan-300' : 'text-slate-300'}`}>
                  {item.label}
                </span>

                {/* Micro Submetrics */}
                <div className="hidden md:flex flex-col text-[10px] font-mono text-slate-400 mt-1 leading-tight">
                  <span className="text-slate-300">{item.rainfall}</span>
                  <span className={isSelected ? 'text-amber-300 font-semibold' : ''}>Max {item.depth}</span>
                  <span>Load {item.load}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Honest Footer Note */}
      <div className="text-[10px] text-slate-400 font-mono text-center pt-1 border-t border-slate-800/60">
        Simulated Scenario Playback: Switches between predefined simulated states for demonstration. Not calculating live hydraulic models.
      </div>
    </div>
  );
};
