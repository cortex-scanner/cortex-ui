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

export interface AssetDiscoveryResult {
  assetId: string;
  port: number;
  protocol: AssetDiscoveryProtocol;
  // unix timestamp
  firstSeen: number;
  // unix timestamp
  lastSeen: number;
}
