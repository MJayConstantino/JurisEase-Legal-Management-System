// 'use server'

// import { createClient } from '@/utils/supabase/server'
// import { redirect } from 'next/navigation'
// import { revalidatePath } from 'next/cache'
// import { z } from 'zod'

// const AdvUserSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(5),
//   role: z.enum(['admin', 'user']),
// })
// // this stores the extra column data i the reaw metadata object

// export type AdvUser = z.infer<typeof AdvUserSchema>

// export async function signup(formData: FormData) {
//   const supabase = await createClient()

//   const {
//     data: { user },
//     error: userError,
//   } = await supabase.auth.getUser()

//   if (user) {
//     console.log(user.id)
//     console.log(user.email)
//     console.log(user.user_metadata)
//   }

//   const data = Object.fromEntries(formData.entries()) as AdvUser

//   if (AdvUserSchema.safeParse(data).error) {
//     throw new Error(`${data}`)
//     // redirect('/test/advlog?message="invalid credentials input')
//   }

//   const { error } = await supabase.auth.signUp({
//     email: data.email,
//     password: data.password,
//     options: {
//       data: {
//         role: data.role,
//       },
//     },
//   })

//   if (error) {
//     // redirect('/error')
//     redirect('/test/login?message=Error signing up')
//   }

//   revalidatePath('/', 'layout')
//   redirect('/test/advlog? message=Sucess')
// }

// export async function signout() {
//   const supabase = await createClient()
//   const {
//     data: { session },
//   } = await supabase.auth.getSession()
//   if (session) {
//     const { error } = await supabase.auth.signOut()
//     if (error) {
//       redirect('/test/advlog?message= error signing up')
//     }
//   }
// }
