import bcrypt from "bcryptjs";
import User from "../models/user.model";
import jwt, { Secret } from "jsonwebtoken";

class AuthService {
	loginUser = async (email: string, password: string) => {
		try {
			const foundUser = await User.findOne({ email });

			if (!foundUser) {
				throw new Error("Email of user is not correct");
			}

			const isMatch = bcrypt.compareSync(password, foundUser.password);

			if (isMatch) {
				const secretKey: Secret =
					process.env.ACCESS_TOKEN_SECRET ||
					"56176a976ff3cd4bb3163ffb703a72f66fa68b9b13309f49bbc7aa8d23601d30264fe58d6158c17ab5bb406be555b9532f19a6c0ddb087e0d466fa9b64ab3701";
				const token = jwt.sign(
					{ _id: foundUser._id?.toString(), email: foundUser.email },
					secretKey,
					{
						expiresIn: "2 days",
					}
				);

				return { id: foundUser._id, email, token };
			} else {
				throw new Error("Password is not correct");
			}
		} catch (error) {
			throw error;
		}
	};
}

export default new AuthService();
