import { createClient } from '@supabase/supabase-js'
import { defineConfig } from 'cypress'
import dotenv from 'dotenv'
dotenv.config()
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: true, autoRefreshToken: true } }
)

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3007',
    setupNodeEvents(on, config) {
      // Cypress task to run Supabase RPC function
      on('task', {
        confirmUserEmail: async (email) => {
          const { data, error } = await supabase.rpc('confirm_user_email', {
            user_email: email,
          })
          if (error)
            throw new Error(`Failed to confirm email: ${error.message}`)
          return data
        },
        deleteUser: async (email) => {
          const { data, error } = await supabase.rpc('delete_user', {
            user_email: email,
          })
          if (error) throw new Error(`Failed to delete user: ${error.message}`)
          return data
        },

        login: async ({ email, password }) => {
          const { data: user, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          })

          if (error) {
            throw new Error(`Failed to login supabase: ${error.message}`)
          }
          return user.session
        },
      })

      return config
    },
  },
})
