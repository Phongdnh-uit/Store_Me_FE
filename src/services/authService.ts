import { type ApiResponseType } from "@/types/global";
import type { LoginRequestType } from "@/types/auth";
import { LoginResponseSchema } from "@/types/auth";
import axios from "axios";
import z from "zod";
import { fetchApiResponse } from "@/utils/parseApiResponse";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api/v1";

const AUTH_URL = BACKEND_URL + "/auth";

export const login = async (
  request: LoginRequestType,
): Promise<ApiResponseType<typeof LoginResponseSchema>> => {
  const response = await axios.post(AUTH_URL + `/login`, request);

  return await fetchApiResponse(response, LoginResponseSchema);
};

export const refreshAccessToken = async (request: {
  refreshToken: string;
}): Promise<ApiResponseType<typeof LoginResponseSchema>> => {
  const response = await axios.post(AUTH_URL + `/refresh-token`, request);
  return await fetchApiResponse(response, LoginResponseSchema);
};

export const forgotPassword = async (
  email: string,
): Promise<ApiResponseType<z.ZodNull>> => {
  const response = await axios.post(
    AUTH_URL + `/forgot-password?email=${email}`,
  );
  return await fetchApiResponse(response, z.null());
};
