import { Components, Theme } from "@mui/material";

import { MuiButton } from "./mui-button";
import { MuiTextField } from "./mui-text-field";
import { MuiFormControl } from "./mui-select";

export const components = (theme: Theme): Components => {
  return {
    MuiButton: MuiButton(theme),
    MuiTextField: MuiTextField(theme),
    MuiFormControl: MuiFormControl(theme)
  };
};
