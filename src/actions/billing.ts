"use server"

import { revalidatePath } from "next/cache"
import { createServerClient } from "@supabase/ssr"

// Add new bill
export async function addBill(name: string, amount: string, date: string) {
  const supabase = createServerClient()

  const { error } = await supabase.from("bills").insert([
    {
      name,
      amount: `${amount} PHP`,
      date: date,
    },
  ])

  if (error) {
    console.error("Error adding bill:", error)
    return { success: false, message: error.message }
  }

  revalidatePath("/")
  return { success: true }
}

// Edit bill
export async function editBill(id: number, name: string, amount: string, date: string) {
  const supabase = createServerClient()

  const { error } = await supabase
    .from("bills")
    .update({
      name,
      amount: `${amount} PHP`,
      date: date,
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating bill:", error)
    return { success: false, message: error.message }
  }

  revalidatePath("/")
  return { success: true }
}

// Delete Bill
export async function deleteBill(id: number) {
  const supabase = createServerClient()

  const { error } = await supabase.from("bills").delete().eq("id", id)

  if (error) {
    console.error("Error deleting bill:", error)
    return { success: false, message: error.message }
  }

  revalidatePath("/")
  return { success: true }
}
