'use server'

import { createSupabaseClient } from '../utils/supabase/server'
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
    return {
      error:
        'Invalid data Inputted' + userSchema.safeParse(data).error?.message,
    }
  }
  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    return { error: 'Failed to log in: ' + error.message }
  }

  return { error: null }
}

export async function signUpAction(formData: FormData) {
  const supabaseStorageCDN =
    'https://ysvesegmxbtcjgivpwkl.supabase.co/storage/v1/object/public/users/'
  const supabase = await createSupabaseClient()

  const data = Object.fromEntries(formData.entries()) as User
  if (userSchema.safeParse(data).error) {
    return { error: 'Invalid data Inputted' }
  }
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.name,
        avatar_url: supabaseStorageCDN + 'anon/base_profile.jpg',
      },
    },
  })
  if (error) {
    return { error: 'Failed to Sign Up: ' + error.message }
  }
  return { error: null }
}

export async function signOutAction() {
  const supabase = await createSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (session) {
    const { error } = await supabase.auth.signOut()
    if (error) {
      return { error: 'Failed to Sign out' + error.message }
    }
  }
  return { error: null }
}

export async function fetchUsersAction() {
  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('users')
    .select('user_id, user_name, user_email')
  if (error) {
    throw new Error('Error fetching users: ' + error.message)
  }
  return data
}

export async function fetchUserInfoAction() {
  const supabase = await createSupabaseClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    throw new Error('Error fetching user: ' + error.message)
  }

  if (!data.user) {
    throw new Error('User not found')
  }

  // Get full name and avatar_url from raw_user_meta_data
  const full_name = data.user.user_metadata.full_name
  const avatar_url = data.user.user_metadata.avatar_url

  return { full_name, avatar_url }
}
