import { EthereumRpc } from "@/features";
import { useWalletStore } from "@/store";
import { useMutation } from "@tanstack/react-query";

export function useFundSafeOwner() {
  const safeAddress = useWalletStore((state) => state.safeAddress);
  const setBalance = useWalletStore((state) => state.setBalance);
  const web3Auth = useWalletStore((state) => state.web3Auth);
  
  return useMutation({
    mutationFn: (address: string) => {
      return fetch(`/api/safe/${safeAddress}/fund-user`, {
        method: "POST",
        body: JSON.stringify({
          destination: address,
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
