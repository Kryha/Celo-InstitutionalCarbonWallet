"use client"

import GoogleIcon from "@mui/icons-material/Google";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { useEffect, useState } from "react";
import RPC from "./ethersRPC";

const clientId = "BGh7VYnwzTP39lyDmA5YgMPT6T1ckFUfQx6mtPkYnslsLxHq4KhQBBTKaKbWaoX2UWE-jP4d2eUcVQ-F5lYmI9E";

export default function Home() {
  
  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(false);

  useEffect(() => {
    const init = async () => {
      try {
        const chainConfig = {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x5",
          rpcTarget: "https://rpc.ankr.com/eth_goerli",
          displayName: "Testnet Goerli",
          blockExplorer: "https://goerli.etherscan.io",
          ticker: "ETH",
          tickerName: "Ethereum",
        };
        
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const web3auth = new Web3AuthNoModal({
          clientId,
          chainConfig,
          web3AuthNetwork: "testnet"
        });

        const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            whiteLabel: {
              appName: "Your app Name",
              logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
              defaultLanguage: "en",
              mode: "dark", // whether to enable dark mode. defaultValue: false
            },
          },
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
    console.log("logging in");
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
      loginProvider: "google",
    });
    setProvider(web3authProvider);
    setLoggedIn(true);
    const signInInfo = await web3auth.authenticateUser()
    console.log("signInInfo", signInInfo)

    const userInfo = await web3auth.getUserInfo()
    console.log("userInfo", userInfo)
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log("address", address);
    const balance = await rpc.getBalance();
    console.log("balance", balance);
    const privateKey = await rpc.getPrivateKey();
    console.log("privateKey", privateKey);
    console.log("Logged in Successfully!");
  };

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
