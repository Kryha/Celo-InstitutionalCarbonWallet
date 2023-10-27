"use client";

import { useGetUser } from "@/features";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { data: user, isLoading: isLoadingGetUser } = useGetUser();

  if (isLoadingGetUser) {
    return (
      <Stack
        height="100vh"
        width="100vw"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress color="secondary" />
      </Stack>
    );
  }

  if (user?.role !== "ADMIN") {
    return redirect("/dashboard");
  }

  return children;
}
