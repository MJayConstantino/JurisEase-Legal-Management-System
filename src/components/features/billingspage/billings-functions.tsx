"use client"


import { mockBills } from "./mock-bills"
import { Bill } from "./bills-states"
import type React from "react"
import { useBillsState } from "./bills-states"

const getBills = async (): Promise<Bill[]> => {
  if (typeof window === "undefined") return [mockBills[0]]

  const billsCookie = document.cookie.split("; ").find((row) => row.startsWith("bills="))

  if (!billsCookie) {
    return [mockBills[0]]
  }

  try {
    return JSON.parse(decodeURIComponent(billsCookie.split("=")[1]))
  } catch (e) {
    return [mockBills[0]]
  }
}

function useSaveBills(){
  const {setBills, setTotalRevenue} = useBillsState()

  const saveBills  = (updatedBills: Bill[]) => {
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 7)

    document.cookie = `bills=${encodeURIComponent(JSON.stringify(updatedBills))}; expires=${expiryDate.toUTCString()}; path=/`

    setBills(updatedBills)
    setTotalRevenue(calculateTotalRevenue(updatedBills))
  }
  return(saveBills)
}

function useAddBill(){
  const {bills, name, setName, amount, setAmount, date, setDate, setLoading, setShowAddDialog} = useBillsState()
  const saveBills = useSaveBills()

  const handleAddBill = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
  
    const newBill = {
      id: Date.now(),
      name: name || "[Untitled]", // Use random bill name if empty
      amount: amount ? `${formatNumberWithCommas(amount)} PHP` : "[No Amount]", // Use random amount if empty
      date: date ? formatDate(date) : "[No Date]", // Use random date if empty
    }
  
    const updatedBills = [...bills, newBill]
  
    saveBills(updatedBills)
  
    setShowAddDialog(false)
    setName("")
    setAmount("")
    setDate("")
    setLoading(false)
  }
  return(handleAddBill)
}

function useEditBill(){
  const {bills, setShowEditDialog, currentBill, setCurrentBill, name, setName, amount, setAmount, date, setDate, setLoading, setShowAddDialog} = useBillsState()
  const saveBills = useSaveBills()

  const handleEditBill = (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentBill) return
    setLoading(true)

    const updatedBills = bills.map((bill) => {
      if (bill.id === currentBill.id) {
        return {
          ...bill,
          name: name || bill.name,
          amount: amount ? `${formatNumberWithCommas(amount)} PHP` : bill.amount,
          date: date ? formatDate(date) : bill.date,
        }
      }
      return bill
    })

    saveBills(updatedBills)

    setShowEditDialog(false)
    setCurrentBill(null)
    setName("")
    setAmount("")
    setDate("")
    setLoading(false)
  }
  return(handleEditBill)
}

function useDeleteBill(){
  const {bills} = useBillsState()
  const saveBills = useSaveBills()

  const handleDeleteBill = (id: number) => {
    if (!confirm("Are you sure you want to delete this bill?")) return

    const updatedBills = bills.filter((bill) => bill.id !== id)

    saveBills(updatedBills)
  }
  return(handleDeleteBill)
}

function useOpenEditDialog(){
  const {setCurrentBill, setName, setAmount, setDate, setShowEditDialog} = useBillsState()
  const openEditDialog = (bill: Bill) => {
    setCurrentBill(bill)
    setName(bill.name)
    setAmount(bill.amount.replace(" PHP", "").replace(/,/g, ""))
    setDate(convertToInputDateFormat(bill.date))
    setShowEditDialog(true)
  }
  return(openEditDialog)
}


// Functions for readability

// Formats date to YYYY/MM/DD for Supabase
function convertToInputDateFormat(dateString: string) {
  if (!dateString) return ""
  const [month, day, year] = dateString.split("/")
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
}


// Formats date to MM/DD/YYYY for normal display
function formatDate(dateString: string) {
    if (!dateString) return ""
    const [year, month, day] = dateString.split("-")
    return `${month}/${day}/${year}`
}

//Calculates Total Revenue at Billings page display
function calculateTotalRevenue(bills: Bill[]): string {
  const total = bills.reduce((sum, bill) => {
    const numericAmount = Number.parseInt(bill.amount.replace(/[^0-9.]/g, ""), 10)
    return sum + (isNaN(numericAmount) ? 0 : numericAmount)
  }, 0)

  return `${total.toLocaleString()} PHP`
}

// Adds commas to amount ex. 100000 => 10,000
function formatNumberWithCommas(value: string): string {
  const cleanValue = value.replace(/,/g, "").replace(/[^\d.]/g, "")

  const number = Number.parseFloat(cleanValue)
  if (isNaN(number)) return "0"

  return number.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  })
}

export {getBills, useAddBill, useDeleteBill, useEditBill, useOpenEditDialog, calculateTotalRevenue}