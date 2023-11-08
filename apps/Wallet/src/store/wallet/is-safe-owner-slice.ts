import { StateCreator } from "zustand";
import { Web3AuthNoModal } from "@web3auth/no-modal";

export type IsSafeOwnerSlice = {
  isSafeOwner:boolean;
  setIsSafeOwner: (isSafeOwner: boolean) => void;
};

export const createIsSafeOwnerSlice: StateCreator<IsSafeOwnerSlice, [], [], IsSafeOwnerSlice> = (set) => ({
  isSafeOwner: false,
  setIsSafeOwner: (isSafeOwner: boolean) => set(() => ({ isSafeOwner })),
});
