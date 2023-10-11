import { useQuery } from "@tanstack/react-query";
import { useAddSafeOwner } from "./use-add-safe-owner";

export function useIsSafeOwner(address: string) {
  const { mutate: addOwner } = useAddSafeOwner();

  return useQuery({
    queryKey: ["isOwner", address],
    queryFn: () => {
      if (address) {
        return fetch(`/api/safe/owner/${address}`).then((res) => res.json());
      }

      return;
    },
    onSuccess: (isOwner: boolean) => {
      if (!isOwner && address) {
        addOwner(address);
      }
    },
  });
}