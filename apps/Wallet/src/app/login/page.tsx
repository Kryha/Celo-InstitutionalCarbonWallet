"use client";

import { useLogin } from "@/features";
import { useWalletStore } from "@/store";
import GoogleIcon from "@mui/icons-material/Google";
import { CircularProgress, Link } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const web3Auth = useWalletStore((state) => state.web3Auth);
  const login = useLogin();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { push } = useRouter();
  const openlogin_store = typeof window !== "undefined" ? localStorage.getItem("openlogin_store") : "";
  const hasSessionId = openlogin_store ? Boolean(JSON.parse(openlogin_store).sessionId) : false;

  const handleOnLoginClick = async () => {
    setIsLoggingIn(true);
    await login();
    push("/dashboard");
  };

  if (isLoggingIn || hasSessionId) {
    return (
      <Stack
        height={1}
        width={1}
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress color="secondary" />
      </Stack>
    );
  }

  return (
    <Grid
      container
      height={1}
    >
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
          maxWidth={300}
          gap={4}
        >
          <Box>
            <Typography
              variant="body1"
              color="primary.light"
            >
              Use your trusted Google Single Sign-On to log into the wallet.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={handleOnLoginClick}
            disabled={!web3Auth}
            endIcon={
              !web3Auth ? (
                <CircularProgress
                  color="inherit"
                  size={20}
                />
              ) : null
            }
          >
            Login with Google
          </Button>
          <Typography
            variant="body1"
            color="primary.light"
            sx={{ maxWidth: 500 }}
          >
            Was your password compromised? Click here to{" "}
            <Link
              href="https://myaccount.google.com/intro/signinoptions/password"
              target="_blank"
              color="secondary"
            >
              change your password
            </Link>
          </Typography>
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
            sx={{ mb: 1 }}
          >
            carbon wallet
          </Typography>
          <Typography
            variant="body1"
            color="primary.light"
            sx={{ maxWidth: 500 }}
          >
            This is the first web3 wallet designed for institutions to handle environmental credits. This wallet uses a
            new method called Account Abstraction, which helps make the user experience better by simplifying tasks like
            logging in through a trusted Single Sign-On (SSO), account recovery, and administrative functions. You can
            learn more about Account Abstraction here:{" "}
            <Link
              href="https://ethereum.org/en/roadmap/account-abstraction/"
              target="_blank"
              color="secondary"
            >
              Account Abstraction
            </Link>
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
