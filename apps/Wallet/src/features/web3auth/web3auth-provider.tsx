"use client";

import { WEB3AUTH_CLIENT_ID } from "@/constants";
import { ADAPTER_SETTINGS, GOERLI_CHAIN_CONFIG } from "@/features";
import { useWalletStore } from "@/store";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { useEffect } from "react";

export function Web3AuthProvider({ children }: { children: React.ReactNode }) {
  const web3Auth = useWalletStore((state) => state.web3Auth);
  const setWeb3Auth = useWalletStore((state) => state.setWeb3Auth);
  const clientId = WEB3AUTH_CLIENT_ID;

  useEffect(() => {
    const init = async () => {
      try {
        const web3AuthInstance = new Web3AuthNoModal({
          clientId,
          chainConfig: GOERLI_CHAIN_CONFIG,
          web3AuthNetwork: "testnet",
        });

        const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig: GOERLI_CHAIN_CONFIG } });

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: ADAPTER_SETTINGS,
          privateKeyProvider,
        });
        web3AuthInstance.configureAdapter(openloginAdapter);

        await web3AuthInstance.init();

        setWeb3Auth(web3AuthInstance);
      } catch (error) {
        console.error(error);
      }
    };

    if (!web3Auth) {
      init();
    }
  }, [web3Auth]);

  return children;
}
