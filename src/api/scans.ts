import type { ScanConfig } from "@/types/scan.ts";
import {
  API_BASEURL,
  HEADER_AUTH,
  getAuthToken,
  parseArrayResponse,
  parseErrorResponse,
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
