import React, { useState } from 'react';
import { LeftSidebar } from './LeftSidebar';
import { RightIntelligencePanel } from './RightIntelligencePanel';
import { BottomCommandBar } from './BottomCommandBar';
import { GisMap } from '../map/GisMap';
import { Map, Zap, Layers, Grid, AlertTriangle } from 'lucide-react';

type MobileViewTab = 'map' | 'intel' | 'layers' | 'all';

export const DashboardView: React.FC = () => {
  const [mobileTab, setMobileTab] = useState<MobileViewTab>('map');

  return (
    <div className="w-full max-w-[1920px] mx-auto px-2 sm:px-3 py-1.5 sm:py-2 flex flex-col gap-2.5 select-none">
      {/* MOBILE SEGMENTED CONTROL BAR (Visible only on < lg screens) */}
      <div className="lg:hidden w-full flex items-center justify-between gap-1 p-1 bg-[#0a111c] border border-[#1e2f49] rounded-xl shadow-lg">
        <button
          onClick={() => setMobileTab('map')}
          className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 text-xs font-mono transition-all ${
            mobileTab === 'map'
              ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#131f33]'
          }`}
        >
          <Map className="w-3.5 h-3.5" />
          <span>Live Map</span>
        </button>

        <button
          onClick={() => setMobileTab('intel')}
          className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 text-xs font-mono transition-all ${
            mobileTab === 'intel'
              ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#131f33]'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Risk Intel</span>
        </button>

        <button
          onClick={() => setMobileTab('layers')}
          className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 text-xs font-mono transition-all ${
            mobileTab === 'layers'
              ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#131f33]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Layers</span>
        </button>

        <button
          onClick={() => setMobileTab('all')}
          className={`py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 text-xs font-mono transition-all ${
            mobileTab === 'all'
              ? 'bg-slate-700 text-white font-bold'
              : 'text-slate-500 hover:text-slate-300'
          }`}
          title="Show All Panels Vertically"
        >
          <Grid className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">All</span>
        </button>
      </div>

      {/* QUICK FLOATING PILLS FOR MOBILE MAP VIEW */}
      {mobileTab === 'map' && (
        <div className="lg:hidden flex items-center justify-between gap-2 text-[11px] font-mono">
          <button
            onClick={() => setMobileTab('layers')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0e1726] border border-cyan-800/60 text-cyan-300 shadow-sm"
          >
            <Layers className="w-3 h-3" />
            <span>Layer Controls & Legend ↗</span>
          </button>
          <button
            onClick={() => setMobileTab('intel')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-950/40 border border-rose-600/50 text-rose-300 shadow-sm"
          >
            <AlertTriangle className="w-3 h-3 text-rose-400 animate-pulse" />
            <span>Khanapara Alert: 48 min ↗</span>
          </button>
        </div>
      )}

      {/* 3-COLUMN MAP-CENTRIC COMMAND CENTER WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 items-stretch min-h-[460px] lg:min-h-[640px]">
        {/* LEFT SIDEBAR (~20% width on desktop) */}
        <div
          className={`${
            mobileTab === 'layers' || mobileTab === 'all' ? 'flex' : 'hidden'
          } lg:flex lg:col-span-3 xl:col-span-2 flex-col h-full`}
        >
          <LeftSidebar />
        </div>

        {/* CENTER LARGE GIS MAP (55–60% width on desktop) */}
        <div
          className={`${
            mobileTab === 'map' || mobileTab === 'all' ? 'flex' : 'hidden'
          } lg:flex lg:col-span-6 xl:col-span-7 flex-col h-full min-h-[420px] sm:min-h-[500px] lg:min-h-[620px]`}
        >
          <GisMap />
        </div>

        {/* RIGHT INTELLIGENCE PANEL (20–25% width on desktop) */}
        <div
          className={`${
            mobileTab === 'intel' || mobileTab === 'all' ? 'flex' : 'hidden'
          } lg:flex lg:col-span-3 xl:col-span-3 flex-col h-full`}
        >
          <RightIntelligencePanel />
        </div>
      </div>

      {/* BOTTOM FULL-WIDTH SCENARIO TIMELINE & KPI STRIP */}
      <div className="w-full">
        <BottomCommandBar />
      </div>
    </div>
  );
};

