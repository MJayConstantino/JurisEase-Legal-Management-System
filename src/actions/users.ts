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
  const zodError = userSchema.safeParse(data).error
  if (zodError) {
    const zodErrorObj = zodError.flatten().fieldErrors
    return {
      error:
        'Invalid Data Inputted: ' +
        (
          (zodErrorObj.email ? '(Invalid Email Format) ' : '') +
          (zodErrorObj.password ? '(Invalid Password Format)' : '')
        ).trim(),
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
  const zodError = userSchema.safeParse(data).error
  if (zodError || !data.name) {
    const zodErrorObj = zodError?.flatten().fieldErrors
    return {
      error:
        'Invalid data Inputted: ' +
        (
          (zodErrorObj?.email ? '(Invalid Email Format) ' : '') +
          (zodErrorObj?.password ? '(Invalid Password Format) ' : '') +
          (data.name ? '' : '(No Name Provided)')
        ).trim(),
    }
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
  const { data: authData, error: authError } = await supabase.auth.getUser()

  if (authError) {
    throw new Error('Error fetching user: ' + authError.message)
  }

  if (!authData.user) {
    throw new Error('User not found')
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('user_name')
    .eq('user_id', authData.user.id)
    .single()

  if (userError) {
    throw new Error('Error fetching user info: ' + userError.message)
  }

  const full_name = userData?.user_name || 'Unknown User'

  let avatar_url = authData.user.user_metadata.avatar_url || null

  const { data: files, error: listError } = await supabase
    .storage
    .from('user')
    .list(authData.user.id, { limit: 1 })

  if (!listError && files && files.length > 0) {
    const fileName = files[0].name
    const filePath = `${authData.user.id}/${fileName}`

    const { data: urlData } = supabase.storage.from('user').getPublicUrl(filePath)
    if (urlData?.publicUrl) {
      avatar_url = urlData.publicUrl
    }
  }

  return { full_name, avatar_url }
}
