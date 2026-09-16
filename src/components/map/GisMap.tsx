import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useSimulation, TimeStep } from '../../context/SimulationContext';
import { DRAINAGE_NODES } from '../../data/drainageNodes';
import { DRAINAGE_EDGES } from '../../data/drainageEdges';
import { FLOOD_ZONES } from '../../data/floodZones';
import { NATURAL_WATERWAYS } from '../../data/naturalDrainage';
import { ROAD_SEGMENTS } from '../../data/roads';
import { ROUTE_SCENARIOS } from '../../data/routes';
import {
  Play,
  Pause,
  Plus,
  Minus,
  Crosshair,
  Compass,
  AlertTriangle,
  Info,
  Clock,
  ShieldCheck,
  Ban,
  Bus
} from 'lucide-react';

interface GisMapProps {
  showRoutes?: boolean;
}

export const GisMap: React.FC<GisMapProps> = ({ showRoutes = true }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const overlayGroupRef = useRef<L.LayerGroup | null>(null);

  const [isKhanaparaCardDismissed, setIsKhanaparaCardDismissed] = useState(false);
  const [isTimerCollapsed, setIsTimerCollapsed] = useState(false);

  const {
    activeTimeStep,
    setTimeStep,
    isPlaying,
    runNowcast,
    pauseNowcast,
    activeLayers,
    baseMapMode,
    selectedNode,
    setSelectedNode,
    selectedEdge,
    setSelectedEdge,
    selectedRoad,
    setSelectedRoad,
    selectedRouteId,
    targetLocation,
  } = useSimulation();

  const activeRoute = ROUTE_SCENARIOS.find((r) => r.id === selectedRouteId) || ROUTE_SCENARIOS[0];

  // 1. Initialize Leaflet Map Instance (React 18 StrictMode resistant)
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if ((mapContainerRef.current as any)._leaflet_id) {
      (mapContainerRef.current as any)._leaflet_id = null;
    }

    if (!mapInstanceRef.current) {
      // Centered directly on Guwahati's Khanapara-GS Road corridor matching reference
      const map = L.map(mapContainerRef.current, {
        center: [26.1450, 91.7850],
        zoom: 13.2,
        minZoom: 10,
        maxZoom: 18,
        zoomControl: false,
        attributionControl: false,
      });

      const overlayGroup = L.layerGroup().addTo(map);
      overlayGroupRef.current = overlayGroup;
      mapInstanceRef.current = map;

      setTimeout(() => {
        map.invalidateSize();
      }, 150);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (mapContainerRef.current) {
        (mapContainerRef.current as any)._leaflet_id = null;
      }
    };
  }, []);

  // 2. Basemap Switcher (Default: High-Resolution Satellite)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
      tileLayerRef.current = null;
    }

    let url = '';
    let maxZoom = 19;
    let subdomains: string | string[] = 'abcd';

    if (baseMapMode === 'dark') {
      // CartoDB Dark Matter
      url = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    } else if (baseMapMode === 'osm') {
      // OpenStreetMap
      url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
      subdomains = 'abc';
    } else {
      // High-resolution Satellite (Esri World Imagery) - exactly like reference
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      maxZoom = 18;
    }

    const tileLayer = L.tileLayer(url, {
      maxZoom,
      subdomains,
    }).addTo(map);

    tileLayerRef.current = tileLayer;
  }, [baseMapMode]);

  // 3. Smooth flyTo when targetLocation changes (from search or hotspot click)
  useEffect(() => {
    if (targetLocation && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(
        [targetLocation.lat, targetLocation.lng],
        targetLocation.zoom || 15,
        { duration: 1.2 }
      );
    }
  }, [targetLocation]);

  // 4. Render All Map Layers & Features Matching Reference Screenshot
  useEffect(() => {
    const map = mapInstanceRef.current;
    const overlayGroup = overlayGroupRef.current;
    if (!map || !overlayGroup) return;

    overlayGroup.clearLayers();

    // ==========================================
    // A. BRAHMAPUTRA RIVER WATERWAY & LABEL
    // ==========================================
    NATURAL_WATERWAYS.forEach((nw) => {
      if (nw.polygon) {
        const latLngs: [number, number][] = nw.polygon.map((c) => [c[0], c[1]]);
        const poly = L.polygon(latLngs, {
          color: '#38bdf8',
          weight: 1.5,
          fillColor: '#0284c7',
          fillOpacity: 0.35,
        });
        overlayGroup.addLayer(poly);
      }
    });

    // Slanted "Brahmaputra River" text marker directly on river bend (as in reference)
    const riverLabelIcon = L.divIcon({
      className: 'river-label-marker',
      html: `
        <div style="
          transform: rotate(-32deg);
          color: #7dd3fc;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-shadow: 0 0 8px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8);
          opacity: 0.85;
          pointer-events: none;
          white-space: nowrap;
        ">
          Brahmaputra River
        </div>
      `,
      iconSize: [160, 30],
      iconAnchor: [80, 15],
    });
    const riverMarker = L.marker([26.1950, 91.7380], { icon: riverLabelIcon });
    overlayGroup.addLayer(riverMarker);

    // ==========================================
    // B. MULTI-LAYER THERMAL GRADIENT FLOOD INUNDATION OVERLAY
    // (Generates the smooth Blue -> Cyan -> Yellow -> Orange -> Red heatmap)
    // ==========================================
    const isFloodActive = activeLayers.predictedFloodZones !== false || activeLayers.waterDepth !== false || activeLayers.rainfallNowcast !== false;

    if (isFloodActive) {
      // Define thermal gradient clusters for Guwahati's primary lowlands
      const thermalClusters = [
        { center: [26.1260, 91.8150], maxR: 1600, name: 'Khanapara Basin' },
        { center: [26.1395, 91.7950], maxR: 1800, name: 'Rukminigaon / Down Town' },
        { center: [26.1620, 91.7780], maxR: 1700, name: 'Zoo Road Corridor' },
        { center: [26.1550, 91.7680], maxR: 1500, name: 'GS Road (Bhangagarh)' },
        { center: [26.1730, 91.7720], maxR: 1400, name: 'Anil Nagar Lowland' },
      ];

      // Multiplier depending on timestep
      const timeScale =
        activeTimeStep === 'NOW'
          ? 0.7
          : activeTimeStep === '+1HR'
          ? 0.9
          : activeTimeStep === '+2HR'
          ? 1.15
          : 1.35;

      thermalClusters.forEach((cluster) => {
        const r = cluster.maxR * timeScale;

        // Outer halo: Deep Blue / Cyan
        const outerCircle = L.circle([cluster.center[0], cluster.center[1]], {
          radius: r,
          fillColor: '#0284c7',
          fillOpacity: 0.38,
          stroke: true,
          color: '#38bdf8',
          weight: 1,
          opacity: 0.5,
        });
        overlayGroup.addLayer(outerCircle);

        // Mid-outer: Bright Cyan / Sky
        const midOuterCircle = L.circle([cluster.center[0], cluster.center[1]], {
          radius: r * 0.75,
          fillColor: '#06b6d4',
          fillOpacity: 0.48,
          stroke: false,
        });
        overlayGroup.addLayer(midOuterCircle);

        // Mid: Yellow / Amber
        const midCircle = L.circle([cluster.center[0], cluster.center[1]], {
          radius: r * 0.55,
          fillColor: '#eab308',
          fillOpacity: 0.58,
          stroke: false,
        });
        overlayGroup.addLayer(midCircle);

        // Mid-inner: Orange
        const innerCircle = L.circle([cluster.center[0], cluster.center[1]], {
          radius: r * 0.38,
          fillColor: '#f97316',
          fillOpacity: 0.68,
          stroke: false,
        });
        overlayGroup.addLayer(innerCircle);

        // Epicenter Core: Red / Magenta
        const coreCircle = L.circle([cluster.center[0], cluster.center[1]], {
          radius: r * 0.22,
          fillColor: '#ef4444',
          fillOpacity: 0.78,
          stroke: true,
          color: '#dc2626',
          weight: 1.5,
          opacity: 0.8,
        });
        overlayGroup.addLayer(coreCircle);
      });
    }

    // ==========================================
    // C. HISTORICAL FLOOD HOTSPOT WARNING MARKERS (⚠️)
    // ==========================================
    if (activeLayers.historicalHotspots !== false) {
      const hotspotsData = [
        { name: 'Khanapara Crossing', lat: 26.1260, lng: 91.8150 },
        { name: 'Zoo Road', lat: 26.1650, lng: 91.7830 },
        { name: 'GS Road', lat: 26.1520, lng: 91.7760 },
        { name: 'Rukminigaon', lat: 26.1395, lng: 91.7980 },
        { name: 'Anil Nagar', lat: 26.1755, lng: 91.7725 },
      ];

      hotspotsData.forEach((spot) => {
        const hazardIcon = L.divIcon({
          className: 'hazard-pulse-marker',
          html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center;">
              <span style="
                position: absolute;
                width: 24px;
                height: 24px;
                border-radius: 9999px;
                background: rgba(239, 68, 68, 0.4);
                animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
              "></span>
              <div style="
                position: relative;
                width: 22px;
                height: 22px;
                background: #ef4444;
                border: 2px solid #ffffff;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 12px rgba(0,0,0,0.6);
                cursor: pointer;
              ">
                <span style="color: white; font-size: 12px; font-weight: bold; line-height: 1;">!</span>
              </div>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const marker = L.marker([spot.lat, spot.lng], { icon: hazardIcon });
        marker.bindTooltip(
          `<div class="font-sans text-xs"><strong>${spot.name}</strong><br/><span class="text-rose-400">High Risk Flood Hotspot</span></div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );
        overlayGroup.addLayer(marker);
      });
    }

    // ==========================================
    // D. ROAD NETWORK (AFFECTED RED CORRIDOR & SAFE GREEN ROUTE)
    // ==========================================
    if (activeLayers.roadNetwork !== false) {
      // 1. Red Affected Corridor (traversing through Khanapara & GS Road)
      const affectedPath: [number, number][] = [
        [26.1210, 91.8220],
        [26.1260, 91.8150],
        [26.1320, 91.8110],
        [26.1390, 91.7990],
        [26.1480, 91.7875],
        [26.1585, 91.7685],
      ];

      const affectedLine = L.polyline(affectedPath, {
        color: '#ef4444',
        weight: 5,
        opacity: 0.95,
      });
      overlayGroup.addLayer(affectedLine);

      // Red No-Entry Barrier Icons (⛔) on affected road
      const barrierIcon = L.divIcon({
        className: 'barrier-marker',
        html: `
          <div style="
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #dc2626;
            border: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 6px rgba(0,0,0,0.8);
          ">
            <span style="width: 10px; height: 2.5px; background: white; border-radius: 1px;"></span>
          </div>
        `,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      overlayGroup.addLayer(L.marker([26.1260, 91.8150], { icon: barrierIcon }));
      overlayGroup.addLayer(L.marker([26.1390, 91.7990], { icon: barrierIcon }));

      // Bus transit icon on Khanapara road
      const busIcon = L.divIcon({
        className: 'bus-transit-marker',
        html: `
          <div style="
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #0284c7;
            border: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.8);
          ">
            <span style="color: white; font-size: 11px;">🚏</span>
          </div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });
      overlayGroup.addLayer(L.marker([26.1340, 91.8080], { icon: busIcon }));

      // 2. Green Safe Alternative Route (Elevated ridge bypass corridor)
      const safePath: [number, number][] = [
        [26.1180, 91.8220],
        [26.1320, 91.8110],
        [26.1410, 91.8190],
        [26.1550, 91.8150],
        [26.1750, 91.8020],
        [26.1880, 91.7745],
      ];

      const safeLine = L.polyline(safePath, {
        color: '#10b981',
        weight: 5,
        opacity: 0.95,
      });
      overlayGroup.addLayer(safeLine);

      // Base network lines for surrounding streets
      ROAD_SEGMENTS.forEach((road) => {
        const latLngs: [number, number][] = road.path.map((c) => [c[0], c[1]]);
        const baseRoad = L.polyline(latLngs, {
          color: '#64748b',
          weight: 2,
          opacity: 0.5,
        });
        overlayGroup.addLayer(baseRoad);
      });
    }

    // ==========================================
    // E. DRAINAGE NETWORK (CONDUITS & NODES)
    // ==========================================
    if (activeLayers.drainageNetwork !== false) {
      // Conduits
      DRAINAGE_EDGES.slice(0, 32).forEach((edge) => {
        const from = DRAINAGE_NODES.find((n) => n.id === edge.fromNode);
        const to = DRAINAGE_NODES.find((n) => n.id === edge.toNode);
        if (!from || !to) return;

        const conduitLine = L.polyline(
          [
            [from.lat, from.lng],
            [to.lat, to.lng],
          ],
          {
            color: '#38bdf8',
            weight: 2,
            opacity: 0.7,
            dashArray: '4, 4',
          }
        );
        overlayGroup.addLayer(conduitLine);
      });

      // Manholes (green rings) & Outfalls (purple rings)
      DRAINAGE_NODES.slice(0, 24).forEach((node) => {
        const isOutfall = node.type === 'outfall';
        const circle = L.circleMarker([node.lat, node.lng], {
          radius: isOutfall ? 5.5 : 4,
          color: isOutfall ? '#c084fc' : '#34d399',
          weight: 2,
          fillColor: '#090e18',
          fillOpacity: 0.9,
        });
        overlayGroup.addLayer(circle);
      });
    }

    // ==========================================
    // F. ON-MAP GEOGRAPHIC LABELS (AS IN REFERENCE)
    // ==========================================
    const labelLocations = [
      { text: 'Khanapara', coords: [26.1280, 91.8150], anchor: [30, 20] },
      { text: 'Zoo Road', coords: [26.1680, 91.7820], anchor: [30, 20] },
      { text: 'GS Road →', coords: [26.1480, 91.7760], anchor: [30, 20] },
      { text: 'Rukminigaon →', coords: [26.1360, 91.7910], anchor: [40, 20] },
      { text: 'Jalukbari →', coords: [26.1310, 91.7450], anchor: [30, 20] },
      { text: 'Dispur', coords: [26.1420, 91.8020], anchor: [20, 20] },
      { text: 'Guwahati →', coords: [26.1150, 91.7650], anchor: [30, 20] },
    ];

    labelLocations.forEach((lbl) => {
      const lblIcon = L.divIcon({
        className: 'city-text-label',
        html: `
          <div style="
            color: #ffffff;
            font-family: 'Inter', sans-serif;
            font-size: 11px;
            font-weight: 600;
            text-shadow: 0 0 6px #000, 0 1px 3px #000;
            white-space: nowrap;
            pointer-events: none;
          ">
            ${lbl.text}
          </div>
        `,
        iconSize: [80, 20],
      });
      overlayGroup.addLayer(L.marker(lbl.coords as [number, number], { icon: lblIcon }));
    });
  }, [activeTimeStep, activeLayers, baseMapMode]);

  // Controls
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleLocate = () => {
    mapInstanceRef.current?.flyTo([26.1450, 91.7850], 13.2, { duration: 0.8 });
  };

  return (
    <div className="relative w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[640px] flex flex-col bg-[#080d16] border border-[#162236] rounded-xl overflow-hidden select-none shadow-2xl">
      {/* 1. FLOATING COMPASS (TOP-LEFT) */}
      <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-[1000] pointer-events-none">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0b1320]/80 backdrop-blur-md border border-[#1e2f49] flex items-center justify-center shadow-lg text-slate-300">
          <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
        </div>
      </div>

      {/* 2. FLOATING CARD: FLOOD COMPLETION TIMER (TOP-RIGHT) */}
      <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-[1000] pointer-events-auto">
        {isTimerCollapsed ? (
          <button
            onClick={() => setIsTimerCollapsed(false)}
            className="bg-[#0b1322]/90 backdrop-blur-md border border-[#1e2f49] hover:border-cyan-500/50 rounded-xl px-2.5 py-1.5 shadow-2xl flex items-center gap-2 text-xs text-slate-200 transition-all"
            title="Expand Flood Completion Timer"
          >
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold text-white">48 min</span>
            <span className="text-[10px] text-rose-400 font-semibold">to flood</span>
          </button>
        ) : (
          <div className="bg-[#0b1322]/95 backdrop-blur-md border border-[#1e2f49] rounded-xl p-2 sm:p-3 shadow-2xl flex flex-col gap-1 max-w-[175px] sm:max-w-[220px]">
            {/* Header with Minimize button */}
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-300 border-b border-slate-700/60 pb-1 font-medium">
              <span className="truncate pr-1">Flood Completion</span>
              <button
                onClick={() => setIsTimerCollapsed(true)}
                className="text-slate-400 hover:text-white text-[11px] p-0.5"
                title="Minimize timer"
              >
                ✕
              </button>
            </div>

            {/* Donut Gauge & 48 min readout */}
            <div className="flex items-center gap-2 sm:gap-3 pt-0.5 sm:pt-1">
              {/* Circular Progress Gauge */}
              <div className="relative w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center shrink-0">
                <svg className="w-11 h-11 sm:w-14 sm:h-14 -rotate-90" viewBox="0 0 44 44">
                  {/* Background Ring */}
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="4"
                  />
                  {/* Colored Progress Arc */}
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    fill="none"
                    stroke="url(#timerGradient)"
                    strokeWidth="4"
                    strokeDasharray="113"
                    strokeDashoffset="34"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="60%" stopColor="#eab308" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Center icon */}
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 absolute" />
              </div>

              {/* Readout */}
              <div className="flex flex-col min-w-0">
                <div className="text-base sm:text-xl font-bold text-white tracking-tight leading-none">
                  48 <span className="text-[10px] sm:text-xs font-normal text-slate-300">min</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 truncate">to reach flood</span>
                <span className="text-[8px] sm:text-[9px] text-cyan-400/90 font-mono mt-0.5">
                  depth: 35 cm
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. FLOATING PINNED CALLOUT: KHANAPARA CROSSING (ON MAP) */}
      {!isKhanaparaCardDismissed && (
        <div className="absolute top-16 sm:top-28 left-2 sm:left-20 lg:left-36 z-[1000] pointer-events-auto max-w-[calc(100%-1rem)] sm:max-w-[270px] animate-fadeIn">
          <div className="bg-[#0b1322]/95 backdrop-blur-md border border-rose-500/50 rounded-xl p-2.5 sm:p-3 shadow-2xl text-xs space-y-1.5 sm:space-y-2 relative">
            {/* Header with Hazard Icon */}
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
                <AlertTriangle className="w-3.5 h-3.5 fill-rose-500/30" />
              </div>

              <div>
                <div className="font-bold text-white text-xs sm:text-[13px] leading-tight">
                  Khanapara Crossing
                </div>
                <div className="text-[9px] sm:text-[10px] font-semibold text-rose-400 uppercase tracking-wider">
                  High Risk Zone
                </div>
              </div>

              <button
                onClick={() => setIsKhanaparaCardDismissed(true)}
                className="ml-auto text-slate-500 hover:text-white text-xs p-0.5"
                title="Dismiss callout"
              >
                ✕
              </button>
            </div>

            {/* Metrics */}
            <div className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-[11px] text-slate-300 pt-1 border-t border-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Water Depth:</span>
                <strong className="text-white font-mono">60 – 100 cm</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Time to Flood:</span>
                <strong className="text-rose-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  48 min
                </strong>
              </div>
            </div>

            {/* Warning Pill Alert */}
            <div className="p-1 sm:p-1.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-[9px] sm:text-[10px] text-rose-200 flex items-center gap-1.5 font-medium">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Will become a risk zone in 48 min</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. FLOATING MAP NAVIGATION CONTROLS (BOTTOM-RIGHT) */}
      <div className="absolute bottom-20 sm:bottom-16 right-2 sm:right-4 z-[1000] flex flex-col gap-1 sm:gap-1.5 pointer-events-auto">
        <button
          onClick={handleZoomIn}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0b1322]/90 backdrop-blur-md border border-[#1e2f49] hover:bg-cyan-950 text-slate-200 hover:text-cyan-300 flex items-center justify-center shadow-lg transition-colors"
          title="Zoom In"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0b1322]/90 backdrop-blur-md border border-[#1e2f49] hover:bg-cyan-950 text-slate-200 hover:text-cyan-300 flex items-center justify-center shadow-lg transition-colors"
          title="Zoom Out"
        >
          <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
        <button
          onClick={handleLocate}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0b1322]/90 backdrop-blur-md border border-[#1e2f49] hover:bg-cyan-950 text-slate-200 hover:text-cyan-300 flex items-center justify-center shadow-lg transition-colors"
          title="Center on Guwahati"
        >
          <Crosshair className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* 5. FLOATING SCALE BAR (BOTTOM-LEFT, Hidden on narrow mobile) */}
      <div className="hidden sm:block absolute bottom-16 left-4 z-[1000] pointer-events-none">
        <div className="bg-[#0b1322]/80 backdrop-blur-md px-2 py-1 rounded border border-[#1e2f49] text-[9px] font-mono text-slate-300 shadow-md flex flex-col gap-0.5">
          <div className="flex justify-between w-28 text-[8px] text-slate-400">
            <span>0</span>
            <span>0.5</span>
            <span>1</span>
            <span>2 km</span>
          </div>
          <div className="w-28 h-1 bg-white/20 rounded-full flex">
            <div className="w-1/4 h-full bg-cyan-400 rounded-l-full"></div>
            <div className="w-1/4 h-full bg-white/60"></div>
            <div className="w-2/4 h-full bg-cyan-400 rounded-r-full"></div>
          </div>
        </div>
      </div>

      {/* 6. MAP-BOTTOM TIMELINE & NOWCAST BAR (IN-MAP FULL WIDTH) */}
      <div className="absolute bottom-2 left-2 right-2 sm:left-3 sm:right-3 z-[1000] pointer-events-auto">
        <div className="bg-[#0b1322]/95 backdrop-blur-md border border-[#1e2f49] rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between gap-2 sm:gap-3 shadow-2xl">
          {/* Play/Pause Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {!isPlaying ? (
              <button
                onClick={runNowcast}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
                title="Play Nowcast Timeline"
              >
                <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" />
              </button>
            ) : (
              <button
                onClick={pauseNowcast}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-500 hover:bg-amber-400 text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
                title="Pause Timeline"
              >
                <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              </button>
            )}
            <span className="text-[11px] sm:text-xs font-semibold text-white ml-0.5">
              {activeTimeStep === 'NOW' ? 'Now' : activeTimeStep}
            </span>
          </div>

          {/* Interactive Slider Track */}
          <div className="flex-1 min-w-[120px] max-w-xl mx-1 sm:mx-2 flex flex-col gap-0.5 sm:gap-1">
            <div className="relative flex items-center">
              <input
                type="range"
                min="0"
                max="3"
                step="1"
                value={
                  activeTimeStep === 'NOW'
                    ? 0
                    : activeTimeStep === '+1HR'
                    ? 1
                    : activeTimeStep === '+2HR'
                    ? 2
                    : 3
                }
                onChange={(e) => {
                  pauseNowcast();
                  const steps: TimeStep[] = ['NOW', '+1HR', '+2HR', '+3HR'];
                  setTimeStep(steps[Number(e.target.value)]);
                }}
                className="w-full h-1.5 bg-[#162338] rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Slider Step Labels */}
            <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-slate-400 px-0.5">
              <span
                onClick={() => { pauseNowcast(); setTimeStep('NOW'); }}
                className={`cursor-pointer hover:text-cyan-300 ${activeTimeStep === 'NOW' ? 'text-cyan-400 font-bold' : ''}`}
              >
                Now
              </span>
              <span
                onClick={() => { pauseNowcast(); setTimeStep('+1HR'); }}
                className={`cursor-pointer hover:text-cyan-300 ${activeTimeStep === '+1HR' ? 'text-cyan-400 font-bold' : ''}`}
              >
                +1 hr
              </span>
              <span
                onClick={() => { pauseNowcast(); setTimeStep('+2HR'); }}
                className={`cursor-pointer hover:text-cyan-300 ${activeTimeStep === '+2HR' ? 'text-cyan-400 font-bold' : ''}`}
              >
                +2 hr
              </span>
              <span
                onClick={() => { pauseNowcast(); setTimeStep('+3HR'); }}
                className={`cursor-pointer hover:text-cyan-300 ${activeTimeStep === '+3HR' ? 'text-cyan-400 font-bold' : ''}`}
              >
                +3 hr
              </span>
            </div>
          </div>

          {/* Timestamp Metadata (Hidden on Mobile) */}
          <div className="hidden md:flex flex-col text-right text-[10px] font-mono text-slate-400 leading-tight shrink-0">
            <span>Forecast: 16 Sep 2026, 02:40 AM</span>
            <span className="text-slate-500">Model Run: 16 Sep 2026, 12:15 AM</span>
          </div>
        </div>
      </div>

      {/* 7. ACTUAL LEAFLET MAP CONTAINER */}
      <div
        ref={mapContainerRef}
        className="w-full h-full flex-1 z-10 min-h-[400px] sm:min-h-[500px] lg:min-h-[580px]"
        style={{ background: '#090e18' }}
      />
    </div>
  );
};
