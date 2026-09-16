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
  Bus,
  Layers
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
  const [isLayersCollapsed, setIsLayersCollapsed] = useState(false);

  // In-Map Layer Control state (Drainage Network default: unchecked/off)
  const [mapLayers, setMapLayers] = useState({
    roadRisk: true,
    drainageNetwork: false,
    floodExtent: true,
    hotspots: true,
    routes: true,
  });

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
    roadRiskFilter,
    selectedHotspotId,
    setSelectedHotspotId,
    focusRoad,
  } = useSimulation();

  const activeRoute = ROUTE_SCENARIOS.find((r) => r.id === selectedRouteId) || ROUTE_SCENARIOS[0];
  const activeHotspot = FLOOD_ZONES.find((z) => z.id === selectedHotspotId) || null;

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
    // B. SUBTLE SEMI-TRANSPARENT FLOOD-DEPTH POLYGONS (Subordinate to roads)
    // ==========================================
    const isFloodActive = mapLayers.floodExtent && (activeLayers.predictedFloodZones !== false || activeLayers.waterDepth !== false || activeLayers.rainfallNowcast !== false);

    if (isFloodActive) {
      FLOOD_ZONES.forEach((zone) => {
        const zState = zone.timesteps[activeTimeStep];
        const depth = zState.depthM;

        // Visual encoding according to specification:
        // 0–0.15 m = low
        // 0.15–0.30 m = moderate
        // 0.30–0.60 m = high
        // >0.60 m = severe
        let fillColor = '#06b6d4';
        let strokeColor = '#0891b2';
        let fillOpacity = 0.18;
        let strokeWidth = 1;

        if (depth > 0.60) {
          fillColor = '#ef4444';
          strokeColor = '#dc2626';
          fillOpacity = 0.28;
          strokeWidth = 1.5;
        } else if (depth > 0.30) {
          fillColor = '#f97316';
          strokeColor = '#ea580c';
          fillOpacity = 0.25;
          strokeWidth = 1.2;
        } else if (depth > 0.15) {
          fillColor = '#eab308';
          strokeColor = '#ca8a04';
          fillOpacity = 0.22;
          strokeWidth = 1;
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
        });

        overlayGroup.addLayer(poly);
      });
    }

    // ==========================================
    // C. DRAINAGE NETWORK (SEPARATE OPTIONAL GIS LAYER - DEFAULT OFF)
    // ==========================================
    if (mapLayers.drainageNetwork && activeLayers.drainageNetwork !== false) {
      // Conduits - subtle cyan/blue dashed style
      DRAINAGE_EDGES.slice(0, 36).forEach((edge) => {
        const from = DRAINAGE_NODES.find((n) => n.id === edge.fromNode);
        const to = DRAINAGE_NODES.find((n) => n.id === edge.toNode);
        if (!from || !to) return;

        const isOverloaded = edge.timesteps[activeTimeStep].flowM3s > edge.designCapacityM3s;
        const conduitLine = L.polyline(
          [
            [from.lat, from.lng],
            [to.lat, to.lng],
          ],
          {
            color: isOverloaded ? '#f43f5e' : '#0284c7',
            weight: isOverloaded ? 2.2 : 1.6,
            opacity: 0.55,
            dashArray: '3, 4',
          }
        );
        conduitLine.bindTooltip(
          `<div class="font-sans text-xs">
            <strong>${edge.id}: ${edge.name}</strong><br/>
            Flow: ${edge.timesteps[activeTimeStep].flowM3s.toFixed(1)} / ${edge.designCapacityM3s.toFixed(1)} m³/s (${edge.timesteps[activeTimeStep].utilizationPct}%)
          </div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );
        conduitLine.on('click', () => setSelectedEdge(edge));
        overlayGroup.addLayer(conduitLine);
      });

      // Manholes & Outfalls
      DRAINAGE_NODES.slice(0, 24).forEach((node) => {
        const isOutfall = node.type === 'outfall';
        const isSurcharged = node.timesteps[activeTimeStep].status === 'surcharged' || node.timesteps[activeTimeStep].status === 'critical';
        const circle = L.circleMarker([node.lat, node.lng], {
          radius: isOutfall ? 4.5 : isSurcharged ? 4.5 : 3,
          color: isOutfall ? '#c084fc' : isSurcharged ? '#ef4444' : '#38bdf8',
          weight: 1.2,
          fillColor: '#090e18',
          fillOpacity: 0.85,
        });
        circle.bindTooltip(
          `<div class="font-sans text-xs">
            <strong>${node.id}: ${node.name}</strong> (${node.type})<br/>
            Utilization: ${node.timesteps[activeTimeStep].utilizationPct}% | Inflow: ${node.timesteps[activeTimeStep].incomingFlowM3s.toFixed(1)} m³/s
          </div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );
        circle.on('click', () => setSelectedNode(node));
        overlayGroup.addLayer(circle);
      });
    }

    // ==========================================
    // D. ROAD RISK (PRIMARY MAP LAYER)
    // ==========================================
    if (mapLayers.roadRisk && activeLayers.roadNetwork !== false) {
      ROAD_SEGMENTS.forEach((road) => {
        const rState = road.timesteps[activeTimeStep];
        const riskState = rState.riskState;
        const isDimmed = roadRiskFilter !== 'ALL' && riskState !== roadRiskFilter;
        const isSelected = selectedRoad?.id === road.id;

        // Visual states:
        // NORMAL = muted green
        // MODERATE = yellow
        // HIGH RISK = orange (thicker than normal)
        // BLOCKED = red (thicker, dashed, closure icon)
        let color = '#22c55e';
        let weight = 3.5;
        let opacity = isDimmed ? 0.12 : 0.85;
        let dashArray: string | undefined = undefined;

        if (riskState === 'BLOCKED') {
          color = '#ef4444';
          weight = 6.5;
          opacity = isDimmed ? 0.15 : 1.0;
          dashArray = '8, 6';
        } else if (riskState === 'HIGH RISK') {
          color = '#f97316';
          weight = 5.5;
          opacity = isDimmed ? 0.15 : 0.95;
        } else if (riskState === 'MODERATE') {
          color = '#eab308';
          weight = 4.5;
          opacity = isDimmed ? 0.15 : 0.95;
        } else {
          // NORMAL
          color = '#22c55e';
          weight = 3.5;
          opacity = isDimmed ? 0.12 : 0.85;
        }

        const latLngs: [number, number][] = road.path.map((c) => [c[0], c[1]]);

        // If selected: Draw bright cyan glow line underneath
        if (isSelected) {
          const glowLine = L.polyline(latLngs, {
            color: '#38bdf8',
            weight: 12,
            opacity: 0.85,
            lineCap: 'round',
          });
          overlayGroup.addLayer(glowLine);
        }

        const roadLine = L.polyline(latLngs, {
          color: isDimmed ? '#475569' : color,
          weight: isDimmed ? 2 : weight,
          opacity: opacity,
          dashArray: isDimmed ? undefined : dashArray,
          lineCap: 'round',
        });

        roadLine.bindTooltip(
          `<div class="font-sans text-xs">
            <strong class="text-white">${road.name}</strong><br/>
            Risk State: <span style="font-weight:bold; color: ${
              riskState === 'BLOCKED'
                ? '#ef4444'
                : riskState === 'HIGH RISK'
                ? '#f97316'
                : riskState === 'MODERATE'
                ? '#eab308'
                : '#22c55e'
            };">${riskState}</span><br/>
            Flood Depth: <span class="font-mono text-cyan-300 font-semibold">${rState.waterDepthM.toFixed(2)} m</span><br/>
            Drainage Stress: <span class="font-mono text-slate-300">${rState.drainageStressPct || 100}%</span>
            ${rState.timeToCritical ? `<br/><span class="text-rose-400 font-mono text-[10px]">Time to critical: ${rState.timeToCritical}</span>` : ''}
          </div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );

        roadLine.on('click', () => {
          focusRoad(road);
        });

        overlayGroup.addLayer(roadLine);

        // For BLOCKED roads that are not dimmed: render small closure barrier icon ⛔ at midpoint
        if (riskState === 'BLOCKED' && !isDimmed && road.path.length > 0) {
          const midIdx = Math.floor(road.path.length / 2);
          const midCoord = road.path[midIdx];
          const barrierIcon = L.divIcon({
            className: 'barrier-marker',
            html: `
              <div style="
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #dc2626;
                border: 2px solid #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 8px rgba(0,0,0,0.85);
                cursor: pointer;
              " title="${road.name} - BLOCKED">
                <span style="width: 10px; height: 3px; background: white; border-radius: 1px;"></span>
              </div>
            `,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          });
          const barrierMarker = L.marker(midCoord, { icon: barrierIcon });
          barrierMarker.on('click', () => focusRoad(road));
          overlayGroup.addLayer(barrierMarker);
        }
      });
    }

    // ==========================================
    // E. ROUTES (NORMAL MUTED/RED & ALTERNATIVE CYAN/GREEN)
    // ==========================================
    if (showRoutes && mapLayers.routes && activeRoute) {
      // 1. Normal Route (Muted / Red route, traverses through inundated corridors)
      if (activeRoute.normalRoute.path.length > 0) {
        const normalLine = L.polyline(activeRoute.normalRoute.path, {
          color: '#ef4444',
          weight: 4.5,
          opacity: 0.75,
          dashArray: '8, 6',
        });
        normalLine.bindTooltip(
          `<div class="font-sans text-xs">
            <strong class="text-rose-400">Normal Route</strong>: ${activeRoute.normalRoute.distanceKm} km<br/>
            Flood Exposure: <span class="font-bold text-rose-300">HIGH</span><br/>
            Max Depth: ${activeRoute.normalRoute.maxDepthM} m (${activeRoute.normalRoute.blockedSegmentsCount || 3} Blocked Segments)
          </div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );
        overlayGroup.addLayer(normalLine);

        // Prominent Route Blocked Callout Marker along normal path
        const blockedMidIdx = Math.floor(activeRoute.normalRoute.path.length / 2);
        const blockedCoord = activeRoute.normalRoute.path[blockedMidIdx];
        const routeBlockedIcon = L.divIcon({
          className: 'route-blocked-callout',
          html: `
            <div style="
              background: rgba(15, 23, 42, 0.95);
              border: 1.5px solid #ef4444;
              border-radius: 8px;
              padding: 3px 8px;
              color: #fca5a5;
              font-family: 'Inter', sans-serif;
              font-size: 10px;
              font-weight: 700;
              letter-spacing: 0.5px;
              box-shadow: 0 4px 14px rgba(0,0,0,0.8);
              display: flex;
              align-items: center;
              gap: 5px;
              white-space: nowrap;
              pointer-events: none;
            ">
              <span style="color: #ef4444; font-size: 12px;">⛔</span>
              <span>ROUTE BLOCKED BY SIMULATED FLOOD RISK</span>
            </div>
          `,
          iconSize: [250, 26],
          iconAnchor: [125, 13],
        });
        overlayGroup.addLayer(L.marker(blockedCoord, { icon: routeBlockedIcon }));
      }

      // 2. Alternative Route (Bright cyan/green lower-exposure route)
      if (activeRoute.safeRoute.path.length > 0) {
        const safeLine = L.polyline(activeRoute.safeRoute.path, {
          color: '#10b981',
          weight: 5.5,
          opacity: 0.95,
        });
        safeLine.bindTooltip(
          `<div class="font-sans text-xs">
            <strong class="text-emerald-400">Lower-Exposure Alternative</strong>: ${activeRoute.safeRoute.distanceKm} km<br/>
            Flood Exposure: <span class="font-bold text-emerald-300">LOW</span><br/>
            Max Depth: ${activeRoute.safeRoute.maxDepthM} m (0 Blocked Segments)
          </div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );
        overlayGroup.addLayer(safeLine);

        // Lower simulated flood exposure pill along alternative path
        const altMidIdx = Math.floor(activeRoute.safeRoute.path.length / 2);
        const altCoord = activeRoute.safeRoute.path[altMidIdx];
        const altPillIcon = L.divIcon({
          className: 'route-alt-callout',
          html: `
            <div style="
              background: rgba(6, 78, 59, 0.95);
              border: 1.5px solid #10b981;
              border-radius: 8px;
              padding: 3px 8px;
              color: #a7f3d0;
              font-family: 'Inter', sans-serif;
              font-size: 10px;
              font-weight: 700;
              box-shadow: 0 4px 14px rgba(0,0,0,0.8);
              display: flex;
              align-items: center;
              gap: 5px;
              white-space: nowrap;
              pointer-events: none;
            ">
              <span style="color: #34d399; font-size: 11px;">✓</span>
              <span>LOWER SIMULATED FLOOD EXPOSURE</span>
            </div>
          `,
          iconSize: [220, 26],
          iconAnchor: [110, 13],
        });
        overlayGroup.addLayer(L.marker(altCoord, { icon: altPillIcon }));
      }

      // Origin & Destination pin markers
      const originIcon = L.divIcon({
        className: 'route-pin-origin',
        html: `
          <div style="
            background: #0284c7;
            color: white;
            font-size: 10px;
            font-weight: bold;
            padding: 2px 6px;
            border-radius: 6px;
            border: 1.5px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.8);
            white-space: nowrap;
          ">
            ● ${activeRoute.origin}
          </div>
        `,
        iconSize: [110, 24],
        iconAnchor: [55, 12],
      });
      overlayGroup.addLayer(L.marker(activeRoute.originCoords, { icon: originIcon }));

      const destIcon = L.divIcon({
        className: 'route-pin-dest',
        html: `
          <div style="
            background: #059669;
            color: white;
            font-size: 10px;
            font-weight: bold;
            padding: 2px 6px;
            border-radius: 6px;
            border: 1.5px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.8);
            white-space: nowrap;
          ">
            ★ ${activeRoute.destination}
          </div>
        `,
        iconSize: [110, 24],
        iconAnchor: [55, 12],
      });
      overlayGroup.addLayer(L.marker(activeRoute.destCoords, { icon: destIcon }));
    }

    // ==========================================
    // F. SMALL HISTORICAL FLOOD HOTSPOT WARNING MARKERS (⚠️)
    // ==========================================
    if (mapLayers.hotspots && activeLayers.historicalHotspots !== false) {
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
              width: 22px;
              height: 22px;
              background: #ef4444;
              border: 2px solid #ffffff;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 3px 10px rgba(0,0,0,0.7);
              cursor: pointer;
              transition: transform 0.2s;
            ">
              <span style="color: white; font-size: 11px; font-weight: 900; line-height: 1;">⚠</span>
            </div>
          `,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
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
        });
        overlayGroup.addLayer(marker);
      });
    }

    // ==========================================
    // G. ON-MAP GEOGRAPHIC LABELS
    // ==========================================
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
    activeLayers,
    baseMapMode,
    roadRiskFilter,
    selectedRoad,
    selectedRouteId,
    showRoutes,
    selectedHotspotId,
    mapLayers,
  ]);

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

      {/* 1b. FLOATING IN-MAP LAYER CONTROL (TOP-LEFT) */}
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
          <div className="bg-[#0b1322]/95 backdrop-blur-md border border-[#1e2f49] rounded-xl p-2.5 shadow-2xl flex flex-col gap-1.5 w-44 text-xs select-none">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-1 text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>MAP LAYERS</span>
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
                  Road Risk
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={mapLayers.drainageNetwork}
                  onChange={(e) => setMapLayers((prev) => ({ ...prev, drainageNetwork: e.target.checked }))}
                  className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer accent-cyan-500"
                />
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  Drainage Network
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
                  Hotspots
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={mapLayers.routes}
                  onChange={(e) => setMapLayers((prev) => ({ ...prev, routes: e.target.checked }))}
                  className="rounded border-slate-700 bg-slate-900 text-teal-500 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer accent-teal-500"
                />
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                  Routes
                </span>
              </label>
            </div>
          </div>
        )}
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

      {/* 3. FLOATING INSPECTORS (COMPACT ROAD & HOTSPOT CARDS) */}
      {selectedRoad ? (
        <div className={`absolute ${isLayersCollapsed ? 'top-16 sm:top-20' : 'top-48 sm:top-52'} left-2 sm:left-4 z-[1000] pointer-events-auto max-w-[calc(100%-1rem)] sm:max-w-[280px] animate-fadeIn transition-all`}>
          <div className="bg-[#0b1322]/95 backdrop-blur-md border border-cyan-500/50 rounded-xl p-3 shadow-2xl text-xs space-y-2 relative">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 border-b border-slate-700/60 pb-1.5">
              <div>
                <div className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  ROAD INSPECTOR
                </div>
                <div className="font-bold text-white text-xs sm:text-[13px] leading-tight mt-0.5">
                  {selectedRoad.name}
                </div>
              </div>
              <button
                onClick={() => setSelectedRoad(null)}
                className="text-slate-400 hover:text-white p-0.5 text-xs"
                title="Close road inspector"
              >
                ✕
              </button>
            </div>

            {/* Metrics Breakdown */}
            <div className="space-y-1 text-[11px] font-mono text-slate-300">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">ROAD:</span>
                <span className="text-white font-medium truncate max-w-[170px]">{selectedRoad.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Risk:</span>
                <strong className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${
                  selectedRoad.timesteps[activeTimeStep].riskState === 'BLOCKED'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : selectedRoad.timesteps[activeTimeStep].riskState === 'HIGH RISK'
                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                    : selectedRoad.timesteps[activeTimeStep].riskState === 'MODERATE'
                    ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {selectedRoad.timesteps[activeTimeStep].riskState}
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Flood depth:</span>
                <strong className="text-cyan-300">{selectedRoad.timesteps[activeTimeStep].waterDepthM.toFixed(2)} m</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Drainage stress:</span>
                <strong className="text-white">{selectedRoad.timesteps[activeTimeStep].drainageStressPct || 100}%</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Scenario:</span>
                <span className="text-amber-300 font-bold">{activeTimeStep}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Road status:</span>
                <span className="font-bold text-slate-200">{selectedRoad.timesteps[activeTimeStep].riskState}</span>
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={() => {
                if (selectedRoad.path && selectedRoad.path.length > 0) {
                  const mid = selectedRoad.path[Math.floor(selectedRoad.path.length / 2)];
                  mapInstanceRef.current?.flyTo([mid[0], mid[1]], 15.5, { duration: 0.8 });
                }
              }}
              className="w-full py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-[11px] font-bold shadow transition-colors flex items-center justify-center gap-1.5"
            >
              <span>VIEW ON MAP</span>
            </button>
          </div>
        </div>
      ) : activeHotspot ? (
        <div className={`absolute ${isLayersCollapsed ? 'top-16 sm:top-20' : 'top-48 sm:top-52'} left-2 sm:left-4 z-[1000] pointer-events-auto max-w-[calc(100%-1rem)] sm:max-w-[280px] animate-fadeIn transition-all`}>
          <div className="bg-[#0b1322]/95 backdrop-blur-md border border-amber-500/50 rounded-xl p-3 shadow-2xl text-xs space-y-2 relative">
            <div className="flex items-start justify-between gap-2 border-b border-slate-700/60 pb-1.5">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[9px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                    HOTSPOT INSPECTOR
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

            <div className="space-y-1 text-[11px] font-mono text-slate-300">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Severity:</span>
                <span className="font-bold text-amber-400 uppercase">{activeHotspot.timesteps[activeTimeStep].risk}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Simulated Depth:</span>
                <strong className="text-cyan-300">{activeHotspot.timesteps[activeTimeStep].depthM.toFixed(2)} m</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Affected Area:</span>
                <strong className="text-white">{activeHotspot.timesteps[activeTimeStep].affectedAreaHa} ha</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Scenario:</span>
                <span className="text-cyan-400 font-bold">{activeTimeStep}</span>
              </div>
              <div className="text-[10px] text-slate-300 pt-1 border-t border-slate-800">
                <span className="text-slate-400">Bottleneck: </span>
                {activeHotspot.timesteps[activeTimeStep].primaryBottleneck}
              </div>
            </div>

            <button
              onClick={() => {
                mapInstanceRef.current?.flyTo([activeHotspot.center[0], activeHotspot.center[1]], 15.5, { duration: 0.8 });
              }}
              className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-[11px] font-bold shadow transition-colors flex items-center justify-center gap-1.5"
            >
              <span>VIEW ON MAP</span>
            </button>
          </div>
        </div>
      ) : !isKhanaparaCardDismissed ? (
        <div className={`absolute ${isLayersCollapsed ? 'top-16 sm:top-20' : 'top-48 sm:top-52'} left-2 sm:left-4 z-[1000] pointer-events-auto max-w-[calc(100%-1rem)] sm:max-w-[270px] animate-fadeIn transition-all`}>
          <div className="bg-[#0b1322]/95 backdrop-blur-md border border-rose-500/50 rounded-xl p-2.5 sm:p-3 shadow-2xl text-xs space-y-1.5 sm:space-y-2 relative">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
                <AlertTriangle className="w-3.5 h-3.5 fill-rose-500/30" />
              </div>
              <div>
                <div className="font-bold text-white text-xs sm:text-[13px] leading-tight">
                  Khanapara Crossing
                </div>
                <div className="text-[9px] sm:text-[10px] font-semibold text-rose-400 uppercase tracking-wider">
                  {ROAD_SEGMENTS[0].timesteps[activeTimeStep].riskState}
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

            <div className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-[11px] text-slate-300 pt-1 border-t border-slate-800 font-mono">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Estimated Depth:</span>
                <strong className="text-white">{ROAD_SEGMENTS[0].timesteps[activeTimeStep].waterDepthM.toFixed(2)} m</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Time to Critical:</span>
                <strong className="text-rose-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {ROAD_SEGMENTS[0].timesteps[activeTimeStep].timeToCritical}
                </strong>
              </div>
            </div>

            <button
              onClick={() => {
                focusRoad(ROAD_SEGMENTS[0]);
              }}
              className="w-full py-1 rounded bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/40 text-[10px] text-rose-200 font-mono font-bold flex items-center justify-center gap-1"
            >
              <span>INSPECT ROAD</span>
            </button>
          </div>
        </div>
      ) : null}

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
