'use client'

import { useSearchParams } from 'next/navigation'
import { AlertTriangle, HomeIcon } from 'lucide-react'

import { Header } from '@/components/auth/Header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export interface ErrorPageProps {
  defaultMessage?: string
}

export default function ErrorPage({
  defaultMessage = 'An unexpected error occurred',
}: ErrorPageProps) {
  const searchParams = useSearchParams()
  const errorMessage = searchParams.get('msg')
  const errorCause = searchParams.get('cause')
  const errorCode = searchParams.get('code')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-lg bg-card p-4 sm:p-6 shadow-sm">
        {/* Header Section */}
        <Header
          title="Error Occurred"
          subtitle="JurisEase"
          description="We encountered a problem while processing your request."
        />

        {/* Error Section */}
        <div className="rounded-lg bg-card p-4 sm:p-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h3 className="text-xl font-stretch-normal tracking-tight text-destructive md:text-3xl">
              {errorCode ? errorCode : '500'}
            </h3>
            <div className="flex h-12 w-12 sm:h-18 sm:w-18 items-center justify-center rounded-full bg-destructive">
              <AlertTriangle className=" h-6 w-6 sm:h-12 sm:w-12 text-secondary" />
            </div>

            <h3 className="text-xl font-black tracking-tight text-destructive md:text-3xl">
              {errorCause ? errorCause : 'Something went wrong'}
            </h3>

            <p className="text-sm sm:text-lg text-destructive">
              {errorMessage ? errorMessage : defaultMessage}
            </p>

            <div className="flex flex-col space-y-3 pt-4 max-w-sm">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/">
                  <span className="text-xs sm:text-sm cursor-pointer hidden sm:block ">
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
