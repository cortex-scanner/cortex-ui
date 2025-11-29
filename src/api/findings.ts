import type { AssetFinding } from "@/types/asset.ts";
import {
  API_BASEURL,
  HEADER_AUTH,
  getAuthToken,
  parseErrorResponse,
  parseSingleResponse,
} from "@/api/common.ts";

export async function getFinding(
  findingId: string
): Promise<AssetFinding<object>> {
  const response = await fetch(`${API_BASEURL}/findings/${findingId}`, {
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
  return parseSingleResponse<AssetFinding<object>>(response);
}
