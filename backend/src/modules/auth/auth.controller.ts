import type { Request, Response, NextFunction } from "express";
import type { AuthService } from "@/modules/auth/auth.service";
import type { AuthRequest } from "@/shared/types";
import type { Utils } from "@/shared/utils";

export const authController = (authService: AuthService, utils: Utils) =>({
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
      const [user, token] = await authService.login(username, password);
      utils.setCookie("token", token, res)
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },

  async verifyLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req as AuthRequest;
      res.status(200).json({ userId });
    } catch (err) {
      next(err);
    }
  }
});

export type AuthController = ReturnType<typeof authController>;
