import { useQueryClient } from "@tanstack/react-query";

const TOKEN_KEY: string = "authToken";

export function useAuthToken() {
	const queryClient = useQueryClient();

	const getToken = () => queryClient.getQueryData<string>([TOKEN_KEY]) ?? "";

	const setToken = (token: string) =>
		queryClient.setQueryData([TOKEN_KEY], token);

	const removeToken = () =>
		queryClient.removeQueries({ queryKey: [TOKEN_KEY], exact: true });

	return {
		getToken,
		setToken,
		removeToken,
	};
}
