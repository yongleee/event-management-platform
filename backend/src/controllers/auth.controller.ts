import { Request, Response } from "express";
import authService from "../services/auth.service";

class AuthController {
	loginUser = async (req: Request, res: Response) => {
		const { email, password } = req.body;

		try {
			const user = await authService.loginUser(email, password);
			res.status(200).json(user);
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	};
}

export default new AuthController();
