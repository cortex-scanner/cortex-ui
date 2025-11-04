import type { Asset, AssetDiscoveryResult } from "@/types/asset.ts";
import {
  API_BASEURL,
  parseArrayResponse,
  parseErrorResponse,
  parseSingleResponse,
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

export async function getAsset(id: string): Promise<Asset> {
  const response = await fetch(`${API_BASEURL}/assets/${id}`);
  if (!response.ok) {
    const error = await parseErrorResponse(response);
    console.error(error);
    throw error;
  }
  return parseSingleResponse<Asset>(response);
}

export async function getAssetDiscoveries(
  assetId: string
): Promise<Array<AssetDiscoveryResult>> {
  const response = await fetch(`${API_BASEURL}/assets/${assetId}/discovery`);
  if (!response.ok) {
    const error = await parseErrorResponse(response);
    console.error(error);
    throw error;
  }
  return parseArrayResponse<AssetDiscoveryResult>(response);
}
