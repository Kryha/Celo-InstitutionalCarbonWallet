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
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const web3Auth = useWalletStore((state) => state.web3Auth);
  const login = useLogin();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const pathname = usePathname();
  const { push } = useRouter();

<<<<<<< HEAD
  const login = async () => {
    const x = await (await testUser()).json();
    console.log("KIJK", x);

    if (web3Auth && web3Auth.provider) {
      const rpc = new EthereumRpc(web3Auth.provider);
      await web3Auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: "google",
      });
      setIsLoggingIn(true);
      const signInInfo = await web3Auth.authenticateUser();
      const userInfo = await web3Auth.getUserInfo();
      const address = await rpc.getAccounts();
      const balance = await rpc.getBalance();
      const privateKey = await rpc.getPrivateKey();
      setSignInInfo(signInInfo);
      setUserInfo(userInfo);
      setAddress(address);
      setBalance(balance);
      setPrivateKey(privateKey);
      push("/dashboard");
    } else {
      throw new Error("web3Auth or provider is not initialized yet");
    }
=======
  const handleOnLoginClick = async () => {
    setIsLoggingIn(true);
    await login();
    push("/dashboard");
>>>>>>> develop
  };

  useEffect(() => {
    const openlogin_store = localStorage.getItem("openlogin_store") || "";
    const sessionId = openlogin_store ? JSON.parse(openlogin_store).sessionId : "";

    if (!web3Auth && sessionId) {
      localStorage.setItem("openlogin_store", JSON.stringify({ sessionId: "" }));
    }
  }, [web3Auth, pathname]);

  const testUser = async () => {
    const x = await fetch("/api/users?role=ADMIN", {
      method: "GET",
    });

    return x;
  };

  if (isLoggingIn) {
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
