import { Router } from "express";
import type { RequestHandler } from "express";
import type { PollsController } from "@/modules/polls/polls.controller";

export function pollsRoutes(pollsController: PollsController, authMiddleware: RequestHandler) {
  const router = Router();

  router.get("/", pollsController.getAll);
  router.get("/:id", pollsController.getById);
  router.post("/", authMiddleware, pollsController.create);
  router.delete("/:id", authMiddleware, pollsController.delete);

  return router;
}
