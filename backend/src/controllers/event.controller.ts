import { Request, Response } from "express";

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
			res.status(200).json();
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	};

	createEvent = async (req: Request, res: Response) => {
		try {
			res.status(200).json();
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	};

	editEvent = async (req: Request, res: Response) => {
		try {
			res.status(200).json();
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	};

	deleteEvent = async (req: Request, res: Response) => {
		try {
			res.status(200).json();
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	};
}

export default new EventController();
