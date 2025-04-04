"use server"

import type { Bill } from  "@/types/billing.type"
import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"


function mapDbBillToAppBill(dbBill: any): Bill {
  return {
    bill_id: dbBill.bill_id, 
    name: dbBill.name,
    amount: dbBill.amount,
    created_at: dbBill.created_at,
    status: dbBill.status,
    remarks: dbBill.remarks || "",
    matter_id: dbBill.matter_id,
  }

}

export async function getBills() {
  const { data, error } = await supabase
    .from("billings")
    .select("*")

  if (error) {
    console.error("Error fetching bills:", error)
    return []
  }

  return data.map(mapDbBillToAppBill) as Bill[]
}

export async function createBill(bill: Omit<Bill, "bill_id">) {

  const { data, error } = await supabase
    .from("billings")
    .insert([bill])
    .select()

  if (error) {
    console.error("Error adding bill:", error)
    return null
  }

  
  revalidatePath("/billings")

  return mapDbBillToAppBill(data[0]) as Bill
}

export async function updateBill(bill: Bill) {

  const { data, error } = await supabase
    .from("billings")
    .update(bill)
    .eq("bill_id", bill.bill_id)
    .select()

  if (error) {
    console.error("Error updating bill:", error)
    return null
  }

  
  revalidatePath("/billings")

  return mapDbBillToAppBill(data[0]) as Bill
}

export async function deleteBill(id: string) {
  const { error } = await supabase.from("billings").delete().eq("bill_id", id)

  if (error) {
    console.error("Error deleting bill:", error)
    return false
  }

  
  revalidatePath("/billings")

  return true
}
