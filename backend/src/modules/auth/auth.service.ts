import type { AuthRepository } from "./auth.repository";
import type { Utils } from "@/shared/utils";

export const authService = (authRepository: AuthRepository, utils: Utils) => {
  return {
    async register(username: string, password: string) {
      const existing = await authRepository.findByUsername(username);
      if (existing) throw new Error("Username already in use");
      const hashed = await utils.hashPassword(password);
      return authRepository.create({ username, password: hashed });
    },

    async login(username: string, password: string) {
      const user = await authRepository.findByUsername(username);
      if (!user) throw new Error("Invalid credentials");
      const valid = await utils.verifyPassword(password, user.password);
      if (!valid) throw new Error("Invalid credentials");
      return user;
    },
  };
};

export type AuthService = ReturnType<typeof authService>;
