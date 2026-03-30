import { Router } from "express";
import { authenticate } from "@/shared/middleware/auth";
import { votesController } from "@/modules/votes/votes.controller";

const router = Router();

router.get("/poll/:pollId", votesController.getByPoll);
router.post("/", authenticate, votesController.cast);

export default router;
