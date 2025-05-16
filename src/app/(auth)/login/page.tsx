'use client'
import { LoginPage } from '@/components/auth/Login'
import LoginSkeleton from './loading'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

export default function Login() {
  const router = useRouter()
  // Handle successful login
  const handleLoginSuccess = () => {
    router.push('/loggedIn')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Suspense fallback={<LoginSkeleton />}>
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onGoogleLoginSuccess={handleLoginSuccess}
        />
      </Suspense>
    </div>
  )
}
