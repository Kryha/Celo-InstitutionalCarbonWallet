import { StateCreator } from "zustand";

export type SafeAddressSlice = {
  safeAddress: string;
  setSafeAddress: (address: string) => void;
};

export const createSafeAddressSlice: StateCreator<SafeAddressSlice, [], [], SafeAddressSlice> = (set) => ({
  safeAddress: "0x1f29deFa8a6472f65e1c86cD8E449cd37c521A41",
  setSafeAddress: (safeAddress: string) => set(() => ({ safeAddress })),
});
