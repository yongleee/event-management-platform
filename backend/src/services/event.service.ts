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
		status: string,
		createdBy: string
	) => {
		const newEvent = await Event.create({
			eventName,
			startDate: new Date(startDate),
			endDate: new Date(endDate),
			location,
			status,
			createdBy,
		});

		return newEvent;
	};
}

export default new EventService();
