"use client"

import { useRouter } from "next/navigation"
import type { Bill } from "./bills-states"
import { deleteBill, formatBillAmount } from "@/actions/billing"
import { BillingsHeader } from "./billings-bill-components";
import { DeleteButton, EditButton } from "./billings-buttons";

export default function BillingTable({ bills, totalRevenue }: { bills: Bill[]; totalRevenue: string }) {
  const router = useRouter()

  // Format bill amounts with commas
  const formattedBills = bills.map((bill) => ({
    ...bill,
    amount: formatBillAmount(bill.amount),
  }))

  // Handle edit button click
  const handleEdit = (bill: Bill) => {
    router.push(
      `/?action=edit&id=${bill.id}&name=${encodeURIComponent(bill.name)}&amount=${encodeURIComponent(bill.amount.replace(" PHP", "").replace(/,/g, ""))}&date=${encodeURIComponent(bill.date)}`,
    )
  }

  // Handle delete button click
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this bill?")) {
      await deleteBill(id)
      router.refresh()
    }
  }

  return (
    <div className="rounded-md overflow-hidden relative pb-20">
      <BillingsHeader totalRevenueDisplay={totalRevenue}/>

      {/* Bill Items */}
      <div className="border-b border-[#2E2A5C]">
        {formattedBills.map((bill) => (
          <div key={bill.id} className="p-4 bg-[#FFF8F8]">
            {/* Desktop Layout */}
            <div className="hidden md:flex items-start">
              <div className="w-3/5 flex">
                <div className="w-[40%] font-medium text-[#2E2A5C] break-words pr-4">{bill.name}</div>
                <div className="w-[30%] font-medium text-[#2E2A5C]">{bill.amount}</div>
                <div className="w-[30%] font-medium text-[#2E2A5C]">{bill.date}</div>
              </div>
              {/* Edit Button */}
              <div className="w-2/5 flex justify-end space-x-2">
                <button onClick={() => handleEdit(bill)} className="p-2 rounded-md text-[#2E2A5C] hover:bg-[#E8E4FF]">
                  <EditButton/>
                </button>
                  
                  {/* Delete Button */}
                <button
                  onClick={() => handleDelete(bill.id)}
                  className="p-2 rounded-md text-[#2E2A5C] hover:bg-[#E8E4FF]"
                >
                  <DeleteButton/>
                </button>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="grid grid-cols-12 gap-4 md:hidden">
              <div className="font-medium text-[#2E2A5C] text-sm col-span-5 break-words self-center">{bill.name}</div>
              <div className="font-medium text-[#2E2A5C] text-sm col-span-3 text-center self-center">{bill.amount}</div>
              <div className="font-medium text-[#2E2A5C] text-sm col-span-3 text-center self-center">{bill.date}</div>

              {/* Action Buttons - Mobile */}
              <div className="flex col-span-1 justify-end space-x-1 self-center">
                <div className="flex flex-col space-y-1">
                  <button onClick={() => handleEdit(bill)} className="p-1 rounded-md text-[#2E2A5C] hover:bg-[#E8E4FF]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                      <path d="m15 5 4 4"></path>
                    </svg>
                  </button>

                  <button
                    onClick={() => handleDelete(bill.id)}
                    className="p-1 rounded-md text-[#2E2A5C] hover:bg-[#E8E4FF]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      New Bill Button - Desktop
      <div className="hidden md:flex justify-end p-4">
        <button
          onClick={() => router.push("/?action=add")}
          className="bg-[#2E2A5C] hover:bg-[#3D3878] text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14"></path>
            <path d="M5 12h14"></path>
          </svg>
          New Bill
        </button>
      </div>

      {/* New Bill Button - Mobile (FAB) */}
        <button
        onClick={() => router.push("/?action=add")}
        className="md:hidden fixed bottom-6 right-6 bg-[#2E2A5C] hover:bg-[#3D3878] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14"></path>
          <path d="M5 12h14"></path>
        </svg>
      </button>
    </div>
  )
}

