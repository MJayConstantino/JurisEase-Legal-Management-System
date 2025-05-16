'use client'

import { SignUpPage } from '@/components/auth/SignUp'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { toast } from 'sonner'
import LoginSkeleton from './loading'

export default function SignUp() {
  const router = useRouter()
  const handleSignUpSucess = () => {
    toast.success('Sign Up Succesful! Confirm your Emeil!')
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Suspense fallback={<LoginSkeleton />}>
        <SignUpPage onSignUpSuccess={handleSignUpSucess} />
      </Suspense>
    </div>
  )
}
