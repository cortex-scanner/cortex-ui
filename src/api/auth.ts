import type { AuthResult, User } from "@/types/auth.ts";
import {
  API_BASEURL,
  HEADER_AUTH,
  getAuthToken,
  parseErrorResponse,
  parseSingleResponse,
} from "@/api/common.ts";

export async function loginUsernamePassword(
  username: string,
  password: string
): Promise<AuthResult> {
  const response = await fetch(`${API_BASEURL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await parseErrorResponse(response);
    console.error(error);
    throw error;
  }

  return parseSingleResponse<AuthResult>(response);
}

export async function checkSessionValid(): Promise<User> {
  const response = await fetch(`${API_BASEURL}/auth`, {
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

  return parseSingleResponse<User>(response);
}
