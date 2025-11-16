import type { ScanConfig, ScanExecution } from "@/types/scan.ts";
import type { Asset } from "@/types/asset.ts";
import {
  API_BASEURL,
  HEADER_AUTH,
  getAuthToken,
  parseArrayResponse,
  parseErrorResponse,
  parseSingleResponse,
} from "@/api/common.ts";

export async function listScanConfigs(): Promise<Array<ScanConfig>> {
  const response = await fetch(`${API_BASEURL}/scan-configs`, {
    method: "GET",
    headers: {
      [HEADER_AUTH]: getAuthToken(),
    },
  });

  if (!response.ok) {
    const error = await parseErrorResponse(response);
    console.error(error);
    throw error;
  }

  return parseArrayResponse<ScanConfig>(response);
}

export async function listScanExecutions(): Promise<Array<ScanExecution>> {
  const response = await fetch(`${API_BASEURL}/scans`, {
    method: "GET",
    headers: {
      [HEADER_AUTH]: getAuthToken(),
    },
  });

  if (!response.ok) {
    const error = await parseErrorResponse(response);
    console.error(error);
    throw error;
  }

  return parseArrayResponse<ScanExecution>(response);
}

export async function runScan(
  scanConfig: ScanConfig,
  assets: Array<Asset>
): Promise<ScanExecution> {
  const response = await fetch(`${API_BASEURL}/scans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [HEADER_AUTH]: getAuthToken(),
    },
    body: JSON.stringify({
      configId: scanConfig.id,
      assetIds: assets.map((asset) => asset.id),
    }),
  });

  if (!response.ok) {
    const error = await parseErrorResponse(response);
    console.error(error);
    throw error;
  }

  return parseSingleResponse<ScanExecution>(response);
}
