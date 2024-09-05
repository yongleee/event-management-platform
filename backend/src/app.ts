import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
const mongoURI: string = process.env.MONGO_URI || "";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
	res.send("Hello world");
});

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
