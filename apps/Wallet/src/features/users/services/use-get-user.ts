import { useWalletStore } from "@/store";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useRegisterUser } from "./use-register-user";

export function useGetUser() {
  const address = useWalletStore((state) => state.address);
  const userInfo = useWalletStore((state) => state.userInfo);
  const { mutate: registerUser } = useRegisterUser();

  return useQuery({
    queryKey: ["user", address],
    queryFn: () => fetch(`/api/users/${address}`).then((res) => res.json()),
    onSuccess: (user: User) => {
      if (!user) {
        registerUser({
          name: userInfo?.name || "",
          surname: " ",
          publicKey: address,
          emailAddress: userInfo?.email || "",
          role: "REGISTERED",
        });
      }
    },
  });
}
