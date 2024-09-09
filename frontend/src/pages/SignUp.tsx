import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Container, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "../api/api.ts";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import ErrorSnackbar from "../components/ErrorSnackbar";

interface SignUpValues {
	email: string;
	password: string;
}

interface SignUpFormValues extends SignUpValues {
	confirmPassword: string;
}

interface ErrorResponse {
	error?: string;
}

const SignUp: React.FC = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SignUpFormValues>();
	const navigate = useNavigate();
	const [signUpError, setSignUpError] = useState("");
	const [openError, setOpenError] = useState<boolean>(false);
	const password = watch("password");

	const handleError = (error: string) => {
		setSignUpError(error);
		setOpenError(true);
	};

	const handleClose = () => {
		setOpenError(false);
	};

	const mutation = useMutation({
		mutationFn: (data: SignUpValues) => signUpUser(data.email, data.password),
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

	const onSubmit: SubmitHandler<SignUpValues> = (data) => {
		mutation.mutate(data);
	};

	return (
		<>
			<Container maxWidth="xs">
				<Typography variant="h4" gutterBottom>
					Sign Up
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
					<TextField
						label="Confirm Password"
						type="password"
						fullWidth
						margin="normal"
						{...register("confirmPassword", {
							required: "Confirm Password is required",
							validate: (value) =>
								value === password || "Passwords do not match",
						})}
						error={!!errors.confirmPassword}
						helperText={errors.confirmPassword?.message}
					/>
					<Button type="submit" variant="contained" color="primary" fullWidth>
						Sign Up
					</Button>
				</form>
				<ErrorSnackbar
					open={openError}
					message={signUpError}
					onClose={handleClose}
				/>
			</Container>
		</>
	);
};

export default SignUp;
