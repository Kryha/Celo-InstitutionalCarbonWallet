import { useQuery } from "@tanstack/react-query";

export function useGetBalance() {
  return useQuery({
    queryKey: ["balance"],
    queryFn: () => fetch('/api/safe/balance').then((res) => res.json()),
  });
}
