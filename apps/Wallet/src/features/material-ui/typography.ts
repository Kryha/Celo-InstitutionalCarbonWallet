import { Theme } from "@mui/material";
import { Typography } from "@mui/material/styles/createTypography";
import { Inter } from "next/font/google";

const font = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
});

export const typography = (props: Theme): Typography => {
  const fontSize = 16;
  const coef = fontSize / 14;
  const pxToRem = (px: number) => `${(px / fontSize) * coef}rem`;
  const { palette } = props;

  return {
    fontFamily: font.style.fontFamily,
    fontSize: fontSize,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    htmlFontSize: 16,
    pxToRem: pxToRem,
    h1: {
      fontFamily: font.style.fontFamily,
      fontSize: "96px",
      fontWeight: 700,
      lineHeight: "116px",
      color: palette.primary.main,
    },
    h2: {
      fontFamily: font.style.fontFamily,
      fontSize: "64px",
      fontWeight: 700,
      lineHeight: "80px",
    },
    h3: {
      fontFamily: font.style.fontFamily,
      fontSize: "40px",
      fontWeight: 700,
      lineHeight: "48px",
    },
    h4: {
      fontFamily: font.style.fontFamily,
      fontSize: "24px",
      fontWeight: 700,
      lineHeight: "30px",
    },
    h5: {
      fontFamily: font.style.fontFamily,
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: "20px",
    },
    h6: {
      fontFamily: font.style.fontFamily,
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: "14px",
      textTransform: "uppercase" as const,
    },
    subtitle1: {
      fontFamily: font.style.fontFamily,
      fontSize: "20px",
      fontWeight: 700,
      lineHeight: "20px",
    },
    subtitle2: {
      fontFamily: font.style.fontFamily,
      fontSize: "14px",
      fontWeight: 700,
      lineHeight: "18px",
      textTransform: "uppercase" as const,
      color: palette.secondary.dark,
    },
    body1: {
      fontFamily: font.style.fontFamily,
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "20px",
    },
    body2: {
      fontFamily: font.style.fontFamily,
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "16px",
    },
    button: {
      fontFamily: font.style.fontFamily,
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "24px",
      textTransform: "uppercase" as const,
    },
    caption: {
      fontFamily: font.style.fontFamily,
      fontSize: "16px",
      fontWeight: 300,
      lineHeight: "16px",
    },
    overline: {
      fontFamily: font.style.fontFamily,
      fontSize: "20px",
      fontWeight: 500,
      lineHeight: "28px",
      color: palette.common.white,
    },
  };
};
