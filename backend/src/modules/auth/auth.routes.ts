import { Router } from "express";
import type { RequestHandler } from "express";
import type { AuthController } from "@/modules/auth/auth.controller";

export function authRoutes(authController: AuthController, authMiddleware: RequestHandler) {
  const router = Router();

  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.post("/verify", authMiddleware, authController.verifyLogin) // Only to once by frontend refresh

  return router;
}
