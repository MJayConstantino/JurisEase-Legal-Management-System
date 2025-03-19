"use client"
import { BillingsHeader } from "./billings-header"
import { BillingsBill } from "./billings-bill"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BillingInterface() {

  return (
    <div className="min-h-screen bg-[#FFF8F8]">
      <div className="container mx-auto p-4">
        <div className="rounded-md overflow-hidden">
            <BillingsHeader/>
            <BillingsBill/>
          <div className="flex justify-end p-4">
            <Button className="bg-[#2E2A5C] hover:bg-[#3D3878] text-white flex items-center gap-2">
              <Plus className="h-5 w-5" />
              New Bill
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}