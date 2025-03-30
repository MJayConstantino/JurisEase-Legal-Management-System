//Main page for the billing interface layout and functions

"use client"

import { useEffect, useMemo } from "react"
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from "date-fns"

import { BillingsHeader } from "@/components/billings/billingsHeader"
import { BillingsList } from "@/components/billings/billingsList"
import { BillingsAddDialog } from "@/components/billings/billingsAddDialog"
import { TimeFilterHeader } from "@/components/billings/timeFilterHeader"
import { BillingsListHeader } from "@/components/billings/billingsListHeader"
import { Bill, frequencyRank, SortDirection, SortField } from "@/types/billing.type"
import { BillingStates } from "./billingsStates"

//import { getBills, getClientNames, createBill as addBillToDb, updateBill as updateBillInDb, deleteBill as deleteBillFromDb } from "@/actions/billing"

export function BillingInterface() {
  const {
    bills, setBills, filteredBills, setFilteredBills, clients, setClients, currentDateTime, setCurrentDateTime, isNewBillDialogOpen, 
    setIsNewBillDialogOpen, isLoading, setIsLoading, timeFilter, setTimeFilter, sortField, setSortField, sortDirection, setSortDirection
  } = BillingStates()

  // Load bills from database on component mount
  useEffect(() => {
 
    // async function loadBills() {
    //   setIsLoading(true)
    //   try {
    //     const data = await getBills()
    //     setBills(data)
    //   } catch (error) {
    //     console.error('Failed to load bills:', error)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }

    // async function loadClients() {
    //   setIsLoading(true)
    //   try {
    //     const data = await getClientNames()
    //     setClients(data)
    //   } catch (error) {
    //     console.error('Failed to load bills:', error)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }
    
    // loadClients()
    // loadBills()

  }, [])

  // Update current date and time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  // Filter bills based on time filter
  useEffect(() => {
    let result = [...bills]

    if (timeFilter !== "all") {
      const today = new Date()

      if (timeFilter === "today") {
        result = result.filter((bill) => {
          const billDate = new Date(bill.dateBilled)
          return format(billDate, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
        })
      } else if (timeFilter === "week") {
        const weekStart = startOfWeek(today)
        const weekEnd = endOfWeek(today)

        result = result.filter((bill) => {
          const billDate = new Date(bill.dateBilled)
          return isWithinInterval(billDate, { start: weekStart, end: weekEnd })
        })
      } else if (timeFilter === "month") {
        const monthStart = startOfMonth(today)
        const monthEnd = endOfMonth(today)

        result = result.filter((bill) => {
          const billDate = new Date(bill.dateBilled)
          return isWithinInterval(billDate, { start: monthStart, end: monthEnd })
        })
      }
    }

    // Apply sorting if a sort field is selected
    if (sortField) {
      result = sortBills(result, sortField, sortDirection)
    }

    setFilteredBills(result)
  }, [bills, timeFilter, sortField, sortDirection])

  // Sort bills based on field and direction
  const sortBills = (billsToSort: Bill[], field: SortField, direction: SortDirection) => {
    return [...billsToSort].sort((a, b) => {
      let comparison = 0

      switch (field) {
        case "clientName":
          const clientA = clients.find((c) => c.id === a.clientId)?.name || ""
          const clientB = clients.find((c) => c.id === b.clientId)?.name || ""
          comparison = clientA.localeCompare(clientB)
          break
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "amount":
          comparison = a.amount - b.amount
          break
        case "dateBilled":
          comparison = new Date(a.dateBilled).getTime() - new Date(b.dateBilled).getTime()
          break
        case "status":
          comparison = a.status.localeCompare(b.status)
          break
        case "frequency":
          const rankA = frequencyRank[a.frequency.type as keyof typeof frequencyRank]
          const rankB = frequencyRank[b.frequency.type as keyof typeof frequencyRank]
          comparison = rankA - rankB
          break
      }

      return direction === "asc" ? comparison : -comparison
    })
  }

  // Handle sort change
  const handleSortChange = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      // Set new field and reset direction to asc
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Calculate total revenue for all filtered bills
  const totalRevenue = useMemo(() => {
    return filteredBills.reduce((sum, bill) => sum + bill.amount, 0)
  }, [filteredBills])

  // Calculate revenue for today
  const todayRevenue = useMemo(() => {
    const today = new Date()
    return bills
      .filter((bill) => {
        const billDate = new Date(bill.dateBilled)
        return format(billDate, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
      })
      .reduce((sum, bill) => sum + bill.amount, 0)
  }, [bills])

  // Calculate revenue for this week
  const weekRevenue = useMemo(() => {
    const today = new Date()
    const weekStart = startOfWeek(today)
    const weekEnd = endOfWeek(today)

    return bills
      .filter((bill) => {
        const billDate = new Date(bill.dateBilled)
        return isWithinInterval(billDate, { start: weekStart, end: weekEnd })
      })
      .reduce((sum, bill) => sum + bill.amount, 0)
  }, [bills])

  // Calculate revenue for this month
  const monthRevenue = useMemo(() => {
    const today = new Date()
    const monthStart = startOfMonth(today)
    const monthEnd = endOfMonth(today)

    return bills
      .filter((bill) => {
        const billDate = new Date(bill.dateBilled)
        return isWithinInterval(billDate, { start: monthStart, end: monthEnd })
      })
      .reduce((sum, bill) => sum + bill.amount, 0)
  }, [bills])

  // Add a new bill
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

    // For now, use local state only
    const newBill = {
      ...bill,
      id: Date.now().toString(),
    }
    setBills((prev) => [...prev, newBill])
  }

  // Update an existing bill
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

    // For now, use local state only
    setBills((prev) => prev.map((bill) => (bill.id === updatedBill.id ? updatedBill : bill)))
  }

  // Delete a bill
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

    // For now, use local state only
    setBills((prev) => prev.filter((bill) => bill.id !== id))
  }

  return (
    <div className="py-4 md:py-8 px-4 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        {/* Main Total Revenue Header - Standalone */}
        <BillingsHeader
          totalRevenue={totalRevenue}
          currentDateTime={currentDateTime}
          onFilterChange={() => setTimeFilter("all")}
        />

        {/* Time-based Filter Headers - Standalone */}
        <TimeFilterHeader
          todayRevenue={todayRevenue}
          weekRevenue={weekRevenue}
          monthRevenue={monthRevenue}
          activeFilter={timeFilter}
          onFilterChange={setTimeFilter}
        />

        {/* Bills List with border and background */}
        <div className="border rounded-md shadow-sm bg-white">
          {/* Bills List Header with New Bill Button */}
          <BillingsListHeader onNewBill={() => setIsNewBillDialogOpen(true)} />

          {/* Bills List with Sorting */}
          <div className="max-h-[600px] overflow-y-auto">
            <BillingsList
              bills={filteredBills}
              clients={clients}
              onUpdate={updateBill}
              onDelete={deleteBill}
              isLoading={isLoading}
              sortField={sortField}
              sortDirection={sortDirection}
              onSortChange={handleSortChange}
            />
          </div>
        </div>

        <BillingsAddDialog
          open={isNewBillDialogOpen}
          onOpenChange={setIsNewBillDialogOpen}
          onSave={addBill}
          clients={clients}
        />
      </div>
    </div>
  )
}

