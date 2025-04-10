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
              matter={mockMatters.find((m) => m.matter_id ===  mockBills[4].matter_id)}
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

export const Active: Story = {
  render: () => (
    <div className="p-4 w-full max-w-[1200px]">
      <Table>
        <TableBody>
          <BillingsItem
            bill={ mockBills[0]}
            matter={mockMatters.find((m) => m.matter_id ===  mockBills[0].matter_id)}
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

export const Pending: Story = {
  render: () => (
    <div className="p-4 w-full max-w-[1200px]">
      <Table>
        <TableBody>
          <BillingsItem
            bill={ mockBills[1]}
            matter={mockMatters.find((m) => m.matter_id ===  mockBills[1].matter_id)}
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
            matter={mockMatters.find((m) => m.matter_id ===  mockBills[2].matter_id)}
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

export const Overdue: Story = {
  render: () => (
    <div className="p-4 w-full max-w-[1200px]">
      <Table>
        <TableBody>
          <BillingsItem
            bill={ mockBills[3]}
            matter={mockMatters.find((m) => m.matter_id ===  mockBills[3].matter_id)}
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