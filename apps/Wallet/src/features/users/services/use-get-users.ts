import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useWalletStore } from "@/store";

export function useGetUsers() {
  const safeAddress = useWalletStore((state) => state.safeAddress);

  return useQuery({
    queryKey: ["users"],
    queryFn: (): Promise<User[]> =>
      fetch(`/api/safe/${safeAddress}/users`).then((res) => res.json()),
  });
}
