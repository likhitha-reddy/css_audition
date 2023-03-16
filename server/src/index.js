import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import dotenv from 'dotenv'
dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(3001, () => console.log("Server started"));