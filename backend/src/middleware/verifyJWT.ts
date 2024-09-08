import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
	token: string | JwtPayload;
}

const secretKey: Secret = process.env.ACCESS_TOKEN_SECRET || "";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;

	if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
		const token = authHeader.split("")[1];
		const decoded = jwt.verify(token, secretKey);
		(req as CustomRequest).token = decoded;
	} else {
		return res.status(401).json({ error: "Unauthorized" });
	}
};
