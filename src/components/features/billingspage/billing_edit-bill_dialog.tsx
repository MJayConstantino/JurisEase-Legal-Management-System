"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { editBill, convertToInputDateFormat } from "@/actions/billing"
import { CloseButton, CancelButton, SaveButton } from "./billings-buttons"
import { BillName, BillAmount, BillDateBilled } from "./billings-bill-components"
import { useBillsState } from "./bills-states"

export default function EditBillDialog({
  id,
  name: initialName,
  amount: initialAmount,
  date: initialDate,
}: {
  id: number
  name: string
  amount: string
  date: string
}) {
    const [name, setName] = useState(initialName)
    const [amount, setAmount] = useState(initialAmount)
    const [date, setDate] = useState("")
    const {router, setShowEditDialog, loading, setIsSubmitting} = useBillsState()

  // Convert date format for input field
  useEffect(() => {
    setDate(convertToInputDateFormat(initialDate))
  }, [initialDate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !amount || !date) {
      alert("Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await editBill(id, name, amount, date)

      if (result.success) {
        router.push("/")
        router.refresh()
      } else {
        alert(`Failed to update bill: ${result.message}`)
      }
    } catch (error) {
      console.error("Error updating bill:", error)
      alert("An error occurred while updating the bill")
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
          <h2 className="text-xl font-semibold text-[#2E2A5C] mb-4">Edit Bill</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <BillName nameDisplay={name} setNameDisplay={setName} />
            <BillAmount amountDisplay={amount} setAmountDisplay={setAmount}/>
            <BillDateBilled dateDisplay={date} setDateDisplay={setDate}/>

            <div className="flex justify-end space-x-2 mt-6">
              <CancelButton showDialogStatus={setShowEditDialog}/>
              <SaveButton saveIsLoading={loading}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

