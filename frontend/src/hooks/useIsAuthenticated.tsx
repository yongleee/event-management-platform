const useIsAuthenticated = () => {
	return !!localStorage.getItem("token");
};

export default useIsAuthenticated;
