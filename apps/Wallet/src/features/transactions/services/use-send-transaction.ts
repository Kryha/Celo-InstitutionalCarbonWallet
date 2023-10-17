import { SafeTransactionBody } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSendTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { pk: string; destination: string; value: string }) => {
      return fetch("/api/safe/transaction", {
        method: "POST",
        body: JSON.stringify(body),
      });
    },
    onSuccess: () => {
      toast.loading("Updating dashboard, please wait", { duration: 5000 });

      setTimeout(() => {
        queryClient.invalidateQueries();
      }, 5000);
    },
  });
}
