import { ApiResponseSchema, type ApiResponseType } from "@/types/global";
import axios, { type AxiosResponse } from "axios";
import { z } from "zod";

export async function fetchApiResponse<T extends z.ZodTypeAny>(
  response: AxiosResponse,
  schema: T,
): Promise<ApiResponseType<T>> {
  try {
    const data = await response.data;
    const parsed = ApiResponseSchema(schema).safeParse(data);
    if (!parsed.success) {
      throw new Error("Invalid API response");
    }
    return parsed.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        const parsed = ApiResponseSchema(z.any()).safeParse(err.response.data);
        if (parsed.success) {
          throw parsed.data;
        } else {
          throw new Error("Invalid API error response");
        }
      } else {
        throw new Error("Network error, please try again later");
      }
    }
    throw err;
  }
}
