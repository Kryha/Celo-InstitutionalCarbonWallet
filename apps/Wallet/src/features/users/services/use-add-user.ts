import { UserManagementTransactionBody } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddUser() {
  console.log("in use add user");
  
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UserManagementTransactionBody) => {
      return fetch("/api/safe/add-user", {
        method: "POST",
        body: JSON.stringify(body),
      });
    },
    onSuccess: () => {
      console.log("added user to rbac")
    },
  });
}
