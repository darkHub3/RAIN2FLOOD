import React from 'react';
import { LeftSidebar } from './LeftSidebar';
import { RightIntelligencePanel } from './RightIntelligencePanel';
import { BottomCommandBar } from './BottomCommandBar';
import { GisMap } from '../map/GisMap';

export const DashboardView: React.FC = () => {
  return (
    <div className="w-full max-w-[1920px] mx-auto px-2 sm:px-3 py-2 flex flex-col gap-2.5 select-none">
      {/* 3-COLUMN MAP-CENTRIC COMMAND CENTER WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 items-stretch min-h-[560px] lg:min-h-[640px]">
        {/* LEFT SIDEBAR (~20% width: 2.5/12 cols on desktop) */}
        <div className="lg:col-span-3 xl:col-span-2 flex flex-col h-full">
          <LeftSidebar />
        </div>

        {/* CENTER LARGE GIS MAP (55–60% width: 6.5 or 7 cols on desktop) */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col h-full min-h-[460px] lg:min-h-[620px]">
          <GisMap />
        </div>

        {/* RIGHT INTELLIGENCE PANEL (20–25% width: 3/12 cols on desktop) */}
        <div className="lg:col-span-3 xl:col-span-3 flex flex-col h-full">
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
