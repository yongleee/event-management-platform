import { Request, Response } from "express";
import userService from "../services/user.service";

class UserController {
	createNewUser = async (req: Request, res: Response) => {
		const { email, password } = req.body;

		try {
			const user = await userService.createNewUser(email, password);

			res.status(200).json(user.email);
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	};
}

export default new UserController();
