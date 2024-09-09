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

export interface IEvent {
	eventName: string;
	startDate: string;
	endDate: string;
	location: string;
}

export interface IEventWithStatus {
	eventName: string;
	startDate: string;
	endDate: string;
	location: string;
	status: string;
}

export const createEvent = async (
	newEvent: IEvent
): Promise<IEventWithStatus> => {
	const { data } = await axiosURL.post("/event/create-event", newEvent);
	return data;
};

export const createImage = async ({
	eventId,
	data,
}: {
	eventId: string;
	data: FormData;
}) => {
	return axiosURL.post(`/event/create-image/${eventId}`, data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

export const editEvent = async ({
	eventId,
	eventData,
}: {
	eventId: string;
	eventData: IEventWithStatus;
}): Promise<IEventWithStatus> => {
	const { data } = await axiosURL.put(
		`/event/edit-event/${eventId}`,
		eventData
	);
	return data;
};

export const deleteEvent = async ({
	eventId,
}: {
	eventId: string;
}): Promise<void> => {
	await axiosURL.put(`/event/delete-event/${eventId}`);
};
