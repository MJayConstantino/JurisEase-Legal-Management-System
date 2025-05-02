import type React from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/sidebar/appSidebar'
import { Header } from '@/components/header/header'
import { ToastProvider } from '@/components/toast-provider'
import { ActiveLinkScript } from '@/components/active-link-script'
import '../globals.css'
import { protectRoute } from '@/utils/supabase/server'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  await protectRoute()
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <div className="flex min-h-screen w-screen flex-col">
          <Header />
          <div className="flex flex-1 overflow-hidden pt-16">
            <AppSidebar />
            <main
              className="flex-1 overflow-auto bg-white dark:bg-neutral-800 p-6 transition-all duration-300 
                    md:group-data-[state=expanded]"
            >
              {children}
            </main>
          </div>
        </div>
        <ActiveLinkScript />
        <ToastProvider />
      </SidebarProvider>
    </ThemeProvider>
  )
}
