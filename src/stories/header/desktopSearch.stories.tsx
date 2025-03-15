import type { Meta, StoryObj } from "@storybook/react";
import DesktopSearch from "@/components/header/desktopSearch"; // adjust path if needed

const meta: Meta<typeof DesktopSearch> = {
  title: "Header/DesktopSearch",
  component: DesktopSearch,
};

export default meta;
type Story = StoryObj<typeof DesktopSearch>;

export const Default: Story = {};
