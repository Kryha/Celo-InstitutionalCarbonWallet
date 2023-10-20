"use client";

import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";
import { FormDropDownInput } from "./types";

export const FormDropdownInput: React.FC<FormDropDownInput> = ({
  name,
  control,
  label,
  options,
  formControlProps,
  rules,
}) => {
  const selectName = `${name}-form-dropdown-input`;
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
  });
  const { onChange, value } = field;

  const generateSingleOptions = () => {
    return options.map((option: any) => {
      return (
        <MenuItem
          key={option.value}
          value={option.value}
        >
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl
      fullWidth
      {...formControlProps}
      error={Boolean(error)}
    >
      <InputLabel id={selectName}>{label}</InputLabel>
      <Select
        labelId={selectName}
        value={value}
        label={label}
        onChange={onChange}
        inputProps={{ MenuProps: { disableScrollLock: true } }}
      >
        {generateSingleOptions()}
      </Select>
      {Boolean(error) && <FormHelperText>{error?.message}</FormHelperText>}
    </FormControl>
  );
};
