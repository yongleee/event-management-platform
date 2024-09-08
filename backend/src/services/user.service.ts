import bcrypt from "bcryptjs";
import User from "../models/user.model";
import validator from "validator";

class UserService {
	createNewUser = async (email: string, password: string) => {
		if (!email || !password) {
			throw Error("All fields must be filled.");
		}

		if (!validator.isEmail(email)) {
			throw Error("Email is not valid.");
		}

		if (!validator.isStrongPassword(password)) {
			throw Error(
				"Passwords must contain at least 8 characters in upper and lowercase, with at least 1 number and 1 symbol."
			);
		}

		const existedEmail = await User.findOne({ email });
		if (existedEmail) {
			throw Error("Email already in use.");
		}

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const user = await User.create({ email, password: hash });

		return user;
	};
}

export default new UserService();
