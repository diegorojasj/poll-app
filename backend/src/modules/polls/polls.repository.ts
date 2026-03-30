import prisma from "@/config/db";

export const pollsRepository = {
  findAll() {
    return prisma.poll.findMany();
  },

  findById(id: string) {
    return prisma.poll.findUnique({ where: { id } });
  },

  create(data: { title: string; ownerId: string }) {
    return prisma.poll.create({ data });
  },

  delete(id: string) {
    return prisma.poll.delete({ where: { id } });
  },
};
