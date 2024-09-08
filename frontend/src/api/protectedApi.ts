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

export const createEvent = async (
	eventName: string,
	startDate: string,
	endDate: string,
	location: string,
	createdBy: string
) => {
	const { data } = await axiosURL.post("/event/create-event", {
		eventName,
		startDate,
		endDate,
		location,
		createdBy,
	});
	return data;
};
