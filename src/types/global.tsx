import z from "zod";

const ErrorVOSchema = z.object({
  errorCode: z.string(),
  errorMessage: z.string(),
  fieldErrors: z.record(z.string(), z.any()).optional(),
});

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    statusCode: z.number(),
    message: z.string(),
    data: z.union([dataSchema, z.null()]).optional(),
    error: ErrorVOSchema.optional(),
  });

export type ApiResponseType<T extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof ApiResponseSchema<T>>
>;

export const FilterPaginationSchema = z.object({
  page: z.number().default(0),
  size: z.number().default(10),
  filter: z.string().optional(),
});

export type FilterPaginationType = z.infer<typeof FilterPaginationSchema>;

export const PageResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    content: z.array(itemSchema),
    totalPages: z.number(),
    totalElements: z.number(),
    numberOfElements: z.number(),
    size: z.number(),
    number: z.number(),
  });

export type PageResponseType<T extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof PageResponseSchema<T>>
>;
