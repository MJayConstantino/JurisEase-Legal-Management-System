"use client"
import { BillingsHeader } from "./billings-header"
import { BillingsBill } from "./billings-bill"
import { NewBillForm } from "./billings-new-bill"

export function BillingInterface() {

  return (
    <div className="min-h-screen bg-[#FFF8F8]">
      <div className="container mx-auto p-4">
        <div className="rounded-md overflow-hidden">
            <BillingsHeader/>
            <NewBillForm/>
            <BillingsBill/>

        </div>
      </div>
    </div>
  )
}


// export default function BillingInterface() {
//   const bills = getBills()
//   const totalRevenue = calculateTotalRevenue(bills)

//   return (
//     <div className="min-h-screen bg-[#FFF8F8]">
//       <div className="container mx-auto p-4">
//         <div className="rounded-md overflow-hidden">

//           {/* New Bill Form */}
//        
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
