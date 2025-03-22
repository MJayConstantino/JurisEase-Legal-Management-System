"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { Matter } from "@/types/matter.type"


export async function getMatters() {
  const { data, error } = await supabase.from("matters").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching matters:", error)
    return []
  }

  return data as Matter[]
}

export async function getMatterById(matterId: string) {
  const { data, error } = await supabase.from("matters").select("*").eq("id", matterId).single()

  if (error) {
    console.error("Error fetching matter:", error)
    return null
  }

  return data as Matter
}

export async function createMatter(matter: Omit<Matter, "id">) {
  const { data, error } = await supabase.from("matters").insert([matter]).select()

  if (error) {
    console.error("Error creating matter:", error)
    throw new Error("Failed to create matter")
  }

  revalidatePath("/matters")
  return data[0] as Matter
}

export async function updateMatter(matter: Matter) {
  const { data, error } = await supabase.from("matters").update(matter).eq("id", matter.id).select()

  if (error) {
    console.error("Error updating matter:", error)
    throw new Error("Failed to update matter")
  }

  revalidatePath(`/matters/${matter.id}`)
  return data[0] as Matter
}

export async function deleteMatter(matterId: string) {
  const { error } = await supabase.from("matters").delete().eq("id", matterId)

  if (error) {
    console.error("Error deleting matter:", error)
    throw new Error("Failed to delete matter")
  }

  revalidatePath("/matters")
  return true
}

