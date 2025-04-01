'use client'

import React, { useState, useTransition } from 'react'
import { NameField } from '@/components/auth/NameField'
import { EmailField } from '@/components/auth/Emailfield'
import { PasswordField } from '@/components/auth/PasswordField'
import { SignUpButton } from '@/components/auth/SignupBtn'
import { Header } from '@/components/auth/Header'
import { Footer } from '@/components/auth/Footer'
import { toast } from 'sonner'
// import { signUpAction } from '@/actions/users'
import { handleSignUpSubmit } from '@/action-handlers/users'

export interface SignUpPageProps {
  signUpHandler?: (
    formData: FormData
  ) => Promise<{ error: string } | { error: null }>
  onSignUpSuccess?: () => void
  isPending?: boolean
}

export function SignUpPage({
  signUpHandler = handleSignUpSubmit,
  onSignUpSuccess,
  isPending = false,
}: SignUpPageProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isTransitioning, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      try {
        const { error } = await signUpHandler(formData)
        if (error) {
          toast.error(error) // Notify error
          setName('')
          setEmail('')
          setPassword('')
        } else {
          // Notify success
          toast.success('Sign-up successful!')
          onSignUpSuccess?.()
        }
      } catch (err) {
        console.error('Error during sign-up:', err)
        toast.error('An unexpected error occurred during sign-up')
      }
    })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 font-aileron">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
        {/* Header Section */}
        <Header
          title="Create an Account"
          subtitle="JurisEase"
          description="Sign up to access our legal services and resources."
        />

        {/* Form Section */}
        <div className="rounded-lg bg-[#e1e5f2] p-6">
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <NameField
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isPending || isTransitioning}
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <EmailField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending || isTransitioning}
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <PasswordField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending || isTransitioning}
              />
            </div>

            <div className="flex flex-col space-y-4">
              <SignUpButton
                isDisabled={isPending || isTransitioning}
                isPending={isPending || isTransitioning}
              />
            </div>
          </form>
        </div>

        {/* Footer Section */}
        <Footer
          text="Already have an account?"
          linkHref="/login"
          linkText="Log In"
        />
      </div>
    </div>
  )
}
