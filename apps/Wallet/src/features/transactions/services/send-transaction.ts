import { SafeTransactionBody } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useSendTransaction() {
  return useMutation({
    mutationFn: (body: SafeTransactionBody) => {
      return fetch("/api/safe/transaction", {
        method: "POST",
        body: JSON.stringify(body),
      });
    },
  });
}
