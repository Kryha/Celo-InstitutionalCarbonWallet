"use client";

import { PageLayout } from "@/components";
import { useWalletStore } from "@/store";
import GoogleIcon from "@mui/icons-material/Google";
import { Button, CircularProgress, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const setAddress = useWalletStore((state) => state.setAddress);
  const setPrivateKey = useWalletStore((state) => state.setPrivateKey);
  const setUserInfo = useWalletStore((state) => state.setUserInfo);
  const setSignInInfo = useWalletStore((state) => state.setSignInInfo);
  const setBalance = useWalletStore((state) => state.setBalance);
  const web3Auth = useWalletStore((state) => state.web3Auth);
  const setWeb3Auth = useWalletStore((state) => state.setWeb3Auth);
  const state = useWalletStore((state) => state);
  const { push } = useRouter();

  const logout = async () => {
    if (web3Auth) {
      await web3Auth.logout();
      setWeb3Auth(null);
      setSignInInfo(null);
      setUserInfo(null);
      setAddress("");
      setBalance("");
      setPrivateKey("");
      push("/login");
    } else {
      throw new Error("web3Auth not initialized yet");
    }
  };

  useEffect(() => {
    if (!web3Auth) {
      push("/login");
    }
  }, [web3Auth]);

  if (!web3Auth) {
    return (
      <PageLayout>
        <Stack
          height={1}
          width={1}
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress color="secondary" />
        </Stack>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Grid
        item
        xs={12}
        sm={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          my={8}
          mx={4}
        >
          <Stack
            maxWidth={300}
            gap={4}
          >
            <Box>
              <Typography
                variant="h2"
                color="primary.light"
                fontWeight={700}
              >
                Dashboard
              </Typography>
              <Typography
                variant="body2"
                color="primary.light"
              >
                This page will be changed
              </Typography>
            </Box>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<GoogleIcon />}
              onClick={logout}
            >
              Logout
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<GoogleIcon />}
              onClick={() => console.log({ state })}
            >
              log state
            </Button>
          </Stack>
        </Stack>
      </Grid>
      <Grid
        justifyContent="center"
        alignItems="center"
        item
        xs={false}
        sm={6}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <Stack>
          <Typography
            component="h1"
            color="primary.light"
            zIndex={2}
            fontWeight={700}
            variant="h2"
          >
            Welcome to your
          </Typography>
          <Typography
            component="h1"
            color="primary.light"
            variant="h2"
            fontWeight={300}
            zIndex={2}
          >
            carbon wallet dashboard
          </Typography>
        </Stack>
      </Grid>
    </PageLayout>
  );
}
