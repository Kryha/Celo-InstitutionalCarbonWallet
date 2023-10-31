"use client";

import { UsersTable } from "@/features";
import { Grid } from "@mui/material";

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
        <UsersTable />
      </Grid>
    </Grid>
  );
}
