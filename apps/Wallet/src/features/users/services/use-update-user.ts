import { User } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: User) => {
      return fetch("/api/users", {
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
