import { useWalletStore } from "@/store";
import { useMutation } from "@tanstack/react-query";

export function useAddSafeOwner() {
  const safeAddress = useWalletStore((state) => state.safeAddress);
  const pk = useWalletStore((state) => state.privateKey);
  const setIsSafeOwner = useWalletStore((state) => state.setIsSafeOwner);

  return useMutation({
    mutationFn: (address: string) => {
      return fetch(`/api/safe/${safeAddress}/owner`, {
        method: "POST",
        body: JSON.stringify({
          address: address,
          pk,
        }),
      });
    },
    onSuccess: () => setIsSafeOwner(true),
  });
}
