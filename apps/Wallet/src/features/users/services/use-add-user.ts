import { UserManagementTransactionBody } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useAddUser() {
  return useMutation({
    mutationFn: (body: UserManagementTransactionBody) => {
      return fetch("/api/safe/add-user", {
        method: "POST",
        body: JSON.stringify(body),
      });
    }
  });
}
