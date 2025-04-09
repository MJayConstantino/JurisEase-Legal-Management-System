'use client'

import React, { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { PasswordField } from './PasswordField'
import { EmailField } from './Emailfield'
import { SignInButton } from './SignInBtn'
import { GoogleSignInButton } from './GoogleSigninBtn'
import { Header } from '@/components/auth/Header'
import { Footer } from '@/components/auth/Footer'

import { handleGoogleSignIn, handleLoginSubmit } from '@/action-handlers/users'

export interface LoginPageProps {
  handleLoginSubmitfn?: (
    formData: FormData
  ) => Promise<{ error: string } | { error: null }>
  handleGoogleLoginfn?: () => Promise<{ error: string } | { error: null }>
  onLoginSuccess?: () => void
  onGoogleLoginSuccess?: () => void
  redirectPath?: string
  isPending?: boolean
}

export function LoginPage({
  handleLoginSubmitfn = handleLoginSubmit,
  handleGoogleLoginfn = handleGoogleSignIn,
  onLoginSuccess,
  onGoogleLoginSuccess,
  isPending = false,
}: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isTransitioning, startTransition] = useTransition()

  // Handle form submission for login
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      try {
        const { error } = await handleLoginSubmitfn(formData)
        if (error) {
          console.error(Object.fromEntries(formData.entries()))
          toast.error(error)
          setEmail('')
          setPassword('')
        } else {
          toast.success('Login Success')
          onLoginSuccess?.()
        }
      } catch (err: any) {
        console.error(Object.fromEntries(formData.entries()))
        console.error('Error during login:', err)
        toast.error('Error Logging in' + err)
      }
    })
  }

  // Handle Google Login
  const handleGoogleLogin = () => {
    startTransition(async () => {
      try {
        const { error } = await handleGoogleLoginfn()
        if (error) {
          toast.error(error)
          setEmail('')
          setPassword('')
        } else {
          toast.success('Google Login Success')
          onGoogleLoginSuccess?.()
        }
      } catch (err) {
        console.error('Error during Google login:', err)
        toast.error('Error Logging in')
      }
    })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
        {/* Header Section  */}
        <Header
          title="Welcome back!"
          subtitle="JurisEase"
          description="Log in to access your matters, documents, and legal tools."
        />

        {/* Form Section */}
        <div className="rounded-lg bg-[#e1e5f2] p-6">
          <form onSubmit={handleSubmit}>
            {/* Email FIeld  */}
            <div className="mb-4">
              <EmailField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending || isTransitioning}
              />
            </div>

            {/* Password Field  */}
            <div className="mb-6">
              <PasswordField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending || isTransitioning}
              />
            </div>

            <div className="flex flex-col space-y-4">
              <SignInButton
                disabled={isPending || isTransitioning}
                isPending={isPending || isTransitioning}
              />
              <GoogleSignInButton
                onClick={handleGoogleLogin}
                disabled={isPending || isTransitioning}
              />
            </div>
          </form>
        </div>

        {/* Footer Section */}
        <Footer
          text="Don't have an account?"
          linkHref="/signup"
          linkText="Sign Up"
        />
      </div>
    </div>
  )
}
