import type { Meta, StoryObj } from "@storybook/react"
import { BillingsEditDialog } from "@/components/billings/billingsEditDialog"
import { mockMatters, mockBills } from "./mockDataForSB"
import { userEvent } from "@storybook/test"


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

export const EditBillFormPlay: Story = {
  args: {
    open: true,
    bill: mockBills[0],
    matters: mockMatters,
    onSave: (bill) => console.log("Bill saved:", bill),
    onOpenChange: (open) => console.log("Dialog open state:", open),
  },
  play: async ({ step }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    await step("Enter bill name", async () => {
      const nameInput =
        document.querySelector('input[id="edit-name"]') ||
        document.querySelector('input[placeholder="Enter bill name"]')

      if (nameInput) {
        await userEvent.keyboard("{Backspace>10}")
        await userEvent.keyboard("Edited Bill Name", { delay: 100 })
        await userEvent.tab()
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    await step("Enter amount", async () => {
      const amountInput =
        document.querySelector('input[id="edit-amount"]') ||
        document.querySelector('input[placeholder="Enter amount"]')

      if (amountInput) {
        await userEvent.keyboard("250", { delay: 100 })
        await userEvent.tab()
        await userEvent.tab()
        await userEvent.tab()
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    await step("Select status", async () => {
      const selectStatus =
      document.querySelector("#status") ||
      document.querySelector('[id="edit-status"]')

      if (selectStatus) {
        await userEvent.keyboard("{Enter}", { delay: 100 })
        await userEvent.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}{Enter}", { delay: 300 })
        await userEvent.tab()
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    await step("Add remarks", async () => {
      const remarksInput =
        document.querySelector('textarea[id="remarks"]') ||
        document.querySelector('textarea[placeholder="(optional)"]')

      if (remarksInput) {
        await userEvent.keyboard("Edited remarks.", { delay: 100 })
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 5000))
  }

}