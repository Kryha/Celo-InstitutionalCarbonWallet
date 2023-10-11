import { FormControlProps } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";
import { Control, RegisterOptions } from "react-hook-form";

export type DropdownOption = { label: string; value: string };

export type Transform = {
  input: (value: number | undefined) => number | undefined;
  output: (value: number | undefined) => number | undefined;
};

export type FormInputBase = {
  name: string;
  control: Control<any>;
  label: string;
  rules?: RegisterOptions;
  defaultValue?: number | string | DropdownOption;
  textFieldProps?: TextFieldProps;
};

export type FormNumberInputProps = {
  transform?: Transform;
} & FormInputBase;

export type FormDropDownInput = FormInputBase & { options: DropdownOption[]; formControlProps?: FormControlProps };
