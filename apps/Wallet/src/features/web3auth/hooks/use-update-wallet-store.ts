"use client";

import { EthereumRpc } from "@/features";
import { useWalletStore } from "@/store";
import { Web3AuthNoModal } from "@web3auth/no-modal";

export function useUpdateWalletStore() {
  const setAddress = useWalletStore((state) => state.setAddress);
  const setPrivateKey = useWalletStore((state) => state.setPrivateKey);
  const setUserInfo = useWalletStore((state) => state.setUserInfo);
  const setSignInInfo = useWalletStore((state) => state.setSignInInfo);
  const setBalance = useWalletStore((state) => state.setBalance);

  const updateWalletStore = async (web3Auth: Web3AuthNoModal) => {
    if (web3Auth && web3Auth.provider) {
      const rpc = new EthereumRpc(web3Auth.provider);
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

  return updateWalletStore;
}
