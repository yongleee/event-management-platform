import axios, { AxiosRequestConfig } from "axios";
export const BASE_URL: string = "http://localhost:3000";

const axiosURL = axios.create({
	baseURL: BASE_URL,
});

export const loginUser = async (email: string, password: string) => {
	const { data } = await axiosURL.post("/auth/login", { email, password });
	return data;
};

export const signUpUser = async (email: string, password: string) => {
	const { data } = await axiosURL.post("/user/signup", { email, password });
	return data;
};

export const fetchEvents = async (status: string) => {
	const config: AxiosRequestConfig = {
		params: {
			status,
		},
	};

	const { data } = await axiosURL.get("/event", config);
	return data;
};

interface IImage {
	_id: string;
	imagePath: string;
}

export interface IEventWithImage {
	_id: string;
	eventName: string;
	startDate: string;
	endDate: string;
	location: string;
	status: string;
	image: IImage;
}

export const fetchEventsWithImages = async (): Promise<IEventWithImage[]> => {
	const { data } = await axiosURL.get("/event/get-events-images");

	return data;
};
