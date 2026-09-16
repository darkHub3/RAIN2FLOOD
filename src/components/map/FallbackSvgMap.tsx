import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { DRAINAGE_NODES } from '../../data/drainageNodes';
import { DRAINAGE_EDGES } from '../../data/drainageEdges';
import { FLOOD_ZONES } from '../../data/floodZones';
import { NATURAL_WATERWAYS } from '../../data/naturalDrainage';
import { TERRAIN_HILLS, FLOW_ACCUMULATION_VECTORS } from '../../data/terrainData';
import { ROAD_SEGMENTS } from '../../data/roads';
import { ROUTE_SCENARIOS } from '../../data/routes';
import { DrainageNode, DrainageEdge, RoadRiskState, RoadSegment } from '../../types';
import { ZoomIn, ZoomOut, RotateCcw, Crosshair } from 'lucide-react';

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

interface SvgMapProps {
  showRoutes?: boolean;
}

export const FallbackSvgMap: React.FC<SvgMapProps> = ({ showRoutes = false }) => {
  const {
    activeTimeStep,
    activeLayers,
    selectedNode,
    setSelectedNode,
    selectedEdge,
    setSelectedEdge,
    selectedRoad,
    focusRoad,
    roadRiskFilter,
    selectedRouteId,
    baseMapMode,
  } = useSimulation();

  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);

  const activeRoute = ROUTE_SCENARIOS.find((r) => r.id === selectedRouteId) || ROUTE_SCENARIOS[0];

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

  // Status colors
  const getEdgeColor = (status: string) => {
    switch (status) {
      case 'critical': return '#ef4444';
      case 'overloaded': return '#f97316';
      case 'warning': return '#f59e0b';
      default: return '#06b6d4';
    }
  };

  const getNodeColor = (status: string) => {
    switch (status) {
      case 'critical': return '#dc2626';
      case 'surcharged': return '#ef4444';
      case 'warning': return '#f59e0b';
      default: return '#10b981';
    }
  };

  const getFloodColor = (depth: number) => {
    if (depth > 0.6) return 'rgba(239, 68, 68, 0.22)';
    if (depth > 0.3) return 'rgba(249, 115, 22, 0.20)';
    if (depth > 0.15) return 'rgba(234, 179, 8, 0.18)';
    return 'rgba(6, 182, 212, 0.16)';
  };

  const getFloodStroke = (depth: number) => {
    if (depth > 0.6) return 'rgba(239, 68, 68, 0.55)';
    if (depth > 0.3) return 'rgba(249, 115, 22, 0.50)';
    if (depth > 0.15) return 'rgba(234, 179, 8, 0.45)';
    return 'rgba(6, 182, 212, 0.40)';
  };

  const getRoadRiskColor = (risk: RoadRiskState) => {
    switch (risk) {
      case 'BLOCKED': return '#ef4444';
      case 'HIGH RISK': return '#f97316';
      case 'MODERATE': return '#eab308';
      case 'NORMAL':
      default:
        return '#10b981';
    }
  };

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[620px] bg-[#090e18] rounded-xl overflow-hidden border border-[#223554] shadow-2xl select-none">
      {/* Map Header Status Overlay */}
      <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-2 pointer-events-auto">
        <div className="bg-[#0f172a]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#223554] text-xs font-mono flex items-center gap-2 text-slate-300 shadow-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="font-bold text-white uppercase">Guwahati Pilot GIS</span>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-300 font-semibold">{activeTimeStep} Scenario</span>
        </div>

        {/* Quick Zoom Hotspots */}
        <div className="hidden sm:flex items-center gap-1 bg-[#0f172a]/90 backdrop-blur-md p-1 rounded-lg border border-[#223554] text-[10px] font-mono">
          <span className="text-slate-400 px-1">Hotspots:</span>
          <button
            onClick={() => centerOnCoord(26.1755, 91.7725)}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition-colors"
          >
            Anil Nagar
          </button>
          <button
            onClick={() => centerOnCoord(26.1585, 91.7685)}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition-colors"
          >
            Bhangagarh
          </button>
          <button
            onClick={() => centerOnCoord(26.1758, 91.7285)}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition-colors"
          >
            Bharalumukh
          </button>
          <button
            onClick={() => centerOnCoord(26.1280, 91.6780)}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition-colors"
          >
            Deepor Beel
          </button>
        </div>
      </div>

      {/* Floating Map Navigation Controls */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 bg-[#0f172a]/90 backdrop-blur-md p-1 rounded-lg border border-[#223554] shadow-md">
        <button
          onClick={handleZoomIn}
          className="p-2 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          className="p-2 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition-colors"
          title="Reset Map View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Hover Info Tooltip */}
      {hoveredInfo && (
        <div className="absolute bottom-4 left-4 z-20 bg-[#0f172a]/95 border border-cyan-500/50 text-cyan-200 px-3 py-1.5 rounded-md text-xs font-mono shadow-xl max-w-md pointer-events-none">
          {hoveredInfo}
        </div>
      )}

      {/* Main SVG Vector Canvas */}
      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center center',
          transition: 'transform 0.25s ease-out',
        }}
      >
        <defs>
          {/* Subtle Grid Pattern for GIS Coordinate Graticule */}
          <pattern id="gisGrid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#141f33" strokeWidth="0.75" />
          </pattern>

          {/* Flow vector arrow marker */}
          <marker
            id="flowArrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#f59e0b" opacity="0.8" />
          </marker>

          {/* Blue gradient for Brahmaputra River */}
          <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#03254c" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#043a6b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#021c3b" stopOpacity="0.85" />
          </linearGradient>

          {/* Wetland pattern */}
          <pattern id="wetlandPattern" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M 2,8 Q 6,4 10,8" fill="none" stroke="#38bdf8" strokeWidth="0.8" opacity="0.4" />
          </pattern>
        </defs>

        {/* Base GIS Graticule Grid / Satellite Background */}
        <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill={baseMapMode === 'satellite' ? '#070f1a' : '#090e18'} />
        {baseMapMode === 'satellite' ? (
          <>
            {/* Satellite aerial terrain texture approximation */}
            <radialGradient id="satGlow" cx="45%" cy="55%" r="65%">
              <stop offset="0%" stopColor="#0d1f33" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#071322" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#040912" stopOpacity="1" />
            </radialGradient>
            <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="url(#satGlow)" />
            <path
              d="M 120,480 Q 250,560 520,530 T 920,490 L 1000,650 L 0,650 Z"
              fill="#081524"
              opacity="0.6"
            />
          </>
        ) : (
          <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="url(#gisGrid)" />
        )}

        {/* --- 1. BASE GEOGRAPHY: Brahmaputra River Northern Corridor --- */}
        <path
          d="M -20,120 Q 200,100 400,60 T 800,20 L 1020,-10 L 1020,-50 L -20,-50 Z"
          fill="url(#riverGradient)"
          stroke="#0284c7"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <text x="320" y="45" fill="#38bdf8" fontSize="11" fontFamily="JetBrains Mono, monospace" opacity="0.6" letterSpacing="4">
          BRAHMAPUTRA RIVER (MASTER RECEIVING STAGE)
        </text>

        {/* --- 2. TERRAIN LAYER (DEM Contours & Hills) --- */}
        {(activeLayers as any).terrain && (
          <g id="terrain-layer" opacity="0.85">
            {TERRAIN_HILLS.map((hill) => {
              const [hx, hy] = projectCoords(hill.center[0], hill.center[1]);
              return (
                <g key={hill.id} className="cursor-help">
                  <circle
                    cx={hx}
                    cy={hy}
                    r="48"
                    fill="#334155"
                    fillOpacity="0.18"
                    stroke="#64748b"
                    strokeWidth="0.75"
                    strokeDasharray="3 3"
                  />
                  <circle
                    cx={hx}
                    cy={hy}
                    r="30"
                    fill="#475569"
                    fillOpacity="0.25"
                    stroke="#94a3b8"
                    strokeWidth="1"
                  />
                  <circle
                    cx={hx}
                    cy={hy}
                    r="14"
                    fill="#64748b"
                    fillOpacity="0.45"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                  />
                  <text
                    x={hx}
                    y={hy - 18}
                    textAnchor="middle"
                    fill="#f1f5f9"
                    fontSize="9"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="bold"
                  >
                    ▲ {hill.name} ({hill.elevationM}m)
                  </text>
                </g>
              );
            })}

            {/* Runoff flow vectors */}
            {FLOW_ACCUMULATION_VECTORS.map((vec, i) => {
              const [fx, fy] = projectCoords(vec.from[0], vec.from[1]);
              const [tx, ty] = projectCoords(vec.to[0], vec.to[1]);
              return (
                <line
                  key={i}
                  x1={fx}
                  y1={fy}
                  x2={tx}
                  y2={ty}
                  stroke="#f59e0b"
                  strokeWidth="1.8"
                  strokeDasharray="4 3"
                  markerEnd="url(#flowArrow)"
                  opacity="0.85"
                />
              );
            })}
          </g>
        )}

        {/* --- 3. NATURAL DRAINAGE & WETLANDS LAYER --- */}
        {activeLayers.waterBodies && (
          <g id="natural-drainage-layer">
            {NATURAL_WATERWAYS.map((nw) => {
              if (nw.polygon) {
                const pointsStr = nw.polygon
                  .map((coord) => projectCoords(coord[0], coord[1]).join(','))
                  .join(' ');
                return (
                  <g key={nw.id}>
                    <polygon
                      points={pointsStr}
                      fill="#0284c7"
                      fillOpacity="0.2"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                    />
                    <polygon points={pointsStr} fill="url(#wetlandPattern)" />
                    <text
                      x="110"
                      y="520"
                      fill="#7dd3fc"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                    >
                      {nw.name}
                    </text>
                  </g>
                );
              }
              if (nw.path) {
                const pathStr = nw.path
                  .map((coord, idx) => {
                    const [px, py] = projectCoords(coord[0], coord[1]);
                    return `${idx === 0 ? 'M' : 'L'} ${px} ${py}`;
                  })
                  .join(' ');
                return (
                  <g key={nw.id}>
                    <path
                      d={pathStr}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="4"
                      strokeOpacity="0.4"
                    />
                    <path
                      d={pathStr}
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="2"
                    />
                  </g>
                );
              }
              return null;
            })}
          </g>
        )}

        {/* --- 4. SIMULATED FLOOD DEPTH ZONES (SUBTLE UNDER ROADS) --- */}
        {activeLayers.floodDepth && (
          <g id="flood-zones-layer">
            {FLOOD_ZONES.map((zone) => {
              const zState = zone.timesteps[activeTimeStep];
              const pointsStr = zone.polygon
                .map((coord) => projectCoords(coord[0], coord[1]).join(','))
                .join(' ');
              const [cx, cy] = projectCoords(zone.center[0], zone.center[1]);

              return (
                <g
                  key={zone.id}
                  className="cursor-pointer transition-all duration-500"
                  onMouseEnter={() =>
                    setHoveredInfo(
                      `${zone.name} | Simulated Depth: ${zState.depthM.toFixed(2)}m (${zState.risk.toUpperCase()} Risk) | Area: ${zState.affectedAreaHa} ha`
                    )
                  }
                  onMouseLeave={() => setHoveredInfo(null)}
                >
                  {/* Subtle Inundation Polygon */}
                  <polygon
                    points={pointsStr}
                    fill={getFloodColor(zState.depthM)}
                    stroke={getFloodStroke(zState.depthM)}
                    strokeWidth="1.2"
                  />
                  {/* Center Depth Label */}
                  <text
                    x={cx}
                    y={cy}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="8.5"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="bold"
                    className="pointer-events-none drop-shadow"
                  >
                    {zState.depthM.toFixed(2)}m
                  </text>
                </g>
              );
            })}
          </g>
        )}

        {/* --- 5. ROADS & RISK LAYER (PRIMARY VISUAL LAYER) --- */}
        {activeLayers.roadExposure && (
          <g id="roads-layer">
            {ROAD_SEGMENTS.map((road) => {
              const rState = road.timesteps[activeTimeStep];
              const risk = rState?.riskState || 'NORMAL';
              const isMatch = roadRiskFilter === 'ALL' || risk === roadRiskFilter;
              const opacity = isMatch ? 1 : 0.12;

              const pathStr = road.path
                .map((coord, idx) => {
                  const [px, py] = projectCoords(coord[0], coord[1]);
                  return `${idx === 0 ? 'M' : 'L'} ${px} ${py}`;
                })
                .join(' ');

              const color = getRoadRiskColor(risk);
              const isBlocked = risk === 'BLOCKED';
              const isHigh = risk === 'HIGH RISK';
              const isSelected = selectedRoad?.id === road.id;
              const strokeWidth = isBlocked || isHigh ? 4.5 : risk === 'MODERATE' ? 3.5 : 2.5;

              // Midpoint for barrier icon
              const midIdx = Math.floor(road.path.length / 2);
              const midCoord = road.path[midIdx];
              const [bx, by] = projectCoords(midCoord[0], midCoord[1]);

              return (
                <g
                  key={road.id}
                  opacity={opacity}
                  className="cursor-pointer transition-opacity duration-300"
                  onClick={() => focusRoad(road)}
                  onMouseEnter={() =>
                    setHoveredInfo(
                      `Road: ${road.name} | Risk: ${risk} | Depth: ${rState.waterDepthM.toFixed(2)}m${rState.drainageStressPct ? ` | Stress: ${rState.drainageStressPct}%` : ''}`
                    )
                  }
                  onMouseLeave={() => setHoveredInfo(null)}
                >
                  {/* Selection Cyan Glow Outline */}
                  {isSelected && (
                    <path
                      d={pathStr}
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth={strokeWidth + 5}
                      strokeOpacity="0.8"
                      strokeLinecap="round"
                      className="animate-pulse"
                    />
                  )}

                  {/* Dark Base Line */}
                  <path
                    d={pathStr}
                    fill="none"
                    stroke="#0b101c"
                    strokeWidth={strokeWidth + 2}
                    strokeLinecap="round"
                  />

                  {/* Colored Road Risk Line */}
                  <path
                    d={pathStr}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={isBlocked ? '8 6' : undefined}
                    strokeLinecap="round"
                    className={isBlocked ? 'animate-pulse' : undefined}
                  />

                  {/* Blocked Road Closure Barrier Badge at Midpoint */}
                  {isBlocked && isMatch && (
                    <g transform={`translate(${bx - 7}, ${by - 7})`} className="pointer-events-none">
                      <rect
                        width="14"
                        height="14"
                        rx="3"
                        fill="#ef4444"
                        stroke="#ffffff"
                        strokeWidth="1"
                      />
                      <text
                        x="7"
                        y="10.5"
                        textAnchor="middle"
                        fontSize="9"
                        fill="#ffffff"
                        fontWeight="bold"
                      >
                        ⛔
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        )}

        {/* --- 6. DRAINAGE EDGES (CONDUITS & CHANNELS) --- */}
        {activeLayers.drainageNetwork && (
          <g id="drainage-edges-layer">
            {DRAINAGE_EDGES.map((edge) => {
              const eState = edge.timesteps[activeTimeStep];
              const fromNode = DRAINAGE_NODES.find((n) => n.id === edge.fromNode);
              const toNode = DRAINAGE_NODES.find((n) => n.id === edge.toNode);

              if (!fromNode || !toNode) return null;

              const [x1, y1] = projectCoords(fromNode.lat, fromNode.lng);
              const [x2, y2] = projectCoords(toNode.lat, toNode.lng);

              const color = getEdgeColor(eState.status);
              const isSelected = selectedEdge?.id === edge.id;
              const isOverloaded = eState.status === 'overloaded' || eState.status === 'critical';

              return (
                <g
                  key={edge.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedEdge(edge)}
                  onMouseEnter={() =>
                    setHoveredInfo(
                      `Edge ${edge.id}: ${edge.name} | Flow: ${eState.flowM3s} m³/s | Cap: ${edge.designCapacityM3s} m³/s | Util: ${eState.utilizationPct}%`
                    )
                  }
                  onMouseLeave={() => setHoveredInfo(null)}
                >
                  {/* Invisible fat hit area for easy clicking */}
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="transparent"
                    strokeWidth="14"
                  />

                  {/* Highlight ring if selected */}
                  {isSelected && (
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#ffffff"
                      strokeWidth="5"
                      strokeOpacity="0.8"
                    />
                  )}

                  {/* Base Edge Conduit Line */}
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={color}
                    strokeWidth={isSelected ? '3.5' : isOverloaded ? '2.8' : '2'}
                    strokeDasharray={isOverloaded ? '6 3' : undefined}
                    strokeLinecap="round"
                    className={isOverloaded ? 'animate-pulse' : undefined}
                  />

                  {/* Flow Direction Chevron at Midpoint */}
                  <circle
                    cx={(x1 + x2) / 2}
                    cy={(y1 + y2) / 2}
                    r="2"
                    fill={color}
                    opacity="0.8"
                  />
                </g>
              );
            })}
          </g>
        )}

        {/* --- 7. DRAINAGE NODES (INLETS, MANHOLES, OUTFALLS) --- */}
        {activeLayers.drainageNetwork && (
          <g id="drainage-nodes-layer">
            {DRAINAGE_NODES.map((node) => {
              const nState = node.timesteps[activeTimeStep];
              const [nx, ny] = projectCoords(node.lat, node.lng);
              const color = getNodeColor(nState.status);
              const isSelected = selectedNode?.id === node.id;
              const isSurcharged = nState.status === 'surcharged' || nState.status === 'critical';
              const isOutfall = node.type === 'outfall';

              return (
                <g
                  key={node.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedNode(node)}
                  onMouseEnter={() =>
                    setHoveredInfo(
                      `Node ${node.id}: ${node.name} (${node.type}) | Inflow: ${nState.incomingFlowM3s} m³/s | Util: ${nState.utilizationPct}% | Status: ${nState.status.toUpperCase()}`
                    )
                  }
                  onMouseLeave={() => setHoveredInfo(null)}
                >
                  {/* Selection Ring */}
                  {isSelected && (
                    <circle
                      cx={nx}
                      cy={ny}
                      r="10"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="animate-spin"
                    />
                  )}

                  {/* Surcharge Pulse Animation */}
                  {isSurcharged && (
                    <circle
                      cx={nx}
                      cy={ny}
                      r="9"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="1.5"
                      opacity="0.7"
                      className="animate-ping"
                    />
                  )}

                  {/* Outfall diamond vs regular node circle */}
                  {isOutfall ? (
                    <polygon
                      points={`${nx},${ny - 6} ${nx + 6},${ny} ${nx},${ny + 6} ${nx - 6},${ny}`}
                      fill="#0284c7"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                    />
                  ) : (
                    <circle
                      cx={nx}
                      cy={ny}
                      r={node.type === 'junction' ? 5.5 : 4}
                      fill={color}
                      stroke="#0b101c"
                      strokeWidth="1.5"
                    />
                  )}

                  {/* Node ID label for major nodes */}
                  {(isSelected || ['N-003', 'N-012', 'N-014', 'N-022', 'N-030'].includes(node.id)) && (
                    <text
                      x={nx}
                      y={ny - 7}
                      textAnchor="middle"
                      fill="#f8fafc"
                      fontSize="8"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                      className="drop-shadow-md pointer-events-none"
                    >
                      {node.id}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        )}

        {/* --- 8. SAFE ROUTING DEMO OVERLAY (IF ENABLED) --- */}
        {showRoutes && activeRoute && (
          <g id="routing-overlay-layer">
            {/* Normal Route (Direct, Flood Hazard) */}
            {activeRoute.normalRoute.path.length > 0 && (
              <g>
                <path
                  d={activeRoute.normalRoute.path
                    .map((c, i) => {
                      const [rx, ry] = projectCoords(c[0], c[1]);
                      return `${i === 0 ? 'M' : 'L'} ${rx} ${ry}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="4"
                  strokeDasharray="8 4"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
              </g>
            )}

            {/* Flood-Safe Route (Lower Simulated Flood Exposure) */}
            {activeRoute.safeRoute.path.length > 0 && (
              <g>
                <path
                  d={activeRoute.safeRoute.path
                    .map((c, i) => {
                      const [rx, ry] = projectCoords(c[0], c[1]);
                      return `${i === 0 ? 'M' : 'L'} ${rx} ${ry}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* Origin & Destination Markers */}
            {(() => {
              const [ox, oy] = projectCoords(activeRoute.originCoords[0], activeRoute.originCoords[1]);
              const [dx, dy] = projectCoords(activeRoute.destCoords[0], activeRoute.destCoords[1]);
              return (
                <>
                  {/* Origin */}
                  <circle cx={ox} cy={oy} r="7" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
                  <text x={ox} y={oy - 10} textAnchor="middle" fill="#06b6d4" fontSize="9" fontWeight="bold">
                    START: {activeRoute.origin}
                  </text>

                  {/* Destination */}
                  <circle cx={dx} cy={dy} r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                  <text x={dx} y={dy - 10} textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">
                    DEST: {activeRoute.destination}
                  </text>
                </>
              );
            })()}
          </g>
        )}
      </svg>

      {/* Map Scale Bar & Coordinates Footnote */}
      <div className="absolute bottom-3 right-3 z-20 bg-[#0f172a]/90 backdrop-blur-md px-2.5 py-1 rounded border border-[#223554] text-[10px] font-mono text-slate-400 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="w-12 h-1 bg-slate-400 border border-slate-700"></div>
          <span>~2 km</span>
        </div>
        <span>26.14°N, 91.74°E (Guwahati)</span>
      </div>
    </div>
  );
};
