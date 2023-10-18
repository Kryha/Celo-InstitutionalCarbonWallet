import { useQuery } from "@tanstack/react-query";

export function useGetTokenBalance() {
  return useQuery({
    queryKey: ["token-balance"],
    queryFn: () => fetch('/api/safe/balance/tokens').then((res) => res.json()),
  });
}
