import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
	Box,
	Button,
	Typography,
	CircularProgress,
	Modal,
	IconButton,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { createImage } from "../api/protectedApi";
import { useQueryClient } from "@tanstack/react-query";

type FormData = {
	image: FileList;
};

interface UploadImageFormProps {
	eventId: string;
	eventName: string;
}

const UploadImageForm: React.FC<UploadImageFormProps> = ({
	eventId,
	eventName,
}) => {
	const [open, setOpen] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: createImage,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
		},
	});

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const onSubmit = (formData: FormData) => {
		const data = new FormData();
		data.append("image", formData.image[0]);

		mutation.mutate({ data, eventId });
		reset();
		handleClose();
	};

	return (
		<>
			<IconButton color="secondary" onClick={handleOpen}>
				<UploadIcon />
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
						{eventName}
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit(onSubmit)}
						sx={{ display: "flex", flexDirection: "column", gap: 2 }}
					>
						<Typography variant="h6">Upload Image</Typography>

						{/* MUI Typography to display the label */}
						<input
							type="file"
							{...register("image", { required: true })}
							accept="image/*"
							style={{ display: "none" }}
							id="image-upload"
						/>

						<label htmlFor="image-upload">
							<Button variant="contained" component="span">
								Choose File
							</Button>
						</label>
						{errors.image && (
							<Typography color="error">Please select an image.</Typography>
						)}

						{/* MUI Button and CircularProgress for loading state */}
						<Button
							type="submit"
							variant="contained"
							color="primary"
							disabled={mutation.isPending}
							startIcon={mutation.isPending && <CircularProgress size={20} />}
						>
							{mutation.isPending ? "Uploading..." : "Upload"}
						</Button>

						{mutation.isError && (
							<Typography color="error">Failed to upload image</Typography>
						)}
					</Box>
				</Box>
			</Modal>
		</>
	);
};

export default UploadImageForm;
