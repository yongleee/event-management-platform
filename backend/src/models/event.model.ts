import { Schema, Types, model } from "mongoose";

const eventSchema = new Schema(
	{
		eventName: {
			type: String,
			required: true,
		},
		startDate: {
			type: Date,
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["ongoing", "completed"],
			required: true,
		},
		createdBy: {
			type: Types.ObjectId,
			ref: "User",
			required: true,
		},
		image: {
			type: Types.ObjectId,
			ref: "Image",
			required: false,
		},
	},
	{ timestamps: true }
);

const Event = model("Event", eventSchema);

export default Event;
