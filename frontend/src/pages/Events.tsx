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

interface Data {
	name: string;
	age: number;
	occupation: string;
}

// Sample data
const rows: Data[] = [
	{ name: "John Doe", age: 28, occupation: "Engineer" },
	{ name: "Jane Smith", age: 34, occupation: "Designer" },
	{ name: "Mark Johnson", age: 45, occupation: "Developer" },
];

const Events: React.FC = () => {
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Age</TableCell>
						<TableCell>Occupation</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<TableRow key={index}>
							<TableCell>{row.name}</TableCell>
							<TableCell>{row.age}</TableCell>
							<TableCell>{row.occupation}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default Events;
