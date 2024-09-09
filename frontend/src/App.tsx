import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./pages/Events";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./pages/SignUp";

function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Preview />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route
						path="/events"
						element={<ProtectedRoute element={<Events />} />}
					/>
					<Route
						path="/preview"
						element={<ProtectedRoute element={<Preview />} />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
