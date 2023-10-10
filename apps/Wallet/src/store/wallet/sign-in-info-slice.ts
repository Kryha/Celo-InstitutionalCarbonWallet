import { create, StateCreator } from "zustand";

export type SignInInfo = { idToken: string };

export type SignInInfoSlice = {
  signInInfo: null | SignInInfo;
  setSignInInfo: (signInInfo: SignInInfo | null) => void;
};

export const createSignInInfoSlice: StateCreator<SignInInfoSlice, [], [], SignInInfoSlice> = (set) => ({
  signInInfo: null,
  setSignInInfo: (signInInfo: SignInInfo | null) => set(() => ({ signInInfo })),
});
