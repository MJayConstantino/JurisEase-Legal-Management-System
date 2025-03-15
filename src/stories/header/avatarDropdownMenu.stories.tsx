import { Meta, StoryObj } from "@storybook/react";
import AvatarDropdownMenu from "@/components/header/avatarDropdownMenu";

const meta: Meta<typeof AvatarDropdownMenu> = {
  title: "Header/AvatarDropdownMenu",
  component: AvatarDropdownMenu,
};

export default meta;
type Story = StoryObj<typeof AvatarDropdownMenu>;

export const Default: Story = {};
