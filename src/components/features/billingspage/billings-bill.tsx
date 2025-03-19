
import { EditButton, DeleteButton } from "./billings-buttons";
import { mockBills } from "./mock-bills";

export function BillingsBill(){
   
    return(
        <div className="border-b border-[#2E2A5C]">
        {mockBills.map((bill) => (
          <div key={bill.id} className="flex items-center p-4 bg-[#FFF8F8]">
            <div className="grid grid-cols-3 gap-4 w-3/5">
              <div className="font-medium text-[#2E2A5C]">{bill.name}</div>
              <div className="font-medium text-[#2E2A5C]">{bill.amount}</div>
              <div className="font-medium text-[#2E2A5C]">{bill.date}</div>
            </div>
            <div className="w-2/5 flex justify-end space-x-2">
              <EditButton/>
              <DeleteButton/>
            </div>
          </div>
        ))}
      </div>
    )
    
}


