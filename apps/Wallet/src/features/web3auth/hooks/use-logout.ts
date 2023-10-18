"use client";

import { useWalletStore } from "@/store";

export function useLogout() {
  const setAddress = useWalletStore((state) => state.setAddress);
  const setPrivateKey = useWalletStore((state) => state.setPrivateKey);
  const setUserInfo = useWalletStore((state) => state.setUserInfo);
  const setSignInInfo = useWalletStore((state) => state.setSignInInfo);
  const setBalance = useWalletStore((state) => state.setBalance);
  const web3Auth = useWalletStore((state) => state.web3Auth);
  const setWeb3Auth = useWalletStore((state) => state.setWeb3Auth);

  const logout = async () => {
    if (web3Auth) {
      await web3Auth.logout();
      setWeb3Auth(null);
      setSignInInfo(null);
      setUserInfo(null);
      setAddress("");
      setBalance("");
      setPrivateKey("");
    } else {
      throw new Error("web3Auth not initialized yet");
    }
  };

  return logout;
}
