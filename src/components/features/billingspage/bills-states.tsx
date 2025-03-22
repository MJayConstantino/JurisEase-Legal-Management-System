"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"


export interface Bill{
    id: number
    name: string
    amount: string
    date: string
}

export function useBillsState() {
  const router = useRouter()
  const [bills, setBills] = useState<Bill[]>([])
  const [totalRevenue, setTotalRevenue] = useState("0 PHP")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [currentBill, setCurrentBill] = useState<Bill | null>(null)

  // Form states for add/edit dialogs
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [loading, setLoading] = useState(false)


  const openAddDialog = () => {
    setName("")
    setAmount("")
    setDate("")
    setShowAddDialog(true)
  }

  const closeAddDialog = () => {
    setShowAddDialog(false)
  }

  const openEditDialog = (bill: Bill) => {
    setCurrentBill(bill)
    setName(bill.name)
    setAmount(bill.amount.toString())
    setDate(bill.date)
    setShowEditDialog(true)
  }

  const closeEditDialog = () => {
    setShowEditDialog(false)
    setCurrentBill(null)
  }

  return {
    router,
    bills,
    setBills,
    totalRevenue,
    setTotalRevenue,
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog,
    currentBill,
    setCurrentBill,
    name,
    setName,
    amount,
    setAmount,
    date,
    setDate,
    loading,
    setLoading,
    openAddDialog,
    closeAddDialog,
    openEditDialog,
    closeEditDialog,
  }
}