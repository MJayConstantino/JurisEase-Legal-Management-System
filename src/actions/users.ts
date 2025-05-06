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

async function isUserLocked(email: string) {
  const supabase = await createSupabaseClient()
  const { data: boolData, error: boolError } = await supabase.rpc(
    'is_user_locked',
    { user_email: email }
  )
  return boolData
}

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
  const userLockedOut = await isUserLocked(data.email)
  if (userLockedOut) {
    return {
      error:
        'Too many Log in attempts, please wait 5 minutes before trying again!',
    }
  }

  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    await supabase.rpc('increment_failed_attempts', { user_email: data.email })
    return { error: 'Failed to log in: ' + error.message }
  }
  await supabase.rpc('reset_failed_attempts', { user_email: data.email })
  return { error: null }
}

async function isEmailTaken(email: string) {
  const supabase = await createSupabaseClient()
  const { data: booleanData, error } = await supabase.rpc(
    'check_email_exists',
    { p_email: email }
  )

  if (error) {
    console.error('Error checking email:', error.message)
    return false
  }

  return booleanData // Returns `true` if email exists, `false` otherwise
}

async function checkEmailVerification(email: string) {
  const supabase = await createSupabaseClient()
  const { data, error } = await supabase.rpc('check_user_verification', {
    user_email: email,
  })

  if (error) {
    console.error('RPC Error:', error)
    return null
  }

  return data // Returns true if awaiting verification false if not
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
  const emailVerification = await checkEmailVerification(data.email)
  const userExists = await isEmailTaken(data.email)
  if (emailVerification && userExists) {
    return { error: 'An email confirmation has already been sent.' }
  }
  if (!emailVerification && userExists) {
    return { error: 'You already have an account. Try logging in instead.' }
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

  const { data: files, error: listError } = await supabase.storage
    .from('user')
    .list(authData.user.id, { limit: 1 })

  if (!listError && files && files.length > 0) {
    const fileName = files[0].name
    const filePath = `${authData.user.id}/${fileName}`

    const { data: urlData } = supabase.storage
      .from('user')
      .getPublicUrl(filePath)
    if (urlData?.publicUrl) {
      avatar_url = urlData.publicUrl
    }
  }

  return { full_name, avatar_url }
}
