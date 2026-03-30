import { votesRepository } from "@/modules/votes/votes.repository";

export const votesService = {
  getByPoll(pollId: string) {
    return votesRepository.findByPoll(pollId);
  },

  cast(pollId: string, userId: string, optionId: string) {
    return votesRepository.create({ pollId, userId, optionId });
  },
};
