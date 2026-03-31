import type { Prisma } from "@/config/db";

export const authRepository = (prisma: Prisma) =>{
  return {
    findByUsername(username: string) {
      return prisma.user.findUnique({ where: { username } });
    },

    create(data: { username: string; password: string }) {
      return prisma.user.create({ data });
    },
  };
};

export type AuthRepository = ReturnType<typeof authRepository>;