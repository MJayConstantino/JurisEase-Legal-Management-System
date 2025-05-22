import type React from 'react'
import { cookies } from 'next/headers'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/sidebar/appSidebar'
import { Header } from '@/components/header/header'
import { ActiveLinkScript } from '@/components/ui/active-link-script'
import '../globals.css'
import { protectRoute } from '@/utils/supabase/server'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  await protectRoute()

  const cookieStore = await cookies()
  const sidebarState = cookieStore.get('sidebar_state')
  const defaultOpen = sidebarState ? sidebarState.value === 'true' : true

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider defaultOpen={defaultOpen}>
        <div className="flex min-h-screen w-screen flex-col">
          <Header />
          <div className="flex flex-1 overflow-hidden pt-16">
            <AppSidebar />
            <main className="flex-1 overflow-auto bg-white dark:bg-gray-900 p-6 transition-all duration-300 ease-in-out">
              {children}
            </main>
          </div>
        </div>
        <ActiveLinkScript />
      </SidebarProvider>
    </ThemeProvider>
  )
}
