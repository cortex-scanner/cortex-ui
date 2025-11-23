import type { Agent } from "@/types/agent.ts";
import {
  API_BASEURL,
  HEADER_AUTH,
  getAuthToken,
  parseArrayResponse,
  parseErrorResponse,
} from "@/api/common.ts";

export async function listAgents(): Promise<Array<Agent>> {
  const response = await fetch(`${API_BASEURL}/agents`, {
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

  return parseArrayResponse<Agent>(response);
}
