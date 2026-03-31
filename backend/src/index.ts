import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "@/shared/middleware/error";
import { buildContainer } from "@/container";

const app = express();
const container = buildContainer();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", container.authRoutes);
app.use("/polls", container.pollsRoutes);
app.use("/votes", container.votesRoutes);

app.use(errorHandler);

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
