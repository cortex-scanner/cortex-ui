import type { Asset } from "@/types/asset.ts";

export interface ScanConfig {
  id: string;
  name: string;
  targets: Array<Asset>;
}
