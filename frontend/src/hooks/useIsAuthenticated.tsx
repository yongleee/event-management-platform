import { useAuthToken } from "./useAuthToken";

export function useIsAuthenticated() {
	const { getToken } = useAuthToken();
	const token = getToken();
	return !!token;
}
