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
  Info,
  AlertTriangle,
  Activity,
  Navigation2
} from 'lucide-react';

export const LeftSidebar: React.FC = () => {
  const { activeLayers, toggleLayer, baseMapMode, setBaseMapMode } = useSimulation();

  const layersList: {
    key: keyof ActiveLayers;
    label: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      key: 'floodRisk',
      label: 'Flood Risk',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />,
      color: 'text-amber-400',
    },
    {
      key: 'floodDepth',
      label: 'Flood Depth',
      icon: <Droplets className="w-3.5 h-3.5 text-cyan-400" />,
      color: 'text-cyan-400',
    },
    {
      key: 'drainageNetwork',
      label: 'Drainage Network',
      icon: <GitBranch className="w-3.5 h-3.5 text-blue-400" />,
      color: 'text-blue-400',
    },
    {
      key: 'drainageStress',
      label: 'Drainage Stress',
      icon: <Activity className="w-3.5 h-3.5 text-rose-400" />,
      color: 'text-rose-400',
    },
    {
      key: 'roadExposure',
      label: 'Road Exposure',
      icon: <Car className="w-3.5 h-3.5 text-orange-400" />,
      color: 'text-orange-400',
    },
    {
      key: 'waterBodies',
      label: 'Water Bodies',
      icon: <Waves className="w-3.5 h-3.5 text-sky-400" />,
      color: 'text-sky-400',
    },
    {
      key: 'roads',
      label: 'Roads',
      icon: <Navigation2 className="w-3.5 h-3.5 text-slate-300" />,
      color: 'text-slate-300',
    },
  ];

  return (
    <div className="flex flex-col gap-3 bg-[#0d131f] border border-[#1e293b] rounded-lg p-3 text-xs font-mono text-slate-300 shadow-md select-none h-full overflow-y-auto">
      {/* SECTION 1: LAYERS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between border-b border-[#1e293b] pb-1.5">
          <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            GIS Layers
          </span>
          <span className="text-[10px] text-slate-500">7 Active</span>
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
                  {isOn ? (
                    <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />
                  ) : (
                    <Square className="w-3.5 h-3.5 text-slate-600" />
                  )}
                  {layer.icon}
                  <span>{layer.label}</span>
                </div>

                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    isOn
                      ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/80'
                      : 'bg-slate-900 text-slate-600 border border-slate-800'
                  }`}
                >
                  {isOn ? 'ON' : 'OFF'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: BASE MAP OPTIONS */}
      <div className="space-y-2 pt-1 border-t border-[#1e293b]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            Basemap Options
          </span>
          <span className="text-[10px] text-slate-500">Guwahati GIS</span>
        </div>

        <div className="grid grid-cols-3 gap-1 p-1 bg-[#090e18] rounded border border-[#1e293b]">
          <button
            onClick={() => setBaseMapMode('dark')}
            title="CartoDB Dark Matter"
            className={`py-1.5 px-1 rounded text-[10px] font-mono transition-all text-center leading-tight ${
              baseMapMode === 'dark'
                ? 'bg-cyan-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            Dark GIS
          </button>
          <button
            onClick={() => setBaseMapMode('osm')}
            title="OpenStreetMap Standard"
            className={`py-1.5 px-1 rounded text-[10px] font-mono transition-all text-center leading-tight ${
              baseMapMode === 'osm'
                ? 'bg-cyan-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            OSM
          </button>
          <button
            onClick={() => setBaseMapMode('satellite')}
            title="Esri World Imagery"
            className={`py-1.5 px-1 rounded text-[10px] font-mono transition-all text-center leading-tight ${
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
        <div className="space-y-1.5 bg-[#090e18] p-2 rounded border border-[#1e293b]">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center justify-between">
            <span>Flood Depth</span>
            <span className="text-[9px] text-slate-500">Simulated</span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400/60 border border-cyan-300"></span>
              <span className="text-slate-300">&lt; 0.15 m</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-yellow-400/70 border border-yellow-300"></span>
              <span className="text-slate-300">0.15–0.30 m</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-orange-500/80 border border-orange-400"></span>
              <span className="text-slate-300">0.30–0.60 m</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-600/90 border border-rose-400"></span>
              <span className="text-rose-300 font-bold">&gt; 0.60 m</span>
            </div>
          </div>
        </div>

        {/* Drainage Status */}
        <div className="space-y-1.5 bg-[#090e18] p-2 rounded border border-[#1e293b]">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Drainage Status
          </div>
          <div className="grid grid-cols-2 gap-1 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-cyan-400 rounded"></span>
              <span className="text-slate-300">Normal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-yellow-400 rounded"></span>
              <span className="text-slate-300">Warning</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-orange-500 rounded"></span>
              <span className="text-slate-300">Overload</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-rose-500 rounded animate-pulse"></span>
              <span className="text-rose-300 font-bold">Surcharge</span>
            </div>
          </div>
        </div>

        {/* Road Exposure */}
        <div className="space-y-1.5 bg-[#090e18] p-2 rounded border border-[#1e293b]">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Road Exposure
          </div>
          <div className="space-y-1 text-[10px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-slate-500 rounded"></span>
                <span className="text-slate-400">Clear</span>
              </div>
              <span className="text-[9px] text-slate-500">&lt;0.05m</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-yellow-400 rounded"></span>
                <span className="text-yellow-300">Watch</span>
              </div>
              <span className="text-[9px] text-yellow-400/80">0.05–0.25m</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-orange-500 rounded"></span>
                <span className="text-orange-300">Flood Risk</span>
              </div>
              <span className="text-[9px] text-orange-400/80">0.25–0.50m</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-rose-500 rounded"></span>
                <span className="text-rose-300 font-bold">High Exposure</span>
              </div>
              <span className="text-[9px] text-rose-400 font-bold">&gt;0.50m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
