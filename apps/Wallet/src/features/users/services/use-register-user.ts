import { useWalletStore } from "@/store";
import { User } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRegisterUser() {
  const safeAddress = useWalletStore((state) => state.safeAddress);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: User) => {
      return fetch(`/api/safe/${safeAddress}/users`, {
        method: "POST",
        body: JSON.stringify(body),
      });
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
}
