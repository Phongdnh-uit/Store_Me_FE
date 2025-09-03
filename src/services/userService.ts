import {
  type ApiResponseType,
  type FilterPaginationType,
} from "@/types/global";
import axiosInstance from "./axiosConfig";
import { UserPageSchema } from "@/types/user";
import { fetchApiResponse } from "@/utils/parseApiResponse";

export const getUsers = async (
  request: FilterPaginationType,
): Promise<ApiResponseType<typeof UserPageSchema>> => {
  const response = await axiosInstance.get("/users", { params: request });
  return await fetchApiResponse(response, UserPageSchema);
};
