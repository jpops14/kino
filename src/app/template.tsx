import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import NavBar from "./_components/navbar/navbar";
import AuthPopups from "./(auth)/auth_popups";

export const metadata: Metadata = {
  title: "Kino",
  description: "Cinema management app",
};

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <AppRouterCacheProvider>
          <NavBar />
          <AuthPopups />
          <main style={{ marginTop: 0 }}>
            {children}
          </main>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
