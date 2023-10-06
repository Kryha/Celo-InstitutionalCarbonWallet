"use client";

import GoogleIcon from "@mui/icons-material/Google";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { AuthKitSignInData } from "@safe-global/auth-kit";
import { IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter, OpenloginUserInfo } from "@web3auth/openlogin-adapter";
import { useEffect, useState } from "react";
import { adapterSettings, chainConfig } from "./web3auth/constants/constants_goerli";
import RPC from "./web3auth/ethersRPC";
import { useWalletStore } from "@/store";
require("dotenv").config();

export default function Home() {
  const setAddress = useWalletStore((state) => state.setAddress);
  const setPrivateKey = useWalletStore((state) => state.setPrivateKey);
  const setUserInfo = useWalletStore((state) => state.setUserInfo);
  const setSignInInfo = useWalletStore((state) => state.setSignInInfo);
  const setBalance = useWalletStore((state) => state.setBalance);
  const walletStore = useWalletStore((state) => state);

  const clientId = process.env.NEXT_PUBLIC_clientId!;
  
  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(false);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3AuthNoModal({
          clientId,
          chainConfig,
          web3AuthNetwork: "testnet",
        });

        const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings,
          privateKeyProvider,
        });
        web3auth.configureAdapter(openloginAdapter);

        await web3auth.init();
        setWeb3auth(web3auth);
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    console.log("Logging in");
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
      loginProvider: "google",
    });
    setProvider(web3authProvider);
    setLoggedIn(true);
    const signInInfo = await web3auth.authenticateUser();
    setSignInInfo(signInInfo);

    const userInfo = await web3auth.getUserInfo();
    setUserInfo(userInfo);

    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    const balance = await rpc.getBalance();
    const privateKey = await rpc.getPrivateKey();
    setAddress(address);
    setBalance(balance);
    setPrivateKey(privateKey);
  };

  console.log({ walletStore });

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        backgroundImage: "url(/bg.svg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
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
    </Grid>
  );
}
