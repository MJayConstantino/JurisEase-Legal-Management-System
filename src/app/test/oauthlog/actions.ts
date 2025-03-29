'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createSupabaseClient } from '@/utils/supabase/server'
import { z } from 'zod'

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
})

export type User = z.infer<typeof userSchema>

export async function login(formData: FormData) {
  const supabase = await createSupabaseClient()
  //{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email. change configuration settings soon

  // const data: User = {
  //   email: formData.get('email') as string,
  //   password: formData.get('password') as string,
  // } this is the old code by supabase to be used a reference

  const data = Object.fromEntries(formData.entries()) as User
  if (userSchema.safeParse(data).error) {
    redirect('test/login?message= Invalid credentials')
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/test/login?message=Error signing in')
  }

  revalidatePath('/', 'layout')
  redirect('/test/login')
}

export async function signup(formData: FormData) {
  const supabase = await createSupabaseClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    // redirect('/error')
    redirect('/test/login?message=Error signing in')
  }

  revalidatePath('/', 'layout')
  redirect('/test/login')
}
