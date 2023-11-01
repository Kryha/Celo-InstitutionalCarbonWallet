import { useWalletStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

export function useGetBalance() {
  const safeAddress = useWalletStore((state) => state.safeAddress);

  return useQuery({
    queryKey: ["balance"],
    queryFn: () => fetch(`/api/safe/${safeAddress}/balance`).then((res) => res.json()),
  });
}
