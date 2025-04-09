import type { Meta, StoryObj } from "@storybook/react"
import { BillingsRevenueHeader } from "@/components/billings/billingsRevenueHeader"

const meta: Meta<typeof BillingsRevenueHeader> = {
  title: "Billings/RevenueHeader",
  component: BillingsRevenueHeader,
}

export default meta
type Story = StoryObj<typeof BillingsRevenueHeader>

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <BillingsRevenueHeader
        totalRevenue={25000}
        todayRevenue={1500}
        weekRevenue={5000}
        monthRevenue={12000}
        currentDateTime={new Date()}
        activeFilter="all"
        onFilterChange={(filter) => console.log("Filter changed:", filter)}
      />
    </div>
  ),
}

export const TodayFilter: Story = {
  render: () => (
    <div className="p-4">
      <BillingsRevenueHeader
        totalRevenue={25000}
        todayRevenue={1500}
        weekRevenue={5000}
        monthRevenue={12000}
        currentDateTime={new Date()}
        activeFilter="today"
        onFilterChange={(filter) => console.log("Filter changed:", filter)}
      />
    </div>
  ),
}

export const WeeklyFilter: Story = {
  render: () => (
    <div className="p-4">
      <BillingsRevenueHeader
        totalRevenue={25000}
        todayRevenue={1500}
        weekRevenue={5000}
        monthRevenue={12000}
        currentDateTime={new Date()}
        activeFilter="week"
        onFilterChange={(filter) => console.log("Filter changed:", filter)}
      />
    </div>
  ),
}

export const MonthlyFilter: Story = {
  render: () => (
    <div className="p-4">
      <BillingsRevenueHeader
        totalRevenue={25000}
        todayRevenue={1500}
        weekRevenue={5000}
        monthRevenue={12000}
        currentDateTime={new Date()}
        activeFilter="month"
        onFilterChange={(filter) => console.log("Filter changed:", filter)}
      />
    </div>
  ),
}