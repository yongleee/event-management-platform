import React, { useState } from "react";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { createEvent } from "../api/protectedApi";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface IFormInput {
	eventName: string;
	startDate: string;
	endDate: string;
	location: string;
}

const CreateEventModal: React.FC = () => {
	const today = dayjs();

	const [open, setOpen] = useState(false);
	const [maxDate, setMaxDate] = useState<Dayjs>();
	const [minDate, setMinDate] = useState<Dayjs>();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>();

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// Handle form submission
	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		const createdBy: string = localStorage.getItem("id") || "";
		const { eventName, startDate, endDate, location } = data;
		createEvent(eventName, startDate, endDate, location, createdBy);

		handleClose();
	};

	return (
		<div>
			<Button variant="contained" onClick={handleOpen}>
				Add an Event
			</Button>

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
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Create an event:
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)}>
						<TextField
							label="Event Name"
							variant="outlined"
							fullWidth
							margin="normal"
							{...register("eventName", { required: "Event Name is required" })}
							error={!!errors.eventName}
							helperText={errors.eventName ? errors.eventName.message : ""}
						/>
						<Controller
							name="startDate"
							control={control}
							defaultValue={today.format("YYYY-MM-DD")}
							rules={{ required: "Date is required" }}
							render={({ field }) => (
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										label="Select Date"
										value={dayjs(field.value)}
										onChange={(date) => {
											field.onChange(date?.format("YYYY-MM-DD"));
											setMinDate(date!);
										}}
										maxDate={maxDate}
										slotProps={{
											textField: {
												fullWidth: true,
												margin: "normal",
												error: !!errors.startDate,
												helperText: errors.startDate
													? "Start Date is required"
													: "",
											},
										}}
									/>
								</LocalizationProvider>
							)}
						/>
						<Controller
							name="endDate"
							control={control}
							defaultValue={today.format("YYYY-MM-DD")}
							rules={{ required: "Date is required" }}
							render={({ field }) => (
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										label="Select Date"
										value={dayjs(field.value)}
										onChange={(date) => {
											field.onChange(date?.format("YYYY-MM-DD"));
											setMaxDate(date!);
										}}
										minDate={minDate}
										slotProps={{
											textField: {
												fullWidth: true,
												margin: "normal",
												error: !!errors.endDate,
												helperText: errors.endDate
													? "End Date is required"
													: "",
											},
										}}
									/>
								</LocalizationProvider>
							)}
						/>
						<TextField
							label="Location"
							variant="outlined"
							fullWidth
							margin="normal"
							{...register("location", { required: "Location is required" })}
							error={!!errors.location}
							helperText={errors.location ? errors.location.message : ""}
						/>

						<Button type="submit" variant="contained" color="primary" fullWidth>
							Submit
						</Button>
					</form>
				</Box>
			</Modal>
		</div>
	);
};

export default CreateEventModal;
