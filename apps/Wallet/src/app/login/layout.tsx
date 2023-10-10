import { Web3AuthProvider } from "@/features";
import { ReactNode } from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <Web3AuthProvider>{children}</Web3AuthProvider>;
}
