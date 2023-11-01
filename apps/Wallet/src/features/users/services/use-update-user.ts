import { useWalletStore } from "@/store";
import { User } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const safeAddress = useWalletStore((state) => state.safeAddress);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: User) => {
      return fetch(`/api/safe/${safeAddress}/users`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
    },
    onSuccess: () => {
      toast.success("Successfully updated role of user");
      queryClient.invalidateQueries();
    },
  });
}
