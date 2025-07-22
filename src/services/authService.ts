import { ApiResponseSchema, type ApiResponseType } from "@/types/apiResponse";
import type { LoginRequestType } from "@/types/auth";
import { LoginResponseSchema } from "@/types/auth";
import axios from "axios";

export const login = async (
    request: LoginRequestType,
): Promise<ApiResponseType<typeof LoginResponseSchema>> => {
    const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        request,
    );

    const LoginApiResponseSchema = ApiResponseSchema(LoginResponseSchema);

    const result = LoginApiResponseSchema.safeParse(response.data);
    if (!result.success) {
        throw new Error("Invalid response from server");
    }
    return result.data;
};
