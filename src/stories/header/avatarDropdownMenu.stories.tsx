import { Meta, StoryObj } from "@storybook/react";
import AvatarDropdownMenu from "@/components/header/avatarDropdownMenu";
import { ThemeProvider } from "@/components/ui/theme-provider";

const meta: Meta<typeof AvatarDropdownMenu> = {
  title: "Header/AvatarDropdownMenu",
  parameters: {
    nextjs: { appDirectory: true },
  },
  component: AvatarDropdownMenu,
};

export default meta;
type Story = StoryObj<typeof AvatarDropdownMenu>;

export const Default: Story = {
  render: () => (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AvatarDropdownMenu />
    </ThemeProvider>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AvatarDropdownMenu />
    </ThemeProvider>
  ),
};

export const Loading: Story = {
  render: () => (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AvatarDropdownMenu isLoading />
    </ThemeProvider>
  ),
};

export const LoadingDarkMode: Story = {
  render: () => (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AvatarDropdownMenu isLoading />
    </ThemeProvider>
  ),
};

export const DropdownOpen: Story = {
  render: () => (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AvatarDropdownMenu defaultOpen />
    </ThemeProvider>
  ),
};

export const DropdownOpenDarkMode: Story = {
  render: () => (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AvatarDropdownMenu defaultOpen />
    </ThemeProvider>
  ),
};
