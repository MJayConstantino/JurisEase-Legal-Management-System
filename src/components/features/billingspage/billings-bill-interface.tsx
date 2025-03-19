export interface Bill{
    id: number
    name: string
    amount: string
    date: string
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

export{BillName, BillAmount, BillDateBilled}