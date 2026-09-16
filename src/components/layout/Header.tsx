import React, { useState } from 'react';
import { useSimulation, NavigationTab } from '../../context/SimulationContext';
import {
  Search,
  MapPin,
  Info,
  ChevronDown
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setIsDisclaimerOpen,
    searchQuery,
    setSearchQuery,
    setTargetLocation
  } = useSimulation();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);

  const locations = [
    { name: 'Khanapara Crossing', lat: 26.1180, lng: 91.8220, zoom: 15 },
    { name: 'Zoo Road (RG Baruah)', lat: 26.1650, lng: 91.7830, zoom: 15 },
    { name: 'GS Road (Bhangagarh)', lat: 26.1575, lng: 91.7710, zoom: 15 },
    { name: 'Rukminigaon Road', lat: 26.1395, lng: 91.8000, zoom: 15 },
    { name: 'Dispur Capital Complex', lat: 26.1420, lng: 91.7920, zoom: 14 },
    { name: 'Jalukbari Rotary', lat: 26.1510, lng: 91.6885, zoom: 14 },
  ];

  const handleSelectLocation = (loc: typeof locations[0]) => {
    setSearchQuery(loc.name);
    setTargetLocation(loc);
    setIsSearchFocused(false);
  };

  const navTabs: { id: NavigationTab; label: string }[] = [
    { id: 'dashboard', label: 'GIS Dashboard' },
    { id: 'drainage', label: 'Drainage Network' },
    { id: 'forecast', label: 'Forecast' },
    { id: 'route', label: 'Safe Route' },
    { id: 'howitworks', label: 'How It Works' },
  ];

  return (
    <header className="bg-[#080e18] border-b border-[#172338] text-slate-100 sticky top-0 z-50 select-none shadow-md">
      <div className="w-full px-4 py-2.5 flex items-center justify-between gap-4">
        {/* LEFT: BRANDING */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Flowing Wave Logo */}
          <div className="flex items-center justify-center text-cyan-400">
            <svg
              className="w-7 h-7"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 11C9 7 15 15 20 11C23 8.5 26 9.5 28 11"
                stroke="#06b6d4"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M4 17C9 13 15 21 20 17C23 14.5 26 15.5 28 17"
                stroke="#38bdf8"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M4 23C9 19 15 27 20 23C23 20.5 26 21.5 28 23"
                stroke="#0284c7"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="flex items-baseline gap-2.5">
            <h1 className="text-xl font-bold text-white tracking-tight font-sans">
              FloodCast<span className="text-xs align-top text-cyan-400 font-normal">™</span>
            </h1>
            <span className="text-xs text-slate-400 font-normal hidden sm:inline-block border-l border-slate-700 pl-2.5">
              Urban Flood Nowcasting & Safe Route System
            </span>
          </div>
        </div>

        {/* CENTER: SEARCH BAR + COMPACT VIEW SWITCHER */}
        <div className="flex items-center gap-2 flex-1 max-w-xl justify-center relative">
          <div className="relative w-full max-w-md">
            <div className="flex items-center bg-[#0d1624] border border-[#1e2f49] hover:border-cyan-500/50 focus-within:border-cyan-500 rounded-lg px-3 py-1.5 transition-all text-xs">
              <Search className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search location (e.g. Khanapara, Guwahati)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none text-xs"
              />
            </div>

            {/* Dropdown suggestions */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#0b1320] border border-[#1e2f49] rounded-lg shadow-2xl py-1 z-50 text-xs">
                <div className="px-3 py-1 text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                  Guwahati Hotspots
                </div>
                {locations.map((loc) => (
                  <button
                    key={loc.name}
                    onMouseDown={() => handleSelectLocation(loc)}
                    className="w-full px-3 py-1.5 text-left text-slate-300 hover:bg-[#15233a] hover:text-cyan-300 flex items-center justify-between"
                  >
                    <span>{loc.name}</span>
                    <span className="text-[10px] text-slate-500">Jump ↗</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Views Dropdown Pill for SIH Prototype views */}
          <div className="relative">
            <button
              onClick={() => setIsNavDropdownOpen(!isNavDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0d1624] border border-[#1e2f49] hover:border-slate-600 text-xs font-mono text-slate-300 transition-colors"
            >
              <span className="capitalize">{navTabs.find((t) => t.id === activeTab)?.label}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isNavDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-44 bg-[#0b1320] border border-[#1e2f49] rounded-lg shadow-2xl py-1 z-50 text-xs font-mono">
                {navTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsNavDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left transition-colors flex items-center justify-between ${
                      activeTab === tab.id
                        ? 'bg-cyan-950/60 text-cyan-300 font-bold'
                        : 'text-slate-300 hover:bg-[#15233a]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {activeTab === tab.id && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: LOCATION, DATE/TIME, LIVE BADGE */}
        <div className="flex items-center gap-4 text-xs flex-shrink-0 font-sans">
          {/* Location & Time */}
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <div className="flex flex-col text-right sm:text-left leading-tight">
              <span className="font-semibold text-slate-200">Guwahati, Assam</span>
              <span className="text-[10px] text-slate-400 font-mono">16 Sep 2026 | 12:40 AM</span>
            </div>
          </div>

          {/* Live Status Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-xs font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live</span>
          </div>

          {/* Disclaimer Info Button */}
          <button
            onClick={() => setIsDisclaimerOpen(true)}
            className="p-1.5 rounded-lg bg-[#0d1624] border border-[#1e2f49] hover:bg-[#15233a] text-slate-400 hover:text-cyan-300 transition-colors"
            title="Prototype disclosure"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
