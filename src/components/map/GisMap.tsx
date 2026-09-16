import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useSimulation, TimeStep, MapMode } from '../../context/SimulationContext';
import { DRAINAGE_NODES } from '../../data/drainageNodes';
import { DRAINAGE_EDGES } from '../../data/drainageEdges';
import { FLOOD_ZONES } from '../../data/floodZones';
import { NATURAL_WATERWAYS } from '../../data/naturalDrainage';
import { ROAD_SEGMENTS } from '../../data/roads';
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
  Layers,
  Waves,
  ShieldAlert
} from 'lucide-react';

interface GisMapProps {
  showRoutes?: boolean;
}

export const GisMap: React.FC<GisMapProps> = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const overlayGroupRef = useRef<L.LayerGroup | null>(null);

  const [isTimerCollapsed, setIsTimerCollapsed] = useState(false);
  const [isLayersCollapsed, setIsLayersCollapsed] = useState(false);

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
    targetLocation,
    roadRiskFilter,
    selectedHotspotId,
    setSelectedHotspotId,
    focusRoad,
    mapMode,
    setMapMode,
  } = useSimulation();

  // In-map manual layer overrides
  const [mapLayers, setMapLayers] = useState({
    floodExtent: true,
    hotspots: true,
    naturalDrainage: true,
    drainageNetwork: false,
    roadRisk: true,
  });

  const activeHotspot = FLOOD_ZONES.find((z) => z.id === selectedHotspotId) || null;

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if ((mapContainerRef.current as any)._leaflet_id) {
      (mapContainerRef.current as any)._leaflet_id = null;
    }

    if (!mapInstanceRef.current) {
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

  // 2. Basemap Switcher
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
      url = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    } else if (baseMapMode === 'osm') {
      url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
      subdomains = 'abc';
    } else {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      maxZoom = 18;
    }

    const tileLayer = L.tileLayer(url, {
      maxZoom,
      subdomains,
    }).addTo(map);

    tileLayerRef.current = tileLayer;
  }, [baseMapMode]);

  // 3. Smooth flyTo when targetLocation changes
  useEffect(() => {
    if (targetLocation && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(
        [targetLocation.lat, targetLocation.lng],
        targetLocation.zoom || 15,
        { duration: 1.2 }
      );
    }
  }, [targetLocation]);

  // 4. Render GIS Layers based on MapMode and TimeStep
  useEffect(() => {
    const map = mapInstanceRef.current;
    const overlayGroup = overlayGroupRef.current;
    if (!map || !overlayGroup) return;

    overlayGroup.clearLayers();

    const isFloodDrainageMode = mapMode === 'flood_drainage';
    const isRoadRiskMode = mapMode === 'road_risk';

    // -------------------------------------------------------------
    // A. NATURAL WATERWAYS & BASINS (Blue / Cyan)
    // -------------------------------------------------------------
    NATURAL_WATERWAYS.forEach((nw) => {
      // Wetland / Lake Polygons (Deepor Beel, Silsako Beel)
      if (nw.polygon) {
        const latLngs: [number, number][] = nw.polygon.map((c) => [c[0], c[1]]);
        const poly = L.polygon(latLngs, {
          color: '#38bdf8',
          weight: isFloodDrainageMode ? 2.5 : 1.5,
          fillColor: '#0284c7',
          fillOpacity: isFloodDrainageMode ? 0.45 : 0.25,
        });
        poly.bindTooltip(
          `<div class="font-sans text-xs">
            <strong class="text-cyan-300">${nw.name}</strong><br/>
            <span class="text-slate-300 text-[10px]">${nw.capacityRole}</span>
          </div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );
        overlayGroup.addLayer(poly);
      }

      // Natural Drainage Stream / River Channels (Bharalu, Bahini, Mora Bharalu, Basistha, Lakhimijan, Bondajan)
      if (nw.path) {
        const latLngs: [number, number][] = nw.path.map((c) => [c[0], c[1]]);

        if (isFloodDrainageMode) {
          const glowLine = L.polyline(latLngs, {
            color: '#00d2ff',
            weight: 8,
            opacity: 0.35,
            lineCap: 'round',
          });
          overlayGroup.addLayer(glowLine);
        }

        const channelLine = L.polyline(latLngs, {
          color: '#00d2ff',
          weight: isFloodDrainageMode ? 4.5 : 2.5,
          opacity: isFloodDrainageMode ? 0.95 : 0.6,
          lineCap: 'round',
        });

        channelLine.bindTooltip(
          `<div class="font-sans text-xs">
            <strong class="text-cyan-300">${nw.name} (Natural Drainage)</strong><br/>
            <span class="text-slate-300 text-[10px]">${nw.capacityRole}</span>
          </div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );
        overlayGroup.addLayer(channelLine);
      }
    });

    // Brahmaputra River label marker
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
    overlayGroup.addLayer(L.marker([26.1950, 91.7380], { icon: riverLabelIcon }));

    // -------------------------------------------------------------
    // B. REPRESENTATIVE MAN-MADE DRAINAGE (Purple / Orange)
    // Shown prominently in FLOOD & DRAINAGE mode, or when manually enabled
    // -------------------------------------------------------------
    const showDrainageNetwork = isFloodDrainageMode || mapLayers.drainageNetwork;

    if (showDrainageNetwork) {
      // Conduits & Feeder links
      DRAINAGE_EDGES.forEach((edge) => {
        const from = DRAINAGE_NODES.find((n) => n.id === edge.fromNode);
        const to = DRAINAGE_NODES.find((n) => n.id === edge.toNode);
        if (!from || !to) return;

        const edgeState = edge.timesteps[activeTimeStep];
        const isOverloaded = edgeState.flowM3s > edge.designCapacityM3s;
        const isWarning = edgeState.utilizationPct >= 85;

        // Visual distinction per Section 5: Purple normal/warning, Orange/Red overloaded
        const edgeColor = isOverloaded ? '#f97316' : isWarning ? '#c084fc' : '#a855f7';
        const weight = isOverloaded ? 3.8 : 2.5;

        const conduitLine = L.polyline(
          [
            [from.lat, from.lng],
            [to.lat, to.lng],
          ],
          {
            color: edgeColor,
            weight: weight,
            opacity: 0.85,
            dashArray: isOverloaded ? '4, 4' : '6, 3',
          }
        );

        conduitLine.bindTooltip(
          `<div class="font-sans text-xs">
            <strong class="text-purple-300">${edge.id}: ${edge.name}</strong><br/>
            Representative Conduit (${edge.type})<br/>
            Flow: ${edgeState.flowM3s.toFixed(1)} / ${edge.designCapacityM3s.toFixed(1)} m³/s (${edgeState.utilizationPct}%)<br/>
            Status: <span class="font-bold ${isOverloaded ? 'text-orange-400' : 'text-purple-300'}">${edgeState.status.toUpperCase()}</span>
          </div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );

        conduitLine.on('click', () => {
          setSelectedEdge(edge);
          setSelectedRoad(null);
          setSelectedHotspotId(null);
        });

        overlayGroup.addLayer(conduitLine);
      });

      // Drainage Nodes (Inlets, Manholes, Outfalls, Surcharged)
      DRAINAGE_NODES.forEach((node) => {
        const nodeState = node.timesteps[activeTimeStep];
        const isOutfall = node.type === 'outfall';
        const isSurcharged = nodeState.status === 'surcharged' || nodeState.status === 'critical';

        const nodeColor = isSurcharged ? '#ef4444' : isOutfall ? '#38bdf8' : '#c084fc';

        const circle = L.circleMarker([node.lat, node.lng], {
          radius: isOutfall ? 5.5 : isSurcharged ? 5.0 : 3.5,
          color: nodeColor,
          weight: 1.5,
          fillColor: '#090e18',
          fillOpacity: 0.9,
        });

        circle.bindTooltip(
          `<div class="font-sans text-xs">
            <strong class="text-cyan-300">${node.id}: ${node.name}</strong> (${node.type})<br/>
            Utilization: <span class="font-bold ${isSurcharged ? 'text-rose-400' : 'text-emerald-400'}">${nodeState.utilizationPct}%</span><br/>
            Inflow: ${nodeState.incomingFlowM3s.toFixed(1)} m³/s | Surcharge: ${nodeState.surchargeDepthM.toFixed(2)} m
          </div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );

        circle.on('click', () => {
          setSelectedNode(node);
          setSelectedRoad(null);
          setSelectedHotspotId(null);
        });

        overlayGroup.addLayer(circle);
      });
    }

    // -------------------------------------------------------------
    // C. PERSISTENT FLOOD EXTENT POLYGONS (Subtle transparent polygons)
    // Visible in BOTH modes
    // -------------------------------------------------------------
    if (mapLayers.floodExtent) {
      FLOOD_ZONES.forEach((zone) => {
        const zState = zone.timesteps[activeTimeStep];
        const depth = zState.depthM;

        let fillColor = '#06b6d4';
        let strokeColor = '#0891b2';
        let fillOpacity = 0.18;
        let strokeWidth = 1;

        if (depth > 0.60) {
          fillColor = '#ef4444';
          strokeColor = '#dc2626';
          fillOpacity = 0.30;
          strokeWidth = 1.6;
        } else if (depth > 0.30) {
          fillColor = '#f97316';
          strokeColor = '#ea580c';
          fillOpacity = 0.25;
          strokeWidth = 1.3;
        } else if (depth > 0.15) {
          fillColor = '#eab308';
          strokeColor = '#ca8a04';
          fillOpacity = 0.22;
          strokeWidth = 1.1;
        }

        const latLngs: [number, number][] = zone.polygon.map((c) => [c[0], c[1]]);
        const poly = L.polygon(latLngs, {
          color: strokeColor,
          weight: strokeWidth,
          fillColor: fillColor,
          fillOpacity: fillOpacity,
          dashArray: depth > 0.60 ? '4, 4' : undefined,
        });

        poly.bindTooltip(
          `<div class="font-sans text-xs">
            <strong>${zone.name}</strong><br/>
            Simulated Flood Depth: <span class="text-cyan-300 font-bold">${depth.toFixed(2)} m</span> (${zState.risk.toUpperCase()})<br/>
            <span class="text-slate-400 text-[10px]">${zState.primaryBottleneck}</span>
          </div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );

        poly.on('click', () => {
          setSelectedHotspotId(zone.id);
          setSelectedRoad(null);
        });

        overlayGroup.addLayer(poly);
      });
    }

    // -------------------------------------------------------------
    // D. ROAD NETWORK & ROAD RISK (Coupled overland impact)
    // Primary focus in ROAD RISK mode; Subdued in FLOOD & DRAINAGE mode
    // -------------------------------------------------------------
    ROAD_SEGMENTS.forEach((road) => {
      const rState = road.timesteps[activeTimeStep];
      const riskState = rState.riskState;
      const isSelected = selectedRoad?.id === road.id;
      const isFiltered = roadRiskFilter !== 'ALL' && riskState !== roadRiskFilter;

      // In FLOOD & DRAINAGE mode: subdue roads to keep focus on water movement
      let opacity = isFloodDrainageMode ? 0.15 : isFiltered ? 0.15 : 0.88;
      let weight = isFloodDrainageMode ? 2.0 : 3.5;
      let color = '#22c55e';
      let dashArray: string | undefined = undefined;

      if (riskState === 'BLOCKED') {
        color = '#ef4444';
        weight = isFloodDrainageMode ? 3.0 : 6.5;
        opacity = isFloodDrainageMode ? 0.35 : isFiltered ? 0.20 : 1.0;
        dashArray = '8, 6';
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
      if (!coords || coords.length === 0) return;
      const latLngs: [number, number][] = coords.map((c) => (c[0] > 70 ? [c[1], c[0]] : [c[0], c[1]]));

      // Selection Highlight
      if (isSelected) {
        const glowLine = L.polyline(latLngs, {
          color: '#38bdf8',
          weight: 12,
          opacity: 0.9,
          lineCap: 'round',
        });
        overlayGroup.addLayer(glowLine);
      }

      const roadLine = L.polyline(latLngs, {
        color: isFiltered ? '#475569' : color,
        weight: isFiltered ? 2 : weight,
        opacity: opacity,
        dashArray: isFiltered ? undefined : dashArray,
        lineCap: 'round',
      });

      roadLine.bindTooltip(
        `<div class="font-sans text-xs">
          <strong class="text-white">${road.name}</strong> <span class="text-[10px] text-cyan-400">(${road.id})</span><br/>
          <span class="text-[10px] text-slate-400">OSM Way: ${road.osmId || 'N/A'}${road.highwayType ? ` • ${road.highwayType}` : ''}</span><br/>
          Status: <span style="font-weight:bold; color: ${
            riskState === 'BLOCKED'
              ? '#ef4444'
              : riskState === 'HIGH RISK'
              ? '#f97316'
              : riskState === 'MODERATE'
              ? '#eab308'
              : '#22c55e'
          };">${riskState === 'BLOCKED' ? 'BLOCKED' : riskState}</span><br/>
          Simulated Depth: <span class="font-mono text-cyan-300 font-semibold">${rState.waterDepthM.toFixed(2)} m</span><br/>
          Drainage Stress: <span class="font-mono text-slate-300">${rState.drainageStressPct || 85}%</span>
        </div>`,
        { sticky: true, className: 'leaflet-dark-tooltip' }
      );

      roadLine.on('click', () => {
        focusRoad(road);
        setSelectedHotspotId(null);
      });

      overlayGroup.addLayer(roadLine);

      // In ROAD RISK mode: Add ⛔ barrier markers on BLOCKED segments
      if (isRoadRiskMode && riskState === 'BLOCKED' && !isFiltered && latLngs.length > 0) {
        const midIdx = Math.floor(latLngs.length / 2);
        const midCoord = latLngs[midIdx];
        const barrierIcon = L.divIcon({
          className: 'barrier-marker',
          html: `
            <div style="
              width: 22px;
              height: 22px;
              border-radius: 50%;
              background: #dc2626;
              border: 2px solid #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 10px rgba(0,0,0,0.85);
              cursor: pointer;
            " title="${road.name} - BLOCKED">
              <span style="width: 10px; height: 3px; background: white; border-radius: 1px;"></span>
            </div>
          `,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });
        const barrierMarker = L.marker(midCoord, { icon: barrierIcon });
        barrierMarker.on('click', () => focusRoad(road));
        overlayGroup.addLayer(barrierMarker);
      }
    });

    // -------------------------------------------------------------
    // E. FLOOD HOTSPOTS (⚠️) - PERSISTENT ACROSS MODES
    // -------------------------------------------------------------
    if (mapLayers.hotspots) {
      const hotspotsData = [
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

      hotspotsData.forEach((spot) => {
        const hazardIcon = L.divIcon({
          className: 'hazard-hotspot-marker',
          html: `
            <div style="
              position: relative;
              width: 24px;
              height: 24px;
              background: #ef4444;
              border: 2px solid #ffffff;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 3px 12px rgba(0,0,0,0.8);
              cursor: pointer;
              transition: transform 0.2s;
            ">
              <span style="color: white; font-size: 13px; font-weight: 900; line-height: 1;">⚠</span>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const marker = L.marker([spot.lat, spot.lng], { icon: hazardIcon });
        marker.bindTooltip(
          `<div class="font-sans text-xs">
            <strong>${spot.name}</strong><br/>
            <span class="text-amber-400 font-semibold">Flood Hotspot (Click to inspect)</span>
          </div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );
        marker.on('click', () => {
          setSelectedHotspotId(spot.id);
          setSelectedRoad(null);
        });
        overlayGroup.addLayer(marker);
      });
    }

    // -------------------------------------------------------------
    // F. ON-MAP GEOGRAPHIC LABELS
    // -------------------------------------------------------------
    const labelLocations = [
      { text: 'Khanapara', coords: [26.1280, 91.8150] },
      { text: 'Zoo Road', coords: [26.1680, 91.7820] },
      { text: 'GS Road →', coords: [26.1480, 91.7760] },
      { text: 'Rukminigaon →', coords: [26.1360, 91.7910] },
      { text: 'Jalukbari →', coords: [26.1310, 91.7450] },
      { text: 'Dispur', coords: [26.1420, 91.8020] },
      { text: 'Guwahati →', coords: [26.1150, 91.7650] },
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
            opacity: 0.85;
          ">
            ${lbl.text}
          </div>
        `,
        iconSize: [80, 20],
      });
      overlayGroup.addLayer(L.marker(lbl.coords as [number, number], { icon: lblIcon }));
    });
  }, [
    activeTimeStep,
    mapMode,
    roadRiskFilter,
    selectedRoad,
    selectedHotspotId,
    mapLayers,
  ]);

  // Controls
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleLocate = () => {
    mapInstanceRef.current?.flyTo([26.1450, 91.7850], 13.2, { duration: 0.8 });
  };

  // Helper calculation for hotspot affected roads
  const hotspotAffectedRoadsCount = activeHotspot
    ? ROAD_SEGMENTS.filter((r) => {
        const state = r.timesteps[activeTimeStep];
        return state && state.riskState !== 'NORMAL' && r.name.toLowerCase().includes(activeHotspot.name.split(' ')[0].toLowerCase());
      }).length || 3
    : 0;

  return (
    <div className="relative w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[640px] flex flex-col bg-[#080d16] border border-[#162236] rounded-xl overflow-hidden select-none shadow-2xl">
      {/* 1. TOP-CENTER SWITCHABLE MAP MODE TOGGLE (FLOOD & DRAINAGE vs ROAD RISK) */}
      <div className="absolute top-2.5 sm:top-4 left-1/2 -translate-x-1/2 z-[1000] pointer-events-auto">
        <div className="bg-[#0b1322]/95 backdrop-blur-md border border-[#1e2f49] p-1 rounded-xl shadow-2xl flex items-center gap-1 font-mono text-xs">
          <button
            onClick={() => setMapMode('flood_drainage')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              mapMode === 'flood_drainage'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-[#152338]'
            }`}
            title="View flood extent, natural & representative drainage conduits, and surcharge stress"
          >
            <Waves className="w-3.5 h-3.5" />
            <span>FLOOD & DRAINAGE</span>
          </button>
          <button
            onClick={() => setMapMode('road_risk')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              mapMode === 'road_risk'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-[#152338]'
            }`}
            title="View road-level flood impact, high-risk corridors, and blocked roads"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>ROAD RISK</span>
          </button>
        </div>
      </div>

      {/* 2. FLOATING COMPASS (TOP-LEFT) */}
      <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-[1000] pointer-events-none">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0b1320]/80 backdrop-blur-md border border-[#1e2f49] flex items-center justify-center shadow-lg text-slate-300">
          <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
        </div>
      </div>

      {/* 3. FLOATING IN-MAP LAYER CONTROL (TOP-LEFT) */}
      <div className="absolute top-2.5 left-12 sm:top-4 sm:left-14 z-[1000] pointer-events-auto">
        {isLayersCollapsed ? (
          <button
            onClick={() => setIsLayersCollapsed(false)}
            className="bg-[#0b1322]/90 backdrop-blur-md border border-[#1e2f49] hover:border-cyan-500/50 rounded-xl px-2.5 py-1.5 shadow-2xl flex items-center gap-1.5 text-xs text-slate-200 transition-all"
            title="Open Map Layers Control"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-white text-[11px]">Layers</span>
          </button>
        ) : (
          <div className="bg-[#0b1322]/95 backdrop-blur-md border border-[#1e2f49] rounded-xl p-2.5 shadow-2xl flex flex-col gap-1.5 w-48 text-xs select-none">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-1 text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>GIS LAYERS</span>
              </div>
              <button
                onClick={() => setIsLayersCollapsed(true)}
                className="text-slate-400 hover:text-white p-0.5 text-xs leading-none"
                title="Collapse Layers"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1.5 pt-0.5 text-[11px] font-medium text-slate-200">
              <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={mapLayers.roadRisk}
                  onChange={(e) => setMapLayers((prev) => ({ ...prev, roadRisk: e.target.checked }))}
                  className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer accent-emerald-500"
                />
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Road Risk Network
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={mapMode === 'flood_drainage' ? true : mapLayers.drainageNetwork}
                  disabled={mapMode === 'flood_drainage'}
                  onChange={(e) => setMapLayers((prev) => ({ ...prev, drainageNetwork: e.target.checked }))}
                  className="rounded border-slate-700 bg-slate-900 text-purple-500 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer accent-purple-500"
                />
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  Representative Drains
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={mapLayers.naturalDrainage}
                  onChange={(e) => setMapLayers((prev) => ({ ...prev, naturalDrainage: e.target.checked }))}
                  className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer accent-cyan-500"
                />
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  Natural Channels
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={mapLayers.floodExtent}
                  onChange={(e) => setMapLayers((prev) => ({ ...prev, floodExtent: e.target.checked }))}
                  className="rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer accent-blue-500"
                />
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  Flood Extent
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={mapLayers.hotspots}
                  onChange={(e) => setMapLayers((prev) => ({ ...prev, hotspots: e.target.checked }))}
                  className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer accent-amber-500"
                />
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  Hotspot Markers
                </span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* 4. FLOATING CARD: FLOOD COMPLETION TIMER (TOP-RIGHT) */}
      <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-[1000] pointer-events-auto">
        {isTimerCollapsed ? (
          <button
            onClick={() => setIsTimerCollapsed(false)}
            className="bg-[#0b1322]/90 backdrop-blur-md border border-[#1e2f49] hover:border-cyan-500/50 rounded-xl px-2.5 py-1.5 shadow-2xl flex items-center gap-2 text-xs text-slate-200 transition-all"
            title="Expand Scenario Status"
          >
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold text-white">Scenario</span>
            <span className="text-[10px] text-amber-400 font-semibold">{activeTimeStep}</span>
          </button>
        ) : (
          <div className="bg-[#0b1322]/95 backdrop-blur-md border border-[#1e2f49] rounded-xl p-2.5 sm:p-3 shadow-2xl flex flex-col gap-1 max-w-[185px] sm:max-w-[220px]">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-300 border-b border-slate-700/60 pb-1 font-medium">
              <span className="truncate pr-1">Simulated Scenario</span>
              <button
                onClick={() => setIsTimerCollapsed(true)}
                className="text-slate-400 hover:text-white text-[11px] p-0.5"
                title="Minimize card"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 pt-1">
              <div className="relative w-11 h-11 sm:w-13 sm:h-13 flex items-center justify-center shrink-0">
                <svg className="w-11 h-11 sm:w-13 sm:h-13 -rotate-90" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="#1e293b" strokeWidth="4" />
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="4"
                    strokeDasharray="113"
                    strokeDashoffset={
                      activeTimeStep === 'NOW' ? '85' : activeTimeStep === '+1HR' ? '56' : activeTimeStep === '+2HR' ? '28' : '0'
                    }
                    strokeLinecap="round"
                  />
                </svg>
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 absolute" />
              </div>

              <div className="flex flex-col min-w-0">
                <div className="text-sm sm:text-base font-bold text-white tracking-tight leading-none">
                  {activeTimeStep}
                </div>
                <span className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 truncate">Scenario Window</span>
                <span className="text-[8px] sm:text-[9px] text-amber-300 font-mono mt-0.5">
                  Simulated Nowcast
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. INTERACTIVE INSPECTORS: BLOCKED ROAD (SECTION 15) & HOTSPOT (SECTION 7) */}
      {selectedRoad ? (
        <div className={`absolute ${isLayersCollapsed ? 'top-16 sm:top-20' : 'top-48 sm:top-52'} left-2 sm:left-4 z-[1000] pointer-events-auto max-w-[calc(100%-1rem)] sm:max-w-[290px] animate-fadeIn transition-all`}>
          {(() => {
            const roadState = selectedRoad.timesteps[activeTimeStep];
            const isBlocked = roadState.riskState === 'BLOCKED';
            const isHigh = roadState.riskState === 'HIGH RISK';
            const isMod = roadState.riskState === 'MODERATE';

            return (
              <div className={`bg-[#0b1322]/95 backdrop-blur-md rounded-xl p-3 shadow-2xl text-xs space-y-2 relative border ${
                isBlocked
                  ? 'border-red-500/70 ring-1 ring-red-500/40'
                  : isHigh
                  ? 'border-orange-500/70'
                  : 'border-cyan-500/50'
              }`}>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-700/60 pb-1.5">
                  <div>
                    <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                      ROAD IMPACT
                    </div>
                    <div className="font-bold text-white text-xs sm:text-[13px] leading-tight mt-0.5">
                      {selectedRoad.name}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRoad(null)}
                    className="text-slate-400 hover:text-white p-0.5 text-xs"
                    title="Close inspector"
                  >
                    ✕
                  </button>
                </div>

                {/* Exact Fields Required by Section 15 */}
                <div className="space-y-1.5 text-[11px] font-mono text-slate-300">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Road:</span>
                    <span className="text-white font-semibold truncate max-w-[170px]">{selectedRoad.name}</span>
                  </div>

                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400">OSM Feature:</span>
                    <span className="text-cyan-300 font-mono">
                      {selectedRoad.id} {selectedRoad.osmId ? `(Way ${selectedRoad.osmId})` : ''}
                    </span>
                  </div>

                  {selectedRoad.highwayType && (
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-400">Classification:</span>
                      <span className="text-slate-200 uppercase font-mono">{selectedRoad.highwayType}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Status:</span>
                    <strong className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${
                      isBlocked
                        ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                        : isHigh
                        ? 'bg-orange-500/20 text-orange-300 border border-orange-500/50'
                        : isMod
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                    }`}>
                      {isBlocked ? 'SIMULATED BLOCKED CONDITION' : roadState.riskState}
                    </strong>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Simulated Flood Depth:</span>
                    <strong className="text-cyan-300 font-bold">{roadState.waterDepthM.toFixed(2)} m</strong>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Drainage Stress:</span>
                    <strong className="text-white font-bold">{roadState.drainageStressPct || 85}%</strong>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Scenario:</span>
                    <span className="text-amber-300 font-bold">{activeTimeStep}</span>
                  </div>

                  <div className="text-[10px] text-slate-300 pt-1.5 border-t border-slate-800 leading-snug">
                    <span className="text-slate-400 font-semibold">Reason: </span>
                    <span className="text-rose-300 font-medium">
                      {isBlocked
                        ? 'Predicted flood depth exceeds prototype road-impact threshold.'
                        : isHigh
                        ? 'Adjacent drainage channel operating above design capacity.'
                        : 'Simulated overland runoff currently within safe operating threshold.'}
                    </span>
                  </div>
                </div>

                {/* View on map action */}
                <button
                  onClick={() => {
                    const cList = (selectedRoad.path && selectedRoad.path.length > 0) ? selectedRoad.path : selectedRoad.geometry;
                    if (cList && cList.length > 0) {
                      const mid = cList[Math.floor(cList.length / 2)];
                      const targetLat = mid[0] > 70 ? mid[1] : mid[0];
                      const targetLng = mid[0] > 70 ? mid[0] : mid[1];
                      mapInstanceRef.current?.flyTo([targetLat, targetLng], 15.5, { duration: 0.8 });
                    }
                  }}
                  className="w-full py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-[11px] font-bold shadow transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>FOCUS ROAD ON MAP</span>
                </button>
              </div>
            );
          })()}
        </div>
      ) : activeHotspot ? (
        <div className={`absolute ${isLayersCollapsed ? 'top-16 sm:top-20' : 'top-48 sm:top-52'} left-2 sm:left-4 z-[1000] pointer-events-auto max-w-[calc(100%-1rem)] sm:max-w-[290px] animate-fadeIn transition-all`}>
          <div className="bg-[#0b1322]/95 backdrop-blur-md border border-amber-500/60 rounded-xl p-3 shadow-2xl text-xs space-y-2 relative">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 border-b border-slate-700/60 pb-1.5">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[9px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                    FLOOD HOTSPOT
                  </div>
                  <div className="font-bold text-white text-xs sm:text-[13px] leading-tight">
                    {activeHotspot.name}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedHotspotId(null)}
                className="text-slate-400 hover:text-white p-0.5 text-xs"
                title="Close hotspot inspector"
              >
                ✕
              </button>
            </div>

            {/* Exact Fields Required by Section 7 */}
            <div className="space-y-1.5 text-[11px] font-mono text-slate-300">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Location:</span>
                <span className="text-white font-semibold">{activeHotspot.name}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Simulated Depth:</span>
                <strong className="text-cyan-300 font-bold">{activeHotspot.timesteps[activeTimeStep].depthM.toFixed(2)} m</strong>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Severity:</span>
                <span className="font-bold text-amber-400 uppercase px-1.5 py-0.2 rounded bg-amber-950/60 border border-amber-500/40">
                  {activeHotspot.timesteps[activeTimeStep].risk}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Drainage Stress:</span>
                <strong className="text-rose-400 font-bold">
                  {activeTimeStep === 'NOW' ? '76%' : activeTimeStep === '+1HR' ? '87%' : activeTimeStep === '+2HR' ? '94%' : '98%'}
                </strong>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Scenario Time:</span>
                <span className="text-cyan-400 font-bold">{activeTimeStep}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Affected Roads:</span>
                <strong className="text-white font-bold">{hotspotAffectedRoadsCount} corridors</strong>
              </div>

              <div className="text-[10px] text-slate-300 pt-1.5 border-t border-slate-800 leading-snug">
                <span className="text-slate-400 font-semibold">Primary Bottleneck: </span>
                <span className="text-slate-300">{activeHotspot.timesteps[activeTimeStep].primaryBottleneck}</span>
              </div>
            </div>

            <button
              onClick={() => {
                mapInstanceRef.current?.flyTo([activeHotspot.center[0], activeHotspot.center[1]], 15.5, { duration: 0.8 });
              }}
              className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-[11px] font-bold shadow transition-colors flex items-center justify-center gap-1.5"
            >
              <span>FOCUS HOTSPOT ON MAP</span>
            </button>
          </div>
        </div>
      ) : null}

      {/* 6. FLOATING MAP NAVIGATION CONTROLS (BOTTOM-RIGHT) */}
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

      {/* 7. FLOATING SCALE BAR (BOTTOM-LEFT) */}
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

      {/* 8. IN-MAP TIMELINE & NOWCAST SCRUBBER */}
      <div className="absolute bottom-2 left-2 right-2 sm:left-3 sm:right-3 z-[1000] pointer-events-auto">
        <div className="bg-[#0b1322]/95 backdrop-blur-md border border-[#1e2f49] rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between gap-2 sm:gap-3 shadow-2xl">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {!isPlaying ? (
              <button
                onClick={runNowcast}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
                title="Play Timeline Simulation"
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

          <div className="hidden md:flex flex-col text-right text-[10px] font-mono text-slate-400 leading-tight shrink-0">
            <span className="text-cyan-300 font-semibold">SIMULATED TIMELINE</span>
            <span className="text-slate-500">Guwahati Pilot Study Area</span>
          </div>
        </div>
      </div>

      {/* 9. ACTUAL LEAFLET MAP CONTAINER */}
      <div
        ref={mapContainerRef}
        className="w-full h-full flex-1 z-10 min-h-[400px] sm:min-h-[500px] lg:min-h-[580px]"
        style={{ background: '#090e18' }}
      />
    </div>
  );
};
