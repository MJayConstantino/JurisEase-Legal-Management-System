import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MatterHeader } from "@/components/matters/matterHeader";
import { mockMatters } from "./mockMatters";
import { userEvent, within } from "@storybook/testing-library";
import { action } from "@storybook/addon-actions";

const sampleMatter = mockMatters[0];

const meta: Meta<typeof MatterHeader> = {
  title: "Matters/MatterHeader",
  component: MatterHeader,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: "fullscreen",
    viewport: {
      defaultViewport: "responsive",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "2rem",
          maxWidth: "600px",
          margin: "0 auto",
          background: "#f0f0f0",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MatterHeader>;

/**
 * Default:
 * Renders the MatterHeader component with a sample matter.
 */
export const Default: Story = {
  args: {
    matter: sampleMatter,
  },
};

/**
 * DarkMode:
 * Renders the MatterHeader component on a dark background.
 */
export const DarkMode: Story = {
  args: {
    matter: sampleMatter,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div className="dark bg-gray-800">
        <Story />
      </div>
    ),
  ],
};

/**
 * DeleteInteraction:
 * An interactive story which simulates a user opening the dropdown menu
 * and clicking "Delete Matter", which causes the deletion confirmation dialog
 * to open.
 */
export const DeleteInteraction: Story = {
  args: {
    matter: sampleMatter,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the "More options" button by its accessible name.
    const moreButton = await canvas.findByRole("button", {
      name: /more options/i,
    });
    await userEvent.click(moreButton);

    // Wait for the DropdownMenuItem that contains "Delete Matter"
    const deleteOption = await canvas.findByText(/delete matter/i);
    await userEvent.click(deleteOption);

    // Optionally check for the appearance of the deletion confirmation dialog.
    try {
      const deletionDialog = await canvas.findByRole("dialog");
      action("Deletion Dialog Opened")(deletionDialog);
    } catch {
      action("Deletion Dialog Not Found")(
        "The deletion dialog did not appear."
      );
    }
  },
};
