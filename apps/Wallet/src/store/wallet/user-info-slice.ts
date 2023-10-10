import { OpenloginUserInfo } from "@web3auth/openlogin-adapter";
import { create, StateCreator } from "zustand";

export interface UserInfoSlice {
  userInfo: null | Partial<OpenloginUserInfo>;
  setUserInfo: (userInfo: Partial<OpenloginUserInfo> | null) => void;
}

export const createUserInfoSlice: StateCreator<UserInfoSlice, [], [], UserInfoSlice> = (set) => ({
  userInfo: null,
  setUserInfo: (userInfo: Partial<OpenloginUserInfo> | null) => set(() => ({ userInfo })),
});
