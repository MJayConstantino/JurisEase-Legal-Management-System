"use server"

import type { Bill } from "@/components/billings/billingsBillInterface"
import { supabase } from "@/lib/supabase"

// Bills table operations
export async function fetchBills() {
  const { data, error } = await supabase.from("bills").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching bills:", error)
    return []
  }

  return data as Bill[]
}

export async function addBill(bill: Omit<Bill, "id">) {
  const { data, error } = await supabase.from("bills").insert([bill]).select()

  if (error) {
    console.error("Error adding bill:", error)
    return null
  }

  return data?.[0] as Bill
}

export async function updateBill(bill: Bill) {
  const { data, error } = await supabase.from("bills").update(bill).eq("id", bill.id).select()

  if (error) {
    console.error("Error updating bill:", error)
    return null
  }

  return data?.[0] as Bill
}

export async function deleteBill(id: string) {
  const { error } = await supabase.from("bills").delete().eq("id", id)

  if (error) {
    console.error("Error deleting bill:", error)
    return false
  }

  return true
}