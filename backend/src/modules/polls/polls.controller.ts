import type { Response, NextFunction } from "express";
import type { AuthRequest } from "@/shared/types";
import { pollsService } from "@/modules/polls/polls.service";

export const pollsController = {
  async getAll(_req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const polls = await pollsService.getAll();
      res.status(200).json(polls);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const poll = await pollsService.getById(String(req.params.id));
      if (!poll) { res.status(404).json({ message: "Poll not found" }); return; }
      res.status(200).json(poll);
    } catch (err) {
      next(err);
    }
  },

  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const poll = await pollsService.create(req.body.title, req.userId!);
      res.status(201).json(poll);
    } catch (err) {
      next(err);
    }
  },

  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await pollsService.delete(String(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
