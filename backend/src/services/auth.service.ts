import bcrypt from "bcryptjs";
import User from "../models/user.model";
import validator from "validator";
import jwt, { Secret } from "jsonwebtoken";

class AuthService {
	loginUser = async (email: string, password: string) => {
		try {
			const foundUser = await User.findOne({ email });

			if (!foundUser) {
				throw new Error("Name of user is not correct");
			}

			const isMatch = bcrypt.compareSync(password, foundUser.password);

			if (isMatch) {
				const secretKey: Secret = process.env.ACCESS_TOKEN_SECRET || "";
				const token = jwt.sign(
					{ _id: foundUser._id?.toString(), email: foundUser.email },
					secretKey,
					{
						expiresIn: "2 days",
					}
				);

				return { email, token };
			} else {
				throw new Error("Password is not correct");
			}
		} catch (error) {
			throw error;
		}
	};
}

export default new AuthService();
