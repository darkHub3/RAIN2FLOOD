import React, { useState } from 'react';
import { useSimulation, NavigationTab } from '../../context/SimulationContext';
import {
  Search,
  MapPin,
  Info,
  ChevronDown,
  Menu,
  X,
  LayoutDashboard,
  Network,
  TrendingUp,
  Route,
  HelpCircle
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const navTabs: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'GIS Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'drainage', label: 'Drainage Network', icon: <Network className="w-4 h-4" /> },
    { id: 'forecast', label: 'Forecast', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'roadrisk', label: 'Road Risk & Impact', icon: <Route className="w-4 h-4" /> },
    { id: 'howitworks', label: 'How It Works', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-[#080e18] border-b border-[#172338] text-slate-100 sticky top-0 z-50 select-none shadow-md">
      {/* DESKTOP & MOBILE TOP BAR */}
      <div className="w-full px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* LEFT: BRANDING */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Flowing Wave Logo */}
          <div className="flex items-center justify-center text-cyan-400">
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
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

          <div className="flex items-baseline gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight font-sans">
              FloodCast<span className="text-xs align-top text-cyan-400 font-normal">™</span>
            </h1>
            <span className="text-xs text-slate-400 font-normal hidden lg:inline-block border-l border-slate-700 pl-2.5">
              Flood Risk & Road Impact Modeling | Guwahati Pilot
            </span>
          </div>
        </div>

        {/* CENTER: DESKTOP SEARCH BAR + VIEW SWITCHER (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl justify-center relative">
          <div className="relative w-full max-w-md">
            <div className="flex items-center bg-[#0d1624] border border-[#1e2f49] hover:border-cyan-500/50 focus-within:border-cyan-500 rounded-lg px-3 py-1.5 transition-all text-xs">
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
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
              <div className="absolute top-full right-0 mt-1 w-48 bg-[#0b1320] border border-[#1e2f49] rounded-lg shadow-2xl py-1 z-50 text-xs font-mono">
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
                    <div className="flex items-center gap-2">
                      {tab.icon}
                      <span>{tab.label}</span>
                    </div>
                    {activeTab === tab.id && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: HONEST PROTOTYPE BADGES & CONTROLS */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs shrink-0 font-sans">
          {/* Desktop & Tablet Honest Prototype Mode Badges */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-amber-950/70 border border-amber-500/60 text-amber-300 text-[10px] sm:text-[11px] font-mono font-bold tracking-wide shadow-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              PROTOTYPE MODE | SIMULATED PILOT DATA
            </span>
            <span className="hidden xl:inline-flex px-2 py-1 rounded bg-cyan-950/70 border border-cyan-500/50 text-cyan-300 text-[10px] font-mono font-bold tracking-wide">
              GUWAHATI PILOT STUDY AREA
            </span>
          </div>

          {/* Mobile concise badge */}
          <div className="sm:hidden flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/70 border border-amber-500/60 text-amber-300 text-[9px] font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            PROTOTYPE MODE
          </div>

          {/* Disclaimer Info Button */}
          <button
            onClick={() => setIsDisclaimerOpen(true)}
            className="p-1.5 rounded-lg bg-[#0d1624] border border-[#1e2f49] hover:bg-[#15233a] text-slate-400 hover:text-cyan-300 transition-colors"
            title="Prototype disclosure"
          >
            <Info className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg bg-[#0d1624] border border-[#1e2f49] text-slate-300 hover:text-cyan-400 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH ROW (Visible only on mobile < md) */}
      <div className="md:hidden px-3 pb-2 pt-0.5">
        <div className="relative w-full">
          <div className="flex items-center bg-[#0d1624] border border-[#1e2f49] focus-within:border-cyan-500 rounded-lg px-2.5 py-1.5 text-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search location (e.g. Khanapara, Zoo Rd)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none text-xs"
            />
          </div>

          {/* Mobile Dropdown Suggestions */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#0b1320] border border-[#1e2f49] rounded-lg shadow-2xl py-1 z-50 text-xs">
              <div className="px-3 py-1 text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                Guwahati Hotspots
              </div>
              {locations.map((loc) => (
                <button
                  key={loc.name}
                  onMouseDown={() => handleSelectLocation(loc)}
                  className="w-full px-3 py-2 text-left text-slate-300 hover:bg-[#15233a] hover:text-cyan-300 flex items-center justify-between border-b border-slate-800/50 last:border-0"
                >
                  <span className="font-medium">{loc.name}</span>
                  <span className="text-[10px] text-cyan-400 font-mono">Jump ↗</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FULL-SCREEN / EXPANDABLE MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#172338] bg-[#090f1a] px-3 py-3 space-y-2 animate-fadeIn">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-1">
            Navigation Views
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full px-3 py-2.5 rounded-lg text-left transition-all flex items-center justify-between text-xs font-mono ${
                  activeTab === tab.id
                    ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'bg-[#0e1625] text-slate-300 hover:bg-[#162338] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={activeTab === tab.id ? 'text-cyan-400' : 'text-slate-400'}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </div>
                {activeTab === tab.id && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 font-bold">
                    Active
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono px-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-400" />
              Guwahati, Assam
            </span>
            <span>16 Sep 2026 | 12:40 AM</span>
          </div>
        </div>
      )}
    </header>
  );
};

