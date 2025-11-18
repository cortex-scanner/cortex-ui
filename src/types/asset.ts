export interface Asset {
  id: string;
  endpoint: string;
  stats: {
    discoveredPortsCount: number;
    // unix timestamp
    lastDiscovery: number;
  };
}

export type AssetDiscoveryProtocol = "tcp" | "udp";
export type AssetFindingType = "port" | "vulnerability";

export interface AssetFinding<T extends object> {
  id: string;
  assetId: string;
  type: AssetFindingType;
  // unix timestamp
  firstSeen: number;
  // unix timestamp
  lastSeen: number;
  data: T;
}

export interface AssetPortFindingData {
  port: number;
  protocol: AssetDiscoveryProtocol;
}

export function getPortFindings(
  findings: Array<AssetFinding<any>>
): Array<AssetFinding<AssetPortFindingData>> {
  const portFindings = findings.filter((f) => f.type === "port");
  return portFindings as Array<AssetFinding<AssetPortFindingData>>;
}

export interface AssetHistoryEntry {
  id: string;
  assetId: string;
  timestamp: number;
  userId: string;
  eventType: string;
  eventData: object | null;
}
