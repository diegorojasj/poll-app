import type { PollsRepository } from "@/modules/polls/polls.repository";

export const pollsService = (pollsRepository: PollsRepository) => ({
  getAll() {
    return pollsRepository.findAll();
  },

  getById(id: string) {
    return pollsRepository.findById(id);
  },

  create(title: string, ownerId: string) {
    return pollsRepository.create({ title, ownerId });
  },

  delete(id: string) {
    return pollsRepository.delete(id);
  },
});

export type PollsService = ReturnType<typeof pollsService>;
