import { Router } from "express";
import {
  loginUser,
  registerUser,
  requestResetPasswordLink,
  resetPassword,
} from "../controllers/auth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/get-reset-password-link", requestResetPasswordLink);
router.post("/reset-password", resetPassword);

export default router;
