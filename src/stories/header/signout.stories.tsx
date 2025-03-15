import type { Meta, StoryObj } from "@storybook/react";
import { Signout } from "@/components/header/signout";

const meta: Meta<typeof Signout> = {
  title: "Header/Signout",
  component: Signout,
};

export default meta;
type Story = StoryObj<typeof Signout>;

export const Default: Story = {};
