import type { Asset } from "@/types/asset.ts";

export interface ScanConfig {
  id: string;
  name: string;
  type: string;
  engine: string;
}

export interface ScanExecution {
  id: string;
  scanConfigurationId: string;
  status: string;
  startTime: number;
  endTime: number;
  assets: Array<Asset>;
}
