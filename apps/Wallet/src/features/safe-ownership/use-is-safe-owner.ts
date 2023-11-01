import { useWalletStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { GOERLI_FUND_GAS_AMOUNT_THRESHOLD } from "./constants";
import { useFundSafeOwner } from "./use-fund-owner";

export function useIsSafeOwner() {
  const { mutate: fundOwner } = useFundSafeOwner();
  const address = useWalletStore((state) => state.address);
  const balance = useWalletStore((state) => state.balance);
  const isSafeOwner = useWalletStore((state) => state.isSafeOwner);
  const setIsSafeOwner = useWalletStore((state) => state.setIsSafeOwner);
  const insufficientBalance = balance && Number(balance) < GOERLI_FUND_GAS_AMOUNT_THRESHOLD;

  return useQuery({
    queryKey: ["isOwner", address],
    queryFn: () => fetch(`/api/safe/owner/${address}`).then((res) => res.json()),
    onSuccess: (isOwner: boolean) => {
      if (isOwner) {
        setIsSafeOwner(true);
      }

      if (insufficientBalance) {
        fundOwner(address);
      }
    },
    enabled: !isSafeOwner && Boolean(address),
  });
}
