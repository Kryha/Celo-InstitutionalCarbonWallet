import { useWalletStore } from "@/store";
import { SafeTransactionBody } from "@/types";
import { ExecuteUserTransactionBody } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSendTransaction() {
  const safeAddress = useWalletStore((state) => state.safeAddress);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: ExecuteUserTransactionBody) => {
      return fetch(`/api/safe/${safeAddress}/user-transaction`, {
        method: "POST",
        body: JSON.stringify(body),
      });
    },
    onSuccess: () => {
      toast.loading("Updating dashboard, please wait", { duration: 5000 });

      setTimeout(() => {
        queryClient.invalidateQueries();
      }, 4000);
    },
    onError: (error: Error) => {
      toast.error(`There was a problem: ${error.message}`, { duration: 5000 });
    },
  });
}
