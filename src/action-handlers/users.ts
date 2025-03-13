// utils/authHandlers.ts
import { createSupabaseClient } from '@/utils/supabase/client'
import { signinAction, signOutAction } from '@/actions/users'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const handleLoginSubmit = async (formData: FormData) => {
  const router = useRouter()
  const { error } = await signinAction(formData)
  if (error) {
    console.error(error)
    return { error }
  }

  router.push('/documents')
  return { error: null }
}

export const handleGoogleSignIn = async () => {
  const router = useRouter()
  try {
    const supabase = createSupabaseClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${
          process.env.SITE_URL || 'http://localhost:3007'
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
