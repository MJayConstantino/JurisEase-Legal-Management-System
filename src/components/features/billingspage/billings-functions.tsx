"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { mockBills } from "./mock-bills"
import { Bill } from "./billings-bill-interface"


const getBills = async (): Promise<Bill[]> => {
    const cookieStore = await cookies(); 
    const billsCookie = cookieStore.get("bills");
  
    if (!billsCookie?.value) {
      return [mockBills[0]];
    }
  
    try {
      return JSON.parse(billsCookie.value);
    } catch (e) {
      return [mockBills[0]];
    }
}
  

async function addBill(formData: FormData) {

    const name = formData.get("name") as string
    const amount = formData.get("amount") as string
    const date = formData.get("date") as string
  
    const existingBills = await getBills()
  
    const newBill = {
      id: Date.now(),
      name: name || "Untitled",
      amount: amount ? `${amount} PHP` : 0,
      date: date ? formatDate(date) : formatDate(new Date().toString()),
    }

    const updatedBills = [...existingBills, newBill]
  

    const cookieStore = await cookies()
    await cookieStore.set("bills", JSON.stringify(updatedBills), {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })
  
    revalidatePath("/")
}

function formatDate(dateString: string) {
    if (!dateString) return ""
    const [year, month, day] = dateString.split("-")
    return `${month}/${day}/${year}`
}

function calculateTotalRevenue(bills: Bill[]): string {
  
  const total = bills.reduce((sum, bill) => {
    const numericAmount = Number.parseInt(bill.amount.replace(/[^0-9.]/g, ""), 10)
    return sum + (isNaN(numericAmount) ? 0 : numericAmount)
  }, 0)

  return `${total.toLocaleString()} PHP`
}

export {getBills, addBill, calculateTotalRevenue }