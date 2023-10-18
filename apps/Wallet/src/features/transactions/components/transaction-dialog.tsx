"use client";

import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { ethers } from "ethers";
import { EXCHANGE_TRANSFER_LIST } from "../constants";
import { TransactionDialogProps } from "../types";
import { Transition } from "./transition";

export function TransactionDialog(props: TransactionDialogProps) {
  const { id, date, from, to, value, open, handleClickOpen } = props;

  return (

      <Dialog
        fullScreen
        onClose={handleClickOpen}
        open={open}
        TransitionComponent={Transition}
        disableScrollLock
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
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    Tx link:
                  </TableCell>
                  <TableCell align="left"><Link href={`https://goerli.etherscan.io/tx/${id}`} target="_blank" color="secondary">{`https://goerli.etherscan.io/tx/${id}`}</Link></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
  );
}
