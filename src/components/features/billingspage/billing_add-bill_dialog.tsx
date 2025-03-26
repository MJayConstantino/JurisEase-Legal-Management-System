"use client"

import type React from "react"
import { addBill } from "@/actions/billing"
import { useBillsState } from "./bills-states"
import { CloseButton, CancelButton, SaveButton } from "./billings-buttons"
import { BillName, BillAmount, BillDateBilled } from "./billings-bill-components"

export default function AddBillDialog() {

   const {router, name, setName, amount, setAmount, date, setDate, setShowAddDialog, loading, setIsSubmitting} = useBillsState()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !amount || !date) {
      alert("Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await addBill(name, amount, date)

      if (result.success) {
        router.push("/")
        router.refresh()
      } else {
        alert(`Failed to add bill: ${result.message}`)
      }
    } catch (error) {
      console.error("Error adding bill:", error)
      alert("An error occurred while adding the bill")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
        {/* Close button (X) */}
        <button onClick={() => router.push("/")} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <CloseButton/>
        </button>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-[#2E2A5C] mb-4">Add New Bill</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <BillName nameDisplay={name} setNameDisplay={setName} />
            <BillAmount amountDisplay={amount} setAmountDisplay={setAmount}/>
            <BillDateBilled dateDisplay={date} setDateDisplay={setDate}/>

            <div className="flex justify-end space-x-2 mt-6">
            <CancelButton showDialogStatus={setShowAddDialog}/>
            <SaveButton saveIsLoading={loading}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
