import { User } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRegisterUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: User) => {
      return fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(body),
      });
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
}
