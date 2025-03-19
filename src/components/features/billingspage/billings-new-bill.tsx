
import { BillName, BillAmount, BillDateBilled } from "./billings-bill-interface";
import { NewBillButton } from "./billings-buttons";
import { addBill } from "./billings-functions";


export function NewBillForm(){
    return(
        <div className="p-4 bg-[#F8F5FF] border-b border-[#2E2A5C]">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#2E2A5C]">Add New Bill</h3>
                <NewBillButton/>
            </div>
            <form id="new-bill-form" action={addBill} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <BillName/>
                <BillAmount/>
                <BillDateBilled/>
            </form>
        </div>
    )
}
