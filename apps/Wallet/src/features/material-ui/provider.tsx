"use client";

import { ThemeProvider as Provider } from "@mui/material";
import { theme } from "./theme";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ThemeProvider: FC<Props> = ({ children }) => {
  return <Provider theme={theme}>{children}</Provider>;
};
