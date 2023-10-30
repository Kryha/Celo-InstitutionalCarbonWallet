import { Grid, Typography } from "@mui/material";
import Link from "next/link";

export default function Users() {
  return (
    <Grid
      container
      py={4}
      px={{ xs: 1, sm: 2, md: 4 }}
      spacing={4}
    >
      <Grid
        item
        xs={12}
      >
        <Typography>Users Page</Typography>
        <Link href="/dashboard">Go to dashboard</Link>
      </Grid>
    </Grid>
  );
}
