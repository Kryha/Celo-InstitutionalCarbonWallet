import { create, StateCreator } from "zustand";

export type PrivateKeySlice = {
  privateKey: string;
  setPrivateKey: (privateKey: string) => void;
};

export const createPrivateKeySlice: StateCreator<PrivateKeySlice, [], [], PrivateKeySlice> = (set) => ({
  privateKey: "",
  setPrivateKey: (privateKey: string) => set(() => ({ privateKey })),
});
