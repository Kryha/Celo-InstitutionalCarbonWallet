import { create } from "zustand";
import { AddressSlice, createAddressSlice } from "./address-slice";
import { BalanceSlice, createBalanceSlice } from "./balance-slice";
import { PrivateKeySlice, createPrivateKeySlice } from "./private-key-slice";
import { SignInInfoSlice, createSignInInfoSlice } from "./sign-in-info-slice";
import { UserInfoSlice, createUserInfoSlice } from "./user-info-slice";
import { Web3AuthSlice, createWeb3AuthSlice } from "./web3auth-slice";
import { IsSafeOwnerSlice, createIsSafeOwnerSlice } from "./is-safe-owner";
import { SafeAddressSlice, createSafeAddressSlice } from "./safe-address-slice";

type Wallet = AddressSlice &
  PrivateKeySlice &
  UserInfoSlice &
  SignInInfoSlice &
  BalanceSlice &
  Web3AuthSlice &
  IsSafeOwnerSlice &
  SafeAddressSlice;

export const useWalletStore = create<Wallet>()((...a) => ({
  ...createAddressSlice(...a),
  ...createPrivateKeySlice(...a),
  ...createUserInfoSlice(...a),
  ...createSignInInfoSlice(...a),
  ...createBalanceSlice(...a),
  ...createWeb3AuthSlice(...a),
  ...createIsSafeOwnerSlice(...a),
  ...createSafeAddressSlice(...a),
}));
