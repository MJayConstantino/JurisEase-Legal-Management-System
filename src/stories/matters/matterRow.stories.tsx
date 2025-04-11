import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MatterRow } from "@/components/matters/matterRow";
import { mockMatters } from "./mockMatters";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/testing-library";

// Sample matter from mocks.
const sampleMatter = mockMatters[0];

// Create sample users for display.
const mockUsers = [
  { user_id: "1", user_name: "Alice Smith", user_email: "alice@example.com" },
  { user_id: "2", user_name: "Bob Johnson", user_email: "bob@example.com" },
];

const meta: Meta<typeof MatterRow> = {
  title: "Matters/MatterRow",
  component: MatterRow,
  parameters: {
    nextjs: { appDirectory: true },
    layout: "fullscreen",
    viewport: { defaultViewport: "responsive" },
  },
  // Wrap the row in a table structure.
  decorators: [
    (Story) => (
      <table className="min-w-full">
        <tbody>
          <Story />
        </tbody>
      </table>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MatterRow>;

/**
 * Default:
 * Displays a MatterRow with loaded data.
 */
export const Default: Story = {
  args: {
    matter: sampleMatter,
    users: mockUsers,
    isLoading: false,
    deletingId: null,
    onRowClick: action("onRowClick"),
    onDelete: action("onDelete"),
  },
};

/**
 * Loading:
 * Displays the MatterRow in a loading state.
 */
export const Loading: Story = {
  args: {
    matter: sampleMatter,
    // When loading, user data may be empty.
    users: [],
    isLoading: true,
    deletingId: null,
    onRowClick: action("onRowClick"),
    onDelete: action("onDelete"),
  },
};

/**
 * DeleteInteraction:
 * An interactive story that simulates opening the dropdown menu and clicking "Delete Matter."
 */
export const DeleteInteraction: Story = {
  args: {
    matter: sampleMatter,
    users: mockUsers,
    isLoading: false,
    deletingId: null,
    onRowClick: action("onRowClick"),
    onDelete: action("onDelete"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Find the button that triggers the dropdown menu (using its accessible name).
    const moreButton = await canvas.findByRole("button", {
      name: /open menu/i,
    });
    await userEvent.click(moreButton);
    // Click the "Delete Matter" dropdown item.
    const deleteOption = await canvas.findByText(/delete matter/i);
    await userEvent.click(deleteOption);
  },
};
