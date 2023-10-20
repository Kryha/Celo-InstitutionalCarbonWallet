import { Components, Theme } from "@mui/material";

export const MuiButton = (theme: Theme): Components["MuiButton"] => {
  const { palette } = theme;
  return {
    variants: [
      {
        props: { variant: "outlined" },
        style: {
          backgroundColor: "transparent",
          color: palette.secondary.main,
          borderWidth: "1px",
          borderColor: palette.secondary.main,
          borderRadius: "12px",
          textTransform: "none",
          py: 2,
          fontSize: "16px",
          fontWeight: 300,

          "&:hover": {
            backgroundColor: "transparent",
            borderColor: palette.secondary.main,
          },

          "&.Mui-disabled:hover": {
            backgroundColor: "transparent",
            borderColor: 'inherit',
          },
        },
      },
    ],
  };
};
