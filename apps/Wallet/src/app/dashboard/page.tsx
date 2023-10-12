"use client";

import { SendTransactionForm } from "@/features";
import Box from "@mui/material/Box";

export default function Dashboard() {
  return (
    <Box p={4}>
      <SendTransactionForm />
    </Box>
  );
}
