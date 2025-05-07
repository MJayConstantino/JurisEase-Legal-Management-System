import type { Meta, StoryObj } from "@storybook/react";
import { AppSidebar } from "@/components/sidebar/appSidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { userEvent, within } from "@storybook/testing-library";

const meta: Meta<typeof AppSidebar> = {
  title: "Sidebar/AppSidebar",
  component: AppSidebar,
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="w-screen h-screen">
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AppSidebar>;

export const BlankSidebar: Story = {
  render: () => (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="h-[100vh] bg-[#1B1E4B] text-white z-0 pt-16 fixed left-0 hidden md:flex w-64 transition-all duration-300 ease-in-out"
    >
      <SidebarContent className="px-2 py-6">
        <SidebarMenu />
      </SidebarContent>
    </Sidebar>
  ),
};

export const WithContent: Story = {
  render: () => <AppSidebar />,
};

export const ActiveSidebar: Story = {
  render: () => <AppSidebar />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const calendarLink = await canvas.findByRole("link", { name: /matters/i });
    calendarLink.classList.add("active");
  },
};

export const ActiveSidebarDarkMode: Story = {
  decorators: [(Story) => <div className="dark">{Story()}</div>],
  render: () => <AppSidebar />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const calendarLink = await canvas.findByRole("link", { name: /matters/i });
    calendarLink.classList.add("active");
  },
};

export const ActiveSwitchingThroughPages: Story = {
  render: () => <AppSidebar />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const navLinks = await canvas.findAllByRole("link");
    for (const link of navLinks) {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      await new Promise((r) => setTimeout(r, 500));
    }
  },
};

export const ActiveSwitchingThroughPagesDarkMode: Story = {
  render: () => (
    <div className="dark">
      <AppSidebar />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const navLinks = await canvas.findAllByRole("link");
    for (const link of navLinks) {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      await new Promise((r) => setTimeout(r, 500));
    }
  },
};

export const CollapsedSidebar: Story = {
  render: () => (
    <div>
      <SidebarTrigger />
      <AppSidebar />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = await canvas.findByRole("button", {
      name: /toggle sidebar/i,
    });
    await userEvent.click(toggleButton);
  },
};

export const CollapsedSidebarSwitchingThroughPages: Story = {
  render: () => (
    <div>
      <SidebarTrigger />
      <AppSidebar />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = await canvas.findByRole("button", {
      name: /toggle sidebar/i,
    });
    await userEvent.click(toggleButton);
    const navLinks = await canvas.findAllByRole("link");
    for (const link of navLinks) {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      await new Promise((r) => setTimeout(r, 500));
    }
  },
};

export const CollapsedDarkModeSwitchingThroughPages: Story = {
  decorators: [(Story) => <div className="dark">{Story()}</div>],
  render: () => (
    <div>
      <SidebarTrigger />
      <AppSidebar />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = await canvas.findByRole("button", {
      name: /toggle sidebar/i,
    });
    await userEvent.click(toggleButton);
    const navLinks = await canvas.findAllByRole("link");
    for (const link of navLinks) {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      await new Promise((r) => setTimeout(r, 500));
    }
  },
};
