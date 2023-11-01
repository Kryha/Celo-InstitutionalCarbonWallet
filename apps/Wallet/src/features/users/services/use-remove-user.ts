import { UserManagementTransactionBody } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useRemoveUser() {
  return useMutation({
    mutationFn: (body: UserManagementTransactionBody) => {
      return fetch("/api/safe/remove-user", {
        method: "POST",
        body: JSON.stringify(body),
      });
    }
  });
}
