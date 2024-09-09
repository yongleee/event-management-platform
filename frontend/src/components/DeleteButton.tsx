import React, { useState } from "react";
import { Button, Modal, Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteEvent } from "../api/protectedApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteButtonProps {
	eventId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ eventId }) => {
	const [open, setOpen] = useState(false);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: deleteEvent,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
		},
	});

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const onConfirmDelete = () => {
		mutation.mutate({ eventId });
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
						Confirm Delete
					</Typography>
					<Typography variant="body1" gutterBottom>
						Are you sure you want to delete this item? This action cannot be
						undone.
					</Typography>
					<Box display="flex" justifyContent="space-between" mt={2}>
						<Button variant="contained" color="error" onClick={onConfirmDelete}>
							Delete
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

export default DeleteButton;
