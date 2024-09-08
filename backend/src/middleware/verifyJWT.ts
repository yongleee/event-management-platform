import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
	token: string | JwtPayload;
}

const secretKey: Secret =
	process.env.ACCESS_TOKEN_SECRET ||
	"56176a976ff3cd4bb3163ffb703a72f66fa68b9b13309f49bbc7aa8d23601d30264fe58d6158c17ab5bb406be555b9532f19a6c0ddb087e0d466fa9b64ab3701";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;

	if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
		const token = authHeader.split(" ")[1];

		try {
			const decoded = jwt.verify(token, secretKey);
			(req as CustomRequest).token = decoded;
			next(); // Only call next() if the token is valid
		} catch (err) {
			return res
				.status(401)
				.json({ error: "Unauthorized", message: "Invalid token", secretKey });
		}
	} else {
		return res
			.status(401)
			.json({ error: "Unauthorized", message: "Token missing or malformed" });
	}
};
