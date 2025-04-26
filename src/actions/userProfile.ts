
import type { User } from "@/types/user.type"
import { supabase } from "@/lib/supabase"
import { redirectToHome } from "./routing";
import { redirect } from "next/navigation";

export async function updateUsername(user: User){
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

export async function updateAvatar(user: User){
  return(console.log("There's no avatar storage", user))
}

export async function deleteUser(user: User) {
  const { error } = await supabase
  .from("users")
  .delete()
  .eq("user_id", user.user_id)

  if (error) {
    throw new Error('Failed to delete user: ' + error.message)
  }

  redirect("/login")
}
