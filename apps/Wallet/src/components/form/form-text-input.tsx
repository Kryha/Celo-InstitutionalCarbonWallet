"use client";

import TextField from "@mui/material/TextField";
import { useController } from "react-hook-form";
import { FormInputBase } from "./types";

export const FormTextInput: React.FC<FormInputBase> = ({ control, name, label, defaultValue, textFieldProps }) => {
  const { field, fieldState } = useController({
    control,
    defaultValue,
    name,
  });

  return (
    <TextField
      {...field}
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      {...textFieldProps}
      error={Boolean(fieldState.error)}
      helperText={fieldState.error?.message}
    />
  );
};
