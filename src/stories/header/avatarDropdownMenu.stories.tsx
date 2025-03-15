import { Meta, StoryObj } from "@storybook/react";
import AvatarDropdownMenu from "@/components/header/avatarDropdownMenu";

const meta: Meta<typeof AvatarDropdownMenu> = {
  title: "Header/AvatarDropdownMenu",
  component: AvatarDropdownMenu,
};

export default meta;
type Story = StoryObj<typeof AvatarDropdownMenu>;

export const Default: Story = {
  render: () => <AvatarDropdownMenu />,
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark">
      <AvatarDropdownMenu />
    </div>
  ),
};

export const Loading: Story = {
  render: () => <AvatarDropdownMenu isLoading />,
};

export const LoadingDarkMode: Story = {
  render: () => (
    <div className="dark">
      <AvatarDropdownMenu isLoading />
    </div>
  ),
};

export const DropdownOpen: Story = {
  render: () => <AvatarDropdownMenu defaultOpen />,
};

export const DropdownOpenDarkMode: Story = {
  render: () => (
    <div className="dark">
      <AvatarDropdownMenu defaultOpen />
    </div>
  ),
};
