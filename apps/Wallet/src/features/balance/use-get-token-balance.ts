import { useWalletStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

export function useGetTokenBalance() {
  const safeAddress = useWalletStore((state) => state.safeAddress);

  return useQuery({
    queryKey: ["token-balance"],
    queryFn: () => fetch(`/api/safe/${safeAddress}/balance/tokens`).then((res) => res.json()),
  });
}
