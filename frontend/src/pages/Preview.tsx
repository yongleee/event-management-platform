import React, { useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchEventsWithImages, BASE_URL, IEventWithImage } from "../api/api";

const Preview: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [currentImageInfo, setCurrentImageInfo] =
		useState<IEventWithImage | null>(null);

	const { data, error, isLoading, isError } = useQuery({
		queryKey: ["events-image"],
		queryFn: fetchEventsWithImages,
	});

	const handleOpen = (imageInfo: IEventWithImage) => {
		setCurrentImageInfo(imageInfo);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setCurrentImageInfo(null);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<>
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					gap: 2,
				}}
			>
				{data &&
					data.map((imageData: IEventWithImage, index) => (
						<Box key={index} sx={{ width: "calc(33.333% - 16px)" }}>
							<Button
								onClick={() => handleOpen(imageData)}
								style={{ padding: 0 }}
							>
								<img
									src={
										imageData?.image?.imagePath &&
										`${BASE_URL}/${imageData?.image?.imagePath}`
									}
									alt={`${imageData.eventName}`}
									style={{ width: "100%", height: "auto" }}
								/>
							</Button>
						</Box>
					))}
			</Box>

			<Modal open={open} onClose={handleClose}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "auto",
						maxHeight: "80%",
						bgcolor: "background.paper",
						boxShadow: 24,
						p: 4,
						overflow: "auto",
						borderRadius: 1,
					}}
				>
					{currentImageInfo && (
						<Box>
							<Typography variant="h6" gutterBottom>
								{currentImageInfo.eventName}
							</Typography>
							<Typography variant="body1">
								<strong>Start Date:</strong>{" "}
								{new Date(currentImageInfo.startDate).toDateString()}
							</Typography>
							<Typography variant="body1">
								<strong>End Date:</strong>{" "}
								{new Date(currentImageInfo.endDate).toDateString()}
							</Typography>
							<Typography variant="body1">
								<strong>Location:</strong> {currentImageInfo.location}
							</Typography>
							<Typography variant="body1">
								<strong>Status:</strong> {currentImageInfo.status}
							</Typography>
						</Box>
					)}
				</Box>
			</Modal>
		</>
	);
};

export default Preview;
