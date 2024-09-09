import axios from "axios";
const BASE_URL: string = "http://localhost:3000";

const axiosURL = axios.create({
	baseURL: BASE_URL,
});

const getToken = () => {
	console.log(localStorage.getItem("token"));

	return localStorage.getItem("token");
};

axiosURL.interceptors.request.use(
	(config) => {
		const token = getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export interface EventPayload {
	eventName: string;
	startDate: string;
	endDate: string;
	location: string;
}

export interface EventReturn {
	eventName: string;
	startDate: string;
	endDate: string;
	location: string;
	status: string;
}

export const createEvent = async (
	newEvent: EventPayload
): Promise<EventReturn> => {
	const { data } = await axiosURL.post("/event/create-event", newEvent);
	return data;
};

export const createImage = async ({
	eventId,
	data,
}: {
	eventId: string;
	data: any;
}) => {
	return axiosURL.post(`/event/create-image/${eventId}`, data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};
