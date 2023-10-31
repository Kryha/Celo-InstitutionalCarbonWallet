"use client";

import { useLogout } from "@/features";
import { renderUserRole } from "@/features/users/utils";
import { useWalletStore } from "@/store";
import { User } from "@/types";
import { shortenHashString } from "@/utils";
import AccountCircle from "@mui/icons-material/AccountCircleOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

export function DashboardLayout({ children, user }: { children: ReactNode; user?: User }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const logout = useLogout();
  const web3Auth = useWalletStore((state) => state.web3Auth);
  const userInfo = useWalletStore((state) => state.userInfo);
  const address = useWalletStore((state) => state.address);
  const isAdminUser = user?.role === "ADMIN";
  const { push } = useRouter();
  const showMenu = Boolean(user) && Boolean(web3Auth);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToUsersPage = () => {
    handleClose();
    push("/dashboard/users");
  };

  const handleOnLogoutClick = async () => {
    await logout();
    handleClose();
    push("/login");
  };

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
            <Link href="/dashboard">Carbon wallet</Link>
          </Typography>
          {showMenu && (
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
                    <Typography
                      color="primary"
                      gutterBottom
                    >
                      Role: {renderUserRole(user?.role)}
                    </Typography>
                  </Stack>
                </MenuItem>
                {isAdminUser && <MenuItem onClick={navigateToUsersPage}>Users</MenuItem>}
                <MenuItem onClick={handleOnLogoutClick}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
}
