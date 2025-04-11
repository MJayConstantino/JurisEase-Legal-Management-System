import type { Meta, StoryObj } from "@storybook/react";
import { EditableCard } from "@/components/matters/editableCard";
import { userEvent, within } from "@storybook/testing-library";
import { action } from "@storybook/addon-actions";
import React from "react";

const meta: Meta<typeof EditableCard> = {
  title: "Matters/EditableCard",
  component: EditableCard,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: "fullscreen",
    viewport: {
      defaultViewport: "responsive",
    },
  },
};

export default meta;
type Story = StoryObj<typeof EditableCard>;

/**
 * Basic example: Render an EditableCard with static children.
 */
export const Empty: Story = {
  args: {
    title: "Empty Card",
    children: "This is an empty EditableCard with static content.",
  },
};

/**
 * Dark Mode variant: Uses background parameters to simulate a dark environment.
 */
export const DarkMode: Story = {
  args: {
    title: "Dark Mode EditableCard",
    children: "This card is styled for dark mode.",
    editable: true,
  },
  decorators: [(Story) => <div className="dark">{Story()}</div>],
};

/**
 * Interactive example: Demonstrates the editable behavior with onSave & onCancel actions.
 * The children prop is provided as a function that changes its output based on the editing state.
 */
export const Interactive: Story = {
  args: {
    title: "Interactive EditableCard",
    children: (isEditing: boolean) => (
      <div>{isEditing ? "Now editing..." : "Click edit to start editing."}</div>
    ),
    onSave: action("save"),
    onCancel: action("cancel"),
  },
  play: async ({ canvasElement }) => {
    // Locate the canvas element and use testing-library's within to search for elements.
    const canvas = within(canvasElement);
    // Find the edit button and click it to enter editing mode.
    const editButton = await canvas.findByRole("button", { name: /edit/i });
    await userEvent.click(editButton);
    // Short delay to simulate the user observing the change.
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Now, find the save button and click it.
    const saveButton = await canvas.findByRole("button", { name: /check/i });
    await userEvent.click(saveButton);
  },
};

/**
 * Custom Actions example: Includes custom onSave and onCancel actions
 * and uses a play function to simulate editing and then canceling.
 */
export const CustomActions: Story = {
  args: {
    title: "Custom Action EditableCard",
    children: (isEditing: boolean) => (
      <div>{isEditing ? "Editing Mode Enabled" : "Viewing Mode"}</div>
    ),
    onSave: action("Custom Save"),
    onCancel: action("Custom Cancel"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Enter editing mode
    const editButton = await canvas.findByRole("button", { name: /edit/i });
    await userEvent.click(editButton);
    // Wait a moment to simulate editing
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Click cancel to exit editing mode
    const cancelButton = await canvas.findByRole("button", { name: /x/i });
    await userEvent.click(cancelButton);
  },
};
