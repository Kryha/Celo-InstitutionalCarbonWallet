import Grid from "@mui/material/Grid";
import { ReactNode } from "react";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        backgroundImage: "url(/bg.svg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {children}
    </Grid>
  );
}
