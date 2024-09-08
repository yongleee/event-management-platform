import Event from "../models/event.model";
import Image from "../models/image.model";

class EventService {
	createNewImage = async (filename: string, path: string) => {
		const newImage = await Image.create({
			name: filename,
			imagePath: path,
		});

		return newImage;
	};

	createNewEvent = async (
		eventName: string,
		startDate: string,
		endDate: string,
		location: string,
		createdBy: string
	) => {
		const newEvent = await Event.create({
			eventName,
			startDate: new Date(startDate),
			endDate: new Date(endDate),
			location,
			status: "ongoing",
			createdBy,
		});

		return newEvent;
	};

	getEvents = async () => {
		// const { _id, eventName, startDate, endDate, location, status, createdBy } =
		const events = await Event.find(
			{},
			{
				_id: 1,
				eventName: 1,
				startDate: 1,
				endDate: 1,
				location: 1,
				status: 1,
			}
		);
		return events;
	};
}

export default new EventService();
