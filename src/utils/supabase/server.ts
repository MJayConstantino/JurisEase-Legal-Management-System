import { createServerClient } from '@supabase/ssr'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function createSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

export async function getUser() {
  const supabase = createSupabaseClient()
  const user = (await (await supabase).auth.getUser()).data.user
  return user
}

export async function sessionExists() {
  const supabase = await createSupabaseClient()
  const session = (await supabase.auth.getSession()).data.session
  if (session) {
    redirect('/loggedIn')
  }
}
export async function protectRoute() {
  const supabase = await createSupabaseClient()
  const user = await (await supabase.auth.getUser()).data.user
  if (!user) {
    redirect('/login')
  }
}
