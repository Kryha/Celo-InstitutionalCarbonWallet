import { Palette, Theme } from "@mui/material";

export const palette = (theme: Theme): Palette => {
  return {
    ...theme.palette,
    primary: {
      light: "#AFA3D1",
      main: "#453C62",
      dark: "#453C62",
      contrastText: "#CCFF00",
    },
    secondary: {
      light: "#CCFF00",
      main: "#CCFF00",
      dark: "#CCFF00",
      contrastText: "#453C62",
    },
    text: {
      primary: "#AFA3D1",
      secondary: "#AFA3D1",
      disabled: "#AFA3D1",
    },
  };
};
