import type { Meta, StoryObj } from "@storybook/react"
import { BillingsList } from "@/components/billings/billingsList"
import { mockBills, mockMatters } from "./mockDataForSB"

const meta: Meta<typeof BillingsList> = {
  title: "Billings/BillingList",
  component: BillingsList,
}

export default meta
type Story = StoryObj<typeof BillingsList>

export const WithBills: Story = {
  render: () => (
    <div className="p-4">
      <BillingsList
        bills={mockBills}
        matters={mockMatters}
        onUpdate={(bill) => console.log("Bill updated:", bill)}
        onDelete={(id) => console.log("Bill deleted:", id)}
        sortField={null}
        onSortChange={(field) => console.log("Sort field changed:", field)}
        isLoading={false}
      />
    </div>
  ),
}

export const LoadingBills: Story = {
  render: () => (
    <div className="p-4">
      <BillingsList
        bills={[]}
        matters={mockMatters}
        onUpdate={(bill) => console.log("Bill updated:", bill)}
        onDelete={(id) => console.log("Bill deleted:", id)}
        sortField={null}
        onSortChange={(field) => console.log("Sort field changed:", field)}
        isLoading={true}
      />
    </div>
  ),
}

export const Empty: Story = {
  render: () => (
    <div className="p-4">
      <BillingsList
        bills={[]}
        matters={mockMatters}
        onUpdate={(bill) => console.log("Bill updated:", bill)}
        onDelete={(id) => console.log("Bill deleted:", id)}
        sortField={null}
        onSortChange={(field) => console.log("Sort field changed:", field)}
        isLoading={false}
      />
    </div>
  ),
}

export const MatterBillingWithBills: Story = {
  render: () => (
    <div className="p-4">
      <BillingsList
        bills={mockBills}
        matters={mockMatters}
        onUpdate={(bill) => console.log("Bill updated:", bill)}
        onDelete={(id) => console.log("Bill deleted:", id)}
        sortField={null}
        onSortChange={(field) => console.log("Sort field changed:", field)}
        isLoading={false}
        hideMatterColumn={true}
      />
    </div>
  ),
}

export const MatterBillingLoading: Story = {
  render: () => (
    <div className="p-4">
      <BillingsList
        bills={mockBills}
        matters={mockMatters}
        onUpdate={(bill) => console.log("Bill updated:", bill)}
        onDelete={(id) => console.log("Bill deleted:", id)}
        sortField={null}
        onSortChange={(field) => console.log("Sort field changed:", field)}
        isLoading={true}
        hideMatterColumn={true}
      />
    </div>
  ),
}

export const MatterBillingEmpty: Story = {
  render: () => (
    <div className="p-4">
      <BillingsList
        bills={[]}
        matters={mockMatters}
        onUpdate={(bill) => console.log("Bill updated:", bill)}
        onDelete={(id) => console.log("Bill deleted:", id)}
        sortField={null}
        onSortChange={(field) => console.log("Sort field changed:", field)}
        isLoading={false}
        hideMatterColumn={true}
      />
    </div>
  ),
}