import { useQuery } from "@tanstack/react-query";
import { GOERLI_FUND_GAS_AMOUNT_THRESHOLD } from "./constants";
import { useAddSafeOwner } from "./use-add-safe-owner";
import { useFundSafeOwner } from "./use-fund-owner";
import { useWalletStore } from "@/store";

export function useIsSafeOwner() {
  const { mutate: addOwner } = useAddSafeOwner();
  const { mutate: fundOwner } = useFundSafeOwner();
  const address = useWalletStore((state) => state.address);
  const balance = useWalletStore((state) => state.balance);

  return useQuery({
    queryKey: ["isOwner", address],
    queryFn: () => fetch(`/api/safe/owner/${address}`).then((res) => res.json()),
    onSuccess: (isOwner: boolean) => {
      if (!isOwner && address) {
        addOwner(address);
      }
      if(balance && (Number(balance) < GOERLI_FUND_GAS_AMOUNT_THRESHOLD)){
        fundOwner(address);
      }
    },
  });
}
