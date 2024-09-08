import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { Control } from "react-hook-form";
import { SxProps, Theme } from "@mui/material";

interface FormInputProps {
	name: string;
	control: Control;
	label: string;
	sx?: SxProps<Theme>;
}

export const FormInputText = ({ name, control, label, sx }: FormInputProps) => {
	return (
		<Controller
			name={name}
			control={control}
			render={(renderProps) => (
				<TextField
					size="small"
					onChange={renderProps.field.onChange}
					value={renderProps.field.value}
					error={!!renderProps.fieldState.error}
					helperText={renderProps.fieldState.error?.message ?? null}
					fullWidth
					label={label}
					variant="outlined"
					sx={sx}
				/>
			)}
		/>
	);
};
