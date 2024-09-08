import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#007bff",
		},
		secondary: {
			main: "#6c757d",
		},
		background: {
			default: "#f8f9fa",
		},
	},
});

export default lightTheme;
