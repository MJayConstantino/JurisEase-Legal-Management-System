"use server"

import { revalidatePath } from "next/cache"
import { createServerClient } from "@supabase/ssr"


// Add new bill
export async function addBill(name: string, amount: string, date: string) {
  const supabase = createServerClient()

  const formattedAmount = formatNumberWithCommas(amount)

  const { error } = await supabase.from("bills").insert([
    {
      name,
      amount: `${formattedAmount} PHP`,
      date: formatDate(date),
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

  const formattedAmount = formatNumberWithCommas(amount)

  const { error } = await supabase
    .from("bills")
    .update({
      name,
      amount: `${formattedAmount} PHP`,
      date: formatDate(date),
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

// Formats Date to MM/DD/YYYY format
export function formatDate(dateString: string) {
  if (!dateString) return ""
  const [year, month, day] = dateString.split("-")
  return `${month}/${day}/${year}`
}

// Formats Date to YYYY/MM/DD for supabase input
export function convertToInputDateFormat(dateString: string) {
  if (!dateString) return ""
  const [month, day, year] = dateString.split("/")
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
}

// Adds commas to amounts i.e. 100000 => 100,000
export function formatNumberWithCommas(value: string): string {
  const cleanValue = value.replace(/,/g, "").replace(/[^\d.]/g, "")

  const number = Number.parseFloat(cleanValue)
  if (isNaN(number)) return "0"

  return number.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  })
}

export function formatBillAmount(amount: string): string {
  const numericPart = amount.replace(/[^\d,]/g, "")
  if (numericPart.includes(",")) return amount

  const formatted = formatNumberWithCommas(numericPart)
  return amount.replace(numericPart, formatted)
}