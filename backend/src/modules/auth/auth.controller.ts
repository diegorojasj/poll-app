import type { Request, Response, NextFunction } from "express";
import type { AuthService } from "@/modules/auth/auth.service";
import type { JwtUtils } from "@/config/jwt";

export const authController = (authService: AuthService, jwtUtils: JwtUtils) =>({
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const user = await authService.register(username, password);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const user = await authService.login(username, password);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },
});

export type AuthController = ReturnType<typeof authController>;
