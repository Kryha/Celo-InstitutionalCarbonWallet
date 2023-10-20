import { Web3AuthProvider } from "@/features";
import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <Web3AuthProvider>
      <Box
        component="main"
        height="100vh"
        position="relative"
        sx={{
          backgroundImage: "url(/bg.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {children}
      </Box>
    </Web3AuthProvider>
  );
}
