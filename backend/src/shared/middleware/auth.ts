import type { Response, NextFunction } from "express";
import type { AuthRequest } from "@/shared/types";
import type { JwtUtils } from "@/config/jwt";
import type { Env } from "@/config/env";

export function AuthMiddleware(jwtUtils: JwtUtils, env: Env) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    req.token = token
    try {
      const payload = jwtUtils.verify_access_token(token, env.AUD, env.ISS);
      if (typeof payload === "string" || !payload.sub) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      req.userId = payload.sub;
    } catch {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    next();
  };
}
