import { Schema, Types, model } from "mongoose";

const imageSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		imagePath: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Image = model("Image", imageSchema);

export default Image;
