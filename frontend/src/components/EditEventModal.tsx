import React, { useState } from "react";
import {
	Button,
	Modal,
	Box,
	TextField,
	Typography,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
	IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { editEvent } from "../api/protectedApi";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IFormInput {
	eventName: string;
	startDate: string;
	endDate: string;
	location: string;
	status: string;
}

interface EditEventModalProps extends IFormInput {
	_id: string;
}

const EditEventModal: React.FC<EditEventModalProps> = (props) => {
	const queryClient = useQueryClient();

	const [open, setOpen] = useState(false);
	const [maxDate, setMaxDate] = useState<Dayjs>();
	const [minDate, setMinDate] = useState<Dayjs>();

	const mutation = useMutation({
		mutationFn: editEvent,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
		},
	});

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>();

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		const eventId = props._id;
		mutation.mutate({ eventId, eventData: data });
		handleClose();
	};

	return (
		<>
			<IconButton color="secondary" onClick={handleOpen}>
				<EditIcon />
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
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Edit event:
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
							defaultValue={props.eventName}
						/>
						<Controller
							name="startDate"
							control={control}
							defaultValue={props.startDate}
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
							defaultValue={props.endDate}
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
							defaultValue={props.location}
						/>
						<FormControl fullWidth margin="normal">
							<InputLabel id="dropdown-label">Status</InputLabel>
							<Controller
								name="status"
								control={control}
								defaultValue={props.status}
								render={({ field }) => (
									<Select
										{...field}
										labelId="dropdown-label"
										label="Select an option"
									>
										<MenuItem value="ongoing">Ongoing</MenuItem>
										<MenuItem value="completed">Completed</MenuItem>
									</Select>
								)}
							/>
						</FormControl>
						<Button type="submit" variant="contained" color="primary" fullWidth>
							Submit
						</Button>
					</form>
				</Box>
			</Modal>
		</>
	);
};

export default EditEventModal;
