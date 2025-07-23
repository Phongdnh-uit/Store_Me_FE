import { ApiResponseSchema, type ApiResponseType } from "@/types/apiResponse";
import type { LoginRequestType } from "@/types/auth";
import { LoginResponseSchema } from "@/types/auth";
import axios from "axios";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:/api/v1";

const AUTH_URL = BACKEND_URL + "/auth";

export const login = async (
  request: LoginRequestType,
): Promise<ApiResponseType<typeof LoginResponseSchema>> => {
  const response = await axios.post(AUTH_URL + `/login`, request);

  const LoginApiResponseSchema = ApiResponseSchema(LoginResponseSchema);

  const result = LoginApiResponseSchema.safeParse(response.data);
  if (!result.success) {
    throw new Error("Invalid response from server");
  }
  return result.data;
};

export const refreshAccessToken = async (request: {
  refreshToken: string;
}): Promise<ApiResponseType<typeof LoginResponseSchema>> => {
  const response = await axios.post(AUTH_URL + `/refresh-token`, request);

  const LoginApiResponseSchema = ApiResponseSchema(LoginResponseSchema);

  const result = LoginApiResponseSchema.safeParse(response.data);
  if (!result.success) {
    throw new Error("Invalid response from server");
  }
  return result.data;
};
