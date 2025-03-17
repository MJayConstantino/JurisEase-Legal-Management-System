// utils/authHandlers.ts
import { createSupabaseClient } from '@/utils/supabase/client'
import { signinAction, signOutAction, signUpAction } from '@/actions/users'
import { toast } from 'sonner'

export const handleLoginSubmit = async (formData: FormData) => {
  const { error } = await signinAction(formData)
  if (error) {
    console.error(error)
    return { error }
  }

  return { error: null }
}

export const handleSignUpSubmit = async (formData: FormData) => {
  const { error } = await signUpAction(formData)
  if (error) {
    console.error(error)
    return { error }
  }

  return { error: null }
}

export const handleGoogleSignIn = async () => {
  try {
    const supabase = createSupabaseClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${
          location.origin || 'http://localhost:3007'
        }}/auth/callback`,
      },
    })

    if (error) {
      return { error: 'Failed Google Login: ' + error.message }
    }

    return { error: null }
  } catch (err: any) {
    console.error('Error in Google login:', err.message)
    return { error: 'Failed Google Login: ' + err.message }
  }
}

export const handleSignOut = async () => {
  const { error } = await signOutAction()
  if (error) {
    toast.error(error)
  }
  toast.success('Sign out Success!')
}
