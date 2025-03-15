import type { Meta, StoryObj } from "@storybook/react";
import CreateNewButton from "@/components/header/createNewButton";

const meta: Meta<typeof CreateNewButton> = {
  title: "Header/CreateNewButton",
  component: CreateNewButton,
};

export default meta;
type Story = StoryObj<typeof CreateNewButton>;

export const Default: Story = {};
