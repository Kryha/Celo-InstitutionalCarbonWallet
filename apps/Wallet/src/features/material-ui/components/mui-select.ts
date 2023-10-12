import { Components, Theme } from "@mui/material";

export const MuiFormControl = (theme: Theme): Components["MuiFormControl"] => {
  const { palette } = theme;
  return {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: palette.primary.light,
          },
          "&:hover fieldset": {
            borderColor: palette.secondary.main,
          },
          "& svg": {
            color: palette.primary.light,
          },
          "&.Mui-error svg": {
            color: palette.error.main,
          },
          '&.Mui-focused svg': {
            color: palette.secondary.main,
          },
        },
      },
    },
  };
};
