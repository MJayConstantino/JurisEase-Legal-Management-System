"use server"

import type { Bill } from  "@/types/billing.type"
import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"


export async function getBills() {
  const { data, error } = await supabase.from("billings").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching bills:", error)
    return []
  }

  return data as Bill[]
}

export async function getBillsById(billId: string) {
  const { data, error } = await supabase.from("billings").select("*").eq("id", billId).single()

  if (error) {
    console.error("Error fetching bills:", error)
    return null
  }

  return data as Bill
}

export async function createBill(bill: Omit<Bill, "id">) {
  const { data, error } = await supabase.from("bills").insert([bill]).select()

  if (error) {
    console.error("Error adding bill:", error)
    throw new Error("Failed to create bill")
  }

  revalidatePath("/billings")
  return data?.[0] as Bill
}

export async function updateBill(bill: Bill) {
  const { data, error } = await supabase.from("billings").update(bill).eq("id", bill.id).select()

  if (error) {
    console.error("Error updating bill:", error)
    throw new Error("Failed to update bill")
  }

  revalidatePath("/billings")
  return data?.[0] as Bill
}

export async function deleteBill(billId: string) {
  const { error } = await supabase.from("billings").delete().eq("id", billId)

  if (error) {
    console.error("Error deleting bill:", error)
    throw new Error("Failed to delete bill")
  }

  revalidatePath("/billings")
  return true
}