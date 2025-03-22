import { EditButton, DeleteButton } from "./billings-buttons";
import { mockBills } from "./mock-bills";

export interface Bill{
    id: number
    name: string
    amount: string
    date: string
}

function BillingsHeader({ totalRevenueDisp }: { totalRevenueDisp: string }){
  return( 
    <div className="bg-[#2E2A5C] text-white p-4 flex justify-between items-center">
      <div className="grid grid-cols-3 gap-4 w-3/5">
        <div className="font-semibold text-lg">Bill Name</div>
        <div className="font-semibold text-lg">Amount</div>
        <div className="font-semibold text-lg">Date Billed</div>
      </div>
      <div className="w-2/5 text-right">
        <div className="font-semibold text-lg">Total Revenue</div>
        <div className="text-sm">
          As of {new Date().toLocaleDateString()} at{" "}
          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className="text-3xl font-bold mt-1">{totalRevenueDisp}</div>
      </div>
    </div>
  )
 
}

function BillingsBill(){
   
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

function BillName(){
    return( 
        <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Bill Name
                </label>
                <input
                  id="bill_name"
                  name="bill_name"
                  placeholder="Enter bill name"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
        </div>
    )
}

function BillAmount(){
    return(
        <div className="grid gap-2">
                <label htmlFor="amount" className="text-sm font-medium">
                  Amount
                </label>
                <input
                  id="bill_amount"
                  name="bill_amount"
                  placeholder="Enter amount"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
        </div>
    )
}


function BillDateBilled(){
    return(
        <div className="grid gap-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Date Billed
                </label>
                <input
                  id="bill_date"
                  name="bill_date"
                  type="date"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
        </div>
    )
}

export{BillingsHeader, BillingsBill, BillName, BillAmount, BillDateBilled}