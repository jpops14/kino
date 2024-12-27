import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import "./globals.css";
import NavBar from "./navbar";

export const metadata: Metadata = {
  title: "Kino",
  description: "Cinema management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
        <NavBar />
        {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
