import express, { Request, Response } from "express";
import cors from "cors";

import connectDB from "./db/db";

import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import newsRouter from "./routes/news";

import { userContextMiddleware } from "./context/userContext"; // Import the middleware

import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

(async () => await connectDB())();

app.use(userContextMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript!");
});
app.use("/auth", authRouter);
app.use("/user", userContextMiddleware, userRouter);
app.use("/news", newsRouter);

app.listen(port, () => {
  console.log(`App running on port:${port}`);
});
