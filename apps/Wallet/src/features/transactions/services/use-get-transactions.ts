import { useWalletStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

export function useGetTransactions() {
  const safeAddress = useWalletStore((state) => state.safeAddress);

  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => fetch(`/api/safe/${safeAddress}/history/transactions`).then((res) => res.json()),
  });
}
