import prisma from "@/config/db";

export const votesRepository = {
  findByPoll(pollId: string) {
    return prisma.vote.findMany({ where: { pollId } });
  },

  create(data: { pollId: string; userId: string; optionId: string }) {
    return prisma.vote.create({ data });
  },
};
