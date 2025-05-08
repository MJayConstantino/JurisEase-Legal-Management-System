import { Meta, StoryObj } from "@storybook/react";
import CreateNewButton from "@/components/header/createNewButton";
import { ThemeProvider } from "@/components/theme-provider";

const meta: Meta<typeof CreateNewButton> = {
  title: "Header/CreateNewButton",
  component: CreateNewButton,
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center h-screen w- screen dark:bg-black">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CreateNewButton>;

export const Default: Story = {
  render: () => (
    <ThemeProvider attribute="class" defaultTheme="light">
      <CreateNewButton matters={[]} />,
    </ThemeProvider>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <CreateNewButton matters={[]} />
    </ThemeProvider>
  ),
};

export const DropdownOpen: Story = {
  render: () => (
    <ThemeProvider attribute="class" defaultTheme="light">
      <CreateNewButton defaultOpen matters={[]} />,
    </ThemeProvider>
  ),
};

export const DropdownOpenDarkMode: Story = {
  render: () => (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <CreateNewButton defaultOpen matters={[]} />
    </ThemeProvider>
  ),
};
