'use client'

import React, { useRef, useState, useTransition } from 'react'
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
  const nameRef = useRef<{
    triggerValidation: () => boolean
    clearErrors: () => void
  } | null>(null)
  const emailRef = useRef<{
    triggerValidation: () => boolean
    clearErrors: () => void
  } | null>(null)

  const passwordRef = useRef<{
    triggerValidation: () => boolean
    clearErrors: () => void
  } | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const isNameValid = nameRef.current?.triggerValidation()
    const isEmailValid = emailRef.current?.triggerValidation()
    const isPasswordValid = passwordRef.current?.triggerValidation()

    if (isNameValid && isEmailValid && isPasswordValid) {
      console.log('Passed validation')
    } else {
      if (!isEmailValid) {
        console.error('Invalid or empty email')
        setEmail('')
      }
      if (!isPasswordValid) {
        console.error('Invalid or empty password')
        setPassword('')
      }
      if (!isNameValid) {
        console.error('Invalid or empty name')
        setName('')
      }
    }
    startTransition(async () => {
      try {
        const { error } = await signUpHandler(formData)
        if (error) {
          console.log(Object.fromEntries(formData.entries()))
          toast.error(error) // Notify error
        } else {
          // Notify success

          onSignUpSuccess?.()
          setName('')
          setEmail('')
          setPassword('')
        }
      } catch (err) {
        console.error('Error during sign-up:', err)
        console.log(Object.fromEntries(formData.entries()))
        toast.error('An unexpected error occurred during sign-up')
      }
    })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-4 sm:p-6 shadow-sm">
        {/* Header Section */}
        <Header
          title="Create an Account"
          subtitle="JurisEase"
          description="Sign up to access our legal services and resources."
        />

        {/* Form Section */}
        <div className="rounded-lg bg-[#e1e5f2] p-4 sm:p-6">
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <NameField
                ref={nameRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isPending || isTransitioning}
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <EmailField
                ref={emailRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending || isTransitioning}
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <PasswordField
                ref={passwordRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending || isTransitioning}
                page="register"
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
          text="Already have a Google or JurisEase account?"
          linkHref="/login"
          linkText="Log In"
        />
      </div>
    </div>
  )
}
