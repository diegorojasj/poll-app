export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 4000),
  DATABASE_URL: process.env.DATABASE_URL ?? "",
  SECRET_KEY: process.env.SECRET_KEY ?? "",
  ISS: process.env.ISS ?? "poll-app",
  AUD: process.env.AUD ?? "poll-app-client",
  FRONTEND_URL: process.env.FRONTEND_URL ?? "http://localhost:3000",
};

export type Env = typeof env;