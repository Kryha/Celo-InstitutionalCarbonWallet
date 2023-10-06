import { create } from "zustand";
import { AddressSlice, createAddressSlice } from "./address-slice";
import { BalanceSlice, createBalanceSlice } from "./balance-slice";
import { PrivateKeySlice, createPrivateKeySlice } from "./private-key-slice";
import { SignInInfoSlice, createSignInInfoSlice } from "./sign-in-info-slice";
import { UserInfoSlice, createUserInfoSlice } from "./user-info-slice";

export const useWalletStore = create<AddressSlice & PrivateKeySlice & UserInfoSlice & SignInInfoSlice & BalanceSlice>()((...a) => ({
  ...createAddressSlice(...a),
  ...createPrivateKeySlice(...a),
  ...createUserInfoSlice(...a),
  ...createSignInInfoSlice(...a),
  ...createBalanceSlice(...a),
}));
