import { RainfallTimestepData, TimeStep } from '../types';

export const RAINFALL_SCENARIOS: Record<TimeStep, RainfallTimestepData> = {
  'NOW': {
    timeStep: 'NOW',
    label: 'Current Time (T+0)',
    hoursAhead: 0,
    rainfallIntensityMmHr: 14.5,
    trendPct: 12,
    nowcastConfidence: 'Simulated High Convective Cell',
    catchmentRunoffM3s: 58.5,
    maxFloodDepthM: 0.18,
    networkUtilizationPct: 68,
    overloadedEdgesCount: 1,
    surchargedNodesCount: 1,
    highRiskZonesCount: 0,
    statusSummary: 'Initial simulated convective rainfall over central Guwahati corridor; localized watch status.'
  },
  '+1HR': {
    timeStep: '+1HR',
    label: 'T+1 Hour Simulated State',
    hoursAhead: 1,
    rainfallIntensityMmHr: 42.0,
    trendPct: 10,
    nowcastConfidence: 'Simulated Intensification Band',
    catchmentRunoffM3s: 146.2,
    maxFloodDepthM: 0.32,
    networkUtilizationPct: 88,
    overloadedEdgesCount: 8,
    surchargedNodesCount: 5,
    highRiskZonesCount: 2,
    statusSummary: 'Continuous heavy rainfall; primary Bharalu & Silsako trunk conduits approaching capacity.'
  },
  '+2HR': {
    timeStep: '+2HR',
    label: 'T+2 Hours Simulated State',
    hoursAhead: 2,
    rainfallIntensityMmHr: 58.0,
    trendPct: 9,
    nowcastConfidence: 'Simulated Peak Storm Pulse',
    catchmentRunoffM3s: 218.0,
    maxFloodDepthM: 0.61,
    networkUtilizationPct: 114,
    overloadedEdgesCount: 18,
    surchargedNodesCount: 14,
    highRiskZonesCount: 6,
    statusSummary: 'Severe hydraulic surcharge across multiple trunk edges; widespread manhole surcharge in low basins.'
  },
  '+3HR': {
    timeStep: '+3HR',
    label: 'T+3 Hours Simulated State',
    hoursAhead: 3,
    rainfallIntensityMmHr: 22.0,
    trendPct: 7,
    nowcastConfidence: 'Simulated Post-Peak Overland Retention',
    catchmentRunoffM3s: 180.4,
    maxFloodDepthM: 0.94,
    networkUtilizationPct: 138,
    overloadedEdgesCount: 26,
    surchargedNodesCount: 21,
    highRiskZonesCount: 8,
    statusSummary: 'Rainfall receding but peak accumulated inundation occurs; arterial roadways submersed.'
  }
};
