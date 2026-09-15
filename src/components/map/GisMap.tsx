import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useSimulation } from '../../context/SimulationContext';
import { DRAINAGE_NODES } from '../../data/drainageNodes';
import { DRAINAGE_EDGES } from '../../data/drainageEdges';
import { FLOOD_ZONES } from '../../data/floodZones';
import { NATURAL_WATERWAYS } from '../../data/naturalDrainage';
import { TERRAIN_HILLS, FLOW_ACCUMULATION_VECTORS } from '../../data/terrainData';
import { ROAD_SEGMENTS } from '../../data/roads';
import { ROUTE_SCENARIOS } from '../../data/routes';
import { FallbackSvgMap } from './FallbackSvgMap';
import {
  Map as MapIcon,
  Crosshair,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  Info
} from 'lucide-react';

interface GisMapProps {
  showRoutes?: boolean;
}

export const GisMap: React.FC<GisMapProps> = ({ showRoutes = false }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const overlayGroupRef = useRef<L.LayerGroup | null>(null);

  const [hasInitError, setHasInitError] = useState<boolean>(false);

  const {
    activeTimeStep,
    activeLayers,
    baseMapMode,
    selectedNode,
    setSelectedNode,
    selectedEdge,
    setSelectedEdge,
    selectedRouteId,
  } = useSimulation();

  const activeRoute = ROUTE_SCENARIOS.find((r) => r.id === selectedRouteId) || ROUTE_SCENARIOS[0];

  // Hotspot locations in Guwahati
  const hotspots: { name: string; lat: number; lng: number; zoom?: number }[] = [
    { name: 'Anil Nagar', lat: 26.1770, lng: 91.7710, zoom: 15 },
    { name: 'Bhangagarh', lat: 26.1585, lng: 91.7685, zoom: 15 },
    { name: 'Zoo Road', lat: 26.1645, lng: 91.7820, zoom: 14 },
    { name: 'Bharalumukh', lat: 26.1758, lng: 91.7285, zoom: 14 },
    { name: 'Silsako Beel', lat: 26.1530, lng: 91.8150, zoom: 14 },
    { name: 'Deepor Beel', lat: 26.1280, lng: 91.6780, zoom: 13 },
    { name: 'Dispur', lat: 26.1420, lng: 91.7920, zoom: 14 },
    { name: 'Khanapara', lat: 26.1180, lng: 91.8220, zoom: 14 },
    { name: 'Jalukbari', lat: 26.1510, lng: 91.6885, zoom: 14 },
  ];

  // Color helpers matching the required palette
  const getFloodColors = (depthM: number): { fill: string; stroke: string; opacity: number } => {
    if (depthM > 0.60) {
      // Critical: red/magenta
      return { fill: '#ef4444', stroke: '#dc2626', opacity: 0.65 };
    }
    if (depthM > 0.30) {
      // High: orange
      return { fill: '#f97316', stroke: '#ea580c', opacity: 0.55 };
    }
    if (depthM > 0.15) {
      // Moderate: yellow
      return { fill: '#eab308', stroke: '#ca8a04', opacity: 0.45 };
    }
    // Low: blue/cyan
    return { fill: '#06b6d4', stroke: '#0891b2', opacity: 0.40 };
  };

  const getEdgeColor = (status: string): string => {
    switch (status) {
      case 'critical': return '#ef4444';
      case 'overloaded': return '#f97316';
      case 'warning': return '#f59e0b';
      default: return '#06b6d4';
    }
  };

  const getNodeColor = (status: string): string => {
    switch (status) {
      case 'critical': return '#dc2626';
      case 'surcharged': return '#ef4444';
      case 'warning': return '#f59e0b';
      default: return '#10b981';
    }
  };

  // 1. Initialize Leaflet map instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [26.1540, 91.7650], // Centered on Guwahati pilot corridor
          zoom: 13,
          minZoom: 11,
          maxZoom: 18,
          zoomControl: false, // Custom zoom buttons
        });

        const overlayGroup = L.layerGroup().addTo(map);
        overlayGroupRef.current = overlayGroup;
        mapInstanceRef.current = map;
      }
    } catch (err) {
      console.warn('Leaflet initialization warning:', err);
      setHasInitError(true);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Update basemap tile layer based on baseMapMode ('dark' vs 'satellite')
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
      tileLayerRef.current = null;
    }

    let url = '';
    let attribution = '';

    if (baseMapMode === 'satellite') {
      // High-resolution Esri World Imagery showing actual terrain, river, hills and neighborhoods
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = '&copy; Esri &mdash; Guwahati Satellite Basemap';
    } else {
      // Real OpenStreetMap/CartoDB Dark Matter vector basemap
      url = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
    }

    const tileLayer = L.tileLayer(url, {
      attribution,
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    tileLayerRef.current = tileLayer;
  }, [baseMapMode]);

  // 3. Render Simulated Overlays on top of the real basemap
  useEffect(() => {
    const map = mapInstanceRef.current;
    const overlayGroup = overlayGroupRef.current;
    if (!map || !overlayGroup) return;

    overlayGroup.clearLayers();

    // A. NATURAL DRAINAGE & WETLANDS (Brahmaputra, Bharalu, Mora Bharalu, Deepor Beel, Silsako Beel)
    if (activeLayers.naturalDrainage) {
      NATURAL_WATERWAYS.forEach((nw) => {
        if (nw.polygon) {
          const latLngs: [number, number][] = nw.polygon.map((c) => [c[0], c[1]]);
          const poly = L.polygon(latLngs, {
            color: '#38bdf8',
            weight: 1.5,
            dashArray: '4, 2',
            fillColor: '#0284c7',
            fillOpacity: 0.28,
          });
          poly.bindTooltip(
            `<div class="font-mono text-xs"><strong>${nw.name}</strong><br/><span class="text-slate-400 text-[10px]">${nw.capacityRole}</span></div>`,
            { sticky: true, className: 'leaflet-dark-tooltip' }
          );
          overlayGroup.addLayer(poly);
        } else if (nw.path) {
          const latLngs: [number, number][] = nw.path.map((c) => [c[0], c[1]]);
          const line = L.polyline(latLngs, {
            color: '#38bdf8',
            weight: 3.5,
            opacity: 0.85,
          });
          line.bindTooltip(
            `<div class="font-mono text-xs"><strong>${nw.name}</strong><br/><span class="text-slate-400 text-[10px]">${nw.notes}</span></div>`,
            { sticky: true, className: 'leaflet-dark-tooltip' }
          );
          overlayGroup.addLayer(line);
        }
      });
    }

    // B. SIMULATED FLOOD DEPTH POLYGONS (Geographically aligned over low-lying Guwahati basins)
    if (activeLayers.floodDepth) {
      FLOOD_ZONES.forEach((zone) => {
        const zState = zone.timesteps[activeTimeStep];
        const colors = getFloodColors(zState.depthM);
        const latLngs: [number, number][] = zone.polygon.map((c) => [c[0], c[1]]);

        const floodPoly = L.polygon(latLngs, {
          color: colors.stroke,
          weight: zState.depthM > 0.6 ? 2.5 : 1.5,
          fillColor: colors.fill,
          fillOpacity: colors.opacity,
          dashArray: zState.depthM > 0.6 ? '5, 3' : undefined,
        });

        floodPoly.bindTooltip(
          `<div class="font-mono text-xs text-slate-100 p-1">
            <div class="font-bold text-cyan-300">${zone.name}</div>
            <div class="text-[10px] text-slate-300">Simulated Depth: <strong class="text-white">${zState.depthM.toFixed(2)} m</strong></div>
            <div class="text-[10px] uppercase font-bold" style="color:${colors.stroke}">Risk: ${zState.risk.toUpperCase()}</div>
            <div class="text-[9px] text-slate-400 mt-0.5">Bottleneck: ${zState.primaryBottleneck}</div>
            <div class="text-[8px] text-amber-300 mt-1 uppercase">● Simulated Flood Scenario</div>
          </div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );

        overlayGroup.addLayer(floodPoly);
      });
    }

    // C. REAL ROAD NETWORK RISK OVERLAY
    if (activeLayers.roadRisk) {
      ROAD_SEGMENTS.forEach((road) => {
        const rState = road.timesteps[activeTimeStep];
        const isImpassable = rState.status === 'impassable';
        const isCaution = rState.status === 'caution';

        const color = isImpassable ? '#ef4444' : isCaution ? '#f59e0b' : '#334155';
        const latLngs: [number, number][] = road.path.map((c) => [c[0], c[1]]);

        const roadLine = L.polyline(latLngs, {
          color,
          weight: isImpassable ? 5 : isCaution ? 4 : 2.5,
          opacity: 0.9,
          dashArray: isImpassable ? '8, 6' : undefined,
        });

        roadLine.bindTooltip(
          `<div class="font-mono text-xs">
            <strong class="text-white">${road.name}</strong><br/>
            <span>Status: <strong class="${isImpassable ? 'text-red-400' : isCaution ? 'text-amber-400' : 'text-emerald-400'}">${rState.status.toUpperCase()}</strong></span><br/>
            <span>Water Depth: ${rState.waterDepthM} m</span>
          </div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );

        overlayGroup.addLayer(roadLine);
      });
    }

    // D. DRAINAGE CONDUITS / EDGES (Spatially connecting actual pilot nodes)
    if (activeLayers.drainageNetwork) {
      DRAINAGE_EDGES.forEach((edge) => {
        const fromNode = DRAINAGE_NODES.find((n) => n.id === edge.fromNode);
        const toNode = DRAINAGE_NODES.find((n) => n.id === edge.toNode);
        if (!fromNode || !toNode) return;

        const eState = edge.timesteps[activeTimeStep];
        const color = getEdgeColor(eState.status);
        const isOverloaded = eState.flowM3s > edge.designCapacityM3s;
        const isSelected = selectedEdge?.id === edge.id;

        const edgeLine = L.polyline(
          [
            [fromNode.lat, fromNode.lng],
            [toNode.lat, toNode.lng],
          ],
          {
            color: isSelected ? '#ffffff' : color,
            weight: isSelected ? 5 : isOverloaded ? 4 : 2.5,
            opacity: 0.95,
            dashArray: isOverloaded ? '6, 4' : undefined,
          }
        );

        edgeLine.on('click', () => {
          setSelectedEdge(edge);
        });

        edgeLine.bindTooltip(
          `<div class="font-mono text-xs text-slate-100 p-1">
            <div class="font-bold text-cyan-300">Conduit ${edge.id}: ${edge.name}</div>
            <div class="text-[10px]">Flow: <strong>${eState.flowM3s.toFixed(1)} m³/s</strong> | Cap: <strong>${edge.designCapacityM3s.toFixed(1)} m³/s</strong></div>
            <div class="text-[10px] font-bold ${isOverloaded ? 'text-red-400' : 'text-emerald-400'}">Utilization: ${eState.utilizationPct}% (${eState.status.toUpperCase()})</div>
            <div class="text-[9px] text-slate-400">Direction: ${edge.fromNode} → ${edge.toNode}</div>
            <div class="text-[8px] text-amber-300 mt-1 uppercase">● Click to Inspect Conduit</div>
          </div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );

        overlayGroup.addLayer(edgeLine);
      });
    }

    // E. DRAINAGE NODES (Inlets, Manholes, Surcharged Junctions, Outfalls)
    if (activeLayers.drainageNodes) {
      DRAINAGE_NODES.forEach((node) => {
        const nState = node.timesteps[activeTimeStep];
        const color = getNodeColor(nState.status);
        const isSurcharged = nState.status === 'surcharged' || nState.status === 'critical';
        const isSelected = selectedNode?.id === node.id;
        const isOutfall = node.type === 'outfall';

        if (isOutfall) {
          // Outfall Diamond Icon
          const outfallIcon = L.divIcon({
            className: 'custom-outfall-marker',
            html: `<div style="color: #38bdf8; font-size: 14px; font-weight: bold; transform: translate(-4px, -8px); text-shadow: 0 0 4px #000;">◆</div>`,
            iconSize: [14, 14],
          });
          const marker = L.marker([node.lat, node.lng], { icon: outfallIcon });
          marker.on('click', () => setSelectedNode(node));
          marker.bindTooltip(
            `<div class="font-mono text-xs"><strong>${node.id}: ${node.name}</strong><br/><span class="text-cyan-400 uppercase">Simulated Outfall</span></div>`,
            { sticky: true, className: 'leaflet-dark-tooltip' }
          );
          overlayGroup.addLayer(marker);
        } else {
          // Circle marker for manholes, junctions, inlets
          const marker = L.circleMarker([node.lat, node.lng], {
            radius: node.type === 'junction' ? 6 : isSelected ? 7 : 4.5,
            color: isSelected ? '#ffffff' : '#0b101c',
            weight: isSelected ? 2.5 : 1.5,
            fillColor: color,
            fillOpacity: 0.95,
          });

          marker.on('click', () => {
            setSelectedNode(node);
          });

          marker.bindTooltip(
            `<div class="font-mono text-xs text-slate-100 p-1">
              <div class="font-bold text-emerald-400">${node.id}: ${node.name}</div>
              <div class="text-[10px] capitalize text-slate-300">Type: ${node.type} | Elev: ${node.elevationM}m MSL</div>
              <div class="text-[10px]">Inflow: <strong>${nState.incomingFlowM3s.toFixed(1)} m³/s</strong> | Cap: <strong>${nState.capacityM3s.toFixed(1)} m³/s</strong></div>
              <div class="text-[10px] font-bold ${isSurcharged ? 'text-red-400' : 'text-emerald-400'}">Status: ${nState.status.toUpperCase()} (${nState.utilizationPct}%)</div>
              ${nState.surchargeDepthM > 0 ? `<div class="text-[9px] text-red-300">Head Rise: +${nState.surchargeDepthM.toFixed(2)}m</div>` : ''}
              <div class="text-[8px] text-amber-300 mt-1 uppercase">● Click to Inspect Node</div>
            </div>`,
            { sticky: true, className: 'leaflet-dark-tooltip' }
          );

          overlayGroup.addLayer(marker);
        }
      });
    }

    // F. TERRAIN ELEVATION & RUNOFF FLOW VECTORS
    if (activeLayers.terrain) {
      TERRAIN_HILLS.forEach((hill) => {
        const hillMarker = L.circleMarker([hill.center[0], hill.center[1]], {
          radius: 18,
          color: '#cbd5e1',
          weight: 1.5,
          dashArray: '3, 3',
          fillColor: '#64748b',
          fillOpacity: 0.25,
        });
        hillMarker.bindTooltip(
          `<div class="font-mono text-xs"><strong>▲ ${hill.name}</strong><br/>Elevation: ${hill.elevationM}m MSL<br/><span class="text-amber-300 text-[10px]">${hill.runoffVector}</span></div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );
        overlayGroup.addLayer(hillMarker);
      });

      FLOW_ACCUMULATION_VECTORS.forEach((vec) => {
        const arrow = L.polyline(
          [
            [vec.from[0], vec.from[1]],
            [vec.to[0], vec.to[1]],
          ],
          {
            color: '#f59e0b',
            weight: 2,
            dashArray: '4, 4',
            opacity: 0.85,
          }
        );
        arrow.bindTooltip(
          `<div class="font-mono text-xs text-amber-300">${vec.flowRateDescription}</div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );
        overlayGroup.addLayer(arrow);
      });
    }

    // G. LOWER-EXPOSURE ROUTING DEMO OVERLAY (IF ACTIVE)
    if (showRoutes && activeRoute) {
      // Normal direct route (high flood exposure)
      const normalLatLngs: [number, number][] = activeRoute.normalRoute.path.map((c) => [c[0], c[1]]);
      const normalLine = L.polyline(normalLatLngs, {
        color: '#ef4444',
        weight: 4.5,
        dashArray: '8, 6',
        opacity: 0.9,
      });
      normalLine.bindTooltip(
        `<div class="font-mono text-xs text-red-300 font-bold">NORMAL DIRECT ROUTE (HIGH FLOOD EXPOSURE)<br/>Max Depth: ${activeRoute.normalRoute.maxDepthM}m</div>`,
        { sticky: true, className: 'leaflet-dark-tooltip' }
      );
      overlayGroup.addLayer(normalLine);

      // Flood-safe alternative route (lower simulated flood exposure)
      const safeLatLngs: [number, number][] = activeRoute.safeRoute.path.map((c) => [c[0], c[1]]);
      const safeLine = L.polyline(safeLatLngs, {
        color: '#10b981',
        weight: 5,
        opacity: 0.95,
      });
      safeLine.bindTooltip(
        `<div class="font-mono text-xs text-emerald-300 font-bold">FLOOD-SAFE ROUTE (LOWER SIMULATED FLOOD EXPOSURE)<br/>Max Depth: ${activeRoute.safeRoute.maxDepthM}m</div>`,
        { sticky: true, className: 'leaflet-dark-tooltip' }
      );
      overlayGroup.addLayer(safeLine);

      // Start / Destination Markers
      const startMarker = L.circleMarker([activeRoute.originCoords[0], activeRoute.originCoords[1]], {
        radius: 7,
        color: '#ffffff',
        fillColor: '#06b6d4',
        fillOpacity: 1,
        weight: 2,
      });
      startMarker.bindTooltip(`<div class="font-mono text-xs font-bold text-cyan-300">START: ${activeRoute.origin}</div>`, {
        permanent: true,
        direction: 'top',
        className: 'leaflet-dark-tooltip',
      });
      overlayGroup.addLayer(startMarker);

      const destMarker = L.circleMarker([activeRoute.destCoords[0], activeRoute.destCoords[1]], {
        radius: 7,
        color: '#ffffff',
        fillColor: '#10b981',
        fillOpacity: 1,
        weight: 2,
      });
      destMarker.bindTooltip(`<div class="font-mono text-xs font-bold text-emerald-300">DEST: ${activeRoute.destination}</div>`, {
        permanent: true,
        direction: 'top',
        className: 'leaflet-dark-tooltip',
      });
      overlayGroup.addLayer(destMarker);
    }
  }, [
    activeTimeStep,
    activeLayers,
    showRoutes,
    selectedRouteId,
    selectedNode,
    selectedEdge,
  ]);

  // Map controls
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleReset = () => {
    mapInstanceRef.current?.flyTo([26.1540, 91.7650], 13, { duration: 0.8 });
  };
  const handleFlyTo = (lat: number, lng: number, zoom: number = 14) => {
    mapInstanceRef.current?.flyTo([lat, lng], zoom, { duration: 1 });
  };

  // If Leaflet fails to initialize, fallback to vector SVG
  if (hasInitError) {
    return <FallbackSvgMap showRoutes={showRoutes} />;
  }

  return (
    <div className="relative w-full h-full min-h-[500px] flex flex-col bg-[#080d16] border border-[#1e293b] rounded-lg overflow-hidden select-none">
      {/* Top Floating GIS Status Bar */}
      <div className="absolute top-2.5 left-2.5 z-[1000] flex flex-wrap items-center gap-2 pointer-events-auto">
        {/* Scenario Pill */}
        <div className="bg-[#0b101c]/90 backdrop-blur-md px-2.5 py-1 rounded border border-[#223554] text-xs font-mono flex items-center gap-2 text-slate-200 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="font-bold uppercase tracking-wider text-white">Guwahati Pilot GIS</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-300 font-bold">{activeTimeStep}</span>
          <span className="text-slate-500 text-[10px] hidden md:inline">● SIMULATED FLOOD SCENARIO</span>
        </div>

        {/* Hotspots Quick Jumper */}
        <div className="hidden sm:flex items-center gap-1 bg-[#0b101c]/90 backdrop-blur-md p-1 rounded border border-[#223554] text-[10px] font-mono shadow-xl">
          <span className="text-slate-400 px-1 font-bold">HOTSPOTS:</span>
          {hotspots.slice(0, 5).map((spot) => (
            <button
              key={spot.name}
              onClick={() => handleFlyTo(spot.lat, spot.lng, spot.zoom)}
              className="px-1.5 py-0.5 rounded bg-[#152033] hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 transition-colors border border-slate-700/60"
            >
              {spot.name}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Map Navigation Controls */}
      <div className="absolute top-2.5 right-2.5 z-[1000] flex flex-col gap-1 bg-[#0b101c]/90 backdrop-blur-md p-1 rounded border border-[#223554] shadow-xl">
        <button
          onClick={handleZoomIn}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition-colors"
          title="Reset to Guwahati Extent"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Floating Geographic Notice Badges */}
      <div className="absolute bottom-2.5 left-2.5 z-[1000] flex flex-wrap items-center gap-2 pointer-events-none text-[10px] font-mono">
        <div className="bg-[#0b101c]/90 backdrop-blur-md px-2 py-1 rounded border border-amber-500/40 text-amber-300 flex items-center gap-1.5 shadow-lg">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>SIMULATED FLOOD SCENARIO — PILOT DATA</span>
        </div>
        <div className="bg-[#0b101c]/90 backdrop-blur-md px-2 py-1 rounded border border-cyan-800 text-cyan-300 shadow-lg hidden md:flex items-center gap-1">
          <span>REAL BASEMAP: GUWAHATI, ASSAM</span>
        </div>
      </div>

      {/* Actual Geographic Leaflet Basemap Container */}
      <div
        ref={mapContainerRef}
        className="w-full h-full flex-1 z-10 min-h-[500px]"
        style={{ background: '#090e18' }}
      />
    </div>
  );
};
