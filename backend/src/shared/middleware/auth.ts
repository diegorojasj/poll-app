import type { Response, NextFunction } from "express";
import type { AuthRequest } from "@/shared/types";

export function authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  // TODO: verify JWT and attach userId to req
  next();
}
