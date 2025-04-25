"use server"

import type { User } from "@/types/user.type"
import { supabase } from "@/lib/supabase"

export async function updateProfileName(user: User){
  const { data, error } = await supabase
    .from("users")
    .update(user)
    .eq("user_id", user.user_id)
    .select()

  if (error) {
    console.error("Error updating profile name:", error);
    return null;
  }

  return data;
}

export async function deleteUser(userId: string) {
  const { error } = await supabase
  .from("users")
  .delete()
  .eq("user_id", userId);

  if (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }

  return true
}
