import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TimeStep, DrainageNode, DrainageEdge, RoadSegment } from '../types';
import { DRAINAGE_NODES } from '../data/drainageNodes';
import { DRAINAGE_EDGES } from '../data/drainageEdges';
import { ROAD_SEGMENTS } from '../data/roads';

export type NavigationTab = 'dashboard' | 'drainage' | 'forecast' | 'route' | 'howitworks';

export interface ActiveLayers {
  floodRisk: boolean;
  floodDepth: boolean;
  drainageNetwork: boolean;
  drainageStress: boolean;
  roadExposure: boolean;
  waterBodies: boolean;
  roads: boolean;
}

interface SimulationContextType {
  activeTimeStep: TimeStep;
  setTimeStep: (step: TimeStep) => void;
  isPlaying: boolean;
  runNowcast: () => void;
  pauseNowcast: () => void;
  resetNowcast: () => void;
  stepForward: () => void;
  activeLayers: ActiveLayers;
  toggleLayer: (layer: keyof ActiveLayers) => void;
  baseMapMode: 'dark' | 'osm' | 'satellite';
  setBaseMapMode: (mode: 'dark' | 'osm' | 'satellite') => void;
  selectedNode: DrainageNode | null;
  setSelectedNode: (node: DrainageNode | null) => void;
  selectedEdge: DrainageEdge | null;
  setSelectedEdge: (edge: DrainageEdge | null) => void;
  selectedRoad: RoadSegment | null;
  setSelectedRoad: (road: RoadSegment | null) => void;
  selectNodeById: (id: string) => void;
  selectEdgeById: (id: string) => void;
  selectRoadById: (id: string) => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  selectedRouteId: string;
  setSelectedRouteId: (id: string) => void;
  isDisclaimerOpen: boolean;
  setIsDisclaimerOpen: (open: boolean) => void;
}

const TIME_STEPS_ORDER: TimeStep[] = ['NOW', '+1HR', '+2HR', '+3HR'];

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTimeStep, setActiveTimeStep] = useState<TimeStep>('NOW');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [selectedRouteId, setSelectedRouteId] = useState<string>('route-01');
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(false);
  const [baseMapMode, setBaseMapMode] = useState<'dark' | 'osm' | 'satellite'>('dark');

  const [activeLayers, setActiveLayers] = useState<ActiveLayers>({
    floodRisk: true,
    floodDepth: true,
    drainageNetwork: true,
    drainageStress: true,
    roadExposure: true,
    waterBodies: true,
    roads: true,
  });

  const [selectedNode, setSelectedNode] = useState<DrainageNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<DrainageEdge | null>(null);
  const [selectedRoad, setSelectedRoad] = useState<RoadSegment | null>(null);

  // Auto-playback loop for RUN NOWCAST
  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveTimeStep((prev) => {
          const currentIndex = TIME_STEPS_ORDER.indexOf(prev);
          if (currentIndex < TIME_STEPS_ORDER.length - 1) {
            return TIME_STEPS_ORDER[currentIndex + 1];
          } else {
            // Reached +3HR, stop or loop. Stop playback cleanly.
            setIsPlaying(false);
            return prev;
          }
        });
      }, 3000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying]);

  const runNowcast = () => {
    if (activeTimeStep === '+3HR') {
      setActiveTimeStep('NOW');
    }
    setIsPlaying(true);
  };

  const pauseNowcast = () => {
    setIsPlaying(false);
  };

  const resetNowcast = () => {
    setIsPlaying(false);
    setActiveTimeStep('NOW');
  };

  const stepForward = () => {
    const currentIndex = TIME_STEPS_ORDER.indexOf(activeTimeStep);
    const nextIndex = (currentIndex + 1) % TIME_STEPS_ORDER.length;
    setActiveTimeStep(TIME_STEPS_ORDER[nextIndex]);
  };

  const toggleLayer = (layer: keyof ActiveLayers) => {
    setActiveLayers((prev) => ({
      ...prev,
      [layer]: !prev[layer],
    }));
  };

  const selectNodeById = (id: string) => {
    const found = DRAINAGE_NODES.find((n) => n.id === id) || null;
    setSelectedNode(found);
    if (found) {
      setSelectedEdge(null);
      setSelectedRoad(null);
    }
  };

  const selectEdgeById = (id: string) => {
    const found = DRAINAGE_EDGES.find((e) => e.id === id) || null;
    setSelectedEdge(found);
    if (found) {
      setSelectedNode(null);
      setSelectedRoad(null);
    }
  };

  const selectRoadById = (id: string) => {
    const found = ROAD_SEGMENTS.find((r) => r.id === id) || null;
    setSelectedRoad(found);
    if (found) {
      setSelectedNode(null);
      setSelectedEdge(null);
    }
  };

  return (
    <SimulationContext.Provider
      value={{
        activeTimeStep,
        setTimeStep: setActiveTimeStep,
        isPlaying,
        runNowcast,
        pauseNowcast,
        resetNowcast,
        stepForward,
        activeLayers,
        toggleLayer,
        baseMapMode,
        setBaseMapMode,
        selectedNode,
        setSelectedNode: (n) => {
          setSelectedNode(n);
          if (n) {
            setSelectedEdge(null);
            setSelectedRoad(null);
          }
        },
        selectedEdge,
        setSelectedEdge: (e) => {
          setSelectedEdge(e);
          if (e) {
            setSelectedNode(null);
            setSelectedRoad(null);
          }
        },
        selectedRoad,
        setSelectedRoad: (r) => {
          setSelectedRoad(r);
          if (r) {
            setSelectedNode(null);
            setSelectedEdge(null);
          }
        },
        selectNodeById,
        selectEdgeById,
        selectRoadById,
        activeTab,
        setActiveTab,
        selectedRouteId,
        setSelectedRouteId,
        isDisclaimerOpen,
        setIsDisclaimerOpen,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = (): SimulationContextType => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
