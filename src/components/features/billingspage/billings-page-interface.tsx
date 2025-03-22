"use client"
import { useEffect, useState } from "react"
import { BillingsHeader } from "./billings-bill-components"
import { BillingsBill } from "./billings-bill-components"
import { NewBillForm } from "./billings-new-bill"

export function BillingInterface() {
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

  // Load bills from cookies on component mount
  useEffect(() => {
    const storedBills = getBillsFromCookies()
    setBills(storedBills)
    setTotalRevenue(calculateTotalRevenue(storedBills))
  }, [])

  return (
    <div className="min-h-screen bg-[#FFF8F8]">
      <div className="container mx-auto p-4">
        <div className="rounded-md overflow-hidden">
            <BillingsHeader totalRevenueDisplay={totalRevenue} />
            <NewBillForm/>
            <BillingsBill/>

        </div>
      </div>
    </div>
  )
}
