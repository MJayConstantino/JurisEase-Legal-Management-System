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
        register: async ({ name, email, password }) => {
          const supabaseStorageCDN =
            'https://ysvesegmxbtcjgivpwkl.supabase.co/storage/v1/object/public/users/'
          const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
              data: {
                full_name: name,
                avatar_url: supabaseStorageCDN + 'anon/base_profile.jpg',
              },
            },
          })
          if (error) {
            throw new Error(error.message)
          }
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
        resetLoginAttempts: async (email) => {
          const { error } = await supabase.rpc('reset_failed_attempts', {
            user_email: email,
          })
          if (error) {
            throw new Error('Failed to reset login attempts')
          }
          return null
        },
        deleteMatter: async (matterName: string) => {
          try {
            // First find the matter by name
            const { data: matter, error: findError } = await supabase
              .from('matters')
              .select('matter_id')
              .eq('name', matterName)
              .single()

            if (findError) {
              console.log(`Error finding matter ${matterName}:`, findError)
              return null
            }

            if (!matter) {
              console.log(`Matter ${matterName} not found`)
              return null
            }

            // Then delete the matter
            const { error: deleteError } = await supabase
              .from('matters')
              .delete()
              .eq('matter_id', matter.matter_id)

            if (deleteError) {
              console.log(`Error deleting matter ${matterName}:`, deleteError)
              return null
            }

            return null
          } catch (error) {
            console.error(
              `Unexpected error deleting matter ${matterName}:`,
              error
            )
            return null
          }
        },
      })

      return config
    },
  },
})
