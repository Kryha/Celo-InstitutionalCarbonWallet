"use client";

import { useGetUser } from "@/features";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { data: user } = useGetUser();

  if (user?.role !== "ADMIN") {
    return redirect("/dashboard");
  }

  return children;
}
