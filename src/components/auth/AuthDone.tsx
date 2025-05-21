'use client'
/* eslint-disable */

import { useEffect, useState } from 'react'
import { CheckCircle, HomeIcon } from 'lucide-react'

import { Header } from './Header'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function AuthDonePage() {
  const [closing, setClosing] = useState(false)
  const [manualClose, setManualClose] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.opener) {
        try {
          window.opener.postMessage('auth_complete', window.location.origin)
          setClosing(true)
          window.close()
        } catch (error) {
          console.error('Error closing window:', error)
          setManualClose(true)
        }
      } else {
        setManualClose(true)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-4 sm:p-6 shadow-sm">
        {/* Header Section */}
        <Header
          title="Authentication Successful"
          subtitle="JurisEase"
          description="You have been successfully authenticated."
        />

        {/* Success Section */}
        <div className="rounded-lg bg-[#e1e5f2] p-4 sm:p-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>

            <h3 className="text-lg font-medium text-[#2a3563]">
              Login Successful
            </h3>

            <p className="text-sm text-gray-600">
              {closing
                ? 'This window will close automatically...'
                : 'You have been successfully logged in.'}
            </p>
            <p>
              <span className="text-xs font-light">
                Window is still open or hasn't redirected you yet? Go to the
                homepage by clicking the button below!
              </span>
            </p>

            {manualClose && (
              <div className="flex flex-col space-y-3 pt-4 max-w-sm">
                <Button className="w-full bg-[#2a3563] hover:bg-[#1e2547] text-white cursor-pointer">
                  <Link href="/">
                    <span>
                      <HomeIcon />
                    </span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
