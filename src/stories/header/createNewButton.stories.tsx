import { Meta, StoryObj } from "@storybook/react";
import CreateNewButton from "@/components/header/createNewButton";

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
  render: () => <CreateNewButton />,
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark">
      <CreateNewButton />
    </div>
  ),
};

export const DropdownOpen: Story = {
  render: () => <CreateNewButton defaultOpen />,
};

export const DropdownOpenDarkMode: Story = {
  render: () => (
    <div className="dark">
      <CreateNewButton defaultOpen />
    </div>
  ),
};
