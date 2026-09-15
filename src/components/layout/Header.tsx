import React from 'react';
import { useSimulation, NavigationTab } from '../../context/SimulationContext';
import { CloudRain, Network, Activity, Navigation, HelpCircle, Info, ShieldAlert } from 'lucide-react';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, setIsDisclaimerOpen } = useSimulation();

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'drainage', label: 'Drainage Network', icon: <Network className="w-3.5 h-3.5" /> },
    { id: 'forecast', label: 'Forecast', icon: <CloudRain className="w-3.5 h-3.5" /> },
    { id: 'route', label: 'Safe Route', icon: <Navigation className="w-3.5 h-3.5" /> },
    { id: 'howitworks', label: 'How It Works', icon: <HelpCircle className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="bg-[#0b101c] border-b border-[#1e293b] text-slate-100 sticky top-0 z-50 select-none">
      <div className="w-full px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Location */}
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
            <CloudRain className="w-5 h-5" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black tracking-widest text-white uppercase font-mono">
                RAIN<span className="text-cyan-400">2</span>FLOOD
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#152238] text-cyan-300 border border-cyan-800/80 font-bold">
                GUWAHATI, ASSAM
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">
              Urban Flood Nowcasting System
            </p>
          </div>
        </div>

        {/* Center: Navigation Bar */}
        <nav className="flex items-center gap-1 bg-[#0f172a] p-1 rounded-lg border border-[#1e293b]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-cyan-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Honest Prototype Mode Badge & Info Modal Trigger */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#131b2c] border border-amber-500/40 text-amber-300">
            <span className="font-bold tracking-wider text-[11px] uppercase">PROTOTYPE MODE</span>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1 text-[11px] text-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>SIMULATED PILOT DATA</span>
            </div>
          </div>

          <button
            onClick={() => setIsDisclaimerOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1e293b] hover:bg-slate-700 text-slate-300 hover:text-cyan-300 border border-slate-700 transition-colors text-xs"
            title="View technical prototype disclosure"
          >
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden xl:inline">Notice</span>
          </button>
        </div>
      </div>
    </header>
  );
};
