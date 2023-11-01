import { useWalletStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { GOERLI_FUND_GAS_AMOUNT_THRESHOLD } from "./constants";
import { useAddSafeOwner } from "./use-add-safe-owner";
import { useFundSafeOwner } from "./use-fund-owner";

export function useIsSafeOwner() {
  const { mutate: addOwner } = useAddSafeOwner();
  const { mutate: fundOwner } = useFundSafeOwner();

    const safeAddress = useWalletStore((state) => state.safeAddress);
  const address = useWalletStore((state) => state.address);
  const balance = useWalletStore((state) => state.balance);
  const isSafeOwner = useWalletStore((state) => state.isSafeOwner);
  const setIsSafeOwner = useWalletStore((state) => state.setIsSafeOwner);
  return useQuery({
    queryKey: ["isOwner", address],
    queryFn: () => fetch(`/api/safe/${safeAddress}/owner/${address}`).then((res) => res.json()),
    onSuccess: (isOwner: boolean) => {
      if (!isOwner) {
        addOwner(address);
      } else {
        setIsSafeOwner(true);
      }
      if(balance && (Number(balance) < GOERLI_FUND_GAS_AMOUNT_THRESHOLD)){
        fundOwner(address);
      }
    },
    enabled: !isSafeOwner && Boolean(address),
  });
}
