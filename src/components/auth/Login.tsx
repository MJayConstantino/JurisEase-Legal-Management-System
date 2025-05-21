'use client'

import React, { useEffect, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'

import { PasswordField } from './PasswordField'
import { EmailField } from './Emailfield'
import { SignInButton } from './SignInBtn'
import { GoogleSignInButton } from './GoogleSigninBtn'
import { Header } from '@/components/auth/Header'
import { Footer } from '@/components/auth/Footer'

import { handleGoogleSignIn, handleLoginSubmit } from '@/action-handlers/users'
import { fetchUserSession } from '@/actions/users'

export interface LoginPageProps {
  handleLoginSubmitfn?: (
    formData: FormData
  ) => Promise<{ error: string } | { error: null }>
  handleGoogleLoginfn?: () => Promise<{ error: string } | { error: null }>
  onLoginSuccess?: () => void
  onGoogleLoginSuccess?: () => void
  redirectPath?: string
  isPending?: boolean
  onError?: () => void
  onNavigateGoogleLogin?: () => void
}

export function LoginPage({
  handleLoginSubmitfn = handleLoginSubmit,
  handleGoogleLoginfn = handleGoogleSignIn,
  onLoginSuccess,
  onGoogleLoginSuccess,
  onNavigateGoogleLogin,
  onError,
  isPending = false,
}: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isTransitioning, startTransition] = useTransition()

  const emailRef = useRef<{
    triggerValidation: () => boolean
    clearErrors: () => void
  } | null>(null)

  const passwordRef = useRef<{
    triggerValidation: () => boolean
    clearErrors: () => void
  } | null>(null)

  // Handle form submission for login
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const isEmailValid = emailRef.current?.triggerValidation()
    const isPasswordValid = passwordRef.current?.triggerValidation()

    if (isEmailValid && isPasswordValid) {
      console.log('Passed validation')
      setPassword('')
      setEmail('')
    } else {
      if (!isEmailValid) {
        console.error('Invalid or empty email')
        setEmail('')
      }
      if (!isPasswordValid) {
        console.error('Invalid or empty password')
        setPassword('')
      }
    }

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
      if (onNavigateGoogleLogin) {
        onNavigateGoogleLogin()
      }

      try {
        const { error } = await handleGoogleLoginfn()
        if (error) {
          toast.error(error)
          setEmail('')
          setPassword('')
        } else {
          onGoogleLoginSuccess?.()
        }
      } catch (err) {
        console.error('Error during Google login:', err)
        toast.error('Error Logging in')
      }
    })
  }

  useEffect(() => {
    const handleAuthComplete = async (event: MessageEvent) => {
      if (
        event.origin === window.location.origin &&
        event.data === 'auth_complete'
      ) {
        console.log('Authentication complete, refreshing session...')

        // Refresh the Supabase session
        startTransition(async () => {
          const info = await fetchUserSession()
          if (!info) {
            if (onError) {
              onError()
            } else {
              throw new Error('there was no user fetched')
            }
          }
          if (onGoogleLoginSuccess) {
            onGoogleLoginSuccess()
          } else {
            window.location.reload()
          }
        })
      }
    }

    window.addEventListener('message', handleAuthComplete)
    return () => window.removeEventListener('message', handleAuthComplete)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-4 sm:p-6 shadow-sm">
        {/* Header Section  */}
        <Header
          title="Welcome back!"
          subtitle="JurisEase"
          description="Log in to access your matters, documents, and legal tools."
        />

        {/* Form Section */}
        <div className="rounded-lg bg-[#e1e5f2] p-4 sm:p-6">
          <form onSubmit={handleSubmit}>
            {/* Email FIeld  */}
            <div className="mb-4">
              <EmailField
                ref={emailRef!}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending || isTransitioning}
              />
            </div>

            {/* Password Field  */}
            <div className="mb-6">
              <PasswordField
                ref={passwordRef!}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending || isTransitioning}
                page="login"
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
