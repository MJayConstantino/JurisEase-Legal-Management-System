'use client'

import { Button } from '@/components/ui/button'
import { CalendarDays, LogOut, Loader2 } from 'lucide-react'

interface ActionButtonsProps {
  handleMatters: () => void
  handleSignOut: () => void
  dashboardLoading: boolean
  signOutLoading: boolean
  isLoading: boolean
  disabled?: boolean
}

export default function ActionButtons({
  handleMatters,
  handleSignOut,
  dashboardLoading,
  signOutLoading,
  isLoading,
  disabled = false,
}: ActionButtonsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      <Button
        type="button"
        className="bg-[#2a3563] hover:cursor-pointer hover:bg-[#1e2547] dark:bg-[#4a5183] dark:hover:bg-[#3e4577] text-white py-6 rounded-lg flex items-center justify-center gap-2 transition-all"
        onClick={handleMatters}
        disabled={isLoading || disabled}
      >
        {dashboardLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading Dashboard</span>
          </>
        ) : (
          <>
            <CalendarDays className="w-5 h-5" />
            <span>Go to Dashboard</span>
          </>
        )}
      </Button>

      <Button
        type="button"
        variant="outline"
        className="border-[#2a3563] dark:border-[#8A91D9] hover:cursor-pointer text-[#2a3563] dark:text-[#8A91D9] hover:bg-[#2a3563]/10 dark:hover:bg-[#8A91D9]/10 py-6 rounded-lg flex items-center justify-center gap-2 transition-all"
        onClick={handleSignOut}
        disabled={isLoading || disabled}
      >
        {signOutLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Signing Out</span>
          </>
        ) : (
          <>
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </>
        )}
      </Button>
    </div>
  )
}
