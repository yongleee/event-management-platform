import React, { useState } from "react";
import {
	Button,
	Modal,
	Box,
	Typography,
	IconButton,
	TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteEvent } from "../api/protectedApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import ErrorSnackbar from "./ErrorSnackbar";
import { AxiosError } from "axios";

interface DeleteButtonProps {
	eventId: string;
	eventName: string;
}

interface LoginFormValues {
	email: string;
	password: string;
}

interface ErrorResponse {
	error?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ eventId, eventName }) => {
	const [open, setOpen] = useState(false);
	const [loginError, setLoginError] = useState("");
	const [openError, setOpenError] = useState<boolean>(false);

	const handleError = (error: string) => {
		setLoginError(error);
		setOpenError(true);
	};

	const handleCloseError = () => {
		setOpenError(false);
	};

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: deleteEvent,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
		},
		onError: (error: AxiosError<ErrorResponse>) => {
			if (error.response && error.response.data) {
				const errorData = error.response.data;
				handleError(errorData.error || "An unknown error occurred");
			} else {
				console.error("An error occurred:", error.message);
			}
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>();

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// const onConfirmDelete = () => {
	// 	mutation.mutate({ eventId });
	// 	handleClose();
	// };

	const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
		mutation.mutate({ eventId, ...data });
		handleClose();
	};

	return (
		<>
			<IconButton color="secondary" onClick={handleOpen}>
				<DeleteIcon />
			</IconButton>
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
						Verify To Delete {eventName}
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)}>
						<TextField
							label="Email"
							fullWidth
							margin="normal"
							{...register("email", { required: "Email is required" })}
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
						<TextField
							label="Password"
							type="password"
							fullWidth
							margin="normal"
							{...register("password", { required: "Password is required" })}
							error={!!errors.password}
							helperText={errors.password?.message}
						/>
						<Button type="submit" variant="contained" color="primary" fullWidth>
							Delete
						</Button>
					</form>
					<ErrorSnackbar
						open={openError}
						message={loginError}
						onClose={handleCloseError}
					/>
				</Box>
			</Modal>
		</>
	);
};

export default DeleteButton;
