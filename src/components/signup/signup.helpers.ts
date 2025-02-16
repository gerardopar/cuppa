import { z } from "zod";

export type SignupErrorTypes =
  | "name"
  | "email"
  | "password"
  | "confirmPassword";

export const SignupStateValidator = z
  .object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(
        /[?!.@]/,
        "Password must contain at least one special character (?!.@)"
      )
      .regex(
        /^[A-Za-z0-9?!.@]+$/,
        "Password can only contain letters, numbers, and the special characters ?!.@"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export enum SignupViewModeEnum {
  signup = "signup",
  login = "login",
}
