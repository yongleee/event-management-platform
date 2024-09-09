import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Container, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/api.ts";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import ErrorSnackbar from "../components/ErrorSnackbar";

interface LoginFormValues {
	email: string;
	password: string;
}

interface ErrorResponse {
	error?: string; // Adjust according to your error response structure
}

const Login: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>();
	const navigate = useNavigate();
	const [loginError, setLoginError] = useState("");
	const [openError, setOpenError] = useState<boolean>(false);

	const handleError = (error: string) => {
		setLoginError(error);
		setOpenError(true);
	};

	const handleClose = () => {
		setOpenError(false);
	};

	const mutation = useMutation({
		mutationFn: (data: LoginFormValues) => loginUser(data.email, data.password),
		onSuccess: (data) => {
			navigate("/events");
			localStorage.setItem("token", data.token);
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

	const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
		mutation.mutate(data);
	};

	return (
		<>
			<Container maxWidth="xs">
				<Typography variant="h4" gutterBottom>
					Login
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
						Login
					</Button>
				</form>
				<ErrorSnackbar
					open={openError}
					message={loginError}
					onClose={handleClose}
				/>
			</Container>
		</>
	);
};

export default Login;
