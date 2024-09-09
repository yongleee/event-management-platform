import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Modal } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useIsAuthenticated from "../hooks/useIsAuthenticated";

const Navbar: React.FC = () => {
	const isAuth: boolean = useIsAuthenticated();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/");
		handleClose();
	};

	return (
		<>
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
						{isAuth && (
							<>
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
							</>
						)}
					</Box>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						{isAuth ? (
							<Button
								variant="text"
								sx={{ textTransform: "none" }}
								onClick={handleOpen}
							>
								<Typography variant="body1" color="white" align="center">
									Log Out
								</Typography>
							</Button>
						) : (
							<>
								<Link to="/login">
									<Button variant="text" sx={{ textTransform: "none" }}>
										<Typography variant="body1" color="white" align="center">
											Log In
										</Typography>
									</Button>
								</Link>
								<Link to="/signup">
									<Button variant="text" sx={{ textTransform: "none" }}>
										<Typography variant="body1" color="white" align="center">
											Sign Up
										</Typography>
									</Button>
								</Link>
							</>
						)}
					</Box>
				</Toolbar>
			</AppBar>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 400,
						bgcolor: "background.paper",
						borderRadius: "8px",
						boxShadow: 24,
						p: 4,
					}}
				>
					<Typography variant="h6" gutterBottom>
						Confirm Delete
					</Typography>
					<Typography variant="body1" gutterBottom>
						Are you sure you want to log out?
					</Typography>
					<Box display="flex" justifyContent="space-between" mt={2}>
						<Button variant="contained" color="error" onClick={handleLogout}>
							Log Out
						</Button>
						<Button variant="outlined" onClick={handleClose}>
							Cancel
						</Button>
					</Box>
				</Box>
			</Modal>
		</>
	);
};

export default Navbar;
