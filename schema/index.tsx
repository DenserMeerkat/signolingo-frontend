import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .email()
    .or(
      z
        .string()
        .refine((value) => !value.includes("@"), "Must be a valid username"),
    ),
  password: z.string().min(8),
});
