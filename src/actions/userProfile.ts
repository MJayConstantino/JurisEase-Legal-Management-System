"use server"

import type { User } from "@/types/user.type"
import { supabase } from "@/lib/supabase"

export async function updateProfileName(user: User) {

  const { data, error } = await supabase
    .from("users")
    .update(user)
    .eq("user_id", user.user_id)
    .select()

  if (error) {
    console.error("Error Updating Profile:", error)
    return null
  }

  return data[0] as User
}
