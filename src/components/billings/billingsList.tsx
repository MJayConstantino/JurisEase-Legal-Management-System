import type { Bill } from "./billingsBillInterface"
import { BillingsItem } from "@/components/billings/billingsItem"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface BillingsListProps {
  bills: Bill[]
  onUpdate: (bill: Bill) => void
  onDelete: (id: string) => void
  isLoading?: boolean
}

export function BillingsList({ bills, onUpdate, onDelete, isLoading = false }: BillingsListProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px] text-center">Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date Billed</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                Loading bills...
              </TableCell>
            </TableRow>
          ) : bills.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No bills found. Add a new bill to get started.
              </TableCell>
            </TableRow>
          ) : (
            bills.map((bill) => <BillingsItem key={bill.id} bill={bill} onUpdate={onUpdate} onDelete={onDelete} />)
          )}
        </TableBody>
      </Table>
    </div>
  )
}