import express from "express";
import { errorHandler } from "@/shared/middleware/error";
import authRouter from "@/modules/auth";
import pollsRouter from "@/modules/polls";
import votesRouter from "@/modules/votes";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/polls", pollsRouter);
app.use("/api/votes", votesRouter);

app.use(errorHandler);

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
