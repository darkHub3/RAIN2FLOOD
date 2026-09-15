import React from 'react';
import { useSimulation, ActiveLayers } from '../../context/SimulationContext';
import {
  Layers,
  Droplets,
  GitBranch,
  MapPin,
  Waves,
  Mountain,
  Car,
  Globe,
  CheckSquare,
  Square,
  Info
} from 'lucide-react';

export const LeftSidebar: React.FC = () => {
  const { activeLayers, toggleLayer, baseMapMode, setBaseMapMode } = useSimulation();

  const layersList: {
    key: keyof ActiveLayers;
    label: string;
    icon: React.ReactNode;
    activeColor: string;
  }[] = [
    {
      key: 'floodDepth',
      label: 'Flood Depth',
      icon: <Droplets className="w-3.5 h-3.5 text-blue-400" />,
      activeColor: 'text-blue-400',
    },
    {
      key: 'drainageNetwork',
      label: 'Drainage Network',
      icon: <GitBranch className="w-3.5 h-3.5 text-cyan-400" />,
      activeColor: 'text-cyan-400',
    },
    {
      key: 'drainageNodes',
      label: 'Drainage Nodes',
      icon: <MapPin className="w-3.5 h-3.5 text-emerald-400" />,
      activeColor: 'text-emerald-400',
    },
    {
      key: 'naturalDrainage',
      label: 'Natural Drainage',
      icon: <Waves className="w-3.5 h-3.5 text-sky-400" />,
      activeColor: 'text-sky-400',
    },
    {
      key: 'terrain',
      label: 'Terrain',
      icon: <Mountain className="w-3.5 h-3.5 text-amber-400" />,
      activeColor: 'text-amber-400',
    },
    {
      key: 'roadRisk',
      label: 'Road Risk',
      icon: <Car className="w-3.5 h-3.5 text-rose-400" />,
      activeColor: 'text-rose-400',
    },
  ];

  return (
    <div className="flex flex-col gap-3 bg-[#0d131f] border border-[#1e293b] rounded-lg p-3 text-xs font-mono text-slate-300 shadow-md select-none h-full overflow-y-auto">
      {/* SECTION 1: LAYERS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between border-b border-[#1e293b] pb-1.5">
          <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Layers
          </span>
          <span className="text-[10px] text-slate-500">6 Available</span>
        </div>

        <div className="space-y-1">
          {layersList.map((layer) => {
            const isOn = activeLayers[layer.key];
            return (
              <button
                key={layer.key}
                onClick={() => toggleLayer(layer.key)}
                className={`w-full flex items-center justify-between px-2 py-1.5 rounded transition-all text-[11px] border ${
                  isOn
                    ? 'bg-[#152033] border-[#293d5e] text-slate-100 font-semibold'
                    : 'bg-[#090e18] border-transparent text-slate-500 hover:text-slate-300 hover:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  {layer.icon}
                  <span>{layer.label}</span>
                </div>

                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isOn
                      ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/80'
                      : 'bg-slate-900 text-slate-600 border border-slate-800'
                  }`}
                >
                  {isOn ? '[ON]' : '[OFF]'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: BASE MAP */}
      <div className="space-y-2 pt-1 border-t border-[#1e293b]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            Base Map
          </span>
          <span className="text-[10px] text-slate-500">Cartography</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#090e18] rounded border border-[#1e293b]">
          <button
            onClick={() => setBaseMapMode('dark')}
            className={`py-1 px-2 rounded text-[11px] font-mono transition-all text-center ${
              baseMapMode === 'dark'
                ? 'bg-cyan-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            Dark GIS
          </button>
          <button
            onClick={() => setBaseMapMode('satellite')}
            className={`py-1 px-2 rounded text-[11px] font-mono transition-all text-center ${
              baseMapMode === 'satellite'
                ? 'bg-cyan-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            Satellite
          </button>
        </div>
      </div>

      {/* SECTION 3: LEGEND */}
      <div className="space-y-2 pt-1 border-t border-[#1e293b]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
            Legend
          </span>
          <span className="text-[10px] text-slate-500">Symbology</span>
        </div>

        {/* Flood Depth */}
        <div className="space-y-1 bg-[#090e18] p-2 rounded border border-[#1e293b]">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Flood Depth
          </div>
          <div className="grid grid-cols-2 gap-1 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-500/50 border border-blue-400"></span>
              <span className="text-slate-300">0–0.15m Low</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/50 border border-amber-400"></span>
              <span className="text-slate-300">0.15–0.30m Mod</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-orange-500/60 border border-orange-400"></span>
              <span className="text-slate-300">0.30–0.60m High</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-red-600/70 border border-red-500"></span>
              <span className="text-red-400 font-bold">&gt;0.60m Critical</span>
            </div>
          </div>
        </div>

        {/* Drainage Status */}
        <div className="space-y-1 bg-[#090e18] p-2 rounded border border-[#1e293b]">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Drainage Status
          </div>
          <div className="grid grid-cols-2 gap-1 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 bg-cyan-400 rounded"></span>
              <span className="text-slate-300">&lt;85% Normal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 bg-amber-400 rounded"></span>
              <span className="text-slate-300">85–100% Warn</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 bg-orange-500 rounded"></span>
              <span className="text-slate-300">&gt;100% Overload</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 bg-red-500 rounded animate-pulse"></span>
              <span className="text-red-400 font-bold">&gt;125% Surcharge</span>
            </div>
          </div>
        </div>

        {/* Road Risk */}
        <div className="space-y-1 bg-[#090e18] p-2 rounded border border-[#1e293b]">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Road Risk
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-500"></span>
              <span className="text-slate-400">Clear</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span className="text-amber-300">Caution</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="text-red-400 font-bold">Impassable</span>
            </div>
          </div>
        </div>

        {/* Natural Drainage */}
        <div className="space-y-1 bg-[#090e18] p-2 rounded border border-[#1e293b]">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Natural Drainage
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 bg-sky-400 rounded"></span>
              <span className="text-slate-300">River / Canal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-sky-500/30 border border-sky-400"></span>
              <span className="text-slate-300">Wetland Basin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
