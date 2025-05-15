import type { Meta, StoryObj } from "@storybook/react"
import { BillStatus } from "@/types/billing.type"

const Status = ({ status }: { status: BillStatus }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "unpaid":
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


export const Paid: Story = {
  render: () => <Status status={BillStatus.paid} />,
}

export const Unpaid: Story = {
  render: () => <Status status={BillStatus.unpaid} />,
}

export const DarkModePaid: Story = {
  render: () => (
    <div className="dark p-4 rounded">
      <Status status={BillStatus.paid} />
    </div>
  ),
}

export const DarkModeUnpaid: Story = {
  render: () => (
    <div className="dark p-4 rounded">
      <Status status={BillStatus.unpaid} />
    </div>
  ),
}
