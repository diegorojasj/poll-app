import { Router } from "express";
import { authenticate } from "@/shared/middleware/auth";
import { pollsController } from "@/modules/polls/polls.controller";

const router = Router();

router.get("/", pollsController.getAll);
router.get("/:id", pollsController.getById);
router.post("/", authenticate, pollsController.create);
router.delete("/:id", authenticate, pollsController.delete);

export default router;
