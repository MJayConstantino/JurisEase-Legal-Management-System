// utils/authHandlers.ts
import { createSupabaseClient } from '../utils/supabase/client'
import { signinAction, signOutAction, signUpAction } from '../actions/users'
import { toast } from 'sonner'

export const handleLoginSubmit = async (formData: FormData) => {
  const { error } = await signinAction(formData)
  if (error) {
    // console.error(error)
    return { error }
  }

  return { error: null }
}

export const handleSignUpSubmit = async (formData: FormData) => {
  const { error } = await signUpAction(formData)
  if (error) {
    return { error }
  }

  return { error: null }
}

export const handleGoogleSignIn = async () => {
  try {
    const supabase = createSupabaseClient()
    const redirectLink = `${window.location.origin}/auth/callback`
    const authWindow = window.open('', '_blank')

    if (!authWindow) {
      console.error('Popup blocked or failed to open.')
      return { error: 'Failed to open authentication window.' }
    }
    window.open('about:blank', '_self')?.close()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectLink,
        skipBrowserRedirect: true,
      },
    })

    if (error) {
      return { error: 'Failed Google Login: ' + error.message }
    }
    authWindow.location.href = data.url

    return { error: null }
  } catch (err: any) {
    // console.error('Error in Google login:', err.message)
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
