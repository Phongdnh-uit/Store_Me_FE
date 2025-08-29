import { z } from "zod";

export const LoginRequestSchema = z.object({
    email: z.email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});
export type LoginRequestType = z.infer<typeof LoginRequestSchema>;

export const SignupRequestSchema = z.object({
    fullname: z.string("Them loi sau"),
    email: z.email("Them loi sau"),
    password: z.string().min(6,"Them loi sau"),
});
export type SignupRequestType = z.infer<typeof SignupRequestSchema>;

export const LoginResponseSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
});

export type LoginResponseType = z.infer<typeof LoginResponseSchema>;