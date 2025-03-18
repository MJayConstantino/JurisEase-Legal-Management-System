'use client'

import { SignUpPage } from '@/components/auth/SignUp'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function SignUp() {
  const router = useRouter()
  const handleSignUpSucess = () => {
    toast.success('Sign Up Succesful! Confirm your Emeil!')
    router.push('/login')
  }
  return <SignUpPage onSignUpSuccess={handleSignUpSucess} />
}
