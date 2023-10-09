import { StateCreator } from "zustand";
import { Web3AuthNoModal } from "@web3auth/no-modal";

export type Web3AuthSlice = {
  web3Auth: null | Web3AuthNoModal;
  setWeb3Auth: (web3Auth: Web3AuthNoModal | null) => void;
};

export const createWeb3AuthSlice: StateCreator<Web3AuthSlice, [], [], Web3AuthSlice> = (set) => ({
  web3Auth: null,
  setWeb3Auth: (web3Auth: Web3AuthNoModal | null) => set(() => ({ web3Auth })),
});
