import Event from "../models/event.model";
import Image from "../models/image.model";
import { Types } from "mongoose";

class EventService {
	createNewImage = async (eventId: string, filename: string, path: string) => {
		const image = await Image.findOne({ name: filename });

		let imageId;
		if (image) {
			imageId = image._id;
		} else {
			const newImage = await Image.create({
				name: filename,
				imagePath: path,
			});
			imageId = newImage._id as Types.ObjectId;
		}

		const updatedEvent = await Event.findByIdAndUpdate(
			eventId,
			{
				["image"]: imageId,
			},
			{ new: true }
		);
		return updatedEvent;
	};

	createNewEvent = async (
		eventName: string,
		startDate: string,
		endDate: string,
		location: string
	) => {
		const newEvent = {
			eventName,
			startDate: new Date(startDate),
			endDate: new Date(endDate),
			location,
			status: "ongoing",
		};

		await Event.create(newEvent);

		return newEvent;
	};

	getEvents = async (statusFilter: string) => {
		const filter = statusFilter ? { status: statusFilter } : {};
		const events = await Event.find(filter, {
			_id: 1,
			eventName: 1,
			startDate: 1,
			endDate: 1,
			location: 1,
			status: 1,
		});
		return events;
	};

	getEventsWithImages = async () => {
		const events = await Event.find(
			{},
			{
				_id: 1,
				eventName: 1,
				startDate: 1,
				endDate: 1,
				location: 1,
				status: 1,
				image: 1,
			}
		).populate("image", "imagePath");

		return events;
	};
}

export default new EventService();
