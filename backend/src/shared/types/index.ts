import type { Request } from "express";

export interface AuthRequest extends Request {
  userId?: string
  username?: string
  token?: string
}
