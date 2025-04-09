import type { Meta, StoryObj } from "@storybook/react"
import { BillStatus } from "@/types/billing.type"

const Status = ({ status }: { status: BillStatus }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
    }
  }

  return (
    <span
      className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium ${getStatusStyles(status)}`}
    >
      {status}
    </span>
  )
}

const meta: Meta<typeof Status> = {
  title: "Billings/Status",
  component: Status,
}

export default meta
type Story = StoryObj<typeof Status>

export const Active: Story = {
  render: () => <Status status={BillStatus.active} />,
}

export const Paid: Story = {
  render: () => <Status status={BillStatus.paid} />,
}

export const Pending: Story = {
  render: () => <Status status={BillStatus.pending} />,
}

export const Overdue: Story = {
  render: () => <Status status={BillStatus.overdue} />,
}

export const DarkModeActive: Story = {
  render: () => (
    <div className="dark p-4 rounded">
      <Status status={BillStatus.active} />
    </div>
  ),
}

export const DarkModePaid: Story = {
  render: () => (
    <div className="dark p-4 rounded">
      <Status status={BillStatus.paid} />
    </div>
  ),
}

export const DarkModePending: Story = {
  render: () => (
    <div className="dark p-4 rounded">
      <Status status={BillStatus.pending} />
    </div>
  ),
}

export const DarkModeOverdue: Story = {
  render: () => (
    <div className="dark p-4 rounded">
      <Status status={BillStatus.overdue} />
    </div>
  ),
}
