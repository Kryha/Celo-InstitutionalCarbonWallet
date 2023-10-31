import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: (): Promise<User[]> => fetch("/api/users").then((res) => res.json()),
  });
}
