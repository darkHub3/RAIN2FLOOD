import React from 'react';
import { useSimulation, ActiveLayers } from '../../context/SimulationContext';
import {
  Layers,
  CloudRain,
  Waves,
  Droplets,
  GitBranch,
  AlertTriangle,
  Navigation,
  GripVertical
} from 'lucide-react';

export const LeftSidebar: React.FC = () => {
  const { activeLayers, toggleLayer, baseMapMode, setBaseMapMode } = useSimulation();

  const layersList: {
    key: keyof ActiveLayers;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: 'rainfallNowcast',
      label: 'Rainfall (Nowcast)',
      icon: (
        <div className="w-4 h-4 rounded grid grid-cols-2 gap-0.5 p-0.5 bg-gradient-to-br from-amber-400 via-rose-500 to-cyan-500">
          <div className="bg-white/40 rounded-[1px]"></div>
          <div className="bg-white/60 rounded-[1px]"></div>
          <div className="bg-white/50 rounded-[1px]"></div>
          <div className="bg-white/80 rounded-[1px]"></div>
        </div>
      ),
    },
    {
      key: 'predictedFloodZones',
      label: 'Predicted Flood Zones',
      icon: <Waves className="w-4 h-4 text-cyan-400" />,
    },
    {
      key: 'waterDepth',
      label: 'Water Depth (cm)',
      icon: <Droplets className="w-4 h-4 text-blue-400" />,
    },
    {
      key: 'drainageNetwork',
      label: 'Drainage Network',
      icon: <GitBranch className="w-4 h-4 text-sky-400" />,
    },
    {
      key: 'historicalHotspots',
      label: 'Historical Flood Hotspots',
      icon: <AlertTriangle className="w-4 h-4 text-rose-400" />,
    },
    {
      key: 'roadNetwork',
      label: 'Road Network',
      icon: <Navigation className="w-4 h-4 text-cyan-300" />,
    },
  ];

  return (
    <div className="flex flex-col gap-3 bg-[#0a111c] border border-[#162236] rounded-xl p-3 text-xs font-sans text-slate-300 shadow-xl select-none h-full overflow-y-auto">
      {/* 1. LAYERS SECTION */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white text-[13px] tracking-wide">
              Layers
            </span>
          </div>
        </div>

        <div className="space-y-1">
          {layersList.map((layer) => {
            const isOn = Boolean(activeLayers[layer.key]);
            return (
              <div
                key={layer.key}
                onClick={() => toggleLayer(layer.key)}
                className="flex items-center justify-between py-1 px-1.5 rounded-lg hover:bg-[#121c2e] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="w-3 h-3 text-slate-600 group-hover:text-slate-400 transition-colors" />
                  {layer.icon}
                  <span className={`text-[11px] ${isOn ? 'text-slate-200 font-medium' : 'text-slate-500'}`}>
                    {layer.label}
                  </span>
                </div>

                {/* iOS-style Pill Switch Toggle */}
                <div
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-all duration-300 ${
                    isOn ? 'bg-cyan-500 justify-end' : 'bg-slate-700 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. BASE MAP SECTION */}
      <div className="space-y-2 pt-2 border-t border-[#162236]">
        <div className="font-bold text-white text-[13px] tracking-wide">
          Base Map
        </div>

        <div className="space-y-1 text-xs">
          {/* Satellite Option (Default) */}
          <label
            onClick={() => setBaseMapMode('satellite')}
            className="flex items-center gap-2.5 py-1 px-1.5 rounded hover:bg-[#121c2e] cursor-pointer text-slate-300"
          >
            <div className="w-4 h-4 rounded-full border border-cyan-500 flex items-center justify-center p-0.5">
              {baseMapMode === 'satellite' && (
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              )}
            </div>
            <span className={baseMapMode === 'satellite' ? 'text-white font-medium' : 'text-slate-400'}>
              Satellite
            </span>
          </label>

          {/* OpenStreetMap Option */}
          <label
            onClick={() => setBaseMapMode('osm')}
            className="flex items-center gap-2.5 py-1 px-1.5 rounded hover:bg-[#121c2e] cursor-pointer text-slate-300"
          >
            <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center p-0.5">
              {baseMapMode === 'osm' && (
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              )}
            </div>
            <span className={baseMapMode === 'osm' ? 'text-white font-medium' : 'text-slate-400'}>
              OpenStreetMap
            </span>
          </label>

          {/* Dark (Default) Option */}
          <label
            onClick={() => setBaseMapMode('dark')}
            className="flex items-center gap-2.5 py-1 px-1.5 rounded hover:bg-[#121c2e] cursor-pointer text-slate-300"
          >
            <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center p-0.5">
              {baseMapMode === 'dark' && (
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              )}
            </div>
            <span className={baseMapMode === 'dark' ? 'text-white font-medium' : 'text-slate-400'}>
              Dark (Default)
            </span>
          </label>
        </div>
      </div>

      {/* 3. LEGEND SECTION */}
      <div className="space-y-2.5 pt-2 border-t border-[#162236]">
        <div className="font-bold text-white text-[13px] tracking-wide flex items-center gap-1.5">
          <span>Legend</span>
        </div>

        {/* Dual Vertical Gradients (Rainfall Intensity & Water Depth) */}
        <div className="grid grid-cols-2 gap-2 bg-[#0d1624] p-2 rounded-lg border border-[#162236]">
          {/* Column 1: Rainfall Intensity */}
          <div className="space-y-1">
            <div className="text-[10px] text-slate-400 font-medium leading-tight">
              Rainfall Intensity (mm/hr)
            </div>

            <div className="flex gap-2 items-center pt-0.5">
              {/* Gradient vertical strip */}
              <div
                className="w-3.5 h-28 rounded-sm shadow-sm"
                style={{
                  background: 'linear-gradient(to bottom, #ef4444, #f97316, #eab308, #38bdf8, #0284c7)',
                }}
              />

              {/* Ticks */}
              <div className="flex flex-col justify-between h-28 text-[9px] font-mono text-slate-300 leading-none">
                <span>&gt; 50</span>
                <span>20 – 50</span>
                <span>10 – 20</span>
                <span>5 – 10</span>
                <span>1 – 5</span>
              </div>
            </div>
          </div>

          {/* Column 2: Water Depth */}
          <div className="space-y-1">
            <div className="text-[10px] text-slate-400 font-medium leading-tight">
              Water Depth (cm)
            </div>

            <div className="flex gap-2 items-center pt-0.5">
              {/* Gradient vertical strip */}
              <div
                className="w-3.5 h-28 rounded-sm shadow-sm"
                style={{
                  background: 'linear-gradient(to bottom, #a855f7, #3b82f6, #06b6d4, #38bdf8, #0ea5e9, #0369a1)',
                }}
              />

              {/* Ticks */}
              <div className="flex flex-col justify-between h-28 text-[9px] font-mono text-slate-300 leading-none">
                <span>&gt; 100</span>
                <span>50 – 100</span>
                <span>30 – 50</span>
                <span>10 – 30</span>
                <span>5 – 10</span>
                <span>&lt; 5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Symbols List */}
        <div className="space-y-1.5 pt-1 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rotate-45 bg-cyan-400/70 border border-cyan-300 inline-block shadow-sm"></span>
            <span className="text-slate-300">Predicted Flood Zone</span>
          </div>

          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
            <span className="text-slate-300">Historical Hotspot</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-emerald-400 bg-emerald-950 inline-block"></span>
            <span className="text-slate-300">Manhole / Inlet</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-purple-400 bg-purple-950 inline-block"></span>
            <span className="text-slate-300">Outfall</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-rose-500 rounded inline-block"></span>
            <span className="text-slate-300">Road (Affected)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-emerald-400 rounded inline-block"></span>
            <span className="text-slate-300">Road (Alternative Route)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
