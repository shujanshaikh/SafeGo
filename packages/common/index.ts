import { z } from "zod";

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const locationSchema = z.object({
  locationA: z.string(),
  locationB: z.string(),
});

export const messageSchema = z.object({
  message: z.string(),
  role: z.enum(["USER", "SYSTEM"]),
});

