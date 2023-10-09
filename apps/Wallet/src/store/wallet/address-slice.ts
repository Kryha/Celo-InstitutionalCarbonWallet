import { StateCreator } from "zustand";

export type AddressSlice = {
  address: string;
  setAddress: (address: string) => void;
};

export const createAddressSlice: StateCreator<AddressSlice, [], [], AddressSlice> = (set) => ({
  address: "",
  setAddress: (address: string) => set(() => ({ address })),
});
