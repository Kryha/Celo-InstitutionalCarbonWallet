import { EthereumRpc } from "@/features";
import { useWalletStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { GOERLI_FUND_GAS_AMOUNT } from "./constants";

export function useFundSafeOwner() {
  const setBalance = useWalletStore((state) => state.setBalance);
  const web3Auth = useWalletStore((state) => state.web3Auth);
  const pk = process.env.NEXT_PUBLIC_OWNER_1_PRIVATE_KEY_GOERLI!;
  return useMutation({
    mutationFn: (address: string) => {
      return fetch("/api/safe/transaction", {
        method: "POST",
        body: JSON.stringify({
          pk: pk,
          amount: GOERLI_FUND_GAS_AMOUNT,
          destination: address
        }),
      });
    },
    onSuccess: async () => {
      if (web3Auth && web3Auth.provider) {
        const rpc = new EthereumRpc(web3Auth.provider);
        const balance = await rpc.getBalance();
        setBalance(balance);
      }
    },
  });
}
