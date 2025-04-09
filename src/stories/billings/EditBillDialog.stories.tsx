import type { Meta, StoryObj } from "@storybook/react"
import { BillingsEditDialog } from "@/components/billings/billingsEditDialog"
import { mockMatters, mockBills } from "./mockDataForSB"


const meta: Meta<typeof BillingsEditDialog> = {
  title: "Billings/EditBillDialog",
  component: BillingsEditDialog,
}

export default meta
type Story = StoryObj<typeof BillingsEditDialog>

export const Default: Story = {
  render: () => (
    <BillingsEditDialog
      open={true}
      bill={mockBills[0]}
      matters={mockMatters}
      onSave={(bill) => console.log("Bill updated:", bill)}
      onOpenChange={(open) => console.log("Dialog open state:", open)}
    />
  ),
}