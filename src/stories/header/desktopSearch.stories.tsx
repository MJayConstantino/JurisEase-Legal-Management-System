import { Meta, StoryObj } from '@storybook/react'
import DesktopSearch from '@/components/header/globalSearch/desktopSearch'
import { userEvent, within } from '@storybook/testing-library'

const meta: Meta<typeof DesktopSearch> = {
  title: 'Header/DesktopSearch',
  component: DesktopSearch,
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center h-screen w-screen dark:bg-black">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DesktopSearch>

export const Default: Story = {
  render: () => <DesktopSearch />,
}

export const DarkMode: Story = {
  render: () => (
    <div className="dark">
      <DesktopSearch />
    </div>
  ),
}

export const Focused: Story = {
  render: () => <DesktopSearch />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Search')
    input.focus()
  },
}

export const FocusedDarkMode: Story = {
  render: () => (
    <div className="dark">
      <DesktopSearch />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Search')
    input.focus()
  },
}

export const WithText: Story = {
  render: () => <DesktopSearch />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Search')
    await userEvent.type(input, 'Hello World', { delay: 100 })
  },
}

export const WithTextDarkMode: Story = {
  render: () => (
    <div className="dark">
      <DesktopSearch />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Search')
    await userEvent.type(input, 'Hello World', { delay: 100 })
  },
}
