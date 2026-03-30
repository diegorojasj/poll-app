import { Request, Response, NextFunction } from "express";
import { authService } from "@/modules/auth/auth.service";

export const authController = {
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
};
