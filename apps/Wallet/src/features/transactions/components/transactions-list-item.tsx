"use client";

import { shortenHashString } from "@/utils";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Chip, Stack, Theme, Typography, useMediaQuery } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ethers } from "ethers";
import { useState } from "react";
import { EXCHANGE_TRANSFER_LIST } from "../constants";
import { TransactionsListItemProps } from "../types";
import { TransactionDialog } from "./transaction-dialog";

dayjs.extend(relativeTime);

export function TransactionsListItem(props: TransactionsListItemProps) {
  const { id, date, from, to, value } = props;
  const [open, setOpen] = useState(false);
  const isBiggerThanSmScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const exchange = EXCHANGE_TRANSFER_LIST.find((exchange) => exchange.value === to);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem
        disablePadding
        onClick={handleClickOpen}
      >
        <ListItemButton>
          {isBiggerThanSmScreen && (
            <ListItemIcon>
              <ReceiptIcon sx={(theme) => ({ color: theme.palette.primary.light })} />
            </ListItemIcon>
          )}
          <ListItemText
            primary={
              <Stack
                direction="row"
                justifyContent="space-between"
                gap={2}
                alignItems="center"
              >
                {isBiggerThanSmScreen && (
                  <Stack>
                    <Typography
                      variant="body2"
                      color="primary.light"
                    >
                      {shortenHashString(id)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="primary.light"
                    >
                      {dayjs(date).fromNow()}
                    </Typography>
                  </Stack>
                )}

                <Stack>
                  <Typography
                    variant="body2"
                    color="primary.light"
                  >
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      component="span"
                    >
                      From:{" "}
                    </Typography>
                    {shortenHashString(from)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary.light"
                  >
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      component="span"
                    >
                      To:{" "}
                    </Typography>
                    {exchange?.label || shortenHashString(to)}
                  </Typography>
                </Stack>
                <Stack>
                  <Chip label={`${ethers.utils.formatEther(ethers.BigNumber.from(value))} CELO`} />
                </Stack>
              </Stack>
            }
          />
        </ListItemButton>
      </ListItem>
      <TransactionDialog
        id={id}
        date={date}
        from={from}
        to={to}
        value={value}
        open={open}
        handleClickOpen={handleClickOpen}
      />
    </>
  );
}
