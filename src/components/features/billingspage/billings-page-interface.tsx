"use client"
import { useState } from "react"
import { BillingsHeader } from "./billings-bill-components"
import { BillingsBill } from "./billings-bill-components"
import { NewBillForm } from "./billings-new-bill"

export function BillingInterface() {
  const [totalRevenue, setTotalRevenue] = useState("0 PHP")

  return (
    <div className="min-h-screen bg-[#FFF8F8]">
      <div className="container mx-auto p-4">
        <div className="rounded-md overflow-hidden">
            <BillingsHeader totalRevenueDisp={totalRevenue} />
            <NewBillForm/>
            <BillingsBill/>

        </div>
      </div>
    </div>
  )
}
