import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { ToastProvider } from "@/components/toast-provider";

export const metadata: Metadata = {
  title: "Dianson Law Office",
  description: "Legal case management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <SidebarProvider>
            <div className="flex flex-col">
              <div className="flex flex-row flex-1">
                <AppSidebar />
                <main className="flex-1 p-6">{children}</main>
              </div>
            </div>
          </SidebarProvider>
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
