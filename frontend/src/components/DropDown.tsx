import React from "react";
import {
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	SelectChangeEvent,
} from "@mui/material";

type DropdownProps = {
	handleChange: (event: SelectChangeEvent<string>) => void;
	filterStatus: string;
};

interface Option {
	value: string;
	label: string;
}

const options: Option[] = [
	{ value: "", label: "All" },
	{ value: "completed", label: "Completed" },
	{ value: "ongoing", label: "Ongoing" },
];

const Dropdown: React.FC<DropdownProps> = ({ handleChange, filterStatus }) => {
	return (
		<FormControl fullWidth sx={{ my: 2 }}>
			<InputLabel id="dropdown-label">Filter Status</InputLabel>
			<Select
				labelId="dropdown-label"
				value={filterStatus}
				onChange={handleChange}
				label="Select an Option"
				style={{ width: "200px" }}
			>
				{options.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default Dropdown;
