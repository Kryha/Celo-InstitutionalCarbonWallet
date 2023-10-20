"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { Fragment } from "react";
import { TransactionsListItem } from "./components";
import { useGetTransactions } from "./services";

export function TransactionsList() {
  const { data: transactions = [], isLoading: isLoadingTransactions } = useGetTransactions();

  if (isLoadingTransactions) {
    return (
      <Box
        width={1}
        display="flex"
        justifyContent="center"
      >
        <CircularProgress
          size={20}
          color="secondary"
        />
      </Box>
    );
  }

  return (
    <List sx={{ p: 0 }}>
      {transactions.map((transaction: any) => (
        <Fragment key={transaction.transactionHash}>
          <TransactionsListItem
            id={transaction.transactionHash}
            date={transaction.executionDate}
            from={transaction.executor}
            to={transaction.to}
            value={transaction.value}
          />
          <Divider />
        </Fragment>
      ))}
    </List>
  );
}
