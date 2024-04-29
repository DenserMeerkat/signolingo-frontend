import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .email("Must be a valid email or username")
    .or(
      z
        .string()
        .min(6, "Must be a valid username")
        .refine((value) => !value.includes("@"), "Must be a valid username"),
    ),
  password: z.string().min(8, "Must be a valid password"),
});

export const signUpSchema = z
  .object({
    email: z.string().email("Must be a valid email"),
    username: z.string().min(6, "Min. 6 characters"),
    password: z
      .string()
      .min(6, "Min. 6 characters")
      .refine(
        (password) => /[A-Z]/.test(password),
        "Must contain an uppercase character",
      )
      .refine(
        (password) => /[0-9]/.test(password),
        "Must contain a numeric character",
      )
      .refine(
        (password) => /\W|_/.test(password),
        "Must contain a special character",
      ),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  username: z.string().min(6, "Min. 6 characters"),
  avatar: z.string(),
});
