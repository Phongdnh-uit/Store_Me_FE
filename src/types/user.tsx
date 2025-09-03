import { z } from "zod";
import { PageResponseSchema } from "./global";

export const UserResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.email(),
  totalUsage: z.number(),
  status: z.string(),
  createdAt: z.string().transform((str) => new Date(str)),
  updatedAt: z.string().transform((str) => new Date(str)),
  createdBy: z.number(),
  updatedBy: z.number(),
});

export type UserResponseType = z.infer<typeof UserResponseSchema>;

export const UserPageSchema = PageResponseSchema(UserResponseSchema);

export type UserPageType = z.infer<typeof UserPageSchema>;
