import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../api/api";
import EventEditModal from "../components/CreateEventModal";

interface EventsType {
	_id: string;
	eventName: string;
	startDate: string;
	endDate: string;
	location: string;
	status: string;
}

const Events: React.FC = () => {
	const { data, error, isLoading, isError } = useQuery<EventsType[], Error>({
		queryKey: ["events"],
		queryFn: fetchEvents,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Event Name</TableCell>
							<TableCell>Start Date</TableCell>
							<TableCell>End Date</TableCell>
							<TableCell>Location</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.map((row, index) => (
							<TableRow key={index}>
								<TableCell>{row.eventName}</TableCell>
								<TableCell>{row.startDate}</TableCell>
								<TableCell>{row.endDate}</TableCell>
								<TableCell>{row.location}</TableCell>
								<TableCell>{row.status}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<EventEditModal />
		</>
	);
};

export default Events;
