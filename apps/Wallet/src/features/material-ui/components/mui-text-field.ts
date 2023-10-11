import { Components, Theme } from "@mui/material";

export const MuiTextField = (theme: Theme): Components["MuiTextField"] => {
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
          "&:after": {
            color: palette.primary.light,
          },
          "&.Mui-focused .MuiSvgIcon-root": {
            borderColor: palette.secondary.main,
          },
        },
      },
    },
  };
};
