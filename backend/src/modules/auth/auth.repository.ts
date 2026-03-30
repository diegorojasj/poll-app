import prisma from "@/config/db";

export const authRepository = {
  findByUsername(username: string) {
    return prisma.user.findUnique({ where: { username } });
  },

  create(data: { username: string; password: string }) {
    return prisma.user.create({ data });
  },
};
