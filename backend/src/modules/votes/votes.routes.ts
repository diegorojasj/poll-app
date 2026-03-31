import { Router } from "express";
import type { RequestHandler } from "express";
import type { VotesController } from "@/modules/votes/votes.controller";

export function votesRoutes(votesController: VotesController, authMiddleware: RequestHandler) {
  const router = Router();

  router.get("/poll/:pollId", votesController.getByPoll);
  router.post("/", authMiddleware, votesController.cast);

  return router;
}
