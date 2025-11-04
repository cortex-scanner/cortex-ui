export const API_BASEURL: string = import.meta.env.VITE_API_BASE_URL;

export interface APIReply<T> {
  id: string;
  apiVersion: string;
  data: T;
}

export interface APIArray<T extends object> {
  currentItemCount: number;
  startIndex: number;
  totalItems: number;
  items: Array<T>;
}

export interface ErrorStack {
  message: string;
  reason: string;
}

export interface APIErrorReply {
  id: string;
  apiVersion: string;
  error: {
    code: number;
    message: string;
    errors: Array<ErrorStack>;
  };
}

export class APIError extends Error {
  statusCode: number;

  constructor(status: number, message: string) {
    super(message);
    this.statusCode = status;
  }
}

export async function parseErrorResponse(r: Response): Promise<Error> {
  const errorJson = (await r.json()) as APIErrorReply;
  return new APIError(r.status, errorJson.error.message);
}

export async function parseArrayResponse<T extends object>(
  r: Response
): Promise<Array<T>> {
  const parsed = (await r.json()) as APIReply<APIArray<T>>;
  return parsed.data.items;
}
