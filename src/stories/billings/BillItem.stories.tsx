import type { Meta, StoryObj } from "@storybook/react"
import { BillingsItem } from "@/components/billings/billingsItem"
import { mockBills, mockMatters } from "./mockDataForSB"
import { Table, TableBody } from "@/components/ui/table"

const meta: Meta<typeof BillingsItem> = {
  title: "Billings/BillItem",
  component: BillingsItem,
}

export default meta
type Story = StoryObj<typeof BillingsItem>

export const Default: Story = {
    render: () => (
      <div className="p-4 w-full max-w-[1200px]">
        <Table>
          <TableBody>
            <BillingsItem
              bill={ mockBills[4]}
              matters={mockMatters}
              onUpdate={(bill) => console.log("Bill updated:", bill)}
              onDelete={(id) => console.log("Bill deleted:", id)}
              index={1}
            />
          </TableBody>
        </Table>
      </div>
    ),
  }

export const Paid: Story = {
  render: () => (
    <div className="p-4 w-full max-w-[1200px]">
      <Table>
        <TableBody>
          <BillingsItem
            bill={ mockBills[2]}
            matters={mockMatters}
            onUpdate={(bill) => console.log("Bill updated:", bill)}
            onDelete={(id) => console.log("Bill deleted:", id)}
            index={1}
          />
        </TableBody>
      </Table>
    </div>
  ),
}

export const Unpaid: Story = {
  render: () => (
    <div className="p-4 w-full max-w-[1200px]">
      <Table>
        <TableBody>
          <BillingsItem
            bill={ mockBills[3]}
            matters={mockMatters}
            onUpdate={(bill) => console.log("Bill updated:", bill)}
            onDelete={(id) => console.log("Bill deleted:", id)}
            index={1}
          />
        </TableBody>
      </Table>
    </div>
  ),
}