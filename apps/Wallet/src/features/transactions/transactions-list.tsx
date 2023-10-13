"use client";

import { shortenHashString } from "@/utils";
import CloseIcon from "@mui/icons-material/Close";
import ReceiptIcon from "@mui/icons-material/Receipt";
import {
  AppBar,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
  Stack,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { TransitionProps } from "@mui/material/transitions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Fragment, forwardRef, useState } from "react";
import { EXCHANGE_TRANSFER_LIST } from "./constants";
import { useGetTransactions } from "./services";
import { ethers } from "ethers";
dayjs.extend(relativeTime);

// TODO: split components

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});

export function ListItems(props: any) {
  const { id, date, from, to, value } = props;
  const [open, setOpen] = useState(false);
  const isBiggerThanSmScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

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
                      From:
                    </Typography>{" "}
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
                      To:
                    </Typography>{" "}
                    {EXCHANGE_TRANSFER_LIST.find((exchange) => exchange.value === to)?.label}
                  </Typography>
                </Stack>
                <Stack>
                  <Chip label={`${ethers.utils.formatEther(ethers.BigNumber.from(value))} ETH`} />
                </Stack>
              </Stack>
            }
          />
        </ListItemButton>
      </ListItem>
      <Dialog
        fullScreen
        onClose={handleClickOpen}
        open={open}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClickOpen}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
            >
              Transaction details
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent sx={(theme) => ({ backgroundColor: theme.palette.primary.main })}>
          <TableContainer>
            <Table
              sx={{ minWidth: 650, "& .MuiTableCell-root": { fontSize: 16 } }}
              aria-label="simple table"
            >
              <TableBody>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    Tx hash:
                  </TableCell>
                  <TableCell align="left">{id}</TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    Date:
                  </TableCell>
                  <TableCell align="left">{dayjs(date).format("HH:mm:ss, DD MMM YYYY")}</TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    From:
                  </TableCell>
                  <TableCell align="left">{from}</TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    To:
                  </TableCell>
                  <TableCell align="left">{to}<br /><br />{EXCHANGE_TRANSFER_LIST.find((exchange) => exchange.value === to)?.label}</TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    Value:
                  </TableCell>
                  <TableCell align="left">{ethers.utils.formatEther(ethers.BigNumber.from(value))} ETH</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function TransactionsList() {
  const { data: transactions = [], isLoading: isLoadingTransactions } = useGetTransactions();
  console.log({ transactions });

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
          <ListItems
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
