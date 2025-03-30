"use server"

import type { Bill, Client } from  "@/types/billing.type"
import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"


function mapDbBillToAppBill(dbBill: any): Bill {
  return {
    id: dbBill.bill_id,
    clientId: dbBill.matter_id,
    name: dbBill.name,
    amount: parseFloat(dbBill.amount),
    dateBilled: dbBill.created_at,
    status: dbBill.status,
    frequency: dbBill.frequency,
  }
}

function mapAppBillToDbBill(bill: Omit<Bill, "id"> | Bill): any {
  const dbBill: any = {
    name: bill.name,
    amount: bill.amount.toString(),
    created_at: bill.dateBilled,
    status: bill.status,
    frequency: bill.frequency,
    matter_id: bill.clientId
  }

  // Only add ID if it exists (for updates)
  if ("id" in bill) {
    dbBill.bill_id = bill.id
  }

  return dbBill
}

// Billings table operations
export async function getBills() {
  const { data, error } = await supabase
    .from("billings")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching billings:", error)
    return []
  }

  return data.map(mapDbBillToAppBill) as Bill[]
}

export async function getClientNames() {
  const { data, error } = await supabase
    .from("matters")
    .select("name")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching clients:", error)
    return []
  }

  return data as Client[]
}


// export async function getBillsById(billId: string) {
//   const { data, error } = await supabase.from("billings").select("*").eq("id", billId).single()

//   if (error) {
//     console.error("Error fetching bills:", error)
//     return null
//   }

//   return data as Bill
// }

export async function createBill(bill: Omit<Bill, "id">) {
  const dbBill = mapAppBillToDbBill(bill)

  const { data, error } = await supabase
    .from("billings")
    .insert([dbBill])
    .select("bill_id, matter_id, client_name, name, amount, created_at, status, frequency")

    if (error) {
    console.error("Error adding bill:", error)
    throw new Error("Failed to create bill")
  }

  revalidatePath("/billings")

  return mapDbBillToAppBill(data[0]) as Bill
}

export async function updateBill(bill: Bill) {
  const dbBill = mapAppBillToDbBill(bill)

  const { data, error } = await supabase
    .from("billings")
    .update(dbBill)
    .eq("bill_id", bill.id)
    .select("bill_id, matter_id, client_name, name, amount, created_at, status, frequency")

  if (error) {
    console.error("Error updating bill:", error)
    throw new Error("Failed to update bill")
  }


  revalidatePath("/billings")
  return mapDbBillToAppBill(data[0]) as Bill
}

export async function deleteBill(id: string) {
  const { error } = await supabase.from("billings").delete().eq("bill_id", id)

  if (error) {
      console.error("Error deleting bill:", error)
      throw new Error("Failed to delete bill")
    }
    
    revalidatePath("/billings")
  return true
}