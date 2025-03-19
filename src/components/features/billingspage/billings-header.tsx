// These are examples for visual
const totalRevenue = "293,329 PHP"

export function BillingsHeader(){
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
              <div className="text-3xl font-bold mt-1">{totalRevenue}</div>
            </div>
        </div>
    )
   
}