"use client";

import TextField from "@mui/material/TextField";
import React from "react";
import { useController } from "react-hook-form";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import { FormNumberInputProps } from "./types";

export const FormNumberInput: React.FC<FormNumberInputProps> = ({
  control,
  name,
  label,
  defaultValue,
  rules,
  transform,
  textFieldProps
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
  });
  const { onChange, ...rest } = field;
  const value = transform?.input ? transform.input(field.value) : field.value;

  const handleOnChange = (values: NumberFormatValues) => {
    const { floatValue } = values;
    const transformedValue = transform?.output ? transform?.output(floatValue) : floatValue;
    const newValue = typeof transformedValue === "number" ? transformedValue : null;

    onChange(newValue);
  };

  return (
    <NumericFormat
      {...rest}
      label={label}
      value={value}
      customInput={TextField}
      error={Boolean(error)}
      helperText={error?.message}
      onValueChange={handleOnChange}
      {...textFieldProps as any}
    />
  );
};
