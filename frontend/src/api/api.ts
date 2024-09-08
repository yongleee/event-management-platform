import axios from "axios";
const BASE_URL: string = "http://localhost:3000";

const axiosURL = axios.create({
	baseURL: BASE_URL,
});

export const loginUser = async (email: string, password: string) => {
	const { data } = await axiosURL.post("/auth/login", { email, password });
	return data;
};

export const fetchEvents = async () => {
	const { data } = await axiosURL.get("/event");
	return data;
};
