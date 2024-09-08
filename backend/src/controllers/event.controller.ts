import { Request, Response } from "express";
import eventService from "../services/event.service";
import Event from "../models/event.model";
import Image from "../models/image.model";

class EventController {
	getEventByName = async (req: Request, res: Response) => {
		try {
			res.status(200).json();
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	};

	getEvents = async (req: Request, res: Response) => {
		try {
			const events = await Event.find({});
			res.status(200).json(events);
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	};

	createImage = async (req: Request, res: Response) => {
		try {
			if (!req.file) {
				throw Error("All fields must be filled.");
			}

			const { filename, path } = req.file;

			const image = await eventService.createNewImage(filename, path);

			res.status(200).json({ image });
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	};

	createEvent = async (req: Request, res: Response) => {
		try {
			const { eventName, startDate, endDate, location, status, createdBy } =
				req.body;

			if (
				!eventName ||
				!startDate ||
				!endDate ||
				!location ||
				!status ||
				!createdBy
			) {
				throw Error("All fields must be filled.");
			}

			const newEvent = await eventService.createNewEvent(
				eventName,
				startDate,
				endDate,
				location,
				status,
				createdBy
			);

			res.status(200).json(newEvent);
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	};

	editImage = async (req: Request, res: Response) => {
		try {
			res.status(200).json();
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	};

	editEvent = async (req: Request, res: Response) => {
		const { id } = req.params;
		const updateData = req.body;

		try {
			const updatedEvent = await Event.findByIdAndUpdate(id, updateData, {
				new: true,
				runValidators: true,
			});

			if (!updatedEvent) {
				return res.status(404).json({ message: "Event not found" });
			}

			res.status(200).json(updatedEvent);
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	};

	deleteEvent = async (req: Request, res: Response) => {
		try {
			const eventId = req.params.id;

			const event = await Event.findById(eventId);

			if (!event) {
				return res.status(404).json({ message: "Event not found" });
			}

			if (event.image) {
				await Image.findByIdAndDelete(event.image);
			}

			await Event.findByIdAndDelete(eventId);

			return res
				.status(200)
				.json({ message: "Event and related document deleted successfully" });
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	};
}

export default new EventController();
