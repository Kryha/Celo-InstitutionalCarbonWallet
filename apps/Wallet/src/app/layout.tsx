import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "../features/material-ui";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kryha Carbon Wallet",
  description: "Access your institutional carbon wallet",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
