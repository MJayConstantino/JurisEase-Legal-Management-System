'use client'
import { LoginPage } from '@/components/auth/Login'
import LoginSkeleton from '../../../components/auth/LoginSkeleton'
import { useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'

export default function Login() {
  const [isNavigating, setNavigating] = useState(false)
  const router = useRouter()
  // Handle successful login
  const handleLoginSuccess = () => {
    setNavigating(true)
    router.push('/loggedIn')
  }
  const handleNavigateGoogleLogin = () => {
    setNavigating(true)
    router.push('/auth/authenticated')
  }

  const handleOnError = () => {
    router.push(
      '/error?cause=User was not authenticated!&msg=User failed to authenticate after completing the Google login! Trying again may resolve this issue!&code=500'
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Suspense fallback={<LoginSkeleton />}>
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onGoogleLoginSuccess={handleLoginSuccess}
          onError={handleOnError}
          onNavigateGoogleLogin={handleNavigateGoogleLogin}
          isPending={isNavigating}
        />
      </Suspense>
    </div>
  )
}
