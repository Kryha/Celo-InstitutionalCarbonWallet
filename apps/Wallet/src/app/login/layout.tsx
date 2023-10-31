import { LoginLayout } from "@/components";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <LoginLayout>{children}</LoginLayout>;
}
