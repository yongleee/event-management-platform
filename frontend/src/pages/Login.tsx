import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography } from "@mui/material";

interface LoginFormValues {
	email: string;
	password: string;
}

const Login: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>();
	const [isLoginError, setIsLoginError] = useState(false);

	const onSubmit = async (data: LoginFormValues) => {
		// Replace this with your actual login logic
		try {
			const response = await fetch("/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Login failed");
			}

			// Handle successful login (e.g., redirect to dashboard)
			console.log("Login successful");
		} catch (error) {
			console.log(error.message);

			setIsLoginError(true);
		}
	};

	return (
		<>
			<Typography variant="h3" align="center">
				Login
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					label="Email"
					type="email"
					fullWidth
					margin="normal"
					{...register("email", {
						required: true,
						pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
					})}
					error={!!errors.email}
					helperText={errors.email?.message}
				/>
				<TextField
					label="Password"
					type="password"
					fullWidth
					margin="normal"
					{...register("password", { required: true })}
					error={!!errors.password}
					helperText={errors.password?.message}
				/>
				<Button type="submit" variant="contained" color="primary" fullWidth>
					Login
				</Button>
				{isLoginError && <Typography color="error">Login failed</Typography>}
			</form>
		</>
	);
};

export default Login;
