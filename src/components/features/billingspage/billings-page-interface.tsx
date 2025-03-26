"use client"
import { useEffect } from "react"
import { BillAmount, BillDateBilled, BillingsHeader, BillName } from "./billings-bill-components"
import { getBills, calculateTotalRevenue, useDeleteBill, useAddBill, useEditBill } from "./billings-functions"
import { useBillsState } from "./bills-states"
import { CancelButton, CloseButton, DeleteButton, EditButton, NewBillButton, SaveButton } from "./billings-buttons"

export function BillingInterface() {
  const{bills, loading, name, setName, amount, setAmount, showEditDialog, setShowEditDialog, currentBill, date, setDate, openEditDialog, setShowAddDialog, showAddDialog, setBills, totalRevenue, setTotalRevenue} = useBillsState()
  const deleteBill = useDeleteBill()
  const addBill = useAddBill()
  const editBill = useEditBill()
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const storedBills = await getBills()
        setBills(storedBills)
        setTotalRevenue(calculateTotalRevenue(storedBills))
      } catch (error) {
        console.error("Cannot retrive Bills:", error)
      }
    }
    fetchBills()
  }, [setBills, setTotalRevenue])


  return (
    <div className="min-h-screen bg-[#FFF8F8]">
      <div className="container mx-auto p-4">
        <div className="rounded-md overflow-hidden">
          <BillingsHeader totalRevenueDisplay={totalRevenue}/>

          <div className="border-b border-[#2E2A5C]">
            {bills.map((bill) => (
              <div key={bill.id} className="flex items-center p-4 bg-[#FFF8F8]">
                <div className="grid grid-cols-3 gap-4 w-3/5">
                  <div className="font-medium text-[#2E2A5C]">{bill.name}</div>
                  <div className="font-medium text-[#2E2A5C]">{bill.amount}</div>
                  <div className="font-medium text-[#2E2A5C]">{bill.date}</div>
                </div>
                <div className="w-2/5 flex justify-end space-x-2">
                  <button
                    onClick={() => openEditDialog(bill)}
                    className="p-2 rounded-md text-[#2E2A5C] hover:bg-[#E8E4FF]"
                  >
                   <EditButton/>
                  </button>

                  <button
                    onClick={() => deleteBill(bill.id)}
                    className="p-2 rounded-md text-[#2E2A5C] hover:bg-[#E8E4FF]"
                  >
                    <DeleteButton/>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* New Bill Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setShowAddDialog(true)}
              className="bg-[#2E2A5C] hover:bg-[#3D3878] text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <NewBillButton/>
              New Bill
            </button>
          </div>
        </div>
      </div>

      {/* Add Bill Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
            {/* Close button (X) */}
            <button
              onClick={() => setShowAddDialog(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
             <CloseButton/>
            </button>

            <div className="p-6">
              <h2 className="text-xl font-semibold text-[#2E2A5C] mb-4">Add New Bill</h2>

              <form onSubmit={addBill} className="space-y-4">
                <BillName nameDisplay={name} setNameDisplay={setName}/>
                <BillAmount amountDisplay={amount} setAmountDisplay={setAmount}/>
                <BillDateBilled dateDisplay={date} setDateDisplay={setDate}/>

                <div className="flex justify-end space-x-2 mt-6">
                <CancelButton showDialogStatus={setShowAddDialog}/>
                <SaveButton saveIsLoading={loading}/>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Bill Dialog - same with add bill dialog but change add with edit i.e showAdddialog => showEditdialog*/}
      {showEditDialog && currentBill && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
            {/* Close button (X) */}
            <button
              onClick={() => setShowEditDialog(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <CloseButton/>
            </button>

            <div className="p-6">
              <h2 className="text-xl font-semibold text-[#2E2A5C] mb-4">Edit Bill</h2>

              <form onSubmit={editBill} className="space-y-4">
                <BillName nameDisplay={name} setNameDisplay={setName}/>
                <BillAmount amountDisplay={amount} setAmountDisplay={setAmount}/>
                <BillDateBilled dateDisplay={date} setDateDisplay={setDate}/>


                <div className="flex justify-end space-x-2 mt-6">
                <CancelButton showDialogStatus={setShowEditDialog}/>
                <SaveButton saveIsLoading={loading}/>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
};

