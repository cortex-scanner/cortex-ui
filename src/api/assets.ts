import type {
  Asset,
  AssetDiscoveryResult,
  AssetHistoryEntry,
} from "@/types/asset.ts";
import {
  API_BASEURL,
  HEADER_AUTH,
  getAuthToken,
  parseArrayResponse,
  parseErrorResponse,
  parseSingleResponse,
} from "@/api/common.ts";

export async function listAssets(): Promise<Array<Asset>> {
  const response = await fetch(`${API_BASEURL}/assets?stats=true`, {
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

  return parseArrayResponse<Asset>(response);
}

export async function getAsset(id: string): Promise<Asset> {
  const response = await fetch(`${API_BASEURL}/assets/${id}?stats=true`, {
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

  return parseSingleResponse<Asset>(response);
}

export async function getAssetDiscoveries(
  assetId: string
): Promise<Array<AssetDiscoveryResult>> {
  const response = await fetch(`${API_BASEURL}/assets/${assetId}/discovery`, {
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
  return parseArrayResponse<AssetDiscoveryResult>(response);
}

export async function getAssetHistory(
  assetId: string
): Promise<Array<AssetHistoryEntry>> {
  const response = await fetch(`${API_BASEURL}/assets/${assetId}/history`, {
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
  return parseArrayResponse<AssetHistoryEntry>(response);
}

export async function createAsset(endpoint: string): Promise<Asset> {
  const response = await fetch(`${API_BASEURL}/assets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [HEADER_AUTH]: getAuthToken(),
    },
    body: JSON.stringify({ endpoint }),
  });

  if (!response.ok) {
    const error = await parseErrorResponse(response);
    console.error(error);
    throw error;
  }

  return parseSingleResponse<Asset>(response);
}

export async function deleteAsset(id: string): Promise<Asset> {
  const response = await fetch(`${API_BASEURL}/assets/${id}`, {
    method: "DELETE",
    headers: {
      [HEADER_AUTH]: getAuthToken(),
    },
  });

  if (!response.ok) {
    const error = await parseErrorResponse(response);
    console.error(error);
    throw error;
  }

  return parseSingleResponse<Asset>(response);
}
