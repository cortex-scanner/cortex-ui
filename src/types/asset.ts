export interface Asset {
  id: string;
  endpoint: string;
}

export type AssetDiscoveryProtocol = "tcp" | "udp";

export interface AssetDiscoveryResult {
  assetId: string;
  port: number;
  protocol: AssetDiscoveryProtocol;
  firstSeen: string;
  lastSeen: string;
}
