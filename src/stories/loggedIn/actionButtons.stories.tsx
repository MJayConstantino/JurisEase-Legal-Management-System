import type { Meta, StoryObj } from "@storybook/react";
import ActionButtons from "@/components/homepage/loggedIn/actionButtons";

const meta: Meta<typeof ActionButtons> = {
  title: "Logged In/ActionButtons",
  component: ActionButtons,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: "fullscreen",
    viewport: {
      defaultViewport: "responsive",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ActionButtons>;

export const Default: Story = {
  args: {
    handleMatters: () => alert("Navigating to dashboard..."),
    handleSignOut: () => alert("Signing out..."),
    dashboardLoading: false,
    signOutLoading: false,
    isLoading: false,
  },
};

export const DashboardLoading: Story = {
  args: {
    handleMatters: () => alert("Navigating to dashboard..."),
    handleSignOut: () => alert("Signing out..."),
    dashboardLoading: true,
    signOutLoading: false,
    isLoading: false,
  },
};

export const SignOutLoading: Story = {
  args: {
    handleMatters: () => alert("Navigating to dashboard..."),
    handleSignOut: () => alert("Signing out..."),
    dashboardLoading: false,
    signOutLoading: true,
    isLoading: false,
  },
};

export const BothLoading: Story = {
  args: {
    handleMatters: () => alert("Navigating to dashboard..."),
    handleSignOut: () => alert("Signing out..."),
    dashboardLoading: true,
    signOutLoading: true,
    isLoading: true,
  },
};

export const DisabledButtons: Story = {
  args: {
    handleMatters: () => alert("Navigating to dashboard..."),
    handleSignOut: () => alert("Signing out..."),
    dashboardLoading: false,
    signOutLoading: false,
    isLoading: true,
  },
};
