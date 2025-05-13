"use server"

import type { Bill } from  "@/types/billing.type"
import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { Matter } from "@/types/matter.type"

interface BillWithMatter extends Bill {
  matter?: Matter
}

function mapDbBillToAppBill(dbBill: any): BillWithMatter {
  const matter = dbBill.matters
    ? {
        matter_id: dbBill.matters.matter_id,
        name: dbBill.matters.name,
        case_number: dbBill.matters.case_number,

        // These are required fields so they are included tho not used.
        client: dbBill.matters.client || "",
        status: dbBill.matters.status || "",
        created_at: dbBill.matters.created_at || "",
        description: dbBill.matters.description || "",
      }
    : undefined
  return {
    bill_id: dbBill.bill_id, 
    name: dbBill.name,
    amount: dbBill.amount,
    created_at: dbBill.created_at,
    status: dbBill.status,
    remarks: dbBill.remarks || "",
    matter_id: dbBill.matter_id,
    matter: matter,
  }

}

function mapBillForUpdate(mappedBill: BillWithMatter): Partial<Bill> {
  const { matter, ...billWithoutMatter } = mappedBill;
  return billWithoutMatter;
}

export async function getBills() {
  const { data, error } = await supabase
    .from("billings")
    .select(`
      *,
      matters:matter_id(matter_id, name, case_number)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching bills:", error)
    return []
  }

  return data.map(mapDbBillToAppBill) as BillWithMatter[]
}


export async function getBillsByMatterId(matterId: string) {
  const { data, error } = await supabase
    .from("billings")
    .select(`
      *,
      matters:matter_id(matter_id, name, case_number)
    `)
    .eq("matter_id", matterId)

  if (error) {
    console.error(`Error fetching bills for matter ${matterId}:`, error)
    return []
  }

  return data.map(mapDbBillToAppBill) as BillWithMatter[]
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

  return mapDbBillToAppBill(data[0]) as BillWithMatter
}

export async function updateBill(bill: Bill) {

  const { data, error } = await supabase
    .from("billings")
    .update(mapBillForUpdate(bill))
    .eq("bill_id", bill.bill_id)
    .select()

  if (error) {
    console.error("Error updating bill:", error)
    return null
  }

  
  revalidatePath("/billings")

  return data[0] as BillWithMatter
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
