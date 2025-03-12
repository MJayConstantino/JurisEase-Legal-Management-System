'use server'

import { createSupabaseClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// user schema
const userSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(5),
})

export type User = z.infer<typeof userSchema>

export async function signinAction(formData: FormData) {
  const supabase = await createSupabaseClient()

  const data = Object.fromEntries(formData.entries()) as User
  if (userSchema.safeParse(data).error) {
    redirect('/login?message=invalid user credentials')
  }
  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    redirect('/login?message=error logging in')
  }
  redirect('/documents')
}

export async function signUpAction(formData: FormData) {
  const supabase = await createSupabaseClient()

  const data = Object.fromEntries(formData.entries()) as User
  if (userSchema.safeParse(data).error) {
    redirect('/signup?message=invalid user credentials')
  }
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
      },
    },
  })
  if (error) {
    redirect('/signup?message=error signing up')
  }
  redirect('/login?message=success')
}

export async function signOutAction() {
  const supabase = await createSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (session) {
    const { error } = await supabase.auth.signOut()
    if (error) {
      redirect('/?message=error signing out')
    }
  }
}
