import { EditButton, DeleteButton } from "./billings-buttons";
import { mockBills } from "./mock-bills";

function BillingsHeader({ totalRevenueDisplay }: { totalRevenueDisplay: string }){
  return( 
    <div>
      {/* Desktop */}
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
          <div className="text-3xl font-bold mt-1">{totalRevenueDisplay}</div>
        </div>
      </div>

      {/* Mobile */}
      <div className="bg-[#2E2A5C] text-white p-4 md:hidden">
          <div className="flex justify-between items-center mb-4">
            <div className="font-semibold text-lg">Total Revenue</div>
            <div className="text-2xl font-bold">{totalRevenueDisplay}</div>
          </div>
          <div className="text-xs mb-6">
            As of {new Date().toLocaleDateString()} at{" "}
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
          <div className="grid grid-cols-12 gap-2 text-sm">
            <div className="font-semibold col-span-5">Bill Name</div>
            <div className="font-semibold col-span-3 text-center">Amount</div>
            <div className="font-semibold col-span-3 text-center">Date Billed</div>
            <div className="col-span-1"></div>
          </div>
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

function BillName({ nameDisplay, setNameDisplay }: { nameDisplay: string, setNameDisplay: any }){
    return( 
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Bill Name
        </label>
        <input
          id="name"
          value={nameDisplay}
          onChange={(e) => setNameDisplay(e.target.value)}
          placeholder="Enter bill name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    )
}

function BillAmount({ amountDisplay, setAmountDisplay }: { amountDisplay: string, setAmountDisplay: any }){
    return(
      <div className="space-y-2">
        <label htmlFor="amount" className="text-sm font-medium">
          Amount
        </label>
        <input
          id="amount"
          value={amountDisplay}
          onChange={(e) => setAmountDisplay(e.target.value)}
          placeholder="Enter amount"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    )
}


function BillDateBilled({ dateDisplay, setDateDisplay }: { dateDisplay: string, setDateDisplay: any }){
    return(
      <div className="space-y-2">
        <label htmlFor="date" className="text-sm font-medium">
          Date Billed
        </label>
        <input
          id="date"
          name="date"
          type="date"
          value={dateDisplay}
          onChange={(e) => setDateDisplay(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    )
}

export{BillingsHeader, BillingsBill, BillName, BillAmount, BillDateBilled}