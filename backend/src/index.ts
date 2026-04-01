import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "@/shared/middleware/error";
import { buildContainer } from "@/container";
import { env } from "@/config/env";

const app = express();
const container = buildContainer();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", container.authRoutes);
app.use("/polls", container.pollsRoutes);
app.use("/votes", container.votesRoutes);

app.use(errorHandler);

app.listen(env.PORT, () => console.log(`Server running on port ${env.PORT}`));

export default app;
