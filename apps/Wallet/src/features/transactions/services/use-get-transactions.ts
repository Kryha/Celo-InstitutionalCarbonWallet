import { useQuery } from "@tanstack/react-query";

export function useGetTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => fetch("/api/safe/history/transactions").then((res) => res.json()),
  });
}
