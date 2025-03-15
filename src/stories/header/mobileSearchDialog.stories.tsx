import type { Meta, StoryObj } from "@storybook/react";
import { MobileSearchDialog } from "@/components/header/mobileSearchDialog";

const meta: Meta<typeof MobileSearchDialog> = {
  title: "Header/MobileSearchDialog",
  component: MobileSearchDialog,
};

export default meta;
type Story = StoryObj<typeof MobileSearchDialog>;

export const Default: Story = {};
