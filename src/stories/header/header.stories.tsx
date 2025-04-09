import type { Meta, StoryObj } from '@storybook/react'
import { Header } from '@/components/header/header'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/sidebar/appSidebar'
import { userEvent, within } from '@storybook/testing-library'

const meta: Meta<typeof Header> = {
  title: 'Header/Header',
  component: Header,
  parameters: {
    nextjs: { appDirectory: true },
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="w-screen h-screen">
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {}

export const DarkMode: Story = {
  decorators: [(Story) => <div className="dark">{Story()}</div>],
}

export const HeaderWithSidebarActive: Story = {
  render: () => (
    <>
      <Header />
      <AppSidebar />
    </>
  ),
}

export const HeaderWithSidebarActiveDarkMode: Story = {
  render: () => (
    <div className="dark">
      <Header />
      <AppSidebar />
    </div>
  ),
}

export const SidebarCollapsedLight: Story = {
  render: () => (
    <>
      <Header />
      <AppSidebar />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggleButton = await canvas.findByRole('button', {
      name: /toggle sidebar/i,
    })
    await userEvent.click(toggleButton)
  },
}

export const SidebarCollapsedDark: Story = {
  decorators: [(Story) => <div className="dark">{Story()}</div>],
  render: () => (
    <>
      <Header />
      <AppSidebar />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggleButton = await canvas.findByRole('button', {
      name: /toggle sidebar/i,
    })
    await userEvent.click(toggleButton)
  },
}

export const AvatarDropdownOpenLight: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const avatarButton = await canvas.findByRole('button', { name: /avatar/i })
    await userEvent.click(avatarButton)
  },
}

export const AvatarDropdownOpenDark: Story = {
  decorators: [(Story) => <div className="dark">{Story()}</div>],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const avatarButton = await canvas.findByRole('button', { name: /avatar/i })
    await userEvent.click(avatarButton)
  },
}

export const CreateNewDropdownOpenLight: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const createNewButton = await canvas.findByRole('button', {
      name: /create new/i,
    })
    await userEvent.click(createNewButton)
  },
}

export const CreateNewDropdownOpenDark: Story = {
  decorators: [(Story) => <div className="dark">{Story()}</div>],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const createNewButton = await canvas.findByRole('button', {
      name: /create new/i,
    })
    await userEvent.click(createNewButton)
  },
}

export const TypingInSearchLight: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const searchInput = await canvas.findByPlaceholderText(/search/i)
    await userEvent.type(searchInput, 'Sample text', { delay: 100 })
  },
}

export const TypingInSearchDark: Story = {
  decorators: [(Story) => <div className="dark">{Story()}</div>],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const searchInput = await canvas.findByPlaceholderText(/search/i)
    await userEvent.type(searchInput, 'Sample text', { delay: 100 })
  },
}
