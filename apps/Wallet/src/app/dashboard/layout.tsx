"use client";

import { DashboardLayout } from "@/components";
import { useGetUser } from "@/features/users/services/use-get-user";
import { useWalletStore } from "@/store";
import RefreshIcon from "@mui/icons-material/Refresh";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const web3Auth = useWalletStore((state) => state.web3Auth);
  const { data: user, isLoading: isLoadingGetUser, refetch: refetchGetUser } = useGetUser();
  const { push } = useRouter();

  useEffect(() => {
    if (!web3Auth) {
      push("/login");
    }
  }, [web3Auth]);

  if (!web3Auth || isLoadingGetUser) {
    return (
      <DashboardLayout>
        <Stack
          height="100vh"
          width="100vw"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress color="secondary" />
        </Stack>
      </DashboardLayout>
    );
  }

  if (user?.role === "REGISTERED") {
    return (
      <DashboardLayout>
        <Stack
          height="100vh"
          maxWidth="100vw"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            maxWidth="xs"
            color="primary.light"
            variant="body1"
            gutterBottom
          >
            Your account must be verified before you can make any transactions.
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => refetchGetUser()}
            color="inherit"
          >
            <RefreshIcon color="secondary" />
          </IconButton>
        </Stack>
      </DashboardLayout>
    );
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
