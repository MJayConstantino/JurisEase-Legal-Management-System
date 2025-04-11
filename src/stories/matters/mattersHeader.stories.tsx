import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MattersHeader } from "@/components/matters/mattersHeader";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/testing-library";

const meta: Meta<typeof MattersHeader> = {
  title: "Matters/MattersHeader",
  component: MattersHeader,
  parameters: {
    nextjs: { appDirectory: true },
    layout: "fullscreen",
    viewport: { defaultViewport: "responsive" },
  },
};

export default meta;
type Story = StoryObj<typeof MattersHeader>;

/**
 * Default:
 * Renders the MattersHeader component with filter buttons.
 */
export const Default: Story = {
  args: {
    onStatusChange: action("status changed"),
  },
};

/**
 * DarkMode:
 * Renders the MattersHeader with dark background styling.
 */
export const DarkMode: Story = {
  args: {
    onStatusChange: action("status changed"),
  },
  parameters: { backgrounds: { default: "dark" } },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};

/**
 * FilterInteraction:
 * An interactive story that simulates clicking one of the filter buttons.
 */
export const FilterInteraction: Story = {
  args: {
    onStatusChange: action("status changed"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Simulate clicking the "Open" filter button.
    const openButton = await canvas.findByRole("button", { name: /open/i });
    await userEvent.click(openButton);
  },
};
