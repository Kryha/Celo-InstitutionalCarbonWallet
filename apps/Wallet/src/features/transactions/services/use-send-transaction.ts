import { SafeTransactionBody } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSendTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: SafeTransactionBody) => {
      return fetch("/api/safe/transaction", {
        method: "POST",
        body: JSON.stringify(body),
      });
    },
    onSuccess: () => setTimeout(() => queryClient.invalidateQueries(), 3000),
  });
}
