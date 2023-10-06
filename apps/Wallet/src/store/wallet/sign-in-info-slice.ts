import { create, StateCreator } from "zustand";

export type SignInInfo = { idToken: string };

export type SignInInfoSlice = {
  signInInfo: null | SignInInfo;
  setSignInInfo: (address: SignInInfo) => void;
};

export const createSignInInfoSlice: StateCreator<SignInInfoSlice, [], [], SignInInfoSlice> = (set) => ({
  signInInfo: null,
  setSignInInfo: (signInInfo: SignInInfo) => set(() => ({ signInInfo })),
});
