/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { Rbac, RbacInterface } from "../Rbac";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "safe",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "delegate",
        type: "address",
      },
    ],
    name: "AddDelegate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "safe",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint96",
        name: "value",
        type: "uint96",
      },
    ],
    name: "ExecuteAllowanceTransfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "safe",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "delegate",
        type: "address",
      },
    ],
    name: "RemoveDelegate",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegate",
        type: "address",
      },
    ],
    name: "addDelegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint48",
        name: "",
        type: "uint48",
      },
    ],
    name: "delegates",
    outputs: [
      {
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        internalType: "uint48",
        name: "prev",
        type: "uint48",
      },
      {
        internalType: "uint48",
        name: "next",
        type: "uint48",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "delegatesStart",
    outputs: [
      {
        internalType: "uint48",
        name: "",
        type: "uint48",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract GnosisSafe",
        name: "safe",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint96",
        name: "amount",
        type: "uint96",
      },
    ],
    name: "executeTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "safe",
        type: "address",
      },
      {
        internalType: "uint48",
        name: "start",
        type: "uint48",
      },
      {
        internalType: "uint8",
        name: "pageSize",
        type: "uint8",
      },
    ],
    name: "getDelegates",
    outputs: [
      {
        internalType: "address[]",
        name: "results",
        type: "address[]",
      },
      {
        internalType: "uint48",
        name: "next",
        type: "uint48",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract GnosisSafe",
        name: "safe",
        type: "address",
      },
      {
        internalType: "address",
        name: "delegate",
        type: "address",
      },
    ],
    name: "isDelegate",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegate",
        type: "address",
      },
    ],
    name: "removeDelegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class Rbac__factory {
  static readonly abi = _abi;
  static createInterface(): RbacInterface {
    return new utils.Interface(_abi) as RbacInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Rbac {
    return new Contract(address, _abi, signerOrProvider) as Rbac;
  }
}
