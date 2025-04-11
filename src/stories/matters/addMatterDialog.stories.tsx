import type { Meta, StoryObj } from "@storybook/react";
import { AddMatterDialog } from "@/components/matters/addMatterDialog";
import { userEvent, within } from "@storybook/testing-library";
import { action } from "@storybook/addon-actions";
import React from "react";

const meta: Meta<typeof AddMatterDialog> = {
  title: "Matters/AddMatterDialog",
  component: AddMatterDialog,
  args: {
    open: true,
    onOpenChange: action("onOpenChange"),
  },
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
type Story = StoryObj<typeof AddMatterDialog>;

/**
 * Default: The dialog open with default (empty) values.
 */
export const Default: Story = {};

/**
 * WithValue: Pre-fill form fields using a play function.
 */
export const WithValue: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the Matter Name input by test ID
    const matterNameInput = await canvas.findByTestId("matter-name-input");
    await userEvent.clear(matterNameInput);
    await userEvent.type(matterNameInput, "Test Case Title");

    // Find the Case Number input by test ID
    const caseNumberInput = await canvas.findByTestId("case-number-input");
    await userEvent.clear(caseNumberInput);
    await userEvent.type(caseNumberInput, "CASE-5678");

    // Find the Client Name input by test ID
    const clientNameInput = await canvas.findByTestId("client-name-input");
    await userEvent.clear(clientNameInput);
    await userEvent.type(clientNameInput, "Jane Doe");

    // For the status select: use the test ID
    const statusTrigger = await canvas.findByTestId("status-select");
    await userEvent.click(statusTrigger);
    // Then select the "pending" option
    const pendingOption = await canvas.findByTestId("status-pending");
    await userEvent.click(pendingOption);
  },
};

/**
 * DefaultDark: The dialog open with default values in dark mode.
 */
export const DefaultDark: Story = {
  decorators: [(Story) => <div className="dark bg-black">{Story()}</div>],
};

/**
 * WithValueDark: The dialog open with fields pre-filled in dark mode.
 */
export const WithValueDark: Story = {
  decorators: [(Story) => <div className="dark">{Story()}</div>],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const matterNameInput = await canvas.findByTestId("matter-name-input");
    await userEvent.clear(matterNameInput);
    await userEvent.type(matterNameInput, "Test Case Title");

    const caseNumberInput = await canvas.findByTestId("case-number-input");
    await userEvent.clear(caseNumberInput);
    await userEvent.type(caseNumberInput, "CASE-5678");

    const clientNameInput = await canvas.findByTestId("client-name-input");
    await userEvent.clear(clientNameInput);
    await userEvent.type(clientNameInput, "Jane Doe");

    const statusTrigger = await canvas.findByTestId("status-select");
    await userEvent.click(statusTrigger);
    const pendingOption = await canvas.findByTestId("status-pending");
    await userEvent.click(pendingOption);
  },
};

/**
 * CreateMatterSuccess: Simulate a full creation flow by filling out the form and clicking "Create Matter".
 */
export const CreateMatterSuccess: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill in Matter Name
    const matterNameInput = await canvas.findByTestId("matter-name-input");
    await userEvent.clear(matterNameInput);
    await userEvent.type(matterNameInput, "New Matter Title");

    // Fill in Case Number
    const caseNumberInput = await canvas.findByTestId("case-number-input");
    await userEvent.clear(caseNumberInput);
    await userEvent.type(caseNumberInput, "CASE-9999");

    // Fill in Client Name
    const clientNameInput = await canvas.findByTestId("client-name-input");
    await userEvent.clear(clientNameInput);
    await userEvent.type(clientNameInput, "John Smith");

    // Select the "closed" status
    const statusTrigger = await canvas.findByTestId("status-select");
    await userEvent.click(statusTrigger);
    const closedOption = await canvas.findByTestId("status-closed");
    await userEvent.click(closedOption);

    // Click the "Create Matter" button
    const createButton = await canvas.findByTestId("create-matter-button");
    await userEvent.click(createButton);
  },
};

/**
 * CreateMatterSuccessDark: Same as above, but in dark mode.
 */
export const CreateMatterSuccessDark: Story = {
  decorators: [(Story) => <div className="dark">{Story()}</div>],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const matterNameInput = await canvas.findByTestId("matter-name-input");
    await userEvent.clear(matterNameInput);
    await userEvent.type(matterNameInput, "New Matter Title");

    const caseNumberInput = await canvas.findByTestId("case-number-input");
    await userEvent.clear(caseNumberInput);
    await userEvent.type(caseNumberInput, "CASE-9999");

    const clientNameInput = await canvas.findByTestId("client-name-input");
    await userEvent.clear(clientNameInput);
    await userEvent.type(clientNameInput, "John Smith");

    const statusTrigger = await canvas.findByTestId("status-select");
    await userEvent.click(statusTrigger);
    const closedOption = await canvas.findByTestId("status-closed");
    await userEvent.click(closedOption);

    const createButton = await canvas.findByTestId("create-matter-button");
    await userEvent.click(createButton);
  },
};
