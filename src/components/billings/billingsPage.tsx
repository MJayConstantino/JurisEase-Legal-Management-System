"use client"

import { useEffect } from "react"

import { BillingsHeader } from "@/components/billings/billingsHeader"
import { BillingsList } from "@/components/billings/billingsList"
import { BillingsAddDialog } from "@/components/billings/billingsAddDialog"
import type { Bill } from "./billingsBillInterface"
import { BillingStates } from "./billingsStates"
// import { fetchBills, addBill as addBillToDb, updateBill as updateBillInDb, deleteBill as deleteBillFromDb } from "@/lib/supabase"

export function BillingInterface() {
  const {
    bills, setBills, filteredBills, setFilteredBills,searchQuery, setSearchQuery,
    activeTab, setActiveTab, currentDateTime, setCurrentDateTime, isNewBillDialogOpen, 
    setIsNewBillDialogOpen, isLoading, setIsLoading
  } = BillingStates()

  // Gets bills from DB
  useEffect(() => {
    // async function loadBills() {
    //   setIsLoading(true)
    //   try {
    //     const data = await fetchBills()
    //     setBills(data)
    //   } catch (error) {
    //     console.error('Failed to load bills:', error)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }
    // loadBills()
  }, [])

  // Update current date and time (frequency: per minute)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  // Filter bills based on search and active
  useEffect(() => {
    let result = [...bills]

    // Filter by status
    if (activeTab === "paid") {
      result = result.filter((bill) => bill.status === "Paid")
    } else if (activeTab === "active") {
      result = result.filter((bill) => bill.status === "Active")
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((bill) => bill.name.toLowerCase().includes(query))
    }

    setFilteredBills(result)
  }, [bills, searchQuery, activeTab])

  // Calculate total revenue
  const totalRevenue = filteredBills.reduce((sum, bill) => sum + bill.amount, 0)

  // Add Bill
  const addBill = async (bill: Omit<Bill, "id">) => {
    // setIsLoading(true)
    // try {
    //   const newBill = await addBillToDb(bill)
    //   if (newBill) {
    //     setBills(prev => [...prev, newBill])
    //   }
    // } catch (error) {
    //   console.error('Failed to add bill:', error)
    // } finally {
    //   setIsLoading(false)
    // }

    // // Local storage
    const newBill = {
      ...bill,
      id: Date.now().toString(),
    }
    setBills((prev) => [...prev, newBill])
  }

  // Update/Edit Bill
  const updateBill = async (updatedBill: Bill) => {
    // setIsLoading(true)
    // try {
    //   const result = await updateBillInDb(updatedBill)
    //   if (result) {
    //     setBills(prev => prev.map(bill => bill.id === updatedBill.id ? updatedBill : bill))
    //   }
    // } catch (error) {
    //   console.error('Failed to update bill:', error)
    // } finally {
    //   setIsLoading(false)
    // }

    // // Local storage
    setBills((prev) => prev.map((bill) => (bill.id === updatedBill.id ? updatedBill : bill)))
  }

  // Delete Bill
  const deleteBill = async (id: string) => {
    // setIsLoading(true)
    // try {
    //   const success = await deleteBillFromDb(id)
    //   if (success) {
    //     setBills(prev => prev.filter(bill => bill.id !== id))
    //   }
    // } catch (error) {
    //   console.error('Failed to delete bill:', error)
    // } finally {
    //   setIsLoading(false)
    // }

    // // Local storage
    setBills((prev) => prev.filter((bill) => bill.id !== id))
  }

  return (
    <div className="py-8 px-10">
      <div className="border rounded-md shadow-sm max-w-[1200px] mx-auto">
        <BillingsHeader
          onNewBill={() => setIsNewBillDialogOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          totalRevenue={totalRevenue}
          currentDateTime={currentDateTime}
        />

        <BillingsList bills={filteredBills} onUpdate={updateBill} onDelete={deleteBill} isLoading={isLoading} />

        <BillingsAddDialog open={isNewBillDialogOpen} onOpenChange={setIsNewBillDialogOpen} onSave={addBill} />
      </div>
    </div>
  )
}