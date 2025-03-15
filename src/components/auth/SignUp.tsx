'use client'

import type React from 'react'
import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { InputField } from '@/components/ui/input-field'
import { UserIcon, MailIcon, KeyIcon } from 'lucide-react'
import { toast } from 'sonner'
import { signUpAction } from '@/actions/users'

export interface SignUpPageProps {
  handleSignUpFn?: (
    formData: FormData
  ) => Promise<{ error: string } | { error: null }>
  onSignUpSuccess: () => void
  isPending?: boolean
}

export function SignUpPage({
  handleSignUpFn = signUpAction,
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
        const { error } = await handleSignUpFn(formData)
        if (error) {
          toast.error(error)
          setName('')
          setEmail('')
          setPassword('')
        } else {
          toast.success('Sign Up Success')
          onSignUpSuccess?.()
        }
      } catch (err: any) {
        console.error('Error during sign-up:', err)
        toast.error('Error Signing Up: ' + err)
      }
    })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 font-aileron">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-8 text-center font-aileron">
          <h1 className="text-3xl font-bold tracking-tight text-[#2D336B] md:text-4xl">
            Create an Account
          </h1>
          <h2 className="text-2xl font-black tracking-tight text-[#1B1E4B] md:text-3xl">
            Dianson Law Office
          </h2>
          <p className="mt-2 text-[#2a3563]">
            Sign up to access our legal services and resources.
          </p>
        </div>

        <div className="rounded-lg bg-[#e1e5f2] p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <InputField
                id="name"
                name="name"
                type="text"
                label="Full Name"
                icon={UserIcon}
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isPending || isTransitioning}
              />
            </div>

            <div className="mb-4">
              <InputField
                id="email"
                name="email"
                type="email"
                label="Email"
                icon={MailIcon}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isPending || isTransitioning}
              />
            </div>

            <div className="mb-6">
              <InputField
                id="password"
                name="password"
                type="password"
                label="Password"
                icon={KeyIcon}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isPending || isTransitioning}
              />
            </div>

            <div className="flex flex-col space-y-4">
              <Button
                disabled={isPending || isTransitioning}
                type="submit"
                className="bg-[#2a3563] hover:bg-[#1e2547] text-white"
              >
                {isPending || isTransitioning ? 'Signing up...' : 'Sign Up'}
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-4 text-center text-sm">
          <span className="text-[#2a3563]">Already have an account? </span>
          <a
            href="/login"
            className="font-medium text-[#2a3563] hover:underline"
          >
            Log In
          </a>
        </div>
      </div>
    </div>
  )
}
