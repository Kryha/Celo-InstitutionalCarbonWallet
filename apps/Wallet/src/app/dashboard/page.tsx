"use client";

import { SendTransactionForm, TransactionsList } from "@/features";
import Grid from "@mui/material/Grid";

export default function Dashboard() {
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
        md={4}
      >
        <SendTransactionForm />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
      >
        <TransactionsList />
      </Grid>
    </Grid>
  );
}
