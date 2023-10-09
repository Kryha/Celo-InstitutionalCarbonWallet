import { StateCreator } from "zustand";

export type BalanceSlice = {
  balance: string;
  setBalance: (balance: string) => void;
};

export const createBalanceSlice: StateCreator<BalanceSlice, [], [], BalanceSlice> = (set) => ({
  balance: "",
  setBalance: (balance: string) => set(() => ({ balance })),
});
