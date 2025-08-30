import { z } from "zod";

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
