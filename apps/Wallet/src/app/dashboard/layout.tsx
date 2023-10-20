"use client";

import { useIsSafeOwner, useLogout } from "@/features";
import { useWalletStore } from "@/store";
import { shortenHashString } from "@/utils";
import AccountCircle from "@mui/icons-material/AccountCircleOutlined";
import { CircularProgress, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const logout = useLogout();
  const web3Auth = useWalletStore((state) => state.web3Auth);
  const userInfo = useWalletStore((state) => state.userInfo);
  const address = useWalletStore((state) => state.address);
  const { isLoading: isLoadingIsSafeOwner } = useIsSafeOwner();
  const { push } = useRouter();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnLogoutClick = async () => {
    await logout();
    handleClose();
    push("/login");
  };

  useEffect(() => {
    if (!web3Auth) {
      push("/login");
    }
  }, [web3Auth]);

  if (!web3Auth || isLoadingIsSafeOwner) {
    return (
      <Box
        component="main"
        sx={(theme) => ({ backgroundColor: theme.palette.primary.main })}
      >
        <AppBar position="absolute">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Carbon wallet
            </Typography>
          </Toolbar>
        </AppBar>
        <Stack
          height="100vh"
          width="100vw"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress color="secondary" />
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={(theme) => ({ backgroundColor: theme.palette.primary.main })}
    >
      <AppBar position="relative">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Carbon wallet
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              disableScrollLock
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disabled>
                <Stack>
                  <Typography
                    color="primary"
                    gutterBottom
                  >
                    Email: {userInfo?.email}
                  </Typography>
                  <Typography
                    color="primary"
                    gutterBottom
                  >
                    Name: {userInfo?.name}
                  </Typography>
                  <Typography
                    color="primary"
                    gutterBottom
                  >
                    Address: {shortenHashString(address)}
                  </Typography>
                </Stack>
              </MenuItem>
              <MenuItem onClick={handleOnLogoutClick}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
}
