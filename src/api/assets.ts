import type { Asset } from "@/types/asset.ts";
import {
  API_BASEURL,
  parseArrayResponse,
  parseErrorResponse,
} from "@/api/common.ts";

export async function listAssets(): Promise<Array<Asset>> {
  const response = await fetch(`${API_BASEURL}/assets`);
  if (!response.ok) {
    const error = await parseErrorResponse(response);
    console.error(error);
    throw error;
  }
  return parseArrayResponse<Asset>(response);
}
