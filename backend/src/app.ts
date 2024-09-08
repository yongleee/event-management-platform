import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import eventRouter from "./routes/event.routes";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3000;
const mongoURI: string = process.env.MONGO_URI || "";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req: Request, res: Response) => {
	res.send("Hello world");
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/event", eventRouter);

mongoose
	.connect(mongoURI)
	.then(() => {
		console.log("connected to the database");
		app.listen(port, () => {
			console.log("listening to port", port);
		});
	})
	.catch((err) => {
		console.log(err);
	});
