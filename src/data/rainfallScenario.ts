import { RainfallTimestepData, TimeStep } from '../types';

export const RAINFALL_SCENARIOS: Record<TimeStep, RainfallTimestepData> = {
  'NOW': {
    timeStep: 'NOW',
    label: 'Current Time (T+0)',
    hoursAhead: 0,
    rainfallIntensityMmHr: 78,
    trendPct: 12,
    nowcastConfidence: 'Simulated High Convective Cell',
    catchmentRunoffM3s: 142.5,
    maxFloodDepthM: 0.18,
    networkUtilizationPct: 72,
    overloadedEdgesCount: 6,
    surchargedNodesCount: 4,
    highRiskZonesCount: 3,
    statusSummary: 'Convective storm cell centered over central corridor; initial surface runoff accumulation.'
  },
  '+1HR': {
    timeStep: '+1HR',
    label: 'T+1 Hour Simulated State',
    hoursAhead: 1,
    rainfallIntensityMmHr: 86,
    trendPct: 10,
    nowcastConfidence: 'Simulated Stationary Band',
    catchmentRunoffM3s: 184.2,
    maxFloodDepthM: 0.32,
    networkUtilizationPct: 87,
    overloadedEdgesCount: 12,
    surchargedNodesCount: 8,
    highRiskZonesCount: 5,
    statusSummary: 'Continuous high-rate rainfall; primary stormwater trunk conduits approaching design capacity.'
  },
  '+2HR': {
    timeStep: '+2HR',
    label: 'T+2 Hours Simulated State',
    hoursAhead: 2,
    rainfallIntensityMmHr: 94,
    trendPct: 9,
    nowcastConfidence: 'Simulated Peak Inflow',
    catchmentRunoffM3s: 228.0,
    maxFloodDepthM: 0.61,
    networkUtilizationPct: 103,
    overloadedEdgesCount: 21,
    surchargedNodesCount: 15,
    highRiskZonesCount: 7,
    statusSummary: 'Hydraulic capacity exceeded across multiple trunk edges; widespread manhole surcharge.'
  },
  '+3HR': {
    timeStep: '+3HR',
    label: 'T+3 Hours Simulated State',
    hoursAhead: 3,
    rainfallIntensityMmHr: 101,
    trendPct: 7,
    nowcastConfidence: 'Simulated Extreme Event',
    catchmentRunoffM3s: 265.4,
    maxFloodDepthM: 0.94,
    networkUtilizationPct: 119,
    overloadedEdgesCount: 29,
    surchargedNodesCount: 22,
    highRiskZonesCount: 9,
    statusSummary: 'Critical hydraulic surcharge; surface roadways behaving as secondary open channels.'
  }
};
