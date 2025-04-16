import { z } from "zod";

export const LoginStateValidator = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().nonempty(),
});

export enum LoginViewModeEnum {
  login = "login",
  forgotPassword = "forgotPassword",
  signup = "signup",
}
