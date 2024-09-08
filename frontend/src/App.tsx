import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./pages/Events";
import Preview from "./pages/Preview";
import Login from "./pages/Login";

function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/events" element={<Events />} />
					<Route path="/preview" element={<Preview />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
