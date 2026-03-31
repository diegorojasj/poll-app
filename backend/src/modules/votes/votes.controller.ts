import type { Response, NextFunction } from "express";
import type { AuthRequest } from "@/shared/types";
import type { VotesService } from "@/modules/votes/votes.service";

export const votesController = (votesService: VotesService) => ({
  async getByPoll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const votes = await votesService.getByPoll(String(req.params.pollId));
      res.status(200).json(votes);
    } catch (err) {
      next(err);
    }
  },

  async cast(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const vote = await votesService.cast(req.body.pollId, req.userId!, req.body.optionId);
      res.status(201).json(vote);
    } catch (err) {
      next(err);
    }
  },
});

export type VotesController = ReturnType<typeof votesController>;
