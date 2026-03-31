import type { Prisma } from "@/config/db";

export const votesRepository = (prisma: Prisma) => {
  return {
    findByPoll(pollId: string) {
      return prisma.vote.findMany({ where: { pollId } });
    },

    create(data: { pollId: string; userId: string; optionId: string }) {
      return prisma.vote.create({ data });
    },
  };
};

export type VotesRepository = ReturnType<typeof votesRepository>;