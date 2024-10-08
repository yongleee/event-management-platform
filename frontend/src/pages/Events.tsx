import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	SelectChangeEvent,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../api/api";
import CreateEventModal from "../components/CreateEventModal";
import UploadImageForm from "../components/UploadImageModal";
import Dropdown from "../components/DropDown";
import EditEventModal from "../components/EditEventModal";
import DeleteButton from "../components/DeleteButton";

interface EventsType {
	_id: string;
	eventName: string;
	startDate: string;
	endDate: string;
	location: string;
	status: string;
}

const Events: React.FC = () => {
	const [filterStatus, setFilterStatus] = useState<string>("");

	const { data, error, isLoading, isError } = useQuery<EventsType[], Error>({
		queryKey: ["events", filterStatus],
		queryFn: ({ queryKey }) => fetchEvents(queryKey[1] as string),
	});

	const handleChange = (event: SelectChangeEvent<string>) => {
		setFilterStatus(event.target.value as string);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<>
			<Dropdown handleChange={handleChange} filterStatus={filterStatus} />
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align="center">Event Name</TableCell>
							<TableCell align="center">Start Date</TableCell>
							<TableCell align="center">End Date</TableCell>
							<TableCell align="center">Location</TableCell>
							<TableCell align="center">Status</TableCell>
							<TableCell align="center">Upload Thumbnail</TableCell>
							<TableCell align="center">Edit</TableCell>
							<TableCell align="center">Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.map((row, index) => (
							<TableRow key={index}>
								<TableCell align="center">{row.eventName}</TableCell>
								<TableCell align="center">{row.startDate}</TableCell>
								<TableCell align="center">{row.endDate}</TableCell>
								<TableCell align="center">{row.location}</TableCell>
								<TableCell align="center">{row.status}</TableCell>
								<TableCell align="center">
									<UploadImageForm
										eventId={row._id}
										eventName={row.eventName}
									/>
								</TableCell>
								<TableCell align="center">
									<EditEventModal {...row} />
								</TableCell>
								<TableCell align="center">
									<DeleteButton eventId={row._id} eventName={row.eventName} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<CreateEventModal />
		</>
	);
};

export default Events;
