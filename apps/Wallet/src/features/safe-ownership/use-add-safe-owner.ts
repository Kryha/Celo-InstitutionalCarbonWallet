import { useWalletStore } from "@/store";
import { useMutation } from "@tanstack/react-query";

export function useAddSafeOwner() {
  const setIsSafeOwner = useWalletStore((state) => state.setIsSafeOwner);

  return useMutation({
    mutationFn: (address: string) => {
      return fetch("/api/safe/owner", {
        method: "POST",
        body: JSON.stringify({
          address: address,
        }),
      });
    },
    onSuccess: () => setIsSafeOwner(true),
  });
}