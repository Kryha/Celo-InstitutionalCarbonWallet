import { UserManagementTransactionBody } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useWalletStore } from "@/store";

export function useRemoveUser() {
  const safeAddress = useWalletStore((state) => state.safeAddress);

  return useMutation({
    mutationFn: (body: UserManagementTransactionBody) => {
      return fetch(`/api/safe/${safeAddress}/remove-user`, {
        method: "POST",
        body: JSON.stringify(body),
      });
    },
  });
}
