"use client";

import { useWalletStore } from "@/store";
import { WALLET_ADAPTERS } from "@web3auth/base";
import { useUpdateWalletStore } from "./use-update-wallet-store";

export function useLogin() {
  const web3Auth = useWalletStore((state) => state.web3Auth);
  const updateWalletStore = useUpdateWalletStore();

  const login = async () => {
    if (web3Auth && web3Auth.provider) {
      await web3Auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: "google",
      });
      updateWalletStore(web3Auth);
    } else {
      throw new Error("web3Auth or provider is not initialized yet");
    }
  };

  return login;
}
