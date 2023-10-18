"use client";

import { EthereumRpc } from "@/features";
import { useWalletStore } from "@/store";
import { WALLET_ADAPTERS } from "@web3auth/base";

export function useLogin() {
  const setAddress = useWalletStore((state) => state.setAddress);
  const setPrivateKey = useWalletStore((state) => state.setPrivateKey);
  const setUserInfo = useWalletStore((state) => state.setUserInfo);
  const setSignInInfo = useWalletStore((state) => state.setSignInInfo);
  const setBalance = useWalletStore((state) => state.setBalance);
  const web3Auth = useWalletStore((state) => state.web3Auth);

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
    } else {
      throw new Error("web3Auth or provider is not initialized yet");
    }
  };

  return login;
}
