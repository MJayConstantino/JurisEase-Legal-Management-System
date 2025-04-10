import type { Meta, StoryObj } from "@storybook/react"
import { userEvent, waitFor, within } from "@storybook/test"
import { BillingsAddDialog } from "@/components/billings/billingsAddDialog"
import { mockMatters } from "./mockDataForSB"
import { useEffect } from "react"

const meta: Meta<typeof BillingsAddDialog> = {
  title: "Billings/AddBillDialog",
  component: BillingsAddDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof BillingsAddDialog>

export const GlobalAddBillForm: Story = {
  args: {
    open: true,
    matters: mockMatters,
    onSave: (bill) => console.log("Bill saved:", bill),
    onOpenChange: (open) => console.log("Dialog open state:", open),
  },
}

export const MatterBillingAddBillForm: Story = {
  args: {
    open: true,
    matters: mockMatters,
    matterBillingMatterId: "2",
    disableMatterColumn: true,
    onSave: (bill) => console.log("Bill saved:", bill),
    onOpenChange: (open) => console.log("Dialog open state:", open),
  },
}