import { useWalletStore } from "@/store";
import { User } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRegisterUser } from "./use-register-user";

export function useGetUser() {
  const address = useWalletStore((state) => state.address);
  const userInfo = useWalletStore((state) => state.userInfo);
  const { mutate: registerUser } = useRegisterUser();

  return useQuery({
    queryFn: () => fetch(`/api/users/${address}`).then((res) => res.json()),
    onSuccess: (user: User) => {
      if (!user) {
        registerUser({
          name: userInfo?.name || "",
          surname: " ",
          publicKey: address,
          emailAddress: userInfo?.email || "",
        });
      }
    },
    onError: (error: Error) => {
      toast.error(`There was a problem fetching the user: ${error.message}`, { duration: 5000 });
    },
  });
}
