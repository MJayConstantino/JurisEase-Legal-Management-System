import type { Meta, StoryObj } from "@storybook/react";
import MobileSearch from "@/components/header/mobileSearch";

const meta: Meta<typeof MobileSearch> = {
  title: "Header/MobileSearch",
  component: MobileSearch,
};

export default meta;
type Story = StoryObj<typeof MobileSearch>;

export const Default: Story = {};
