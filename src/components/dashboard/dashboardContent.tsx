'use client'
import type React from 'react'
import { useSidebar } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/sidebar/appSidebar'
import { Header } from '@/components/header/header'
import { useIsMobile } from '@/hooks/use-mobile'

export function DashboardContent({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'
  const isMobile = useIsMobile()

  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden pt-16">
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-white dark:bg-neutral-800 p-6 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  )
}
