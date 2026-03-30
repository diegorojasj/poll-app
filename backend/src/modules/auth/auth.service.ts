import { authRepository } from "@/modules/auth/auth.repository";

export const authService = {
  async register(username: string, password: string) {
    // TODO: hash password, create user
    const existing = await authRepository.findByUsername(username);
    if (existing) throw new Error("Username already in use");
    return authRepository.create({ username, password });
  },

  async login(username: string, password: string) {
    // TODO: verify password, sign JWT
    const user = await authRepository.findByUsername(username);
    if (!user) throw new Error("Invalid credentials");
    return user;
  },
};
