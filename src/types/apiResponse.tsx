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
        data: dataSchema.optional(),
        error: ErrorVOSchema.optional(),
    });

export type ApiResponseType<T extends z.ZodTypeAny> = z.infer<
    ReturnType<typeof ApiResponseSchema<T>>
>;
