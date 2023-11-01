import { useWalletStore } from "@/store";
import { UserManagementTransactionBody } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useAddUser() {
  const safeAddress = useWalletStore((state) => state.safeAddress);

  return useMutation({
    mutationFn: (body: UserManagementTransactionBody) => {
      return fetch(`/api/safe/${safeAddress}/add-user`, {
        method: "POST",
        body: JSON.stringify(body),
      });
    },
  });
}
