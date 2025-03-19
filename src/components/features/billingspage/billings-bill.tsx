import { useState } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BillingsBill(){
    const [bills, setBills] = useState([
        {
          id: 1,
          name: "Preparing evidence and witness statements",
          amount: "22,500 PHP",
          date: "01/20/2025",
        },
      ]);
    return(
        <div className="border-b border-[#2E2A5C]">
            {bills.map((bill) => (
              <div key={bill.id} className="flex items-center p-4 bg-[#FFF8F8]">
                <div className="grid grid-cols-3 gap-4 w-3/5">
                  <div className="font-medium text-[#2E2A5C]">{bill.name}</div>
                  <div className="font-medium text-[#2E2A5C]">{bill.amount}</div>
                  <div className="font-medium text-[#2E2A5C]">{bill.date}</div>
                </div>
                <div className="w-2/5 flex justify-end space-x-2">
                  <Button variant="ghost" size="icon" className="text-[#2E2A5C] hover:bg-[#E8E4FF]">
                    <Pencil className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-[#2E2A5C] hover:bg-[#E8E4FF]">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
    )
    
}