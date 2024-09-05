import mongoose from "mongoose";
import dotenv from "./dotenv";

const connectDB = async () => {
	try {
		await mongoose.connect(dotenv.MONGO_URI, {});
		console.log("MongoDB connected.");
	} catch (err: any) {
		console.error(err.message);
		process.exit(1);
	}
};
