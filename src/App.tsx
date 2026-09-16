import React from 'react';
import { SimulationProvider, useSimulation } from './context/SimulationContext';
import { Header } from './components/layout/Header';
import { DisclaimerModal } from './components/layout/DisclaimerModal';
import { DashboardView } from './components/dashboard/DashboardView';
import { DrainageNetworkView } from './components/drainage/DrainageNetworkView';
import { ScenarioForecastView } from './components/forecast/ScenarioForecastView';
import { SafeRouteView } from './components/routing/SafeRouteView';
import { HowItWorksView } from './components/howitworks/HowItWorksView';
import { ShieldCheck, Info } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setIsDisclaimerOpen } = useSimulation();

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Header />
      <DisclaimerModal />

      <main className="flex-1 pb-10">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'drainage' && <DrainageNetworkView />}
        {activeTab === 'forecast' && <ScenarioForecastView />}
        {(activeTab === 'roadrisk' || activeTab === 'route') && <SafeRouteView />}
        {activeTab === 'howitworks' && <HowItWorksView />}
      </main>

      {/* Persistent Honest Prototype Footer */}
      <footer className="border-t border-[#1b2a44] bg-[#070b13] py-4 px-4 text-xs font-mono text-slate-400 text-center space-y-1.5">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="flex items-center gap-1 text-amber-300 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>PROTOTYPE MODE — SIMULATED PILOT DATA</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">Smart India Hackathon (SIH 2026) Proposal Demonstrator</span>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => setIsDisclaimerOpen(true)}
            className="text-cyan-400 hover:underline flex items-center gap-1"
          >
            <Info className="w-3 h-3" />
            <span>View Technical Disclosure</span>
          </button>
        </div>
        <p className="text-[10px] text-slate-400 max-w-2xl mx-auto">
          "Current prototype uses a predefined simulated scenario to demonstrate the proposed workflow.
          Deployment will connect real rainfall nowcasts, terrain data and authoritative drainage GIS."
        </p>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SimulationProvider>
      <MainContent />
    </SimulationProvider>
  );
};

export default App;
