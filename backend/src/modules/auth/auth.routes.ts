import { Router } from "express";
import type { AuthController } from "@/modules/auth/auth.controller";

export function authRoutes(authController: AuthController) {
  const router = Router();

  router.post("/register", authController.register);
  router.post("/login", authController.login);

  return router;
}
