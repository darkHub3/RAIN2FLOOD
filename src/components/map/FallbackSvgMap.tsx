import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { DRAINAGE_NODES } from '../../data/drainageNodes';
import { DRAINAGE_EDGES } from '../../data/drainageEdges';
import { FLOOD_ZONES } from '../../data/floodZones';
import { NATURAL_WATERWAYS } from '../../data/naturalDrainage';
import { TERRAIN_HILLS, FLOW_ACCUMULATION_VECTORS } from '../../data/terrainData';
import { ROAD_SEGMENTS } from '../../data/roads';
import { DrainageNode, DrainageEdge, RoadRiskState, RoadSegment } from '../../types';
import { ZoomIn, ZoomOut, RotateCcw, Crosshair, Layers, Waves, ShieldAlert, AlertTriangle, Clock } from 'lucide-react';

// Guwahati Bounding Box
const LNG_MIN = 91.665;
const LNG_MAX = 91.835;
const LAT_MIN = 26.100;
const LAT_MAX = 26.200;
const SVG_WIDTH = 1000;
const SVG_HEIGHT = 650;

export const projectCoords = (lat: number, lng: number): [number, number] => {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * SVG_WIDTH;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * SVG_HEIGHT;
  return [x, y];
};

const HOTSPOTS_DATA = [
  { id: 'FZ-01', name: 'Anil Nagar', lat: 26.1755, lng: 91.7725 },
  { id: 'FZ-02', name: 'GS Road (Bhangagarh)', lat: 26.1575, lng: 91.7710 },
  { id: 'FZ-03', name: 'Zoo Road', lat: 26.1650, lng: 91.7830 },
  { id: 'FZ-04', name: 'Rukminigaon', lat: 26.1395, lng: 91.8000 },
  { id: 'FZ-05', name: 'Hatigaon - Bhetapara', lat: 26.1340, lng: 91.7790 },
  { id: 'FZ-06', name: 'Bharalumukh', lat: 26.1735, lng: 91.7265 },
  { id: 'FZ-07', name: 'Ulubari', lat: 26.1695, lng: 91.7610 },
  { id: 'FZ-08', name: 'Boragaon Bypass', lat: 26.1350, lng: 91.7080 },
  { id: 'FZ-09', name: 'Khanapara Basin', lat: 26.1260, lng: 91.8150 },
];

interface SvgMapProps {
  showRoutes?: boolean;
}

export const FallbackSvgMap: React.FC<SvgMapProps> = () => {
  const {
    activeTimeStep,
    activeLayers,
    selectedNode,
    setSelectedNode,
    selectedEdge,
    setSelectedEdge,
    selectedRoad,
    setSelectedRoad,
    focusRoad,
    roadRiskFilter,
    baseMapMode,
    mapMode,
    setMapMode,
    selectedHotspotId,
    setSelectedHotspotId,
  } = useSimulation();

  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);
  const [isLayersCollapsed, setIsLayersCollapsed] = useState(false);

  const [mapLayers, setMapLayers] = useState({
    roadRisk: true,
    drainageNetwork: false,
    naturalDrainage: true,
    floodExtent: true,
    hotspots: true,
  });

  const isFloodDrainageMode = mapMode === 'flood_drainage';
  const isRoadRiskMode = mapMode === 'road_risk';

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 2.5));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.75));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const centerOnCoord = (lat: number, lng: number) => {
    const [px, py] = projectCoords(lat, lng);
    setZoom(1.6);
    setPan({
      x: (SVG_WIDTH / 2 - px) * 1.6,
      y: (SVG_HEIGHT / 2 - py) * 1.6,
    });
  };

  const activeHotspot = FLOOD_ZONES.find((z) => z.id === selectedHotspotId) || null;

  return (
    <div className="relative w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[640px] flex flex-col bg-[#070c14] border border-[#162236] rounded-xl overflow-hidden select-none shadow-2xl">
      {/* 1. TOP-CENTER MODE SWITCHER */}
      <div className="absolute top-2.5 sm:top-4 left-1/2 -translate-x-1/2 z-[30] pointer-events-auto">
        <div className="bg-[#0b1322]/95 backdrop-blur-md border border-[#1e2f49] p-1 rounded-xl shadow-2xl flex items-center gap-1 font-mono text-xs">
          <button
            onClick={() => setMapMode('flood_drainage')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              isFloodDrainageMode
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-[#152338]'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            <span>FLOOD & DRAINAGE</span>
          </button>
          <button
            onClick={() => setMapMode('road_risk')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              isRoadRiskMode
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-[#152338]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>ROAD RISK</span>
          </button>
        </div>
      </div>

      {/* 2. FLOATING CONTROLS (TOP-RIGHT) */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-1 bg-[#0b1322]/90 backdrop-blur-md border border-[#1e2f49] rounded-lg p-1 shadow-lg">
        <button
          onClick={handleZoomIn}
          className="p-1.5 rounded hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 rounded hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          className="p-1.5 rounded hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 transition-colors"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* 3. FLOATING INSPECTOR CARD (SECTION 15 & 7) */}
      {selectedRoad ? (
        <div className="absolute top-16 left-3 z-30 max-w-[280px] bg-[#0b1322]/95 backdrop-blur-md border border-red-500/60 rounded-xl p-3 shadow-2xl text-xs space-y-2">
          {(() => {
            const rState = selectedRoad.timesteps[activeTimeStep];
            const isBlocked = rState.riskState === 'BLOCKED';
            return (
              <>
                <div className="flex items-center justify-between border-b border-slate-700 pb-1">
                  <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase">ROAD IMPACT</span>
                  <button onClick={() => setSelectedRoad(null)} className="text-slate-400 hover:text-white">✕</button>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-slate-300">
                  <div className="font-bold text-white text-xs">{selectedRoad.name}</div>
                  <div className="text-[10px] text-cyan-300">Edge: {selectedRoad.id} {selectedRoad.from && selectedRoad.to ? `(${selectedRoad.from} → ${selectedRoad.to})` : ''}</div>
                  <div>Status: <span className="text-red-400 font-bold">{isBlocked ? 'SIMULATED BLOCKED CONDITION' : rState.riskState}</span></div>
                  <div>Simulated Depth: <span className="text-cyan-300">{rState.waterDepthM.toFixed(2)} m</span></div>
                  <div>Drainage Stress: <span className="text-white">{rState.drainageStressPct || 85}%</span></div>
                  <div>Scenario: <span className="text-amber-300 font-bold">{activeTimeStep}</span></div>
                  <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                    Reason: <span className="text-rose-300">{isBlocked ? 'Predicted flood depth exceeds prototype road-impact threshold.' : 'Overland runoff within operational limits.'}</span>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      ) : activeHotspot ? (
        <div className="absolute top-16 left-3 z-30 max-w-[280px] bg-[#0b1322]/95 backdrop-blur-md border border-amber-500/60 rounded-xl p-3 shadow-2xl text-xs space-y-2">
          <div className="flex items-center justify-between border-b border-slate-700 pb-1">
            <span className="font-mono text-[10px] text-amber-400 font-bold uppercase">FLOOD HOTSPOT</span>
            <button onClick={() => setSelectedHotspotId(null)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          <div className="space-y-1 font-mono text-[11px] text-slate-300">
            <div className="font-bold text-white text-xs">{activeHotspot.name}</div>
            <div>Severity: <span className="text-amber-400 font-bold uppercase">{activeHotspot.timesteps[activeTimeStep].risk}</span></div>
            <div>Simulated Depth: <span className="text-cyan-300">{activeHotspot.timesteps[activeTimeStep].depthM.toFixed(2)} m</span></div>
            <div>Drainage Stress: <span className="text-rose-400 font-bold">87%</span></div>
            <div>Scenario: <span className="text-cyan-400 font-bold">{activeTimeStep}</span></div>
            <div>Affected Roads: <span className="text-white font-bold">4 corridors</span></div>
          </div>
        </div>
      ) : null}

      {/* 4. MAIN SVG CANVAS */}
      <svg
        className="w-full h-full cursor-grab active:cursor-grabbing flex-1"
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center center',
          transition: 'transform 0.15s ease-out',
        }}
      >
        <defs>
          <pattern id="svgGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#121d30" strokeWidth="0.8" />
          </pattern>
        </defs>

        {/* Dark Terrain Grid */}
        <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="#090e18" />
        <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="url(#svgGrid)" opacity="0.6" />

        {/* Natural Waterways: Wetlands & Basins */}
        {NATURAL_WATERWAYS.map((nw) => {
          if (nw.polygon) {
            const pointsStr = nw.polygon
              .map((c) => {
                const [x, y] = projectCoords(c[0], c[1]);
                return `${x},${y}`;
              })
              .join(' ');
            return (
              <polygon
                key={nw.id}
                points={pointsStr}
                fill="#0284c7"
                fillOpacity={isFloodDrainageMode ? 0.45 : 0.25}
                stroke="#38bdf8"
                strokeWidth={isFloodDrainageMode ? 2.5 : 1.5}
              />
            );
          }
          return null;
        })}

        {/* Natural Channels (Blue/Cyan) */}
        {NATURAL_WATERWAYS.map((nw) => {
          if (nw.path) {
            const pointsStr = nw.path
              .map((c) => {
                const [x, y] = projectCoords(c[0], c[1]);
                return `${x},${y}`;
              })
              .join(' ');
            return (
              <polyline
                key={nw.id}
                points={pointsStr}
                fill="none"
                stroke="#00d2ff"
                strokeWidth={isFloodDrainageMode ? 5.0 : 2.5}
                strokeOpacity={isFloodDrainageMode ? 0.95 : 0.6}
                strokeLinecap="round"
              />
            );
          }
          return null;
        })}

        {/* Representative Man-Made Drainage Conduits (Purple/Orange) */}
        {(isFloodDrainageMode || mapLayers.drainageNetwork) &&
          DRAINAGE_EDGES.map((edge) => {
            const from = DRAINAGE_NODES.find((n) => n.id === edge.fromNode);
            const to = DRAINAGE_NODES.find((n) => n.id === edge.toNode);
            if (!from || !to) return null;
            const [x1, y1] = projectCoords(from.lat, from.lng);
            const [x2, y2] = projectCoords(to.lat, to.lng);
            const state = edge.timesteps[activeTimeStep];
            const isOverloaded = state.flowM3s > edge.designCapacityM3s;
            const strokeColor = isOverloaded ? '#f97316' : '#a855f7';
            return (
              <line
                key={edge.id}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={strokeColor}
                strokeWidth={isOverloaded ? 3.5 : 2.0}
                strokeDasharray={isOverloaded ? '4,4' : '6,3'}
                strokeOpacity="0.85"
                className="cursor-pointer hover:stroke-cyan-300 transition-colors"
                onClick={() => setSelectedEdge(edge)}
              />
            );
          })}

        {/* Drainage Nodes */}
        {(isFloodDrainageMode || mapLayers.drainageNetwork) &&
          DRAINAGE_NODES.map((node) => {
            const [x, y] = projectCoords(node.lat, node.lng);
            const state = node.timesteps[activeTimeStep];
            const isSurcharged = state.status === 'surcharged' || state.status === 'critical';
            return (
              <circle
                key={node.id}
                cx={x}
                cy={y}
                r={isSurcharged ? 5.5 : 3.5}
                fill="#090e18"
                stroke={isSurcharged ? '#ef4444' : '#c084fc'}
                strokeWidth="1.8"
                className="cursor-pointer hover:fill-cyan-400 transition-colors"
                onClick={() => setSelectedNode(node)}
              />
            );
          })}

        {/* Persistent Flood Extent Polygons */}
        {FLOOD_ZONES.map((zone) => {
          const zState = zone.timesteps[activeTimeStep];
          const depth = zState.depthM;
          let fillColor = '#06b6d4';
          let fillOpacity = 0.18;
          if (depth > 0.60) {
            fillColor = '#ef4444';
            fillOpacity = 0.30;
          } else if (depth > 0.30) {
            fillColor = '#f97316';
            fillOpacity = 0.25;
          } else if (depth > 0.15) {
            fillColor = '#eab308';
            fillOpacity = 0.22;
          }
          const pointsStr = zone.polygon
            .map((c) => {
              const [x, y] = projectCoords(c[0], c[1]);
              return `${x},${y}`;
            })
            .join(' ');
          return (
            <polygon
              key={zone.id}
              points={pointsStr}
              fill={fillColor}
              fillOpacity={fillOpacity}
              stroke={fillColor}
              strokeWidth="1.2"
              className="cursor-pointer"
              onClick={() => setSelectedHotspotId(zone.id)}
            />
          );
        })}

        {/* Road Network & Risk Layer */}
        {ROAD_SEGMENTS.map((road) => {
          const rState = road.timesteps[activeTimeStep];
          const riskState = rState.riskState;
          const isSelected = selectedRoad?.id === road.id;
          const isFiltered = roadRiskFilter !== 'ALL' && riskState !== roadRiskFilter;

          let color = '#22c55e';
          let weight = isFloodDrainageMode ? 2.0 : 3.5;
          let opacity = isFloodDrainageMode ? 0.15 : isFiltered ? 0.15 : 0.88;
          let dashArray: string | undefined = undefined;

          if (riskState === 'BLOCKED') {
            color = '#ef4444';
            weight = isFloodDrainageMode ? 3.0 : 6.5;
            opacity = isFloodDrainageMode ? 0.35 : isFiltered ? 0.20 : 1.0;
            dashArray = '8,6';
          } else if (riskState === 'HIGH RISK') {
            color = '#f97316';
            weight = isFloodDrainageMode ? 2.5 : 5.2;
            opacity = isFloodDrainageMode ? 0.25 : isFiltered ? 0.20 : 0.95;
          } else if (riskState === 'MODERATE') {
            color = '#eab308';
            weight = isFloodDrainageMode ? 2.2 : 4.2;
            opacity = isFloodDrainageMode ? 0.20 : isFiltered ? 0.18 : 0.92;
          }

          const coords = (road.path && road.path.length > 0) ? road.path : road.geometry;
          if (!coords || coords.length === 0) return null;

          const pointsStr = coords
            .map((c) => {
              const lat = c[0] > 70 ? c[1] : c[0];
              const lng = c[0] > 70 ? c[0] : c[1];
              const [x, y] = projectCoords(lat, lng);
              return `${x},${y}`;
            })
            .join(' ');

          const midIdx = Math.floor(coords.length / 2);
          const midPt = coords[midIdx];
          const midLat = midPt[0] > 70 ? midPt[1] : midPt[0];
          const midLng = midPt[0] > 70 ? midPt[0] : midPt[1];
          const [midX, midY] = projectCoords(midLat, midLng);

          return (
            <g key={road.id}>
              {isSelected && (
                <polyline
                  points={pointsStr}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="12"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                />
              )}
              <polyline
                points={pointsStr}
                fill="none"
                stroke={isFiltered ? '#475569' : color}
                strokeWidth={isFiltered ? 2 : weight}
                strokeOpacity={opacity}
                strokeDasharray={dashArray}
                strokeLinecap="round"
                className="cursor-pointer hover:stroke-cyan-300 transition-colors"
                onClick={() => focusRoad(road)}
              />
              {isRoadRiskMode && riskState === 'BLOCKED' && !isFiltered && (
                <g transform={`translate(${midX - 9}, ${midY - 9})`} className="pointer-events-none">
                  <circle cx="9" cy="9" r="8" fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
                  <line x1="4" y1="9" x2="14" y2="9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              )}
            </g>
          );
        })}

        {/* Hotspot ⚠️ Markers */}
        {HOTSPOTS_DATA.map((spot) => {
          const [x, y] = projectCoords(spot.lat, spot.lng);
          return (
            <g
              key={spot.id}
              transform={`translate(${x - 12}, ${y - 12})`}
              className="cursor-pointer"
              onClick={() => setSelectedHotspotId(spot.id)}
            >
              <rect width="24" height="24" rx="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
              <text x="12" y="16" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                ⚠
              </text>
            </g>
          );
        })}

        {/* City Corridor Labels */}
        {[
          { text: 'Khanapara', lat: 26.1280, lng: 91.8150 },
          { text: 'Zoo Road', lat: 26.1680, lng: 91.7820 },
          { text: 'GS Road', lat: 26.1480, lng: 91.7760 },
          { text: 'Rukminigaon', lat: 26.1360, lng: 91.7910 },
          { text: 'Jalukbari', lat: 26.1310, lng: 91.7450 },
          { text: 'Dispur', lat: 26.1420, lng: 91.8020 },
        ].map((lbl) => {
          const [x, y] = projectCoords(lbl.lat, lbl.lng);
          return (
            <text
              key={lbl.text}
              x={x}
              y={y}
              fill="#ffffff"
              fontSize="11"
              fontWeight="600"
              opacity="0.8"
              textAnchor="middle"
              className="pointer-events-none font-sans"
            >
              {lbl.text}
            </text>
          );
        })}
      </svg>
    </div>
  );
};
