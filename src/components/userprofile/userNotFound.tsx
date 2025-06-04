'use client'

import { UserX, HomeIcon } from 'lucide-react'
import Link from 'next/link'

import { Header } from '@/components/auth/Header'
import { Button } from '@/components/ui/button'

export interface UserNotFoundPageProps {
  username?: string
  userId?: string
}

export function UserNotFoundPage({ username, userId }: UserNotFoundPageProps) {
  // Determine what to display based on available information
  const userIdentifier = username || userId || 'The requested user'

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-lg bg-card p-4 sm:p-6 shadow-sm">
        {/* Header Section */}
        <Header
          title="User Not Found"
          subtitle="JurisEase"
          description="We couldn't find the user you were looking for."
        />

        {/* User Not Found Section */}
        <div className="rounded-lg bg-card p-4 sm:p-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h3 className="text-xl font-stretch-normal tracking-tight text-destructive md:text-3xl">
              404
            </h3>
            <div className="flex h-12 w-12 sm:h-18 sm:w-18 items-center justify-center rounded-full bg-destructive">
              <UserX className="h-6 w-6 sm:h-12 sm:w-12 text-accent" />
            </div>

            <h3 className="text-xl font-black tracking-tight text-destructive md:text-3xl">
              User Not Found
            </h3>

            <p className="text-sm sm:text-lg text-destructive">
              {userIdentifier} could not be found in our system.
            </p>

            <div className="flex flex-col space-y-3 pt-4 max-w-sm">
              <Button
                asChild
                className="bg-primary text-accent hover:bg-primary/90"
              >
                <Link href="/">
                  <span className="text-xs sm:text-sm cursor-pointer hidden sm:block">
                    Return to Home
                  </span>
                  <span>
                    <HomeIcon />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
