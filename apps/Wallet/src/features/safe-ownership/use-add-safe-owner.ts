import { useMutation } from "@tanstack/react-query";

export function useAddSafeOwner() {
  return useMutation({
    mutationFn: (address: string) => {
      return fetch("/api/safe/owner", {
        method: "POST",
        body: JSON.stringify({
          ownerAddress: address,
        }),
      });
    },
  });
}
