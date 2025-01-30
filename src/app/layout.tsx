import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import NavBar from "./_components/navbar/navbar";
import AuthPopups from "./(auth)/auth_popups";
import { Suspense } from "react";

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
      <body style={{ margin: 0 }}>
      
        <AppRouterCacheProvider>
          <NavBar />
          <Suspense fallback={<div>Loading...</div>}>
          <AuthPopups />
          <main style={{ marginTop: 0 }}>

            {children}

          </main>
          </Suspense>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
