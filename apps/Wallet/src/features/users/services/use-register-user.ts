import { User } from "@/types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useRegisterUser() {
  return useMutation({
    mutationFn: (body: User) => {
      return fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(body),
      });
    },
    onError: (error: Error) => {
      toast.error(`There was a problem: ${error.message}`, { duration: 5000 });
    },
  });
}
