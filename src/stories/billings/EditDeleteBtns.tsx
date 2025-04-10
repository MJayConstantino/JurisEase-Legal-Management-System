import type { Meta, StoryObj } from "@storybook/react"
import { BillingsButtons } from "@/components/billings/billingsButtons"

const meta: Meta<typeof BillingsButtons> = {
  title: "Billings/EditAndDeleteButton",
  component: BillingsButtons,
}

export default meta
type Story = StoryObj<typeof BillingsButtons>

export const Default: Story = {
  render: () => (
    <div className="p-4 border rounded">
      <BillingsButtons
        onEdit={() => console.log("Edit button clicked")}
        onDelete={() => console.log("Delete button clicked")}
      />
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <div className="dark p-4 border rounded border-gray-700">
      <BillingsButtons
        onEdit={() => console.log("Edit button clicked")}
        onDelete={() => console.log("Delete button clicked")}
      />
    </div>
  ),
}
