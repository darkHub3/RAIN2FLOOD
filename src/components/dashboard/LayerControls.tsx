import React from 'react';
import { useSimulation, ActiveLayers } from '../../context/SimulationContext';
import { Layers, Eye, EyeOff, Droplets, GitBranch, MapPin, Mountain, Waves, Car } from 'lucide-react';

export const LayerControls: React.FC = () => {
  const { activeLayers, toggleLayer } = useSimulation();

  const layerConfigs: {
    key: keyof ActiveLayers;
    label: string;
    count: string;
    icon: React.ReactNode;
    activeColor: string;
  }[] = [
    {
      key: 'floodRisk',
      label: 'Flood Risk',
      count: 'Critical Basins',
      icon: <Layers className="w-3.5 h-3.5" />,
      activeColor: 'bg-amber-600/30 border-amber-500/60 text-amber-300'
    },
    {
      key: 'floodDepth',
      label: 'Flood Depth',
      count: '9 Zones',
      icon: <Droplets className="w-3.5 h-3.5" />,
      activeColor: 'bg-blue-600/30 border-blue-500/60 text-blue-300'
    },
    {
      key: 'drainageNetwork',
      label: 'Drainage Network',
      count: '48 Conduits',
      icon: <GitBranch className="w-3.5 h-3.5" />,
      activeColor: 'bg-cyan-600/30 border-cyan-500/60 text-cyan-300'
    },
    {
      key: 'drainageStress',
      label: 'Drainage Stress',
      count: 'Telemetry Load',
      icon: <MapPin className="w-3.5 h-3.5" />,
      activeColor: 'bg-rose-600/30 border-rose-500/60 text-rose-300'
    },
    {
      key: 'roadExposure',
      label: 'Road Exposure',
      count: '10 Arterials',
      icon: <Car className="w-3.5 h-3.5" />,
      activeColor: 'bg-orange-600/30 border-orange-500/60 text-orange-300'
    },
    {
      key: 'waterBodies',
      label: 'Water Bodies',
      count: 'Rivers & Beels',
      icon: <Waves className="w-3.5 h-3.5" />,
      activeColor: 'bg-sky-600/30 border-sky-500/60 text-sky-300'
    },
    {
      key: 'roads',
      label: 'Roads',
      count: 'Base Grid',
      icon: <Car className="w-3.5 h-3.5" />,
      activeColor: 'bg-slate-600/30 border-slate-500/60 text-slate-300'
    },
  ];

  return (
    <div className="bg-[#111827] border border-[#223554] rounded-xl p-3 shadow-md space-y-2.5">
      <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-0.5">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-slate-200 uppercase tracking-wider">
            GIS Layer Controls
          </span>
        </div>
        <span className="text-[10px] text-slate-400">Click to Toggle</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {layerConfigs.map((layer) => {
          const isActive = activeLayers[layer.key];
          return (
            <button
              key={layer.key}
              onClick={() => toggleLayer(layer.key)}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all select-none ${
                isActive
                  ? `${layer.activeColor} shadow-sm font-semibold`
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {layer.icon}
                <span>{layer.label}</span>
              </div>
              <span className="text-[10px] opacity-70 border-l border-current/30 pl-1.5">
                {layer.count}
              </span>
              {isActive ? (
                <Eye className="w-3 h-3 text-cyan-400" />
              ) : (
                <EyeOff className="w-3 h-3 text-slate-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
