"use client";

import { PageLayout } from "@/components";
import { EthereumRpc } from "@/features";
import { useWalletStore } from "@/store";
import GoogleIcon from "@mui/icons-material/Google";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { WALLET_ADAPTERS } from "@web3auth/base";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const setAddress = useWalletStore((state) => state.setAddress);
  const setPrivateKey = useWalletStore((state) => state.setPrivateKey);
  const setUserInfo = useWalletStore((state) => state.setUserInfo);
  const setSignInInfo = useWalletStore((state) => state.setSignInInfo);
  const setBalance = useWalletStore((state) => state.setBalance);
  const web3Auth = useWalletStore((state) => state.web3Auth);
  const pathname = usePathname();
  const { push } = useRouter();

  const login = async () => {
    if (web3Auth && web3Auth.provider) {
      const rpc = new EthereumRpc(web3Auth.provider);
      await web3Auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: "google",
      });
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
  };

  useEffect(() => {
    const openlogin_store = localStorage.getItem("openlogin_store") || "";
    const sessionId = JSON.parse(openlogin_store).sessionId;

    if (!web3Auth && sessionId) {
      localStorage.setItem("openlogin_store", JSON.stringify({ sessionId: "" }));
    }
  }, [web3Auth, pathname]);

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
                Login
              </Typography>
              <Typography
                variant="body2"
                color="primary.light"
              >
                Use your Google account to access your carbon wallet
              </Typography>
            </Box>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<GoogleIcon />}
              onClick={login}
              disabled={!web3Auth}
              endIcon={!web3Auth ? <CircularProgress color="inherit" size={20} /> : null}
            >
              Login with Google
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
            carbon wallet
          </Typography>
        </Stack>
      </Grid>
    </PageLayout>
  );
}
