import { useWalletStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useAddSafeOwner } from "./use-add-safe-owner";

export function useIsSafeOwner(address: string) {
  const { mutate: addOwner } = useAddSafeOwner();
  const isSafeOwner = useWalletStore((state) => state.isSafeOwner);
  const setIsSafeOwner = useWalletStore((state) => state.setIsSafeOwner);

  return useQuery({
    queryKey: ["isOwner", address],
    queryFn: () => fetch(`/api/safe/owner/${address}`).then((res) => res.json()),
    onSuccess: (isOwner: boolean) => {
      if (!isOwner) {
        addOwner(address);
      } else {
        setIsSafeOwner(true);
      }
    },
    enabled: !isSafeOwner && Boolean(address),
  });
}
