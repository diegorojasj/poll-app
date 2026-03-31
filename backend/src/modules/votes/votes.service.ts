import type { VotesRepository } from "@/modules/votes/votes.repository";

export const votesService = (votesRepository: VotesRepository) => ({
  getByPoll(pollId: string) {
    return votesRepository.findByPoll(pollId);
  },

  cast(pollId: string, userId: string, optionId: string) {
    return votesRepository.create({ pollId, userId, optionId });
  },
});

export type VotesService = ReturnType<typeof votesService>;
