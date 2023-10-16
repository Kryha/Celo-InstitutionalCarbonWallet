import { SafeTransactionBody } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSendTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: SafeTransactionBody) => {
      return fetch("/api/safe/transaction", {
        method: "POST",
        body: JSON.stringify(body),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balance"] });

      toast.loading("Loading new transactions...", { duration: 5000 });

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
      }, 5000);
    },
  });
}
