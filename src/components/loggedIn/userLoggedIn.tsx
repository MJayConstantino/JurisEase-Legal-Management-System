'use client'

import { useEffect, useState, useCallback, useTransition } from 'react'
import { createSupabaseClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import WelcomeHeader from './welcomeHeader'
import UserProfile from './userProfile'
import ActionButtons from './actionButtons'
import { fetchUserInfoAction } from '@/actions/users'
import { toast } from 'sonner'

interface UserData {
  full_name: string
  avatar_url: string
}

export default function UserLoggedIn(props: any) {
  const override = props.__storybookMockOverride ?? {}
  const supabase = createSupabaseClient()
  const router = useRouter()
  const [isTransitioning, startTransition] = useTransition()

  // State management
  const [signOutLoading, setSignOutLoading] = useState(
    override.signOutLoading ?? false
  )
  const [dashboardLoading, setDashboardLoading] = useState(
    override.dashboardLoading ?? false
  )
  const [userData, setUserData] = useState<UserData | null>(
    override.userData ?? null
  )
  const [loadingUser, setLoadingUser] = useState(override.loadingUser ?? true)
  const [dataFetched, setDataFetched] = useState(false)

  // Fetch user data just once
  const fetchUser = useCallback(async () => {
    if (dataFetched || userData) return // Prevent multiple fetches

    setLoadingUser(true)
    try {
      const data = await fetchUserInfoAction()
      if (data && data.full_name) {
        setUserData(data)
        setDataFetched(true)
      }
    } catch (error) {
      console.error('Error fetching user info:', error)
    } finally {
      setLoadingUser(false)
    }
  }, [dataFetched, userData])

  useEffect(() => {
    // Only fetch if we haven't already and don't have user data
    if (!dataFetched && !userData) {
      fetchUser()
    }
  }, [fetchUser, dataFetched, userData])

  const handleSignOut = async () => {
    setSignOutLoading(true)
    startTransition(async () => {
      try {
        const { error } = await supabase.auth.signOut()

        if (error) {
          console.error('Error signing out:', error.message)
          toast.error('Failed to sign out')

          return
        }
        toast.success('Sign out sucess!')
        router.push('/login')
      } catch (error) {
        console.error('Exception during sign out:', error)
        toast.error('Failed to sign out')
      } finally {
        setSignOutLoading(false)
      }
    })
  }

  const handleMatters = async () => {
    setDashboardLoading(true)
    router.push('/matters')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-3xl shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-colors duration-200">
          <CardContent className="p-6 sm:p-8">
            <WelcomeHeader />

            <UserProfile userData={userData} loadingUser={loadingUser} />

            <ActionButtons
              handleMatters={handleMatters}
              handleSignOut={handleSignOut}
              dashboardLoading={dashboardLoading}
              signOutLoading={signOutLoading}
              isLoading={signOutLoading || dashboardLoading}
              disabled={isTransitioning}
            />
          </CardContent>
        </Card>
      </main>

      <footer className="py-4 text-center text-gray-500 dark:text-gray-400 text-sm transition-colors duration-200">
        <p>© {new Date().getFullYear()} JurisEase. All rights reserved.</p>
      </footer>
    </div>
  )
}
