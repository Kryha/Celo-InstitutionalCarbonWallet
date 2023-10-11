import { useQuery } from "@tanstack/react-query";
import { GOERLI_FUND_GAS_AMOUNT_THRESHOLD } from "./constants";
import { useAddSafeOwner } from "./use-add-safe-owner";
import { useFundSafeOwner } from "./use-fund-owner";

export function useIsSafeOwner(address: string, balance: string) {
  const { mutate: addOwner } = useAddSafeOwner();
  const { mutate: fundOwner } = useFundSafeOwner();

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
