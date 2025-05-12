import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./db/db";
import { connectRedis } from "./cache/redis/redisClient";

import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import newsRouter from "./routes/news";
import trendsRouter from "./routes/trends";
import ytRouter from "./routes/yt";
import openAiRouter from "./routes/openAi";

import { userContextMiddleware } from "./context/userContext";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use(userContextMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript!");
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/news", newsRouter);
app.use("/trends", trendsRouter);
app.use("/yt", ytRouter);
app.use("/openAi", openAiRouter);

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
