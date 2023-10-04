import { Components, Theme } from "@mui/material";

import { MuiButton } from "./mui-button";

export const components = (theme: Theme): Components => {
  return {
    MuiButton: MuiButton(theme),
  };
};
