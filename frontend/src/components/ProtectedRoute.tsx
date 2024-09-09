import { Navigate } from "react-router-dom";
import useIsAuthenticated from "../hooks/useIsAuthenticated";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
	return useIsAuthenticated() ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
