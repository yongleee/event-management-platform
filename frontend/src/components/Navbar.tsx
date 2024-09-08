import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
	return (
		<AppBar position="static" color="primary">
			<Toolbar
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Typography variant="h6" component="div" sx={{ mr: 5 }}>
						Event Management Platform
					</Typography>
					<Link to="/events">
						<Button variant="text" sx={{ textTransform: "none" }}>
							<Typography variant="body1" color="white" align="center">
								Events
							</Typography>
						</Button>
					</Link>
					<Link to="/preview">
						<Button variant="text" sx={{ textTransform: "none" }}>
							<Typography variant="body1" color="white" align="center">
								Preview
							</Typography>
						</Button>
					</Link>
				</Box>
				<Link to="/">
					<Button variant="text" sx={{ textTransform: "none" }}>
						<Typography variant="body1" color="white" align="center">
							Log Out
						</Typography>
					</Button>
				</Link>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
