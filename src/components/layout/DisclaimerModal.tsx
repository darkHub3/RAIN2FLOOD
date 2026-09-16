import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { AlertCircle, X, ShieldAlert, CheckCircle2, Layers, Cpu, Database } from 'lucide-react';

export const DisclaimerModal: React.FC = () => {
  const { isDisclaimerOpen, setIsDisclaimerOpen } = useSimulation();

  if (!isDisclaimerOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0f172a] border border-[#223554] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col text-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#223554] flex items-center justify-between bg-[#152033]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide uppercase">
                Prototype Disclosure & Technical Notice
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Smart India Hackathon (SIH 2026) Idea-Stage Demonstrator
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDisclaimerOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-sm">
          {/* Key honesty box */}
          <div className="p-4 rounded-lg bg-blue-950/40 border border-cyan-500/30 text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs tracking-wider uppercase font-mono">
              <AlertCircle className="w-4 h-4 text-cyan-400" />
              Core Prototype Status
            </div>
            <p className="text-xs leading-relaxed text-cyan-100/90">
              "Current prototype uses a predefined simulated scenario to demonstrate the proposed workflow.
              Deployment will connect real rainfall nowcasts, terrain data and authoritative drainage GIS."
            </p>
          </div>

          {/* Detailed drainage disclaimer */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400" />
              Reconstructed Drainage Graph Notice
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed bg-[#111827] p-3 rounded-lg border border-slate-800">
              "Detailed, machine-readable, street-level underground drainage attributes are not readily available to us for the prototype. Phase-1 therefore uses a reconstructed drainage graph from available geospatial, published, satellite and field-observation data. Production deployment would integrate the authoritative municipal drainage GIS."
            </p>
          </div>

          {/* Guwahati Study Area Honesty */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Guwahati Pilot Study Area
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              The flood polygons displayed on the map represent <strong>representative pilot zones based on a selected Guwahati study area</strong> (such as the central Bharalu depression, Anil Nagar, Zoo Road, and GS Road). They do not claim to represent officially measured or municipal disaster management confirmed flood boundaries.
            </p>
          </div>

          {/* Prototype vs Production distinction */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              Physical Coupling Model (Core Novelty)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              The purpose of RAIN2FLOOD is to demonstrate the dynamic coupling of:
            </p>
            <div className="text-xs font-mono bg-[#0b101c] p-3 rounded-lg border border-slate-800 text-cyan-300">
              RAIN NOWCAST + TERRAIN (DEM) + DRAINAGE CAPACITY CHECK
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Terrain dictates runoff convergence; underground conveyance dictates gravity discharge; and the condition <code className="text-amber-300 font-mono">Flow &gt; Capacity</code> triggers hydraulic surcharge and street-level waterlogging, which directly informs road-level flood impact and blocked corridor identification (with dynamic vehicle routing planned as future scope).
            </p>
          </div>

          {/* Badges explanation */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-2.5 rounded bg-[#152033] border border-slate-800">
              <div className="text-emerald-400 font-mono font-semibold flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                SIMULATION ACTIVE
              </div>
              <p className="text-slate-400 text-[11px]">
                Interactive engine is ready to scrub and animate predefined Guwahati scenario states.
              </p>
            </div>
            <div className="p-2.5 rounded bg-[#152033] border border-slate-800">
              <div className="text-cyan-400 font-mono font-semibold flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                SIMULATED PILOT DATA
              </div>
              <p className="text-slate-400 text-[11px]">
                All values (rainfall rate, flood depth, pipe capacity, and road impact states) are simulated test assets.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#223554] bg-[#152033] flex justify-end">
          <button
            onClick={() => setIsDisclaimerOpen(false)}
            className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
