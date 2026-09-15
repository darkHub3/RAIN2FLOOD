import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useSimulation } from '../../context/SimulationContext';
import { DRAINAGE_NODES } from '../../data/drainageNodes';
import { DRAINAGE_EDGES } from '../../data/drainageEdges';
import { FLOOD_ZONES } from '../../data/floodZones';
import { NATURAL_WATERWAYS } from '../../data/naturalDrainage';
import { ROAD_SEGMENTS } from '../../data/roads';
import { ROUTE_SCENARIOS } from '../../data/routes';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface GisMapProps {
  showRoutes?: boolean;
}

export const GisMap: React.FC<GisMapProps> = ({ showRoutes = false }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const overlayGroupRef = useRef<L.LayerGroup | null>(null);

  const {
    activeTimeStep,
    activeLayers,
    baseMapMode,
    selectedNode,
    setSelectedNode,
    selectedEdge,
    setSelectedEdge,
    selectedRoad,
    setSelectedRoad,
    selectedRouteId,
  } = useSimulation();

  const activeRoute = ROUTE_SCENARIOS.find((r) => r.id === selectedRouteId) || ROUTE_SCENARIOS[0];

  // Hotspot locations in Guwahati
  const hotspots: { name: string; lat: number; lng: number; zoom?: number }[] = [
    { name: 'Anil Nagar / Nabin Nagar', lat: 26.1755, lng: 91.7725, zoom: 15 },
    { name: 'Bhangagarh', lat: 26.1575, lng: 91.7710, zoom: 15 },
    { name: 'Zoo Road', lat: 26.1650, lng: 91.7830, zoom: 15 },
    { name: 'Bharalumukh', lat: 26.1735, lng: 91.7265, zoom: 14 },
    { name: 'Silsako Beel', lat: 26.1530, lng: 91.8150, zoom: 14 },
    { name: 'Deepor Beel', lat: 26.1280, lng: 91.6780, zoom: 13 },
    { name: 'Dispur', lat: 26.1420, lng: 91.7920, zoom: 14 },
    { name: 'Khanapara', lat: 26.1180, lng: 91.8220, zoom: 14 },
    { name: 'Jalukbari', lat: 26.1510, lng: 91.6885, zoom: 14 },
  ];

  // Depth-based color ramp matching the exact user specifications
  const getFloodColors = (depthM: number) => {
    if (depthM > 0.60) {
      // Critical depth: Red / Magenta
      return { fill: '#ef4444', stroke: '#dc2626', opacity: 0.65, label: 'Critical (>0.60m)' };
    }
    if (depthM > 0.30) {
      // High depth: Orange
      return { fill: '#f97316', stroke: '#ea580c', opacity: 0.55, label: 'High (0.30–0.60m)' };
    }
    if (depthM > 0.15) {
      // Moderate depth: Yellow
      return { fill: '#eab308', stroke: '#ca8a04', opacity: 0.45, label: 'Moderate (0.15–0.30m)' };
    }
    // Low depth: Light Blue / Cyan
    return { fill: '#06b6d4', stroke: '#0891b2', opacity: 0.38, label: 'Low (<0.15m)' };
  };

  const getEdgeColor = (status: string): string => {
    switch (status) {
      case 'critical': return '#ef4444';
      case 'overloaded': return '#f97316';
      case 'warning': return '#eab308';
      default: return '#06b6d4';
    }
  };

  const getNodeColor = (status: string): string => {
    switch (status) {
      case 'critical': return '#dc2626';
      case 'surcharged': return '#ef4444';
      case 'warning': return '#eab308';
      default: return '#10b981';
    }
  };

  // 1. Initialize Leaflet map instance (React 18 StrictMode resistant)
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if ((mapContainerRef.current as any)._leaflet_id) {
      (mapContainerRef.current as any)._leaflet_id = null;
    }

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [26.1540, 91.7650], // Centered on Guwahati pilot corridor
        zoom: 13,
        minZoom: 10,
        maxZoom: 18,
        zoomControl: false,
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

  // 2. Basemap tile switcher: CartoDB Dark Matter | OSM | Esri World Imagery
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
      // High-resolution Esri World Imagery showing actual Guwahati terrain, Brahmaputra river, hills
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = 'Tiles &copy; Esri &mdash; Guwahati Satellite Basemap';
    } else if (baseMapMode === 'osm') {
      // Real OpenStreetMap standard tiles
      url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
      attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    } else {
      // CartoDB Dark Matter (Professional dark GIS theme)
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

  // 3. Render all 7 Overlays on top of the real Guwahati basemap
  useEffect(() => {
    const map = mapInstanceRef.current;
    const overlayGroup = overlayGroupRef.current;
    if (!map || !overlayGroup) return;

    overlayGroup.clearLayers();

    // A. WATER BODIES (Brahmaputra, Bharalu, Mora Bharalu, Silsako Beel, Deepor Beel, Basistha)
    if (activeLayers.waterBodies) {
      NATURAL_WATERWAYS.forEach((nw) => {
        if (nw.polygon) {
          const latLngs: [number, number][] = nw.polygon.map((c) => [c[0], c[1]]);
          const poly = L.polygon(latLngs, {
            color: '#38bdf8',
            weight: 1.5,
            fillColor: '#0284c7',
            fillOpacity: 0.35,
          });
          poly.bindTooltip(
            `<div class="font-mono text-xs"><strong class="text-sky-300">${nw.name}</strong><br/><span class="text-slate-400 text-[10px]">${nw.capacityRole}</span></div>`,
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
            `<div class="font-mono text-xs"><strong class="text-sky-300">${nw.name}</strong><br/><span class="text-slate-400 text-[10px]">${nw.notes}</span></div>`,
            { sticky: true, className: 'leaflet-dark-tooltip' }
          );
          overlayGroup.addLayer(line);
        }
      });
    }

    // B. BASE ROADS (When 'roads' layer is active, ensures roads are clearly visible)
    if (activeLayers.roads) {
      ROAD_SEGMENTS.forEach((road) => {
        const latLngs: [number, number][] = road.path.map((c) => [c[0], c[1]]);
        const baseRoadLine = L.polyline(latLngs, {
          color: '#475569',
          weight: 2.5,
          opacity: 0.65,
        });
        baseRoadLine.bindTooltip(
          `<div class="font-mono text-xs font-bold text-slate-200">${road.name}</div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );
        overlayGroup.addLayer(baseRoadLine);
      });
    }

    // C. SIMULATED FLOOD DEPTH & FLOOD RISK OVERLAY
    if (activeLayers.floodDepth || activeLayers.floodRisk) {
      FLOOD_ZONES.forEach((zone) => {
        const zState = zone.timesteps[activeTimeStep];
        const colors = getFloodColors(zState.depthM);
        const latLngs: [number, number][] = zone.polygon.map((c) => [c[0], c[1]]);

        const isRiskHighlighted = activeLayers.floodRisk && (zState.risk === 'high' || zState.risk === 'critical');

        const floodPoly = L.polygon(latLngs, {
          color: isRiskHighlighted ? '#ef4444' : colors.stroke,
          weight: isRiskHighlighted ? 2.5 : 1.5,
          fillColor: colors.fill,
          fillOpacity: colors.opacity,
          dashArray: isRiskHighlighted ? '6, 3' : undefined,
        });

        // Hover tooltip
        floodPoly.bindTooltip(
          `<div class="font-mono text-xs text-slate-100 p-1">
            <div class="font-bold text-cyan-300">${zone.name}</div>
            <div class="text-[10px] text-slate-300 mt-0.5">Simulated Depth: <strong class="text-white">${zState.depthM.toFixed(2)} m</strong></div>
            <div class="text-[10px] uppercase font-bold" style="color:${colors.stroke}">Risk: ${zState.risk.toUpperCase()}</div>
            <div class="text-[9px] text-slate-400 mt-0.5">Bottleneck: ${zState.primaryBottleneck}</div>
          </div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );

        // Click popup
        floodPoly.bindPopup(
          `<div class="font-mono text-xs text-slate-100 p-1 min-w-[220px]">
            <div class="flex items-center justify-between border-b border-slate-700 pb-1 mb-1.5">
              <span class="font-bold text-cyan-300 text-[12px]">${zone.name}</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase" style="background:${colors.fill}33; color:${colors.stroke}; border:1px solid ${colors.stroke}88;">
                ${zState.risk}
              </span>
            </div>
            <div class="space-y-1 text-[11px]">
              <div class="flex justify-between text-slate-300">
                <span>Simulated Depth:</span>
                <strong class="text-white">${zState.depthM.toFixed(2)} m</strong>
              </div>
              <div class="flex justify-between text-slate-300">
                <span>Affected Area:</span>
                <strong class="text-slate-200">${zState.affectedAreaHa} ha</strong>
              </div>
              <div class="flex justify-between text-slate-300">
                <span>Primary Bottleneck:</span>
                <strong class="text-amber-300 text-[10px] text-right ml-2">${zState.primaryBottleneck}</strong>
              </div>
            </div>
            <div class="mt-2 text-[8px] text-amber-300 uppercase border-t border-slate-800 pt-1">
              ● Simulated Flood Zone Scenario (${activeTimeStep})
            </div>
          </div>`
        );

        overlayGroup.addLayer(floodPoly);
      });
    }

    // D. ROAD EXPOSURE OVERLAY (Watch=Yellow, Flood Risk=Orange, High Exposure=Red)
    if (activeLayers.roadExposure) {
      ROAD_SEGMENTS.forEach((road) => {
        const rState = road.timesteps[activeTimeStep];
        const isImpassable = rState.status === 'impassable';
        const isCaution = rState.status === 'caution';

        // Exposure mapping: Watch (Yellow), Flood Risk (Orange), High Exposure (Red)
        let exposureColor = '#64748b'; // Clear
        let exposureText = 'Clear';
        let weight = 3;
        let dashArray: string | undefined = undefined;

        if (rState.waterDepthM > 0.50 || isImpassable) {
          exposureColor = '#ef4444'; // Red (High Exposure)
          exposureText = 'High Exposure';
          weight = 5.5;
          dashArray = '8, 5';
        } else if (rState.waterDepthM >= 0.25) {
          exposureColor = '#f97316'; // Orange (Flood Risk)
          exposureText = 'Flood Risk';
          weight = 4.5;
        } else if (rState.waterDepthM >= 0.05 || isCaution) {
          exposureColor = '#eab308'; // Yellow (Watch)
          exposureText = 'Watch';
          weight = 4;
        }

        const isSelected = selectedRoad?.id === road.id;
        const latLngs: [number, number][] = road.path.map((c) => [c[0], c[1]]);

        const roadLine = L.polyline(latLngs, {
          color: isSelected ? '#ffffff' : exposureColor,
          weight: isSelected ? weight + 2 : weight,
          opacity: 0.95,
          dashArray,
        });

        roadLine.on('click', () => {
          setSelectedRoad(road);
        });

        // Hover Tooltip
        roadLine.bindTooltip(
          `<div class="font-mono text-xs">
            <strong class="text-white">${road.name}</strong><br/>
            <span>Exposure: <strong style="color:${exposureColor}">${exposureText.toUpperCase()}</strong></span><br/>
            <span>Water Depth: <strong class="text-white">${rState.waterDepthM.toFixed(2)} m</strong></span>
          </div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );

        // Click Popup (Simulated Road Flood Exposure)
        roadLine.bindPopup(
          `<div class="font-mono text-xs text-slate-100 p-1 min-w-[220px]">
            <div class="flex items-center justify-between border-b border-slate-700 pb-1 mb-1.5">
              <span class="font-bold text-white">${road.name}</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase" style="background:${exposureColor}25; color:${exposureColor}; border:1px solid ${exposureColor}88;">
                ${exposureText}
              </span>
            </div>
            <div class="space-y-1 text-[11px]">
              <div class="flex justify-between text-slate-300">
                <span>Simulated Water Depth:</span>
                <strong class="text-white">${rState.waterDepthM.toFixed(2)} m</strong>
              </div>
              <div class="flex justify-between text-slate-300">
                <span>Exposure Status:</span>
                <strong style="color:${exposureColor}">${exposureText}</strong>
              </div>
              <div class="flex justify-between text-slate-300">
                <span>Passability:</span>
                <strong class="${isImpassable ? 'text-red-400' : isCaution ? 'text-amber-400' : 'text-emerald-400'}">${rState.status.toUpperCase()}</strong>
              </div>
            </div>
            <div class="mt-2 text-[8px] text-amber-300 uppercase border-t border-slate-800 pt-1">
              ● Simulated Road Flood Exposure (${activeTimeStep})
            </div>
          </div>`
        );

        overlayGroup.addLayer(roadLine);
      });
    }

    // E. DRAINAGE NETWORK (Conduits & Nodes with stress colors & click telemetry)
    if (activeLayers.drainageNetwork) {
      // Conduits / Edges
      DRAINAGE_EDGES.forEach((edge) => {
        const fromNode = DRAINAGE_NODES.find((n) => n.id === edge.fromNode);
        const toNode = DRAINAGE_NODES.find((n) => n.id === edge.toNode);
        if (!fromNode || !toNode) return;

        const eState = edge.timesteps[activeTimeStep];
        const color = getEdgeColor(eState.status);
        const isOverloaded = eState.flowM3s > edge.designCapacityM3s;
        const isStressActive = activeLayers.drainageStress && isOverloaded;
        const isSelected = selectedEdge?.id === edge.id;

        const edgeLine = L.polyline(
          [
            [fromNode.lat, fromNode.lng],
            [toNode.lat, toNode.lng],
          ],
          {
            color: isSelected ? '#ffffff' : color,
            weight: isSelected ? 5 : isStressActive ? 4.5 : isOverloaded ? 3.5 : 2.5,
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
            <div class="text-[10px] font-bold ${isOverloaded ? 'text-red-400' : 'text-cyan-400'}">Utilization: ${eState.utilizationPct}% (${eState.status.toUpperCase()})</div>
          </div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );

        edgeLine.bindPopup(
          `<div class="font-mono text-xs text-slate-100 p-1 min-w-[220px]">
            <div class="flex items-center justify-between border-b border-slate-700 pb-1 mb-1.5">
              <span class="font-bold text-cyan-300">Conduit ${edge.id}</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${isOverloaded ? 'bg-red-950 text-red-300 border border-red-500' : 'bg-cyan-950 text-cyan-300 border border-cyan-500'}">
                ${eState.status}
              </span>
            </div>
            <div class="space-y-1 text-[11px]">
              <div class="text-slate-300 text-[10px]">${edge.name}</div>
              <div class="flex justify-between text-slate-300">
                <span>Simulated Flow:</span>
                <strong class="text-cyan-300">${eState.flowM3s.toFixed(1)} m³/s</strong>
              </div>
              <div class="flex justify-between text-slate-300">
                <span>Design Capacity:</span>
                <strong class="text-slate-200">${edge.designCapacityM3s.toFixed(1)} m³/s</strong>
              </div>
              <div class="flex justify-between text-slate-300">
                <span>Stress / Utilization:</span>
                <strong class="${isOverloaded ? 'text-red-400 font-bold' : 'text-emerald-400'}">${eState.utilizationPct}%</strong>
              </div>
              <div class="flex justify-between text-slate-300">
                <span>Surcharge Condition:</span>
                <strong class="${isOverloaded ? 'text-red-400' : 'text-slate-400'}">${isOverloaded ? 'SURCHARGED' : 'GRAVITY FLOW'}</strong>
              </div>
            </div>
            <div class="mt-2 text-[8px] text-amber-300 uppercase border-t border-slate-800 pt-1">
              ● Simulated Drainage Telemetry
            </div>
          </div>`
        );

        overlayGroup.addLayer(edgeLine);
      });

      // Nodes (Inlets, Manholes, Surcharged Junctions, Outfalls)
      DRAINAGE_NODES.forEach((node) => {
        const nState = node.timesteps[activeTimeStep];
        const color = getNodeColor(nState.status);
        const isSurcharged = nState.status === 'surcharged' || nState.status === 'critical';
        const isSelected = selectedNode?.id === node.id;
        const isOutfall = node.type === 'outfall';

        if (isOutfall) {
          const outfallIcon = L.divIcon({
            className: 'custom-outfall-marker',
            html: `<div style="color: #38bdf8; font-size: 15px; font-weight: bold; transform: translate(-5px, -9px); text-shadow: 0 0 6px #000;">◆</div>`,
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
            </div>`,
            { sticky: true, className: 'leaflet-dark-tooltip' }
          );

          marker.bindPopup(
            `<div class="font-mono text-xs text-slate-100 p-1 min-w-[220px]">
              <div class="flex items-center justify-between border-b border-slate-700 pb-1 mb-1.5">
                <span class="font-bold text-emerald-400">${node.id}: ${node.name}</span>
                <span class="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${isSurcharged ? 'bg-red-950 text-red-300 border border-red-500' : 'bg-emerald-950 text-emerald-300 border border-emerald-500'}">
                  ${nState.status}
                </span>
              </div>
              <div class="space-y-1 text-[11px]">
                <div class="text-slate-300 text-[10px]">Type: ${node.type} | Elev: ${node.elevationM}m MSL</div>
                <div class="flex justify-between text-slate-300">
                  <span>Incoming Inflow:</span>
                  <strong class="text-cyan-300">${nState.incomingFlowM3s.toFixed(1)} m³/s</strong>
                </div>
                <div class="flex justify-between text-slate-300">
                  <span>Node Capacity:</span>
                  <strong class="text-slate-200">${nState.capacityM3s.toFixed(1)} m³/s</strong>
                </div>
                <div class="flex justify-between text-slate-300">
                  <span>Stress / Utilization:</span>
                  <strong class="${isSurcharged ? 'text-red-400 font-bold' : 'text-emerald-400'}">${nState.utilizationPct}%</strong>
                </div>
                ${nState.surchargeDepthM > 0 ? `
                  <div class="flex justify-between text-red-300">
                    <span>Surcharge Head Rise:</span>
                    <strong>+${nState.surchargeDepthM.toFixed(2)} m</strong>
                  </div>
                ` : ''}
              </div>
              <div class="mt-2 text-[8px] text-amber-300 uppercase border-t border-slate-800 pt-1">
                ● Simulated Drainage Node Telemetry
              </div>
            </div>`
          );

          overlayGroup.addLayer(marker);
        }
      });
    }

    // F. LOWER-EXPOSURE ROUTING OVERLAY (IF ROUTE VIEW IS ACTIVE)
    if (showRoutes && activeRoute) {
      // Normal direct route (High flood exposure)
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

      // Flood-safe alternative route (Lower simulated flood exposure)
      const safeLatLngs: [number, number][] = activeRoute.safeRoute.path.map((c) => [c[0], c[1]]);
      const safeLine = L.polyline(safeLatLngs, {
        color: '#10b981',
        weight: 5,
        opacity: 0.95,
      });
      safeLine.bindTooltip(
        `<div class="font-mono text-xs text-emerald-300 font-bold">LOWER SIMULATED FLOOD EXPOSURE ROUTE<br/>Max Depth: ${activeRoute.safeRoute.maxDepthM}m</div>`,
        { sticky: true, className: 'leaflet-dark-tooltip' }
      );
      overlayGroup.addLayer(safeLine);

      // Origin / Destination Markers
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
    selectedRoad,
  ]);

  // Map controls
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleReset = () => {
    mapInstanceRef.current?.flyTo([26.1540, 91.7650], 13, { duration: 0.8 });
  };
  const handleFlyTo = (lat: number, lng: number, zoom: number = 15) => {
    mapInstanceRef.current?.flyTo([lat, lng], zoom, { duration: 1 });
  };

  return (
    <div className="relative w-full h-full min-h-[520px] flex flex-col bg-[#080d16] border border-[#1e293b] rounded-lg overflow-hidden select-none">
      {/* Top Floating GIS Status Bar */}
      <div className="absolute top-2.5 left-2.5 z-[1000] flex flex-wrap items-center gap-2 pointer-events-auto max-w-[85%]">
        {/* Scenario Pill */}
        <div className="bg-[#0b101c]/90 backdrop-blur-md px-2.5 py-1 rounded border border-[#223554] text-xs font-mono flex items-center gap-2 text-slate-200 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="font-bold uppercase tracking-wider text-white">Guwahati Pilot GIS</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-300 font-bold">{activeTimeStep}</span>
          <span className="text-slate-500 text-[10px] hidden md:inline">● SIMULATED FLOOD SCENARIO</span>
        </div>

        {/* Hotspots Quick Jumper */}
        <div className="hidden lg:flex items-center gap-1 bg-[#0b101c]/90 backdrop-blur-md p-1 rounded border border-[#223554] text-[10px] font-mono shadow-xl overflow-x-auto">
          <span className="text-slate-400 px-1 font-bold flex items-center gap-1">
            <Compass className="w-3 h-3 text-cyan-400" />
            HOTSPOTS:
          </span>
          {hotspots.map((spot) => (
            <button
              key={spot.name}
              onClick={() => handleFlyTo(spot.lat, spot.lng, spot.zoom)}
              className="px-1.5 py-0.5 rounded bg-[#152033] hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 transition-colors border border-slate-700/60 whitespace-nowrap"
            >
              {spot.name.split(' ')[0]}
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
        className="w-full h-full flex-1 z-10 min-h-[520px]"
        style={{ background: '#090e18' }}
      />
    </div>
  );
};
